var pantalla_medicion = function() {
	
	var ui = $('#pantalla_medicion');
	
	
	/**** custom_toolbar *******/
	ui.find('#btn_lista_mediciones').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_lista_mediciones').show();
	});
	/***************************/
	
	
	
	
	//TODO: asignar en el evento apropiado de cambio de cotaSeleccionda, no en el load de la pantalla
	var tipoPieza = ui.find('#cotaSeleccionada>.tipoPieza');
	var cota = ui.find('#cotaSeleccionada>.cota');
	
	tipoPieza.text("Pieza: " + datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza].descripcion);
	cota.text("Cota: " + datos.cotaSeleccionada.descripcion);
	/////
	$('#pantalla_medicion').show();
	
	
	
	
	var dialMedicion = new gui_dial({
		idDial : '#dialMedicion',
		color :'rgb(50,50,50)'
	});
	var dialMedicionTimpoReal = new gui_dial({
		idDial : '#dialMedicionTiempoReal',
		color : 'rgb(255,255,255)'
	});
	
	
	gestor_medicion.onMedicionTiempoReal(function(medicion){
		
		
		ui.find('#valorMedicionTiempoReal').text(medicion.valor + ' ' +  medicion.unidad);
		
		dialMedicionTimpoReal.setValue(medicion);

		
	});
	
	
	gestor_medicion.onMedicion(function(medicion){
		
		var valorMedicion = ui.find('#valorMedicion');
		
		valorMedicion.text(medicion.valor + ' ' +  medicion.unidad);
		
		var cotaMedicion =  ui.find('#cotaMedicion');
		
		cotaMedicion.find('.tipoPieza').text("Pieza: " + datos.tipoPiezas[medicion.idTipoPieza].descripcion);
		cotaMedicion.find('.cota').text("Cota: " + datos.cotas[medicion.idCota].descripcion);
		
		
		var color;
		
		if(medicion.valor < datos.cotaSeleccionada.tolMin || medicion.valor > datos.cotaSeleccionada.tolMax){
			color= "rgb(255,0,0)";
		}else{
			color= "rgb(0,255,0)";
		}
		
		dialMedicion.setValue(medicion, color);
		
		
		var ojetosMedicion = ui.find('#overlay_medicion, #valorMedicion, #cotaMedicion, #dialMedicion');
		
		
		
		/*** ***/
		ojetosMedicion.show();
		ojetosMedicion.css({opacity: 1});
		
		/*** ***/
		
		ojetosMedicion.animate({
			opacity: 0
		}, 4000, function(){
			ojetosMedicion.hide();
		});
		/************************************/
		
		
		var ojetosMedicionTiempoReal = ui.find('#valorMedicionTiempoReal, #dialMedicionTiempoReal');
		var valorMedicionTiempoReal = ui.find('#valorMedicionTiempoReal');
		var cotaSeleccionada = ui.find('#cotaSeleccionada');
		
		ojetosMedicionTiempoReal.css({opacity: 0});
		cotaSeleccionada.css({top: 100, opacity: 0});
		
		
		
		ojetosMedicionTiempoReal.animate({
			opacity: 0.1
		}, 3500);
		cotaSeleccionada.animate({
			opacity: 0.1
		}, 3500);
		
		
		ojetosMedicionTiempoReal.animate({
			opacity: 0.9
		}, 1000);
		cotaSeleccionada.animate({
			top: 5,
			opacity: 0.9
		}, 1000);
		
		
		
		/***********************/
		
		
	});
};