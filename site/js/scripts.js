(function() {
  var animacionLoading, cargaInicio, cargaReproductor, cargaSeccion, habilitar, seccionActual;

  habilitar = true;

  seccionActual = "";

  animacionLoading = '<div style="padding-top: 20px; padding-bottom: 20px;"><center><div class="caja-carga"><div class="circulo-interno"></div><div class="circulo-externo"></div></div><div>Cargando...</div></center></div>';

  $(document).ready(function() {
    cargaReproductor(true);
    $('main#contenido').html(animacionLoading);
    $('main#contenido').load('secciones/inicio.html');
    seccionActual = 'inicio';
    $("ul#nav-principal li").click(function() {
      cargaSeccion(this.id);
    });
    $("ul#principal li").click(function() {
      cargaSeccion(this.id);
    });
    $("#brand").click(function() {
      cargaInicio();
    });
    $("ul li #brand").click(function() {
      cargaInicio();
    });
    return false;
  });

  $('li#programacion').click(function() {
    cargaSeccion('programacion');
  });

  cargaReproductor = function(habilitar) {
    $("main#reproductor .encuadre").html(animacionLoading);
    $("main#reproductor .encuadre").load('ux/reproductor.html');
  };

  cargaInicio = function() {
    location.reload();
  };

  cargaSeccion = function(pagina) {
    if (seccionActual !== pagina) {
      $('#modal-externo').html(animacionLoading);
      $('#modal-externo').load('secciones/' + pagina + '.html');
      seccionActual = pagina;
    }
  };

}).call(this);
