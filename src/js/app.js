require('../css/styles.scss');
import 'bootstrap';
import '../assets/1.jpeg';
import '../assets/2.jpeg';
import '../assets/3.jpg';
import '../assets/people.png';
import '../assets/latam_logo.png';

var $ = require('jquery');

//animacion menu
$(document).ready(function () {
    if ($(window).scrollTop() > 20) {
        $('.navbar').addClass('active');
        $('#sidebar-wrapper').addClass('active');
        $('.arrow').fadeIn('slow');
    }
    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 20) {
            $('.navbar').addClass('active');
            $('#sidebar-wrapper').addClass('active');
            $('.arrow').fadeIn('slow');
        } else {
            $('.navbar').removeClass('active');
            $('#sidebar-wrapper ').removeClass('active');
            $('.arrow').fadeOut('slow');
        }
    });
});

//animacion de ancla
$('.navbar a, #sidebar-wrapper a').click(function () {
    var target = $(this).attr('data-element');
    if (target !== undefined) {
        $('html, body').animate({
            scrollTop: $(".section" + target).offset().top - 50
        }, 2000);
    }
});


//envio de formulario
$("#dataForm").submit(function (event) {
    event.preventDefault();
    var email = $(this).find('input[name="email"]').val()

    var url = 'https://apifake.d2.e2l.dev/api/newsletter/list/members';
    var data = { email: email };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch((error) => {
            $("#response .modal-title").html('Error');
            $("#response .modal-body").html('No se pudo enviar el correo, intentelo nuevamente');
            $("#response .btn").removeClass('btn-success').addClass('btn-error');
            $("#response").modal();
        })
        .then((resp) => {
            console.log(resp);
            $("#response .modal-title").html('Enviado');
            $("#response .modal-body").html('Te has suscrito correctamente, ¡muchas gracias!');
            $("#response .btn").removeClass('btn-error').addClass('btn-success');
            $("#response").modal();
        });
});

//animacion sidebar
$("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("toggled");
    if ($("#sidebar-wrapper").hasClass("toggled")) {
        $("#sidebar-wrapper").css('margin-left', 0);
    } else {
        $("#sidebar-wrapper").css('margin-left', '-1000%');
    }

});

//ocultar sidebar
$(document).ready(function () {

    var mouse_is_inside = false;

    $('#sidebar-wrapper').hover(function () {
        mouse_is_inside = true;
    }, function () {
        mouse_is_inside = false;
    });

    $("body").mouseup(function () {
        if ($("#sidebar-wrapper").hasClass("toggled")) {
            if (!mouse_is_inside && $(window).width() <= 580) {
                $("#sidebar-wrapper").css('margin-left', '-1000%');
                $("#sidebar-wrapper").removeClass("toggled");
            }
        }
    });
});

//subir al top

$('.arrow').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 'slow');
});