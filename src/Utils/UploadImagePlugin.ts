
(function ($) {
    'use strict';

    $.extend(true, ($ as any).trumbowyg, {
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
                    let btnDef = {
                        fn: function () {
                            trumbowyg.saveRange();

                            let file;

                            const $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.upload,

                                // Fields
                                {
                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'image/*'
                                        }
                                    }
                                },

                                // Callback
                                function () {
                                    const reader = new FileReader();

                                    if ($(".image-upload-progress", $modal).length === 0) {
                                        $(".trumbowyg-modal-title", $modal)
                                            .after(
                                                $('<div/>', {
                                                    'class': "image-upload-progress"
                                                })
                                            );
                                    }

                                    reader.onloadend = (event) => {
                                        const data = (event.target as any).result;
                                        
                                        $(window).trigger("imagepasted", { data: data, callback: (imageUrl: string) => {
                                            if (imageUrl) {
                                                trumbowyg.execCmd("insertImage", imageUrl, undefined, true);
                                                $(['img[src="' + imageUrl + '"]:not([alt])'].join(''), trumbowyg.$box).css("width", "auto").css("max-height", "400px");
                                            }
                                            trumbowyg.closeModal();
                                        }});
                                    };
                                    reader.readAsDataURL(file);
                                }
                            );

                            $('input[type=file]').on("change", (e) => {
                                file = (e.target as any).files[0];
                            });
                        }
                    };

                    trumbowyg.addBtnDef('upload', btnDef);
                }
            }
        }
    });
})(jQuery);
