
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
        self.lbl_codigo_instrumento = self.ui.find("#lbl_codigo_instrumento");
        self.lbl_descripcion_instrumento = self.ui.find("#lbl_descripcion_instrumento");
        self.txt_codigo_instrumento = self.ui.find("#txt_codigo_instrumento");
        self.txt_descripcion_instrumento = self.ui.find("#txt_descripcion_instrumento");
        
        self.txt_codigo_instrumento.bind('keypress', function(e) {
            var code = e.keyCode || e.which;
            if(code==13){
                self.instrumento.codigo = self.txt_codigo_instrumento.val();
                gestor_instrumentos.modificarInstrumento(self.instrumento);
                self.lbl_codigo_instrumento.text(self.instrumento.codigo);
                self.lbl_codigo_instrumento.show();
                self.txt_codigo_instrumento.hide();
            }
        });
        new Hammer(self.lbl_codigo_instrumento.parent()[0]).on('press', function(ev) {
            self.lbl_codigo_instrumento.hide();
            self.txt_codigo_instrumento.show();
            self.txt_codigo_instrumento.focus();
        });   
        
        
        self.txt_descripcion_instrumento.bind('keypress', function(e) {
            var code = e.keyCode || e.which;
            if(code==13){
                self.instrumento.descripcion = self.txt_descripcion_instrumento.val();
                gestor_instrumentos.modificarInstrumento(self.instrumento);
                self.lbl_descripcion_instrumento.text(self.instrumento.descripcion);
                self.lbl_descripcion_instrumento.show();
                self.txt_descripcion_instrumento.hide();
            }
        });
        new Hammer(self.lbl_descripcion_instrumento.parent()[0]).on('press', function(ev) {
            self.lbl_descripcion_instrumento.hide();
            self.txt_descripcion_instrumento.show();
            self.txt_descripcion_instrumento.focus();
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
			$('#titulo').text(instrumento.descripcion);
		});
		
		self.instrumento = instrumento;
        
        self.lbl_codigo_instrumento.text(instrumento.codigo);
        self.lbl_descripcion_instrumento.text(instrumento.descripcion);
        self.txt_codigo_instrumento.val(instrumento.codigo);
        self.txt_descripcion_instrumento.val(instrumento.descripcion);
	}
};