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
                            var $modal = trumbowyg.openModalInsert(trumbowyg.lang.upload, {
                                file: {
                                    type: 'file',
                                    required: true,
                                    attributes: {
                                        accept: 'image/*'
                                    }
                                }
                            }, function () {
                                var reader = new FileReader();
                                if ($(".image-upload-progress", $modal).length === 0) {
                                    $(".trumbowyg-modal-title", $modal)
                                        .after($('<div/>', {
                                        'class': "image-upload-progress"
                                    }));
                                }
                                reader.onloadend = function (event) {
                                    var data = event.target.result;
                                    $(window).trigger("imagepasted", { data: data, callback: function (imageUrl) {
                                            if (imageUrl) {
                                                trumbowyg.execCmd("insertImage", imageUrl, undefined, true);
                                                $(['img[src="' + imageUrl + '"]:not([alt])'].join(''), trumbowyg.$box).css("width", "auto").css("max-height", "400px");
                                            }
                                            trumbowyg.closeModal();
                                        } });
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
