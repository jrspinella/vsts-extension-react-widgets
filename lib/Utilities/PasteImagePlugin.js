define(["require", "exports", "./StaticObservable", "@xkeshi/image-compressor"], function (require, exports, StaticObservable_1, ImageCompressor) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function ($) {
        'use strict';
        $.extend(true, $.trumbowyg, {
            plugins: {
                pasteImage: {
                    init: function (trumbowyg) {
                        trumbowyg.pasteHandlers.push(function (pasteEvent) {
                            try {
                                var items = (pasteEvent.originalEvent || pasteEvent).clipboardData.items;
                                var _loop_1 = function (i) {
                                    if (items[i].type.indexOf("image") === 0) {
                                        var reader_1 = new FileReader();
                                        reader_1.onloadend = function (event) {
                                            var data = event.target.result;
                                            StaticObservable_1.StaticObservable.getInstance().notify({ data: data, callback: function (imageUrl) {
                                                    if (imageUrl) {
                                                        trumbowyg.execCmd("insertImage", imageUrl, undefined, true);
                                                        $(['img[src="' + imageUrl + '"]:not([alt])'].join(''), trumbowyg.$box).css("width", "auto").css("max-height", "400px");
                                                    }
                                                } }, "imagepasted");
                                        };
                                        var file = items[i].getAsFile();
                                        new ImageCompressor(file, {
                                            quality: .6,
                                            convertSize: 2000000,
                                            success: function (newFile) {
                                                reader_1.readAsDataURL(newFile);
                                            },
                                            error: function (e) {
                                                console.log(e.message);
                                            },
                                        });
                                        return "break";
                                    }
                                };
                                for (var i = items.length - 1; i >= 0; i += 1) {
                                    var state_1 = _loop_1(i);
                                    if (state_1 === "break")
                                        break;
                                }
                            }
                            catch (c) {
                            }
                        });
                    }
                }
            }
        });
    })(jQuery);
});
