/**
 * This is solely a build script, intended to prep the vss-ui npm package for publishing.
 */

const { execSync } = require("child_process");
const glob = require("glob");
const UglifyES = require("uglify-es");
const fs = require("fs");

// Copy not available until Node 8.5, which is not yet LTS.
function copyWithCallback(source, target, cb) {
    const writeStream = fs.createWriteStream(target);
    fs.createReadStream(source).pipe(writeStream);
    writeStream.on("close", cb);
}

function copyFile(source, target) {
    return new Promise((resolve, reject) => {
        copyWithCallback(source, target, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * -------------------------------------Min build -----------------------------------------------
 */

// Compile typescript min
console.log("# Compiling TypeScript min. Executing `node_modules\\.bin\\tsc -p ./tsconfig.json --outDir ./lib/min --sourceMap false`.");
try {
    execSync("node_modules\\.bin\\tsc -p ./tsconfig.json --outDir ./lib/min --sourceMap false", {
        stdio: ["ignore", "pipe", "ignore"],
        shell: true,
        cwd: __dirname
    });
} catch (error) {
    console.log("ERROR: Failed to build TypeScript Min.");
    process.exit(1);
}
// Compile SASS min
try {
    console.log("# Compiling SASS/SCSS. Executing `node_modules\\.bin\\node-sass --quiet --output ./lib/min --include-path src src`.");
    execSync("node_modules\\.bin\\node-sass --quiet --output ./lib/min --include-path src src", {
        shell: true,
        cwd: __dirname
    });
} catch (error) {
    console.log("ERROR: Failed to build SASS min.");
    process.exit(1);
}
// Uglify JavaScript
console.log("# Minifying JS using the UglifyES API, replacing un-minified files.");
let count = 0;
glob("./lib/min/**/*.js", (err, files) => {
    for (const file of files) {
        if (file.includes("node_modules/")) {
            continue;
        }
        fs.writeFileSync(
            file,
            UglifyES.minify(fs.readFileSync(file, "utf-8"), { compress: true, mangle: true }).code,
            "utf-8"
        );
        count++;
    }
    console.log(`-- Minified ${count} files.`);
});

/**
 * -------------------------------------Debug build -----------------------------------------------
 */

// Compile typescript debug
console.log("# Compiling TypeScript debug. Executing `node_modules\\.bin\\tsc -p ./tsconfig.json --outDir ./lib/debug --sourceMap true`.");
try {
    execSync("node_modules\\.bin\\tsc -p ./tsconfig.json --outDir ./lib/debug --sourceMap true", {
        stdio: ["ignore", "pipe", "ignore"],
        shell: true,
        cwd: __dirname
    });
} catch (error) {
    console.log("ERROR: Failed to build TypeScript Debug.");
    process.exit(1);
}
// Compile SASS debug
try {
    console.log("# Compiling SASS/SCSS. Executing `node_modules\\.bin\\node-sass --quiet --output ./lib/debug --include-path src src`.");
    execSync("node_modules\\.bin\\node-sass --quiet --output ./lib/debug --include-path src src", {
        shell: true,
        cwd: __dirname
    });
} catch (error) {
    console.log("ERROR: Failed to build SASS debug.");
    process.exit(1);
}


// Copy package.json, LICENSE, README.md to lib
console.log("# Copying package.json, LICENSE, and README.md to lib.");
copyFile("package.json", "lib/package.json").then(() => {
    copyFile("LICENSE", "lib/LICENSE");
}).then(() => {
    copyFile("README.md", "lib/README.md");
}).then(() => {
    console.log("# Done.");
}).catch((reason) => {
    console.log("ERROR: Failed to copy package.json, LICENSE, or README.md - " + reason);
});