
var pantalla_instrumento = {
	show: function(){
		var self = this;
		
		toolbar.custom_toolbar.empty();
		
		self.ui.show();
		
		toolbar.addCustomToolbarButton(	{
            id:'btn_volver',
            parent:pantalla_abm_instrumentos
        });
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
        
		// TODO: un parche, des emparchar (:1_todo_ref:)
		if(typeof(self.height_detail) === "undefined"){
			self.height_detail = self.ui.find('.detail').height();
		}
	},
	
	start: function(){
		var self = this;
		
		self.ui = $('#pantalla_instrumento');	
        
	},
	
	setInstrumento: function(instrumento){
		var self = this;
		
		self.show();
		self.ui.css({
			left: pantalla_abm_instrumentos.ui.width()
		});		
		
		self.ui.animate({
			left: 0
		}, 300, function(){
			$('#titulo').text(instrumento.descripcion);
		});
		
		self.instrumento = instrumento;
        
        self.ui.find("#codigo_instrumento").text(instrumento.codigo);
        self.ui.find("#descripcion_instrumento").text(instrumento.descripcion);
	}
};