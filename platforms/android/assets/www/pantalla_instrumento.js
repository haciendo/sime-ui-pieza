
var pantalla_instrumento = {
	show: function(){
		var self = this;
		
		toolbar.custom_toolbar.empty();
		
		self.ui.show();
		
		toolbar.addCustomToolbarButton(	{
            id:'btn_volver',
			click: function(){
				$('.pantalla').hide();
				self.show();
			}
		});
		
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
        
	},
	
	start: function(){
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
		
		self.show();
		self.ui.css({
			left: pantalla_abm_instrumentos.ui.width()
		});		
		
		self.ui.animate({
			left: 0
		}, 300, function(){
			$('#titulo').text("Instrumento: " + instrumento.descripcion);
		});
		
		self.instrumento = instrumento;
        
        self.ctrl_codigo.val(instrumento.codigo);
        self.ctrl_descripcion.val(instrumento.descripcion);
	}
};