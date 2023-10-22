$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 600,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class= "slick-prev" > <img src="../icons/arrow-left.png" alt="back-arrow"></button>',
		nextArrow: '<button type="button" class= "slick-next" > <img src="../icons/arrow-right.png" alt="next-arrow"></button>',
	});
});

function validateForms(form) {
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
			},
			errorClass: "error"
		},
		messages: {
			name: {
				minlength: jQuery.validator.format("Минимум {0} символа!")
			},
			phone: {
				required: ("Укажите телефон в формате +7 (____) ___-__-__")
			},
			email: {
				required: "Пожалуйста, укажите Вашу почту",
				email: "Почту нужно указать в формате 'name@domain.com'"
			}
		}
	});
}

validateForms('#contacting')
validateForms('#form');

async function submitForm(event) {
	event.preventDefault(); // отключаем перезагрузку/перенаправление страницы
	try {
		// Формируем запрос
		const response = await fetch(event.target.action, {
			method: 'POST',
			body: new FormData(event.target)
		});
		// проверяем, что ответ есть
		if (!response.ok) throw (`Ошибка при обращении к серверу: ${response.status}`);
		// проверяем, что ответ действительно JSON
		const contentType = response.headers.get('content-type');
		if (!contentType || !contentType.includes('application/json')) {
			throw ('Ошибка обработки. Ответ не JSON');
		}
		// обрабатываем запрос
		const json = await response.json();
		if (json.result === "success") {
			// в случае успеха
			alert(json.info);
		} else {
			// в случае ошибки
			console.log(json);
			throw (json.info);
		}
	} catch (error) { // обработка ошибки
		alert(error);
	}
}