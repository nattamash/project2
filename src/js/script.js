$(document).ready(function(){
    $('.carousel__inner').slick({ //обращение к классу
        speed: 1200, //скорость переключения слайдера
        adaptiveHeight: true, //внутри картинки разной высоты- слайдер сам подстроится
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true, //кружочки внизу
                    arrows: false
                }
            }
        ]
    });
    
//табы

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content')
          .removeClass('catalog__content_active')
          .eq($(this).index()).addClass('catalog__content_active'); //получаем номер таба на который нажали и
          //открываем контент для него

    });

    //для переключения информации внутри карточки(у одного класс активности добавляется у другого убирается)
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault(); //отмена обычного поведения браузера
                //(чтобы не переходить по ссылке а выполнять другие действия)
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');//добавляем или 
                //убираем класс активности(toggle)
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };
//при клике на кнопку назад происходил откат
    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

//modal

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
    //внутри модального окна есть заголовок, во внутрь хочу поместить catalog-item__subtitle
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())// получили то что внутри элемента;
            $('.overlay, #order').fadeIn('slow');
        });
    });

//val
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name=phone]').mask("+7 (999) 999-99");

    //отправка форм
    $('form').submit(function(e) {
        e.preventDefault();//отмена стандартного поведения браузера
        $.ajax({
            type: "POST",//отдать данные
            url: "mailer/smart.php",//обработчик(куда отправляем запрос)
            data: $(this).serialize() //чтобы подготовить данные в нужную форму
        }).done(function() { //ответ от сервера(если все удалось и сервер принял данные)
            $(this).find("input").val("");//очистить инпуты после отпрввки формы
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');//очистить формы
        });
        return false;
    });

     // Smooth scroll and pageup

     $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

});
