document.addEventListener('DOMContentLoaded', function(){
    const toggleMenu = document.querySelector('#toggle-menu');
    const headerMenu = document.querySelector('#header-menu');
    const bodyLock = document.body;

    toggleMenu.addEventListener('click', function(){
        if(this.classList.contains('toggle-menu--active')) {
            this.classList.remove('toggle-menu--active');
            headerMenu.classList.remove('header-menu--active');
            bodyLock.classList.remove('lock');
        } else {
            this.classList.add('toggle-menu--active');
            headerMenu.classList.add('header-menu--active');
            bodyLock.classList.add('lock');
        }
    });

    headerMenu.addEventListener('click', function(){
        this.classList.remove('header-menu--active');
        toggleMenu.classList.remove('toggle-menu--active');
        bodyLock.classList.remove('lock');
    });
    
    //Скролл вверх 
    const btnTop = document.querySelector('#btn-scrolltop');
    btnTop.style.display = 'none';

    document.addEventListener('scroll', function(){
        if (window.pageYOffset > 600) {
            btnTop.style.display = 'block';
        } else {
            btnTop.style.display = 'none';
        }
    });

    //Плавная анимация скролла
    $(".header-menu__mobile, .nav, #backtop").on("click", "a", function (event) {
		event.preventDefault();
		let id = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({ scrollTop: top }, 600);
	});

    //Form placeholder
    const formField = document.querySelectorAll('.form-item__field');
    
    for(let item of formField) {
       const formItem = item.closest('.form-item');
       const formPlaceholder = formItem.querySelector('.form-item__placeholder');

       //Placeholder fokus
       item.addEventListener('focus', function(){
        formPlaceholder.classList.add('active'); 
       });

       //Placholder unfokus
       item.addEventListener('blur', function(){
        if (item.value.length > 0) {
            formPlaceholder.classList.add('active');
        } else {
            formPlaceholder.classList.remove('active');
        }
       });
    }
    

    // Form validate
    $('.contact-form').validate({
        // Описываем правила 
        rules: {
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }   
        },
        // Вывод сообщений при ошибках
        messages: {
            email: {
                required: 'Введите Email, чтобы мы могли связаться с Вами.',
                email: 'Введите корректный формат Email, через @'
            },
            message: {
                required: 'Поле не должно быть пустым!'
            }
        },
        // Выполнение функции при корректных данных
        submitHandler: function(form) {
            ajaxFormSumbit();
        }
    });

    // Function AJAX request on server
    function ajaxFormSumbit(){
        let formData = $('.contact-form').serialize(); //Собираем даннные из формы, введенные пользователем и записываем в переменную

        //Формируем AJAX запрос
        $.ajax({
            type: 'POST', //Тип запроса
            url: 'php/mail.php', //Отправка запроса
            data: formData, //Отправка переменной с полученными данными

            //При успехе, выполнится следующая функция
            success: function (html) {
                $('.contact-form').slideUp(800);
                $('#answer').html(html);
            }
        });

        //Возвращаем false (прерываем цепочку срабатывания остальных функций), чтобы по Submit больше ничего не выполнялось
        return false;
    }

});