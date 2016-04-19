var pantalla_lista_mediciones = function() {
	
	var ui = $('#pantalla_lista_mediciones');
	
	/**** custom_toolbar *******/
	ui.find('#share').on('click', function(){
		$('.pantalla').hide();
		$('#pantalla_exportar').show();
	});
	/***************************/
	
	ui.on('show', function(){
		$('#titulo').text('Lista de mediciones');
	});
	
	
	gestor_medicion.onMedicion(function(medicion){
		
		var $medicion_item = $('#plantilla_medicion_item')
							.clone()
							.attr('id', 'medicion_item_' + medicion.index)
							.text( printMedicion(medicion) );
		
		
		ui.find('#lista_mediciones>ul').append($medicion_item);
		
	});
};