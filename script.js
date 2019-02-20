function convertToJSON(params) {
	params = params.substring(0, params.length - 1)
	var obj = JSON.parse(params);
	return obj;
}

$('#form').on('submit', function(evt) {
	evt.preventDefault();
	var obj = {
		ip: $('#ip-address').val()
	};

	$.ajax({
		type: 'get',
		url: 'script.php',
		data: obj,
		success: function(data){
			if (data === "Invalid IP") {
				$('.result>p').html();
				$('.result>p').html("Был введен неверный IP-адрес");
				return;
			}

			data = convertToJSON(data);
			
			if (data.messages === "not found") {
				$('.result>p').html();
				$('.result>p').html("Не найдено места с таким IP-адресом :(");
				return;
			}
			if (typeof data === "object") {
				$('.result>p').html();
				$('.result>p').html(
					"Регион: " + data.data.region + "<br>" +
					"Город: " + data.data.name + "<br>" +
					"Индекс: " + (data.data.code === null ? "неизвестно" : data.data.code)
				);
				return;
			} else {
				$('.result>p').html();
				$('.result>p').html("Случился сбой :(");
				return;
			}
		}
	});
});

