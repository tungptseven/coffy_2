//
// jQuery(document).ready(function($) {
//     $('.counter').counterUp({
//         delay: 10,
//         time: 1000
//     });
// });

$(document).ready(function () {

    $(".navbar-default .navbar-nav>li").hover(function () {
        $(".bottom-line").css("border", "none");
        $(".navbar-brand").css("border-top", "1px solid #33485F");
        $(this).css("border-top", "1px solid #ccc");
    }, function () {
        $(".bottom-line").css("border-top", "1px solid #ccc");
        $(this).css("border-top", "none");
        $(".navbar-brand").css("border-top", "none");
    });

    // Show modal dang nhap/dangki

    $('#btn-dangki').on('click', function () {
        $('.bs-example-modal-lg').modal('show');
        $('#myTabs a[href="#profile"]').tab('show');
    })

    $('#btn-dangki2').on('click', function () {
        $('.bs-example-modal-lg').modal('show');
        $('#myTabs a[href="#profile"]').tab('show');
    })

    $('#btn-dangnhap').on('click', function () {
        $('.bs-example-modal-lg').modal('show');
        $('#myTabs a[href="#home"]').tab('show');
    })

     //scroll

    $(window).scroll(function() {
        $(".suggest").each(function(){
            var pos = $(this).offset().top;

            var winTop = $(window).scrollTop();
            if (pos < winTop + 600) {
                $(this).addClass("slidenim");
            }
        });
    });

    //Counter

    $('.counter').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');

        $({countNum: $this.text()}).animate({
                countNum: countTo
            },

            {
                duration: 1200,
                // easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                    //alert('finished');
                }

            });
    });

    // Back to top

    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#btn-to-top').css('display', 'block');
        } else {
            $('#btn-to-top').css('display', 'none');
        }
        ;
    });
    $('#btn-to-top').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
    });


});

