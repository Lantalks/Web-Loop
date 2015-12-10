# Variables: 
habilitar = true 
seccionActual = "" 
animacionLoading = '<div style="padding-top: 20px; padding-bottom: 20px;"><center><div class="caja-carga"><div class="circulo-interno"></div><div class="circulo-externo"></div></div><div>Cargando...</div></center></div>' 

$(document).ready ->
	cargaReproductor(true) 
	$('main#contenido').html animacionLoading 
	$('main#contenido').load 'secciones/inicio.html'
	seccionActual = 'inicio'
	$("ul#nav-principal li").click -> 
		cargaSeccion(@.id) 
		return  
	$("ul#principal li").click -> 
		cargaSeccion(@.id) 
		return 
	$("#brand").click -> 
		cargaInicio() 
		return 
	$("ul li #brand").click -> 
		cargaInicio() 
		return 
	false

$('li#programacion').click ->
	cargaSeccion('programacion') 
	return

cargaReproductor = (habilitar) -> 
	$("main#reproductor .encuadre").html animacionLoading
	$("main#reproductor .encuadre").load 'ux/reproductor.html' 
	return

cargaInicio = () -> 
	location.reload()
	return

cargaSeccion = (pagina) -> 
	if seccionActual != pagina
		$('#modal-externo').html animacionLoading 
		$('#modal-externo').load 'secciones/'+pagina+'.html' 
		seccionActual = pagina
		return