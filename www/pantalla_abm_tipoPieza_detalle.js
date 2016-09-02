
var pantalla_abm_tipoPieza_detalle =  $.extend(true, {}, pantalla, {
	show: function(){
		var self = this;
		
		
		toolbar.custom_toolbar.empty();
		
		toolbar.addCustomToolbarButton(	{
            id: 'btn_volver',
            click: function(){
				pantalla_abm_tipoPieza.show_left_to_right(function(){
					$('#titulo').text('Piezas');
				});
			}
        });
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
		
		
		
		
		self.ui.show();
		self.refresh();
	},
	
	start: function(){
		var self = this;
		
		self.ui = $('#pantalla_abm_tipoPieza_detalle');
		
		
		self.ctrl_descripcion = new AtributoEditable(self.ui.find("#descripcion"), function(valor_nuevo){
            self.tipoPieza.descripcion = valor_nuevo;
			RepositorioLocal.save();
			
            $('#titulo').text("Pieza: " + self.tipoPieza.descripcion);
        });
		
		
	},
	appendCota: function(cota, callback){
		var self = this;
		
		var $cota_item = $('#plantilla_list_item')
						.clone()
						.attr('id', 'item_' + cota.id)
						.text( cota.descripcion );
		
		
		if(!callback){
			callback = function(){
				
				var cota = datos.tipoPiezas[self.tipoPieza.id].cotas[$(this).attr('id').replace('item_','')];
				
				pantalla_abm_cota_detalle.setCota(cota);
				pantalla_abm_cota_detalle.show_right_to_left(function(){
					$('#titulo').text('Cota: ' + cota.descripcion);
				});
				
				
			};
		}
		
		$cota_item.on('click', callback);
		
		self.ui.find('#cotas>ul').append($cota_item);
		
	},
	setTipoPieza: function(tipoPieza){
		var self = this;
		
		self.tipoPieza = tipoPieza;
		
		self.ctrl_descripcion.val(tipoPieza.descripcion);
		
	},
	
	
	refresh: function(){
		
		var self = this;
		
		self.ui.find('#cotas>ul').empty();
		for(key in self.tipoPieza.cotas){
			var cota = self.tipoPieza.cotas[key];
			if(cota.id == "idCotaCero") continue;
			self.appendCota(cota);
		}
		
		
		self.appendCota({
			id: '_nuevacota_',
			descripcion: "+ Agregar una cota"
		},function(){
			
			
			var cota = {
				index: Object.keys(self.tipoPieza.cotas).length,
				id: "idCota" + Math.random(),
				idTipoPieza: self.tipoPieza.id,
				descripcion: "nueva cota",
				base:  1.0 * self.ui.find('#base').val(),
				tolMax: 1.0 * self.ui.find('#tolMax').val(),
				tolMin: 1.0 * self.ui.find('#tolMin').val()
			};
			
			
			datos.tipoPiezas[cota.idTipoPieza].cotas[cota.id] = cota;
			RepositorioLocal.save();
            
			self.appendCota(cota);
			
			pantalla_abm_cota_detalle.setCota(cota);
			pantalla_abm_cota_detalle.show_right_to_left(function(){
				$('#titulo').text('Cota: ' + cota.descripcion);
			});
		});

	}
	
	
	
	
});