function EnviarMensaje() {
	$('#estado-envio').remove(); 
	$('#errores-encontrados').remove(); 

	var filtro=/^[A-Za-z][A-Za-z0-9_]*@[A-Za-z0-9_]+.[A-Za-z0-9_.]+[A-za-z]$/;
	var valor_nombre = $('input#nombre').val();  
	var valor_correo = $('input#correo').val();
	var valor_telefono = $('input#telefono').val();   
	var valor_mensaje = $('textarea#mensaje').val();

	var errores = ""; 

	$('.estado-input').remove(); 
 
	console.log("Ejecutando verificación del formulario.");

	if (valor_mensaje.length === 0 ){ 
		if (errores !== "") {errores += "<br/>"};
		errores += "¿No te estará faltando el mensaje a enviar?"; 
		var sendMail = "false";
	}
	if (filtro.test(valor_correo)){
		sendMail = "true";
	} 
	else if (valor_correo.length === 0 ) {
		if (errores !== "") {errores += "<br/>"};
		errores += "No ingresaste tu dirección de correo."; 
		sendMail = "false";
	}
	else{
		if (errores !== "") {errores += "<br/>"};
		errores += "Lo que ingresaste en el campo de correo no es un correo válido."; 
		sendMail = "false";
	}

	if (valor_nombre.length === 0 ){
		if (errores !== "") {errores += "<br/>"};
		errores += "Necesitamos saber quien sos. Si no colocás tu verdadero nombre lo más probable es que hagamos caso omiso a tu correo."; 
		var sendMail = "false";
	}
	if(sendMail == "false"){
		console.log("Hay errores en los campos de texto. Verificá que todo esté en orden."); 
		//$('button#enviarMensaje').after('<div id="errores-encontrados" class="alert alert-danger"><b>No se puede enviar el mensaje por los siguientes motivos: </b><br/>'+ errores +'</div>'); 
	}
 

	if(sendMail == "true"){
		var datos = {
			"nombre" : $('input#nombre').val(),
			"correo" : $('input#correo').val(),
			"mensaje" : $('textarea#mensaje').val()
		};
		console.log("¡Perfecto! Todos los datos estan en orden.");

		$.ajax({
			data: 	datos,
			url: 	'php/correo.php',
			type: 	'post',
			beforeSend: function () {
				$('button#enviarMensaje').text('Enviando mensaje...').addClass('disabled'); 
				$('#grupo-nombre').addClass('has-success').addClass('has-feedback').append('<span class="estado-input"><span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span><span class="sr-only">(success)</span></span>'); 
				$('#grupo-correo').addClass('has-success').addClass('has-feedback').append('<span class="estado-input"><span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span><span class="sr-only">(success)</span></span>'); 
				$('#grupo-mensaje').addClass('has-success').addClass('has-feedback').append('<span class="estado-input"><span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span><span class="sr-only">(success)</span></span>'); 
				$('input[type=name]#nombre').prop('disabled', 'true'); 
				$('input[type=email]#correo').prop('disabled', 'true'); 
				$('input[type=number]#telefono').prop('disabled', 'true'); 
				$('textarea#mensaje').prop('disabled', 'true'); 
				console.log("Enviando correo...");
			},
			error:  function () {
				$('button#enviarMensaje').text('Enviar de nuevo').removeClass('disabled'); 
				$('input[type=name]#nombre').prop('disabled', ''); 
				$('input[type=email]#correo').prop('disabled', ''); 
				$('input[type=number]#telefono').prop('disabled', ''); 
				$('textarea#mensaje').prop('disabled', ''); 
				$('.estado-input').remove(); 
				$('form#correo').before('<div id="estado-envio" class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
										<strong>Ocurrió un error al enviar el mensaje.</strong> Reintentá de nuevo en unos minutos. </div>')
				console.error("Error al enviar el correo. ");
			}, 
			success:  function () {
				$('form')[0].reset();
				$('button#enviarMensaje').text('¡Enviar mensaje!').removeClass('disabled'); 
				$('input[type=name]#nombre').prop('disabled', ''); 
				$('input[type=email]#correo').prop('disabled', ''); 
				$('input[type=number]#telefono').prop('disabled', ''); 
				$('textarea#mensaje').prop('disabled', ''); 
				$('.estado-input').remove(); 
				$('form#correo').before('<div data-alert class="alert-box info radius"><strong>¡El envío se realizó con exito! </strong>Durante la semana contestaremos tu mensaje. <br/>¡Muchas gracias por contactarte con nosotros!<a href="#" class="close">&times;</a></div>'); 
				$(document).foundation('alert', 'reflow');
				console.log("El envío se realizó con exito.");
			}
		});
	}; 
}; 