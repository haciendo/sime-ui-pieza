var pantalla_abm_tipoPieza = $.extend(true, {}, pantalla, {
	show: function(){
		var self = this;
		
		$('#titulo').text('Piezas');
		
		
		toolbar.custom_toolbar.empty();
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
		
		
		self.refresh();
		self.ui.show();
	},
	start: function(){
		var self = this;
		self.ui = $('#pantalla_abm_tipoPieza');
		
		
		
		
	},
	appendTipoPieza: function(tipoPieza, callback){
		var self = this;
		
		var $tipoPieza_item = $('#plantilla_list_item')
							.clone()
							.attr('id', 'item_' + tipoPieza.id)
							.text( tipoPieza.descripcion );
		
		
		if(!callback){
			callback = function(){
				
				var tipoPieza = datos.tipoPiezas[$(this).attr('id').replace('item_','')];
				
				pantalla_abm_tipoPieza_detalle.setTipoPieza(tipoPieza);
				
				slider.show_right_to_left(pantalla_abm_tipoPieza_detalle, pantalla_abm_tipoPieza, function(){
					$('#titulo').text('Pieza: ' + tipoPieza.descripcion);
				});
				
			};
		}
		
		$tipoPieza_item.on('click', callback);
		
		self.ui.find('.list>ul').append($tipoPieza_item);
		
		
	},
	refresh: function(){
		
		var self = this;
		self.ui.find('.list>ul').empty();
		
		for(key in datos.tipoPiezas){
			var tipoPieza = datos.tipoPiezas[key];
			if(tipoPieza.id == "idTipoPiezaCero") continue;
			self.appendTipoPieza(tipoPieza);
		}
		
		
		self.appendTipoPieza({
			id: '_nuevapieza_',
			descripcion: "+ Agregar una pieza"
		},function(){
			var idTipoPieza = "idTipoPieza" + Math.random()
			
			var tipoPieza = {
				index: Object.keys(datos.tipoPiezas).length,
				id: idTipoPieza,
				descripcion: "nueva pieza",
				cotas:{}
			};
			
			
			if(typeof(datos.tipoPiezas["idTipoPiezaCero"]) != "undefined"){
				delete datos.tipoPiezas["idTipoPiezaCero"];
			};
			
			datos.tipoPiezas[tipoPieza.id] = tipoPieza;
			RepositorioLocal.save();
			self.appendTipoPieza(tipoPieza);
			
			pantalla_abm_tipoPieza_detalle.setTipoPieza(tipoPieza);
			
			slider.show_right_to_left(pantalla_abm_tipoPieza_detalle, pantalla_abm_tipoPieza, function(){
				$('#titulo').text('Pieza: ' + tipoPieza.descripcion);
			});
			
		});

	}
});