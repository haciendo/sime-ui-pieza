var pantalla_configuracion =  $.extend(true, {}, pantalla, {
	buttons:[],
	show: function(){
		var self = this;
		$('#titulo').text('Configuración');
		toolbar.setCustomToolbarButtons(self.buttons);
		self.ui.show();
	},
	start: function() {
		var self = this;
		
		var ui = $('#pantalla_configuracion');
		self.ui = ui;
		
		/**** custom_toolbar *******/
		self.buttons.push(toolbar.invokeButtons.pantalla_medicion);
		/***************************/
		
		
		
		
		
	}
});