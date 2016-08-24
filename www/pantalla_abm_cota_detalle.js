
var pantalla_abm_cota_detalle = {
	show: function(){
		var self = this;
		
		toolbar.custom_toolbar.empty();
		
		toolbar.addCustomToolbarButton(	{
            id: 'btn_volver',
            click: function(){
				pantalla_abm_tipoPieza_detalle.show_left_to_right();
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
	show_right_to_left: function(onEnd_callback){
		var self = this;
		self.ui.css({
			left: $('div.pantalla:visible').first().width()
		});
		
		$('.pantalla').not( "#"+self.ui.attr('id') ).css( "zIndex", 0 );
		self.ui.css( "zIndex", 1 );
		
		self.ui.show();
		self.ui.animate({
			left: 0
		}, 300, function(){
			
			if(onEnd_callback) onEnd_callback();
			
			$('#titulo').text('Pieza: ' + self.cota.descripcion);
			
			$('.pantalla').not( "#"+self.ui.attr('id') ).hide();
			self.show();
		});
		
	},
	setCota: function(cota){
		var self = this;
		
		self.cota = cota;
		
		self.ui.find('#descripcion>.lbl_valor_atributo').text(cota.descripcion);
		self.ui.find('#descripcion>.txt_valor_atributo').val(cota.descripcion);
		
		
		
		
	}
};