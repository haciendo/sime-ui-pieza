
var pantalla_abm_cota_detalle = $.extend(true, {}, pantalla, {
	show: function(){
		var self = this;
		
		toolbar.custom_toolbar.empty();
		
		toolbar.addCustomToolbarButton(	{
            id: 'pantalla_abm_cota_detalle_btn_volver',
			class: 'btn_volver',
            click: function(){
				slider.show_left_to_right(pantalla_abm_tipoPieza_detalle, pantalla_abm_cota_detalle, function(){
					$('#titulo').text('Pieza: ' + datos.tipoPiezas[self.cota.idTipoPieza].descripcion);
				});
				
			}
        });
		
		
		
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
		
		self.ui.show();
	},
	start: function(){
		
		console.log('-_-_-_-_-_-_pantalla_abm_cota_detalle.js');
		
		var self = this;
		
		
		
		self.ui = $('#pantalla_abm_cota_detalle');
		
		
		self.ctrl_descripcion = new AtributoEditable(self.ui.find("#descripcion"), function(valor_nuevo){
            self.cota.descripcion = valor_nuevo;
			RepositorioLocal.save();
			$('#titulo').text('Pieza: ' + datos.tipoPiezas[self.cota.idTipoPieza].descripcion + ' - Cota: ' + self.cota.descripcion);
        });
		
		self.ctrl_base = new AtributoEditable(self.ui.find("#base"), function(valor_nuevo){
            self.cota.base = parseFloat(valor_nuevo);
			RepositorioLocal.save();
        });
		
		self.ctrl_tolMax = new AtributoEditable(self.ui.find("#tolMax"), function(valor_nuevo){
            self.cota.tolMax = parseFloat(valor_nuevo);
			RepositorioLocal.save();
        });
		
		self.ctrl_tolMin = new AtributoEditable(self.ui.find("#tolMin"), function(valor_nuevo){
            self.cota.tolMin = parseFloat(valor_nuevo);
			RepositorioLocal.save();
        });
	},
	setCota: function(cota){
		var self = this;
		
		self.cota = cota;
		
		self.ctrl_descripcion.val(cota.descripcion);
		self.ctrl_base.val(cota.base);
		self.ctrl_tolMax.val(cota.tolMax);
		self.ctrl_tolMin.val(cota.tolMin);
		
	}
});