var pantalla_lista_mediciones =  $.extend(true, {}, pantalla, {
	buttons:[],
	show: function(){
		var self = this;
		$('#titulo').text('Lista de mediciones');
		toolbar.setCustomToolbarButtons(self.buttons);
		self.ui.show();
	},
	start: function() {
		console.log('-_-_-_-_-_-_pantalla_lista_mediciones.js');
		
		var self = this;
		
		var ui = $('#pantalla_lista_mediciones');
		self.ui = ui;
		
		/**** custom_toolbar *******/
		self.buttons.push(toolbar.invokeButtons.pantalla_medicion);
		self.buttons.push(toolbar.invokeButtons.pantalla_exportar);
		/***************************/
		
		
		gestor_medicion.onMedicion(function(medicion){
			
			var $medicion_item = $('#plantilla_list_item')
								.clone()
								.attr('id', 'medicion_item_' + medicion.index)
								.text( printMedicion(medicion) );
			
			
			ui.find('#lista_mediciones>ul').append($medicion_item);
			
		});
	}
});