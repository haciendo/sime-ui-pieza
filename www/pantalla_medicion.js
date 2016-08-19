var pantalla_medicion = {
	buttons:[],
	dialMedicion: null,
	dialMedicionTiempoReal: null,
	ALTURA_COTA: 41,
	show: function(){
		var self = this;
		$('#titulo').text('Medir');
		
		toolbar.setCustomToolbarButtons(self.buttons);
		setTimeout(function(){
			self.dialMedicion.start();
			self.dialMedicionTiempoReal.start();
		},1);
		
		self.ui.show();
		
	},
	start: function() {
		var self = this;
		
		var ui = $('#pantalla_medicion');
		self.ui = ui;
		/**** custom_toolbar *******/
		self.buttons.push(toolbar.invokeButtons.pantalla_lista_mediciones);
		/***************************/
		
		//se selecciona la primer pieza y primer cota
		var cotas = datos.tipoPiezas[Object.keys(datos.tipoPiezas)[0]].cotas;
		datos.cotaSeleccionada = cotas[Object.keys(cotas)[0]];
		datos.cotaAnterior = datos.cotaSeleccionada;
		
		
		self.dialMedicion = new gui_dial({
			idDial : '#dialMedicion',
			color :'rgb(50,50,50)'
		});
		self.dialMedicionTiempoReal = new gui_dial({
			idDial : '#dialMedicionTiempoReal',
			color : 'rgb(255,255,255)'
		});
		self.dialMedicion.ui.css({opacity: 0});
		
		$(window).on('resize', function(){
			self.dialMedicion.start();
			self.dialMedicionTiempoReal.start();
		});

		//self.dialMedicion.start();
		//self.dialMedicionTiempoReal.start();
		
		
		/***********************************************/
		/********************** GESTOS *****************/

		var overlay_swipe_izquierda = document.getElementById('overlay_swipe_izquierda');
		
		var gestos_izquierda = new Hammer(overlay_swipe_izquierda);

		gestos_izquierda.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

		gestos_izquierda.on("swipeleft swiperight", function(ev) {
			if( $('#cotaSeleccionada').is(':animated') ) {
				return
			}
			
			if(ev.type=="swipeleft"){
				gestor_medicion.moveTipoPiezaNext();
			}
			if(ev.type=="swiperight"){
				gestor_medicion.moveTipoPiezaPrevious();
			}
		});
		
		gestos_izquierda.on("swipeup swipedown", function(ev) {
			if( $('#cotaSeleccionada').is(':animated') ) {
				return
			}
			
			if(ev.type=="swipeup"){
				gestor_medicion.moveCotaNext();
			}
			if(ev.type=="swipedown"){
				gestor_medicion.moveCotaPrevious();
			}

		});
        
        var overlay_swipe_derecha = document.getElementById('overlay_swipe_derecha');
		
		var gestos_derecha = new Hammer(overlay_swipe_izquierda);

		gestos_derecha.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

		gestos_derecha.on("swipeup swipedown", function(ev) {
			if( $('#instrumentoSeleccionado').is(':animated') ) {
				return
			}
			
			if(ev.type=="swipeup"){
				gestor_instrumentos.moveInstrumentoNext();
			}
			if(ev.type=="swipedown"){
				gestor_instrumentos.moveInstrumentoPrevious();
			}

		});
		
		/***********************************************/
		/***********************************************/
		gestor_medicion.onChangeCota(function(_cotaSeleccionada){
			var tipoPiezaSeleccionada = ui.find('#tipoPiezaSeleccionada');
			var tipoPiezaAnterior = ui.find('#tipoPiezaAnterior');
			
			var cotaSeleccionada = ui.find('#cotaSeleccionada');
			var cotaAnterior = ui.find('#cotaAnterior');
			
			
			tipoPiezaSeleccionada.text("Pieza: " + datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza].descripcion);
			cotaSeleccionada.text("Cota: " + datos.cotaSeleccionada.descripcion);
			
			if(datos.cotaAnterior){
				cotaAnterior.text("Cota: " + datos.cotaAnterior.descripcion);
				tipoPiezaAnterior.text("Pieza: " + datos.tipoPiezas[datos.cotaAnterior.idTipoPieza].descripcion);
			}else{
				console.log('###ERROR###');
			}
		});
		
		
		var TIEMPO_TRANSICION_COTA = 400;
		var TIEMPO_TRANSICION_TIPOPIEZA = 600;
		
		
		gestor_medicion.onMoveCotaNext(function(){
			var cotaSeleccionada = ui.find('#cotaSeleccionada');
			var cotaAnterior = ui.find('#cotaAnterior');
			cotaAnterior.show();
			
			cotaAnterior.css({top: self.ALTURA_COTA, left: 5,  opacity: 0.9});
			
			cotaSeleccionada.css({top: ui.height() - 100, left: 5, opacity: 0});
			
			
			cotaAnterior.animate({
				top: 0,
				opacity: 0
			}, TIEMPO_TRANSICION_COTA, function(){
				cotaAnterior.hide();
			});
			
			cotaSeleccionada.animate({
				top: self.ALTURA_COTA,
				opacity: 0.9
			}, TIEMPO_TRANSICION_COTA);
			

		});
		
		
		gestor_medicion.onMoveCotaPrevious(function(_cotaSeleccionada){
			var cotaSeleccionada = ui.find('#cotaSeleccionada');
			var cotaAnterior = ui.find('#cotaAnterior');
			
			cotaAnterior.show();
			
			cotaAnterior.css({top: self.ALTURA_COTA, left: 5, opacity: 0.9});
			
			cotaSeleccionada.css({top: 0, left: 5, opacity: 0});
			
			cotaSeleccionada.animate({
				top: self.ALTURA_COTA,
				opacity: 0.9
			}, TIEMPO_TRANSICION_COTA);
			
			cotaAnterior.animate({
				top: ui.height() - 100,
				opacity: 0
			}, TIEMPO_TRANSICION_COTA, function(){
				cotaAnterior.hide();
			});
		});
		
		
		
		
		gestor_medicion.onMoveTipoPiezaNext(function(){
			var tipoPiezaSeleccionada = ui.find('#tipoPiezaSeleccionada, #cotaSeleccionada');
			var tipoPiezaAnterior = ui.find('#tipoPiezaAnterior, #cotaAnterior');
			
			
			tipoPiezaAnterior.show();
			ui.find('#cotaAnterior').css({top: self.ALTURA_COTA});
			ui.find('#cotaSeleccionada').css({top: self.ALTURA_COTA});
			tipoPiezaAnterior.css({left: 5, opacity: 0.9});
			
			tipoPiezaSeleccionada.css({left: ui.width(), opacity: 0});
			
			
			
			tipoPiezaAnterior.animate({
				left: -tipoPiezaAnterior.width(),
				opacity: 0
			}, TIEMPO_TRANSICION_TIPOPIEZA, function(){
				tipoPiezaAnterior.hide();
			});
			
			
			tipoPiezaSeleccionada.animate({
				left: 5,
				opacity: 0.9
			}, TIEMPO_TRANSICION_TIPOPIEZA);
			
		});
		gestor_medicion.onMoveTipoPiezaPrevious(function(_cotaSeleccionada){
			var tipoPiezaSeleccionada = ui.find('#tipoPiezaSeleccionada, #cotaSeleccionada');
			var tipoPiezaAnterior = ui.find('#tipoPiezaAnterior, #cotaAnterior');
			
			tipoPiezaAnterior.show();
			ui.find('#cotaAnterior').css({top: self.ALTURA_COTA});
			ui.find('#cotaSeleccionada').css({top: self.ALTURA_COTA});
			
			tipoPiezaAnterior.css({left: 5, opacity: 0.9});
			
			tipoPiezaSeleccionada.css({left: -tipoPiezaAnterior.width(), opacity: 0});
			
			
			
			tipoPiezaAnterior.animate({
				left: ui.width(),
				opacity: 0
			}, TIEMPO_TRANSICION_TIPOPIEZA, function(){
				tipoPiezaAnterior.hide();
			});
			
			
			tipoPiezaSeleccionada.animate({
				left: 5,
				opacity: 0.9
			}, TIEMPO_TRANSICION_TIPOPIEZA);
		});
		

		gestor_medicion.onChangeCota(datos.cotaSeleccionada);
		
		
		

		
		gestor_medicion.onMedicionTiempoReal(function(medicion){
			
			
			ui.find('#valorMedicionTiempoReal').text( printMedicion(medicion) );
			
			self.dialMedicionTiempoReal.setValue(medicion);
			
		});
		gestor_medicion.onMedicion(function(medicion){
			var valorMedicion = ui.find('#valorMedicion');
			
			valorMedicion.text(printMedicion(medicion));
			
			var tipoPiezaMedicion = ui.find('#tipoPiezaMedicion');
			var cotaMedicion =  ui.find('#cotaMedicion');

			
			tipoPiezaMedicion.text("Pieza: " + datos.tipoPiezas[medicion.idTipoPieza].descripcion);
			cotaMedicion.text("Cota: " + datos.tipoPiezas[medicion.idTipoPieza].cotas[medicion.idCota].descripcion);
			
			
			var color;
			
			if(medicion.valor < datos.cotaSeleccionada.tolMin || medicion.valor > datos.cotaSeleccionada.tolMax){
				color= "rgb(255,0,0)";
			}else{
				color= "rgb(0,255,0)";
			}
			
			self.dialMedicion.setValue(medicion, color);
			
			
			var ojetosMedicion = ui.find('#overlay_medicion, #valorMedicion, #cotaMedicion, #tipoPiezaMedicion, #dialMedicion');
			
			
			
			/////////////////////////////////////////
			ojetosMedicion.show();
			ojetosMedicion.css({opacity: 1});
			
            
			//////////////////////////////////////////
			ojetosMedicion.animate({
				opacity: 0.8
			}, 3000);
			ojetosMedicion.animate({
				opacity: 0
			}, 1000, function(){
				//ojetosMedicion.hide();
			});
			/////////////////////////////////
			
			
			var ojetosMedicionTiempoReal = ui.find('#valorMedicionTiempoReal, #dialMedicionTiempoReal, #cotaAnterior, #tipoPiezaSeleccionada');
			ojetosMedicionTiempoReal.css({opacity: 0});
			
			
			ojetosMedicionTiempoReal.animate({
				opacity: 0.1
			}, 3500);
			
			
			ojetosMedicionTiempoReal.animate({
				opacity: 0.9
			}, 1000);
			
			
			
			/////////////////////////////////////////////////////////
			ui.find('#cotaSeleccionada').animate({
				opacity: 0
			}, 4500);
			
		});
		
		/****** BOTON_MEDIR ************/
		
		
		var iSenoMock = 0
		var empezo_tiempo_real = false;
		ui.find('#superficieClick').click(function(){
			Vx.send({
				tipoDeMensaje:"medicion",
				instrumento: gestor_medicion.instrumentoSuscripto.codigo,
				valor: ((Math.sin(iSenoMock/180*Math.PI) * 12) + datos.cotaSeleccionada.base).toFixed(0),
				unidad: "mm"
			});
			
            if(!empezo_tiempo_real){
                empezo_tiempo_real = true;
                mockup_handler_id_setInterval_medicionTiempoReal = setInterval(function(){		
    
                    Vx.send({
                        tipoDeMensaje:"medicionTiempoReal",
                        instrumento: gestor_medicion.instrumentoSuscripto.codigo,
                        valor: ((Math.sin(iSenoMock/180*Math.PI) * 12) + datos.cotaSeleccionada.base).toFixed(0),
                        unidad: "mm"
                    });
    
                    // no logea, sería mucho
                    iSenoMock++;
    
                    if(iSenoMock>360){
                        iSenoMock=0;
                    }
    
                }, 10);
            }

		});
		
		
	}
	
};