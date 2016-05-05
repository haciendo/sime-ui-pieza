var pantalla_lista_mediciones = {
	buttons:[],
	start: function() {
		var self = this;
		
		var ui = $('#pantalla_lista_mediciones');
		self.ui = ui;
		
		/**** custom_toolbar *******/
		self.buttons.push(toolbar.invokeButtons.pantalla_medicion);
		self.buttons.push(toolbar.invokeButtons.pantalla_exportar);
		/***************************/
		
		
		
		
		
		ui.on('show', function(){
			$('#titulo').text('Lista de mediciones');
			toolbar.setCustomToolbarButtons(self.buttons);
		});
		
		
		gestor_medicion.onMedicion(function(medicion){
			
			var $medicion_item = $('#plantilla_medicion_item')
								.clone()
								.attr('id', 'medicion_item_' + medicion.index)
								.text( printMedicion(medicion) );
			
			
			ui.find('#lista_mediciones>ul').append($medicion_item);
			
		});
	}
};