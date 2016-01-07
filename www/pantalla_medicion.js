var pantalla_medicion = function() {
	
	var ui = $('#pantalla_medicion');
	
	
	/**** custom_toolbar *******/
	ui.find('#btn_lista_mediciones').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_lista_mediciones').show();
	});
	/***************************/
	
	
	
	
	ui.show();
	
	/***********************************************/
	/********************** GESTOS *****************/

	var myElement = document.getElementById('pantalla_medicion');
	
	var mc = new Hammer(myElement);

	mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

	mc.on("swipeleft swiperight", function(ev) {
		//TODO: cambio de pieza
		myElement.textContent = ev.type +"  cambio de pieza.";
	});
	
	mc.on("swipeup swipedown", function(ev) {
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
	
	/***********************************************/
	/***********************************************/
	gestor_medicion.onChangeCota(function(){
		var tipoPieza = ui.find('#tipoPiezaSeleccionada');
		var cotaSeleccionada = ui.find('#cotaSeleccionada');
		var cotaAnterior = ui.find('#cotaAnterior');
		tipoPieza.text("Pieza: " + datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza].descripcion);
		cotaSeleccionada.text("Cota: " + datos.cotaSeleccionada.descripcion);
		if(datos.cotaAnterior){
			cotaAnterior.text("Cota: " + datos.cotaAnterior.descripcion);
		}
	});
	
	
	var TIEMPO_TRANSICION_COTA = 200;
	
	
	gestor_medicion.onMoveCotaNext(function(){
		var cotaSeleccionada = ui.find('#cotaSeleccionada');
		var cotaAnterior = ui.find('#cotaAnterior');
		
		cotaAnterior.show();
		cotaAnterior.css({top: 40, opacity: 0.9});
		
		cotaSeleccionada.css({top: 80, opacity: 0});
		
		
		cotaAnterior.animate({
			top: 0,
			opacity: 0
		}, TIEMPO_TRANSICION_COTA, function(){
			cotaAnterior.hide();
		});
		
		cotaSeleccionada.animate({
			top: 40,
			opacity: 0.9
		}, TIEMPO_TRANSICION_COTA);
		

	});
	gestor_medicion.onMoveCotaPrevious(function(cotaSeleccionada){
		var cotaSeleccionada = ui.find('#cotaSeleccionada');
		var cotaAnterior = ui.find('#cotaAnterior');
		
		cotaAnterior.show();
		
		cotaSeleccionada.css({top: 0, opacity: 0});
		
		cotaAnterior.css({top: 40, opacity: 0.9});
		
		cotaSeleccionada.animate({
			top: 40,
			opacity: 0.9
		}, TIEMPO_TRANSICION_COTA);
		
		cotaAnterior.animate({
			top: 80,
			opacity: 0
		}, TIEMPO_TRANSICION_COTA, function(){
			cotaAnterior.hide();
		});
	});
	
	
	//se selecciona la primer cota
	datos.cotaSeleccionada = datos.cotas[Object.keys(datos.cotas)[0]];
	gestor_medicion.onChangeCota(datos.cotaSeleccionada);
	
	
	
	var dialMedicion = new gui_dial({
		idDial : '#dialMedicion',
		color :'rgb(50,50,50)'
	});
	var dialMedicionTiempoReal = new gui_dial({
		idDial : '#dialMedicionTiempoReal',
		color : 'rgb(255,255,255)'
	});
	
	$(window).on('resize', function(){
		dialMedicion.start();
		dialMedicionTiempoReal.start();
	});
	
	
	gestor_medicion.onMedicionTiempoReal(function(medicion){
		
		
		ui.find('#valorMedicionTiempoReal').text( printMedicion(medicion) );
		
		dialMedicionTiempoReal.setValue(medicion);
		
	});
	gestor_medicion.onMedicion(function(medicion){
		var valorMedicion = ui.find('#valorMedicion');
		
		valorMedicion.text(printMedicion(medicion));
		
		var tipoPiezaMedicion = ui.find('#tipoPiezaMedicion');
		var cotaMedicion =  ui.find('#cotaMedicion');

		
		tipoPiezaMedicion.text("Pieza: " + datos.tipoPiezas[medicion.idTipoPieza].descripcion);
		cotaMedicion.text("Cota: " + datos.cotas[medicion.idCota].descripcion);
		
		
		var color;
		
		if(medicion.valor < datos.cotaSeleccionada.tolMin || medicion.valor > datos.cotaSeleccionada.tolMax){
			color= "rgb(255,0,0)";
		}else{
			color= "rgb(0,255,0)";
		}
		
		dialMedicion.setValue(medicion, color);
		
		
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
			ojetosMedicion.hide();
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
	
};