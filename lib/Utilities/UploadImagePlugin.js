define(["require", "exports", "./StaticObservable"], function (require, exports, StaticObservable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    (function ($) {
        'use strict';
        $.extend(true, $.trumbowyg, {
            langs: {
                en: {
                    upload: 'Upload',
                    file: 'File',
                    uploadError: 'Error'
                }
            },
            plugins: {
                upload: {
                    init: function (trumbowyg) {
                        var btnDef = {
                            fn: function () {
                                trumbowyg.saveRange();
                                var file;
                                trumbowyg.openModalInsert(trumbowyg.lang.upload, {
                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'image/*'
                                        }
                                    }
                                }, function () {
                                    var reader = new FileReader();
                                    reader.onloadend = function (event) {
                                        var data = event.target.result;
                                        StaticObservable_1.StaticObservable.getInstance().notify({ data: data, callback: function (imageUrl) {
                                                if (imageUrl) {
                                                    trumbowyg.execCmd("insertImage", imageUrl, undefined, true);
                                                    $(['img[src="' + imageUrl + '"]:not([alt])'].join(''), trumbowyg.$box).css("width", "auto").css("max-height", "400px");
                                                }
                                                trumbowyg.closeModal();
                                            } }, "imagepasted");
                                    };
                                    reader.readAsDataURL(file);
                                });
                                $('input[type=file]').on("change", function (e) {
                                    file = e.target.files[0];
                                });
                            }
                        };
                        trumbowyg.addBtnDef('upload', btnDef);
                    }
                }
            }
        });
    })(jQuery);
});
