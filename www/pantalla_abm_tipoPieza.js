var pantalla_abm_tipoPieza = {
	show: function(){
		var self = this;
		
		$('#titulo').text('Piezas');
		
		
		toolbar.custom_toolbar.empty();
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
		
		
		self.refresh();
		self.ui.show();
	},
	show_left_to_right: function(onEnd_callback){
		
		var self = this;
		self.ui.css({
			left: -1 * $('div.pantalla:visible').first().width(),
			width: $('div.pantalla:visible').first().width()
		});
		
		$('.pantalla').not( "#"+self.ui.attr('id') ).css( "zIndex", 0 );
		self.ui.css( "zIndex", 1 );
		
		
		self.ui.show();
		self.ui.animate({
			left: 0
		}, 300, function(){
			
			if(onEnd_callback) onEnd_callback();
			
			$('.pantalla').not( "#"+self.ui.attr('id') ).hide();
			
			self.show();
		});
		
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
				pantalla_abm_tipoPieza_detalle.show_right_to_left();
				
				
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
			
			datos.tipoPiezas[tipoPieza.id] = tipoPieza;
			RepositorioLocal.save();
			self.appendTipoPieza(tipoPieza);
			
			pantalla_abm_tipoPieza_detalle.setTipoPieza(tipoPieza);
			pantalla_abm_tipoPieza_detalle.show_right_to_left();
		});

	}
};