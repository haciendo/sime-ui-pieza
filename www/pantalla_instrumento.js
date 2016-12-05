
var pantalla_instrumento =  $.extend(true, {}, pantalla, {
	show: function(){
		var self = this;
		
		toolbar.custom_toolbar.empty();
		
		self.ui.show();
		
		toolbar.addCustomToolbarButton(	{
            id: 'pantalla_instrumento_btn_volver',
			class: 'btn_volver',
            click: function(){
				
				slider.show_left_to_right(pantalla_abm_instrumentos, pantalla_instrumento);
			}
		});
		
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
        
	},
	
	start: function(){
		console.log('-_-_-_-_-_-_pantalla_instrumento.js');
		
		var self = this;
		
		self.ui = $('#pantalla_instrumento');
        
        self.ctrl_codigo = new AtributoEditable(self.ui.find("#codigo_instrumento"), function(valor_nuevo){
            self.instrumento.codigo = valor_nuevo;
            gestor_instrumentos.modificarInstrumento(self.instrumento);
        });
        
        self.ctrl_descripcion = new AtributoEditable(self.ui.find("#descripcion_instrumento"), function(valor_nuevo){
            self.instrumento.descripcion = valor_nuevo;
            gestor_instrumentos.modificarInstrumento(self.instrumento);
            $('#titulo').text("Instrumento: " + instrumento.descripcion);
        });
	},
	
	setInstrumento: function(instrumento){
		var self = this;
		
		
		slider.show_right_to_left(pantalla_instrumento, pantalla_abm_instrumentos, function(){
			$('#titulo').text("Instrumento: " + instrumento.descripcion);
		});
		
		
		self.instrumento = instrumento;
        
        self.ctrl_codigo.val(instrumento.codigo);
        self.ctrl_descripcion.val(instrumento.descripcion);
	}
});