
var pantalla_abm_tipoPieza_detalle =  $.extend(true, {}, pantalla, {
	show: function(){
		var self = this;
		
		
		toolbar.custom_toolbar.empty();
		
		toolbar.addCustomToolbarButton(	{
            id: 'pantalla_abm_tipoPieza_detalle_btn_volver',
			class: 'btn_volver',
            click: function(){
				slider.show_left_to_right(pantalla_abm_tipoPieza, pantalla_abm_tipoPieza_detalle);
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
				
				var tipoPieza = datos.tipoPiezas[self.tipoPieza.id];
				
				var cota = tipoPieza.cotas[$(this).attr('id').replace('item_','')];
				
				pantalla_abm_cota_detalle.setCota(cota);
				
				slider.show_right_to_left(pantalla_abm_cota_detalle, pantalla_abm_tipoPieza_detalle, function(){
					$('#titulo').text('Pieza: ' + tipoPieza.descripcion + ' - Cota: ' + cota.descripcion);
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
				base:  0,
				tolMax: 0,
				tolMin: 0
			};
			
			
			datos.tipoPiezas[cota.idTipoPieza].cotas[cota.id] = cota;
			RepositorioLocal.save();
            
			
			if(datos.cotaSeleccionada.id == "idCota0"){
				datos.cotaSeleccionada = cota;
				datos.cotaAnterior = cota;
				
				gestor_medicion.onChangeCota(datos.cotaSeleccionada);
			}
			
			self.appendCota(cota);
			
			pantalla_abm_cota_detalle.setCota(cota);
			pantalla_abm_cota_detalle.show_right_to_left(function(){
				$('#titulo').text('Cota: ' + cota.descripcion);
			});
		});

	}
	
	
	
	
});