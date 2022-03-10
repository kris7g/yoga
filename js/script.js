// назначаем обработчик события на весь документ
window.addEventListener('DOMContentLoaded', function() {

    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;   
                }
            }
        }
    });
        
    // timer
    let deadline = '2022-03-30';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);
            
        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                    if(num <= 9) {
                        return '0' + num;
                    } else return num;
                };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }  
    }
    setClock('timer', deadline);
    // modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        // добавляем анимацию, прописанную в css
        this.classList.add('more-splach');
        // запретим прокрутку страницы, как только откроется модальное окно
        document.body.style.overflow = 'hidden';
    });
    // добавляем клик на крестик
    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splach');
        document.body.style.overflow = '';
    });
// modal на кнопки узнать подробнее
    let btnDescr = document.querySelector('.description-btn');

    btnDescr.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splach');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        btnDescr.classList.remote('more-splach');
        document.body.style.overflow = '';
    });
    // form. Работа с асинхронными запросами в js
    // Создаем объект, в котором будут содержаться различные состояние запроса
    // текстовый формат оповещения запроса. 
    // let message = {
    //     loading: 'Загрузка...',
    //     success: 'Спасибо! Скоро мы с вами свяжемся!',
    //     failure: 'Что-то пошло не так...'
    // };

    // let form = document.querySelector('.main-form'),
    //     input = form.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div');

    //     statusMessage.classList.add('status');

    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     form.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');      
    //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    //     let formData = new FormData(form);

    //     // данные, которые получили с json формы, преобразовать в json формат. Создаем промежуточный объект

    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });
    //     let json = JSON.stringify(obj);

    //     request.send(json); 

    //     request.addEventListener('readystatechange', function() {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if(request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });
    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     }
    // });
    // промисы
    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form')[0],
        formBottom = document.getElementById('form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');
    function sendForm(elem) {
        elem.addEventListener('subtim', function(e) {
            e.preventDefault();
                elem.appendChild(statusMessage);
                let formData = new FormData(elem);

                function postData(data) {
                    return new Promise(function(result, reject) {
                        let request = new XMLHttpRequest();

                        request.open('POST', 'server.php');

                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                        request.onreadystatechange = function(){
                            if (request.readyState < 4) {
                                resolte()
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 300) {
                                    resolte()
                                }
                                else {
                                    reject()
                                }
                            }
                        };
                        request.send(data);
                    });
                }
        });
    }
    // slide
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n); 
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    persons.addEventListener('change', function() {
        personsSum = +this.value;
        total = (daysSum + personsSum)*4000;
        if(restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener('change', function() {
        daysSum = +this.value;
        total = (daysSum + personsSum)*4000;
        if(persons.value == '') {
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener('change', function() {
        if (persons.value == '' || restDays.value == '') {
            totalValue.innerHTML = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});




// 1. вытащить из html классы: сам таб, родитель для табов, таб с контентом
// 2. подписать в стилях к родительским блокам (классам) классы .hide с свойством display: none и .show со свойством display: flex
// 3. Контент самих табов содержит дополнительный класс fade. В css ему прописана css3 анимация. Пишется в самом верху документа стилей (style.css)
// 4. Реализуем функцию, которая будет полностью скрывать наши табы на странице
// function hideTabContent(a) {
//     for (let i = a; i < tabContent.length; i++) {
            // удаляем класс .show
//         tabContent[i].classList.remove('show');
//         tabContent[i].classList.add('hide');
//     }
// }
// запускаем функцию, передаем единицу (1), чтоб осталась первая часть. Что происходит? Вместо a передаем единицу, она подставляется в (let i = a) и цикл начинается с единицы. Т.о. скрываются все tabContent, кроме первого. 
// hideTabContent(1)

// 5. Прописываем функцию, которая будет показывать этот tabContent. Аргумент b необоходим для того чтобы показать именно тот контент, который нам необходим. Мои мысли: чтобы показать табконтект, проверяем, если он действительно скрыт, то добавляем его. 
// function showTabContent(b) {
        // проверяем, действительно ли этот элемент скрыт
//     if (tabContent[b].classList.contains('hide')) {
//         tabContent[b].classList.remove('hide');
//         tabContent[b].classList.add('show');
//     }
// }
// 6. Назначение обработчика событий на каждый из табов. На переменную info назначаем обработчик события. Используем делегирование событий. Объект event, чтобы сравнить с тем, куда мы кликаем. 
// info.addEventListener('click', function(event) {
//     let target = event.target;
    // Для достижения эффекта делегирования. Проверяем, что действительно кликнули на таб
//     if (target && target.classList.contains('info-header-tab')) {
            // Чтобы конкретный таб привязался к конкретному табконтенту, мы берем все наши табы, переберем их и сравним с тем, куда мы кликнули. Запускаем цикл
//         for (let i = 0; i < tab.length; i++) {
                // Проверяем условие, если то, куда мы нажали, совпадает с определенным табом,который мы перебираем...
//             if (target == tab[i]) {
                    // ...то скроем все наши табы (передаем 0)
//                 hideTabContent(0);
                    // показываем тот таб, который совпадает с табконтент по нумерации. Например, используется tab[i] (2 или 3 и тд) и показываем точно такой же табконтент showTabContent(i)
//                 showTabContent(i);
//                  останавливаем цикл
//                 break;
                
//             }
//         }
//     }
// TIMER обратного отсчета
// Создаем дедлайн, задаем конечную дату
// let deadline = '2022-02-28'
// Узнать, какой промежуток времени между сейчас и дедлайном
// Date.parse превращает любую дату в количество мл секунд. От дедлайна отнимает время сейчас
// function getTimeRemaining(endtime) {
//     let t = Date.parse(endtime) - Date.parse(new Date()) - в t лежит количество мл секунд
// Math.floor - округлить до целого числа. Получить кол-во секунд из мл секунд
// seconds = Math.floor((t/1000) % 60),
// minutes = Math.floor((t/1000/60) % 60),
// hours = Math.floor((t/(1000*60*60)))
// Чтобы получить дни
// days = Math.floor((t/(1000*60*60*24)))
// В будущем переменную t можно использовать, чтобы останавливать таймер. Как только переменная достигнет 0 и меньше - остановим таймер
// Создаем Объект
//     return {
//         'total' : t,
//         'hours' : hours,
//         'minutes' : minutes,
//         'seconds' : seconds
//     };
// Вверху теперь написана функция, которая определяет остаток времени и вычленяет полностью время: часы, минуты, секунды
// Теперь напишем функцию, которая превращает статическую верстку в динамическую, чтобы подставлять значения, которые здесь рассчитываем, в верстку
// Получаем блок, в котором будет таймер, через id
// function setClock(id, endtime) {
//     Получить статические элементы, которые будут меняться
//     Функция, которая запускает часы
//     function setClock(id, endtime) {
//         let timer = document.getElementById(id),
//             hours = timer.querySelector('.hours'),
//             minutes = timer.querySelector('.minutes'),
//             seconds = timer.querySelector('.seconds');

//     Функция, которая будет обновлять часы каждую секунду
//     function updateClock() {
//         let t = getTimeRemaining(endtime);
    
//         В элементы верстки поместить данные, которые обновляются каждую секунду
//         hours.textContent = t.hours;
//         minutes.textContent = t.minutes;
//         seconds.textContent = t.seconds;
//     Запускаем функцию updateClock каждую секунду 
//     timeInterval = setInterval(updateClock, 1000);
// Итого: функция setClock создает переменные, взятые со страницы.
//         Функция updateClock сначала получает разницу между временем при помощи функции getTimeRemaining
// Как переменная total достигнет 0, таймер остановится 


// form
    // создаем объект, в котором содержатся различные состояния запроса
    // let message = {
    //     loading: 'Загрузка...',
    //     success: 'Спасибо! Скоро мы с вами свяжемся!',
    //     failure: 'Что-то пошло не так...'
    // };
    // let form = document.querySelector('.main-form'),
    //     input = form.getElementsByTagName('input');
    //     // сообщение со статусом, которое будет выводиться
    //     statusMessage = document.createElement('div');
    //     // добавляем ему класс
    //     statusMessage.classList.add('status');
    //     // в любой форме для отправки данных необходимо чтобы было либо button, либо input type = submit.
    //     // на form навешиваем обработчик события. Событие происходит только тогда, когда форма отправляется.
    // form.addEventListener('submit', function(event) {
    //     // Отменяем стандартное поведение браузера(отменяем отправку запроса)
    //     event.preventDefault();
    //     // должны оповестить пользователя, как прошел запрос
    //     form.appendChild(statusMessage);
    //     // создем запрос, чтобы отправить данные на сервер
    //     let request = new XMLHttpRequest();
    //     // настраиваем запрос
    //     request.open('POST', 'server.php');
    //     // настраиваем заголовки http запроса
    //     // наш контент(то, что мы отправляем на сервер) будет содержать данные, которые получены из формы
    //     request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    //     // как получить данные, которые ввел пользователь? Использовать встроенный объект formData. Создает структуру из данных, которые ввел пользователь, в формате "ключ-значение". Чтобы оправлять данные, необходимо, чтобы в input правильно стояли name. Из атрибута name формируется ключ, а значение введет пользователь. в formData помещаем все то, что заполнил пользователь. Во внутрь этой конструкции должны отправить ту форму, из которой ходим достать все данные, которые ввел пользователь. 
    //     let formData = new FormData(form);
    //     // метод send отправляет запрос на сервер
    //     request.send(formData);
    //     // наблюдать за изменениями состояния запроса - 
    //     request.addEventListener('readystatechange', function() {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //             // здесь можно выполнять любые действия
    //         } else if(request.readyState === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });
    //     // очищаем инпуты после отправки. перебираем каждый инпут. 
    //     for (i = 0; i < input.length; i++) {
    //         input[i].value = '';