var seccionActual; 

$(document).ready(function() {
	cargaReproductor(true); 
	cargaSeccion('inicio'); 
});

var animacionLoading = '<div class="caja-carga"><div class="circulo-interno"></div><div class="circulo-externo"></div></div><div>Cargando...</div>'; 

var cargaReproductor = function(habilitar){
	$('main#reproductor .encuadre').html(animacionLoading); 
	$('main#reproductor .encuadre').load('ux/reproductor.html'); 
}

var cargaSeccion = function(pagina){
	if (seccionActual === pagina) {
		return false; 
	}
	else {
		$('main#contenido').html(animacionLoading); 
		$('main#contenido').load('secciones/'+pagina+'.html'); 
		seccionActual = pagina;
	};
}