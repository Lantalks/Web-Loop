root = this

# Variables: 
seccionActual = "" 
animacionLoading = '<div style="padding-top: 20px; padding-bottom: 20px;"><center><div class="caja-carga"><div class="circulo-interno"></div><div class="circulo-externo"></div></div><div>Cargando...</div></center></div>' 
controlPlayerDisplay = "" 

# Uso global
this.JSONprogramas = ''
this.JSONplaylists = ''
this.progSelec = ''

$(document).ready ->
	$.ajax 'datos/programas.json', 
        success  : (data, status, xhr) ->
            root.JSONprogramas = data
            programas = ""
            for i in [0...data.length] by 1
            	programas += '<li><a class="programas" nohref="#" id="'+i+'">'+data[i].programa+'</a></li>'

            $('ul.dropdown#programas').html programas 
            
        error    : (xhr, status, err) ->
            $('ul.dropdown#programas').html '<li class="disabled"><a nohref>Ocurrió un error al intentar mostrar el listado de programas. </a></li>' 
        complete : (data, xhr, status) ->
            console.log("comp")
            listenerMenu()
        false
    $.ajax 'datos/playlists.json', 
        success  : (data, status, xhr) ->
            console.log("yea "+data.length)
            root.JSONplaylists = data
            playlists = ""
            for i in [0...data.length] by 1
            	playlists += '<li><a class="playlist" href="'+data[i].link+'">'+data[i].playlist+'</a></li>'

            $('ul.dropdown#playlists').html playlists 
            
        error    : (xhr, status, err) ->
            console.log("nah "+err)
            $('ul.dropdown#playlists').html '<li class="disabled"><a nohref>Ocurrió un error al cargar las playlists</a></li>'
        false

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


	$(".boton-player").click -> 
		console.log @.id
		player(@.id)
		root.realimentarBotonesPlayer()
	false 

$('li#programacion').click ->
	cargaSeccion('programacion') 
	return

root.listenerMenu = () ->
	$(document).ready ->
		horarios1 = ''
		horarios2 = ''
		$('a.programas').click ->
			root.progSelec = parseInt(@id)
			$('#seccion-programas').foundation 'reveal', 'open'

			$('#seccion-programas h1').html JSONprogramas[root.progSelec].programa

			horarios1 = ""
			horarios2 = ""

			if JSONprogramas[root.progSelec].dia1 != undefined
				for i in [0...JSONprogramas[root.progSelec].dia1.length] by 1
					if i == 0
						horarios1 += JSONprogramas[root.progSelec].dia1[i] 
					else if i == JSONprogramas[root.progSelec].dia1.length-1
						horarios1 += ' y ' + JSONprogramas[root.progSelec].dia1[i]
					else if i >= 1
						horarios1 += ', ' + JSONprogramas[root.progSelec].dia1[i]
				horarios1 += ' de ' + JSONprogramas[root.progSelec].horarioInicio1 + ' a ' + JSONprogramas[root.progSelec].horarioFin1
				horarios = horarios1
			else
				horarios = "Muy pronto"

			if JSONprogramas[root.progSelec].dia2 != undefined
				horarios2 += ', y ' 
				for j in [0...JSONprogramas[root.progSelec].dia2.length] by 1
					if j == 0
						horarios2 += JSONprogramas[root.progSelec].dia2[j] 
					else if j == JSONprogramas[root.progSelec].dia2.length-1
						horarios2 += ' y ' + JSONprogramas[root.progSelec].dia2[j]
					else if j >= 1
						horarios2 += ', ' + JSONprogramas[root.progSelec].dia2[j]
				horarios2 += ' de ' + JSONprogramas[root.progSelec].horarioInicio2 + ' a ' + JSONprogramas[root.progSelec].horarioFin2
				horarios += horarios2
				
			
			$('#seccion-programas #horarios').html horarios
			if JSONprogramas[progSelec].conduccion != undefined
				if  JSONprogramas[progSelec].conduccion.length == 1
					$('#seccion-programas #conduccion').html "Conduce: "+JSONprogramas[progSelec].conduccion[0]
						.removeClass "hidden"
				else
					conductores = ""
					for k in [0...JSONprogramas[progSelec].conduccion.length] by 1
						console.log k
						if k == 0
							conductores += JSONprogramas[progSelec].conduccion[k]
						else if k > 0
							if k == JSONprogramas[progSelec].conduccion.length-1
								conductores += ' y '+JSONprogramas[progSelec].conduccion[k]
							else
								conductores += ', ' + JSONprogramas[progSelec].conduccion[k]
					$('#seccion-programas #conduccion').html "Conducen: "+conductores
						.removeClass "hidden"
			else 
				$('#seccion-programas #conduccion').html ""  
					.addClass "hidden"
			$('#seccion-programas #descripcion').html JSONprogramas[progSelec].descripcion
			if JSONprogramas[progSelec].programasAnt != false
				$('#mixcloud-embed').html '<iframe width="100%" height="120" src="'+JSONprogramas[progSelec].programasAnt+'" frameborder="0"></iframe>'
					.removeClass "hidden"
			else 
				$('#mixcloud-embed').html ''
					.addClass "hidden"
			false
		false

