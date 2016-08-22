(function() {
  var animacionLoading, cargaDatos, cargaInicio, cargaPrograma, cargaSeccion, controlPlayer, controlPlayerDisplay, controlPlayerSmall, root, seccionActual;

  root = this;

  seccionActual = "";

  animacionLoading = '<div style="padding-top: 20px; padding-bottom: 20px;"><center><div class="caja-carga"><div class="circulo-interno"></div><div class="circulo-externo"></div></div><div>Cargando...</div></center></div>';

  controlPlayerDisplay = "";

  this.JSONprogramas = '';

  this.JSONplaylists = '';

  this.progSelec = '';

  root.infoRadio = function() {
    $('p#listening').html('En estos momentos está sonando: ' + temaActual);
  };

  root.infoRadioOnStreaming = function() {
    $('h1#state').html("Estás escuchando: Loop Radio");
    $('p#listening').html('Ahora suena: ' + temaActual);
    console.log('Ahora suena: ' + temaActual);
  };

  root.infoRadioPaused = function() {
    $('h1#state').html("En pausa");
    $('p#listening').html('Mientras tanto suena: ' + temaActual);
  };

  $(document).ready(function() {
    $.ajax('datos/programas.json', {
      success: function(data, status, xhr) {
        var i, programas, _i, _ref;
        root.JSONprogramas = data;
        programas = "";
        for (i = _i = 0, _ref = data.length; _i < _ref; i = _i += 1) {
          programas += '<li><a class="programas" nohref="#" id="' + i + '">' + data[i].programa + '</a></li>';
        }
        return $('ul.dropdown#programas').html(programas);
      },
      error: function(xhr, status, err) {
        return $('ul.dropdown#programas').html('<li class="disabled"><a nohref>Ocurrió un error al intentar mostrar el listado de programas. </a></li>');
      },
      complete: function(data, xhr, status) {
        console.log("comp");
        return listenerMenu();
      }
    }, false);
    $.ajax('datos/playlists.json', {
      success: function(data, status, xhr) {
        var i, playlists, _i, _ref;
        console.log("yea " + data.length);
        root.JSONplaylists = data;
        playlists = "";
        for (i = _i = 0, _ref = data.length; _i < _ref; i = _i += 1) {
          playlists += '<li><a class="playlist" href="' + data[i].link + '">' + data[i].playlist + '</a></li>';
        }
        return $('ul.dropdown#playlists').html(playlists);
      },
      error: function(xhr, status, err) {
        console.log("nah " + err);
        return $('ul.dropdown#playlists').html('<li class="disabled"><a nohref>Ocurrió un error al cargar las playlists</a></li>');
      }
    }, false);
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
    $(".boton-player").click(function() {
      console.log(this.id);
      player(this.id);
      return root.realimentarBotonesPlayer();
    });
    return false;
  });

  $('li#programacion').click(function() {
    cargaSeccion('programacion');
  });

  root.listenerMenu = function() {
    return $(document).ready(function() {
      var horarios1, horarios2;
      horarios1 = '';
      horarios2 = '';
      $('a.programas').click(function() {
        var conductores, horarios, i, j, k, _i, _j, _k, _ref, _ref1, _ref2;
        root.progSelec = parseInt(this.id);
        $('#seccion-programas').foundation('reveal', 'open');
        $('#seccion-programas h1').html(JSONprogramas[root.progSelec].programa);
        horarios1 = "";
        horarios2 = "";
        if (JSONprogramas[root.progSelec].dia1 !== void 0) {
          for (i = _i = 0, _ref = JSONprogramas[root.progSelec].dia1.length; _i < _ref; i = _i += 1) {
            if (i === 0) {
              horarios1 += JSONprogramas[root.progSelec].dia1[i];
            } else if (i === JSONprogramas[root.progSelec].dia1.length - 1) {
              horarios1 += ' y ' + JSONprogramas[root.progSelec].dia1[i];
            } else if (i >= 1) {
              horarios1 += ', ' + JSONprogramas[root.progSelec].dia1[i];
            }
          }
          horarios1 += ' de ' + JSONprogramas[root.progSelec].horarioInicio1 + ' a ' + JSONprogramas[root.progSelec].horarioFin1;
          horarios = horarios1;
        } else {
          horarios = "Muy pronto";
        }
        if (JSONprogramas[root.progSelec].dia2 !== void 0) {
          horarios2 += ', y ';
          for (j = _j = 0, _ref1 = JSONprogramas[root.progSelec].dia2.length; _j < _ref1; j = _j += 1) {
            if (j === 0) {
              horarios2 += JSONprogramas[root.progSelec].dia2[j];
            } else if (j === JSONprogramas[root.progSelec].dia2.length - 1) {
              horarios2 += ' y ' + JSONprogramas[root.progSelec].dia2[j];
            } else if (j >= 1) {
              horarios2 += ', ' + JSONprogramas[root.progSelec].dia2[j];
            }
          }
          horarios2 += ' de ' + JSONprogramas[root.progSelec].horarioInicio2 + ' a ' + JSONprogramas[root.progSelec].horarioFin2;
          horarios += horarios2;
        }
        $('#seccion-programas #horarios').html(horarios);
        if (JSONprogramas[progSelec].conduccion !== void 0) {
          if (JSONprogramas[progSelec].conduccion.length === 1) {
            $('#seccion-programas #conduccion').html("Conduce: " + JSONprogramas[progSelec].conduccion[0]).removeClass("hidden");
          } else {
            conductores = "";
            for (k = _k = 0, _ref2 = JSONprogramas[progSelec].conduccion.length; _k < _ref2; k = _k += 1) {
              console.log(k);
              if (k === 0) {
                conductores += JSONprogramas[progSelec].conduccion[k];
              } else if (k > 0) {
                if (k === JSONprogramas[progSelec].conduccion.length - 1) {
                  conductores += ' y ' + JSONprogramas[progSelec].conduccion[k];
                } else {
                  conductores += ', ' + JSONprogramas[progSelec].conduccion[k];
                }
              }
            }
            $('#seccion-programas #conduccion').html("Conducen: " + conductores).removeClass("hidden");
          }
        } else {
          $('#seccion-programas #conduccion').html("").addClass("hidden");
        }
        $('#seccion-programas #descripcion').html(JSONprogramas[progSelec].descripcion);
        if (JSONprogramas[progSelec].programasAnt !== false) {
          $('#mixcloud-embed').html('<iframe width="100%" height="120" src="' + JSONprogramas[progSelec].programasAnt + '" frameborder="0"></iframe>').removeClass("hidden");
        } else {
          $('#mixcloud-embed').html('').addClass("hidden");
        }
        return false;
      });
      return false;
    });
  };

  root.realimentarBotonesPlayer = function() {
    return $(document).ready(function() {
      return $(".boton-player").click(function() {
        console.log(this.id);
        player(this.id);
        root.realimentarBotonesPlayer();
      });
    });
  };

  root.realimentarAccesoProgramas = function() {
    return $(document).ready(function() {
      $("ul#programa li").click(function() {
        cargaPrograma(this.id);
        root.progSelec = this.id;
        realimentarAccesoProgramas();
        return false;
      });
      return false;
    });
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

  cargaPrograma = function(programa) {
    console.log(p);
    alert(programa);
    $('#modal-externo').html(animacionLoading);
    $('#modal-externo').load('secciones/programa.html');
    seccionActual = 'programacion';
    root.progSelec = programa;
    $('#mixcloud-embed').html('<iframe width="100%" height="120" src="' + JSONprogramas[programa].programasAnt + '" frameborder="0"></iframe>');
  };

  cargaDatos = function() {
    alert(this);
    return $.getJSON('datos/programas.json', function(data) {
      var imprimeDatos, items;
      items = [];
      imprimeDatos = function(index, programa) {
        return items.push("<h1>" + programa.nombre + "</h1> <h3>Conduce: " + programa.conduccion + "</h3><p>" + programa.descripcionCorta + "</p><p>" + programa.descripcion + "</p><h2>Los " + programa.diaEmision + " a las " + programa.horaEmision + "</h2><center><a href='" + programa.programasAnteriores + "' target='blank'><button>Visitar sitio</button></a></center></div>");
      };
      return console.log(items);
    });
  };

  controlPlayer = function(id, iclass) {
    controlPlayerDisplay += '<div class="boton-player" id="' + id + '"><i class="fa ' + iclass + ' fa-lg"></i></div>';
    $('.controles').html(controlPlayerDisplay);
  };

  controlPlayerSmall = function(id, iclass) {
    controlPlayerDisplay += '<div class="boton-player chico" id="' + id + '"><i class="fa ' + iclass + ' fa-lg"></i></div>';
    $('.controles').html(controlPlayerDisplay);
  };

  root.player = function(accion) {
    clearInterval(root.intervaloActualizacion);
    if (accion === "pausa") {
      $('h1#state').html("En pausa");
      $('p#listening').html('Mientras tanto suena: ' + temaActual);
      root.intervaloActualizacion = setInterval(infoRadioPaused, 5000);
      controlPlayerDisplay = "";
      controlPlayer('reanudar', "fa-play");
      audio.pause();
    } else if (accion === "reanudar") {
      if (estadoRadio === "En el aire") {
        audio.play();
        root.intervaloActualizacion = setInterval(infoRadioOnStreaming, 5000);
        controlPlayerDisplay = "";
        controlPlayer('pausa', "fa-pause");
      } else if (estadoRadio === "Fuera del aire") {
        $('h1#state').html("Ups! Estamos fuera del aire");
        $('p#listening').html('¡Volvé más tarde para escucharnos en vivo!');
        controlPlayerDisplay = "";
        controlPlayer('recargar', "fa-refresh");
      }
    } else if (accion === "reproducir") {
      $('p#listening').html('Cargando transmisión...');
      $('.controles').html('');
      if (estadoRadio === "En el aire") {
        $('audio source').attr('src', streamingURL);
        audio.load();
        audio.play();
        root.intervaloActualizacion = setInterval(infoRadioOnStreaming, 5000);
        controlPlayerDisplay = "";
        controlPlayer('pausa', "fa-pause");
      } else if (estadoRadio === "Fuera del aire") {
        $('h1#state').html("Estamos fuera del aire");
        $('p#listening').html('¡Volvé más tarde para escucharnos en vivo!');
        controlPlayerDisplay = "";
        controlPlayer('recargar', "fa-refresh");
      }
      root.realimentarBotonesPlayer();
      false;
    } else if (accion === "recargar") {
      controlPlayerDisplay = "";
      return player('reproducir');
    }
    return false;
  };

}).call(this);
