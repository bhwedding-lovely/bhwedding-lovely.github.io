(function ($) {

    "use strict";
    /*------------------------------------------
        = DONATE MODAL
    -------------------------------------------*/
    if ($(".donate-modal").length && $(".buttonDonate").length) {
        $(document).on('click', '.buttonDonate', function () {
            $(".donate-modal").show();
            if ($('body').hasClass('offcanvas')) {
                $('body').removeClass('offcanvas');
                $('.js-oliven-nav-toggle').removeClass('active');
            }
        });
        $(document).on('click', '.donate-modal-close', function () {
            $(".donate-modal").hide();
        });
        $(document).on('click', 'body', function (e) {
            if (e.target.id == $("#donate-modal").attr('id')) { $("#donate-modal").hide(); }
        });
    }
    $(document).on('click', '.crypto-item', function () {
        let parent = $(this).parents('.donate-card');
        parent.find('.cryptos-box-view').show();
        parent.find('.cryptos-box-view .coin-img').html('<img src="' + $(this).data('img') + '" />');
        parent.find('.cryptos-box-view .coin-id').html($(this).data('id'));
        parent.find('.cryptos-box-view .coin-address').html($(this).data('address'));
        parent.find('.cryptos-box-view .coin-qr-code').html('').qrcode({ width: 150, height: 150, text: $(this).data('address') });
    });
    $(document).on('click', '.cryptos-box-view-close', function () {
        let parent = $(this).parents('.donate-card');
        parent.find('.cryptos-box-view').hide();
    });
    /*------------------------------------------
        = WISH FORM SUBMISSION
    -------------------------------------------*/
    if ($("#wish-form").length) {
        $("#wish-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 5
                },
                content: {
                    required: true,
                    minlength: 10
                },
                email: {
                    required: false,
                    email: true
                },
            },

            messages: {
                name: {
                    required: '<span style="color:red;">Vui lòng nhập tên của bạn.<span>',
                    minlength: '<span style="color:red;">Tên phải lớn hơn 5 ký tự.<span>',
                },
                content: {
                    required: '<span style="color:red;">Vui lòng nhập lời chúc.<span>',
                    minlength: '<span style="color:red;">Lời chúc phải lớn hơn 10 ký tự.<span>',
                },
                email: {
                    email: '<span style="color:red;">Địa chỉ email không hợp lệ.<span>'
                }
            },

            errorPlacement: function (error, element) {
                if (element.attr("name") == "content") {
                    error.insertAfter("#wish-form .vitualTextarea");
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function (form) {
                $("#loader").css("display", "inline-block");
                $.ajax({
                    type: "POST",
                    url: "/wish",
                    data: $(form).serialize(),
                    success: function (res) {
                        $("#loader").hide();
                        if (!res.error) {
                            $('#show-comments').scrollTop(0);
                            $('#show-comments').prepend('<div class="box-comment p-3 mx-2 my-3"><h4 id="user-name-comment">' + $(form).find("input[name='name']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</h4><p id="comment-detail" class="m-0">' + $(form).find("textarea[name='content']").val().replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;") + '</p></div>');
                            $("#success").html(res.message).slideDown("slow");
                            setTimeout(function () {
                                $("#success").slideUp("slow");
                            }, 5000);
                        } else {
                            $("#error").html(res.message).slideDown("slow");
                            setTimeout(function () {
                                $("#error").slideUp("slow");
                            }, 5000);
                        }

                        form.reset();
                    },
                    error: function () {
                        $("#loader").hide();
                        $("#error").slideDown("slow");
                        setTimeout(function () {
                            $("#error").slideUp("slow");
                        }, 5000);
                    }
                });
                return false;
            }

        });
    }

    /*------------------------------------------
        = TOGGLE MUSUC BIX
    -------------------------------------------*/
    if ($(".music-box").length) {
        var musicBtn = $(".music-box-toggle-btn"),
            musicBox = $(".music-holder");

        musicBtn.on("click", function () {
            musicBox.toggleClass("toggle-music-box");
            return false;
        })
    }


    /*------------------------------------------
        = BACK TO TOP
    -------------------------------------------*/
    if ($(".back-to-top-btn").length) {
        $(".back-to-top-btn").on("click", function () {
            $("html,body").animate({
                scrollTop: 0
            }, 2000, "easeInOutExpo");
            return false;
        })
    }

    $(document).on('click', '.calendar-button-custom-click', function (e) {
        e.preventDefault();
        $(this).parent().find('.calendar-button .atcb-click').click();
    });

})(window.jQuery);

$(document).ready(function () {
    setTimeout(function () {
        $(".sub-intro").addClass("show");
        $(".opening-flower").addClass("show");
        $(".opening-save").addClass("show");
        $(".opening-title").addClass("show");
    }, 1000);
    setTimeout(function () {
        $(".opening-section").addClass("hide");
    }, 4000);
    setTimeout(function () {
        $(".opening-section").remove();
    }, 5000);
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    function shakeTooltip() {
        var arrTooltip = $('ul.list-menu-icon').children();
        arrTooltip.each(function (index) {
            setTimeout(() => {
                if (document.querySelector('.btn-menu-close').style.display !== "none") {
                    $(this).addClass('shake');
                    $(this).children().children().children('.tooltiptext').css('visibility', 'visible');
                    setTimeout(() => {
                        $(this).children().children().children('.tooltiptext').css('visibility', '');
                        $(this).removeClass('shake');
                    }, 3000);
                } else {
                    return false;
                }
            }, index * 5000);
        });
    }
    if ($('#menu-access').length > 0) {
        setTimeout(() => {
            shakeTooltip();
            myInterval = setInterval(shakeTooltip, 20000);
        }, 3000);
    }
    $('.btn-menu-close').click(function () {
        $('tooltiptext').css('visibility', '');
        clearInterval(myInterval);
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    const audio = document.getElementById('audioPlayer');

    const playMusicOnce = function () {
        if (audio && audio.paused) {
            audio.play().then(() => {
                console.log("Âm thanh đã được phát");
                document.getElementById('playerVolumeOff').style.display = 'none';
                document.getElementById('playerVolumeOn').style.display = 'block';
            }).catch(err => {
                console.warn("Trình duyệt chặn phát nhạc tự động:", err);
            });
        }

        $('body').off('click touchstart', playMusicOnce);
    };

    $('body').on('click touchstart', playMusicOnce);
});