root.realimentarBotonesPlayer = () ->
	$(document).ready ->
		$(".boton-player").click -> 
			console.log @.id
			player(@.id)
			root.realimentarBotonesPlayer()
			return 

root.realimentarAccesoProgramas = () ->
	$(document).ready ->
		$("ul#programa li").click -> 
			
			cargaPrograma(@id) 
			root.progSelec = @id 
			realimentarAccesoProgramas()
			false
		false

cargaInicio = () -> 
	location.reload()
	return

cargaSeccion = (pagina) -> 
	if seccionActual != pagina
		$('#modal-externo').html animacionLoading 
		$('#modal-externo').load 'secciones/'+pagina+'.html' 
		seccionActual = pagina
		return

cargaPrograma = (programa) -> 
	console.log p
	alert programa
	$('#modal-externo').html animacionLoading 
	$('#modal-externo').load 'secciones/programa.html' 
	seccionActual = 'programacion'
	root.progSelec = programa 
	$('#mixcloud-embed').html '<iframe width="100%" height="120" src="'+JSONprogramas[programa].programasAnt+'" frameborder="0"></iframe>' 
	return

cargaDatos = () -> 
	alert @
	$.getJSON 'datos/programas.json', ( data ) -> 
		items = [] 
		imprimeDatos = (index, programa) ->
			items.push "<h1>"+programa.nombre+"</h1> <h3>Conduce: "+programa.conduccion+"</h3><p>"+programa.descripcionCorta+"</p><p>"+programa.descripcion+"</p><h2>Los "+programa.diaEmision+" a las "+programa.horaEmision+"</h2><center><a href='"+programa.programasAnteriores+"' target='blank'><button>Visitar sitio</button></a></center></div>"
		console.log items


controlPlayer = (id, iclass) ->
	controlPlayerDisplay += '<div class="boton-player" id="'+id+'"><i class="fa '+iclass+' fa-lg"></i></div>' 
	$('.controles').html controlPlayerDisplay 
	return

controlPlayerSmall = (id, iclass) -> 
	controlPlayerDisplay += '<div class="boton-player chico" id="'+id+'"><i class="fa '+iclass+' fa-lg"></i></div>' 
	$('.controles').html controlPlayerDisplay 
	return

root.player = (accion) ->
	if accion == "pausa" 
		$('p#listening').html 'Pausado' 
		controlPlayerDisplay = ""
		controlPlayer 'reproducir', "fa-play" 
		audio.pause()
	else if accion == "reproducir"
		$('p#listening').html 'Cargando transmisión...' 
		$('.controles').html '' 

		$.ajax streamingURL, 
			url: streamingURL, 
			crossDomain: true
			success: (data) ->
				$('audio source').attr 'src', streamingURL
				$('p#listening').html 'Estás escuchando: Loop Radio.' 
				controlPlayerDisplay = ""
				controlPlayer 'pausa', "fa-pause" 
				#console.log "Successful AJAX call: #{data}"
				audio.load()
				audio.play()
				console.info "Estás escuchando: Loop Radio."
				root.realimentarBotonesPlayer()
				false
			error: (jqXHR, textStatus, errorThrown) -> 
				$('p#listening').html "Ocurrió un error al cargar la transmisión."
				controlPlayerDisplay = ""
				controlPlayer 'recargar', "fa-refresh" 
				console.error "No se pudo cargar el streaming. Motivo: #{textStatus}" + jqXHR
				console.log jqXHR
				root.realimentarBotonesPlayer()
				false
	else if accion == "recargar" 
		controlPlayerDisplay = ""
		return player 'reproducir' 
	false