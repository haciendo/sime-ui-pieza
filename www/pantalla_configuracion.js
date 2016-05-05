var pantalla_configuracion = {
	buttons:[],
	start: function() {
		
		var self = this;
		var ui = $('#pantalla_configuracion');
		self.ui = ui;
		
		/**** custom_toolbar *******/
		self.buttons.push(toolbar.invokeButtons.pantalla_medicion);
		/***************************/
		
		
		
		
		
		ui.on('show', function(){
			$('#titulo').text('Configuración');
			toolbar.setCustomToolbarButtons(self.buttons);
		});
	}
};