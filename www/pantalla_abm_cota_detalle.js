
var pantalla_abm_cota_detalle = $.extend(true, {}, pantalla, {
	show: function(){
		var self = this;
		
		toolbar.custom_toolbar.empty();
		
		toolbar.addCustomToolbarButton(	{
            id: 'btn_volver',
            click: function(){
				pantalla_abm_tipoPieza_detalle.show_left_to_right(function(){
					
					$('#titulo').text('Pieza: ' + datos.tipoPiezas[self.cota.idTipoPieza].descripcion);
					
				});
			}
        });
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
		
		self.ui.show();
	},
	start: function(){
		var self = this;
		
		self.ui = $('#pantalla_abm_cota_detalle');
		
		
		self.ctrl_descripcion = new AtributoEditable(self.ui.find("#descripcion"), function(valor_nuevo){
            self.cota.descripcion = valor_nuevo;
			RepositorioLocal.save();
			
            $('#titulo').text("Cota: " + self.cota.descripcion);
        });
		
		self.ctrl_base = new AtributoEditable(self.ui.find("#base"), function(valor_nuevo){
            self.cota.base = valor_nuevo;
			RepositorioLocal.save();
        });
		
		self.ctrl_tolMax = new AtributoEditable(self.ui.find("#tolMax"), function(valor_nuevo){
            self.cota.tolMax = valor_nuevo;
			RepositorioLocal.save();
        });
		
		self.ctrl_tolMin = new AtributoEditable(self.ui.find("#tolMin"), function(valor_nuevo){
            self.cota.tolMin = valor_nuevo;
			RepositorioLocal.save();
        });
	},
	setCota: function(cota){
		var self = this;
		
		self.cota = cota;
		
		self.ui.find('#descripcion>.lbl_valor_atributo').text(cota.descripcion);
		self.ui.find('#descripcion>.txt_valor_atributo').val(cota.descripcion);
		
		
		
		
	}
});