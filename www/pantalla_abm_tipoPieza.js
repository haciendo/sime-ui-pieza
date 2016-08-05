var pantalla_abm_tipoPieza = {
	show: function(){
		var self = this;
		
		var aceptar_callback = function(){
			var idTipoPieza = "idTipoPieza" + Math.random()
			
			var tipoPieza = {
				index: Object.keys(datos.tipoPiezas).length,
				id: idTipoPieza,
				descripcion: self.ui.find('#descripcion').val(),
				cotas:{}
			};
			
			datos.tipoPiezas[tipoPieza.id] = tipoPieza;
			RepositorioLocal.save();
			self.appendTipoPieza(tipoPieza);
		};
		var agregar_callback = function(){
			self.ui.find('#descripcion').focus();
		};
		
		$('#titulo').text('Piezas');
		
		
		
		
		/*
		toolbar.custom_toolbar.empty();
		toolbar.addCrudButtons({
			parent: self,
			aceptar_callback: aceptar_callback,
			agregar_callback: agregar_callback
		});
		*/
		
		
		
		
		
		self.ui.show();
		
		toolbar.addCustomToolbarButton(	toolbar.invokeButtons.pantalla_medicion	);
		
		// TODO: un parche, des emparchar (:1_todo_ref:)
		if(typeof(self.height_detail) === "undefined"){
			self.height_detail = self.ui.find('.detail').height();
		}
		
		self.refresh();
	},
	start: function(){
		var self = this;
		self.ui = $('#pantalla_abm_tipoPieza');
		
	},
	appendTipoPieza: function(tipoPieza){
		var self = this;
		
		var $tipoPieza_item = $('#plantilla_tipoPieza_item')
							.clone()
							.attr('id', 'item_' + tipoPieza.id)
							.text( tipoPieza.descripcion );
		
		
		
		$tipoPieza_item.on('click', function(){
			
			var tipoPieza = datos.tipoPiezas[$(this).attr('id').replace('item_','')];
			
			pantalla_abm_tipoPieza_detalle.setTipoPieza(tipoPieza)
			
			
			
		});
		
		self.ui.find('.list>ul').append($tipoPieza_item);
		
		
	},
	refresh: function(){
		var self = this;
		self.ui.find('.list>ul').empty();
		
		for(key in datos.tipoPiezas){
			var tipoPieza = datos.tipoPiezas[key];
			self.appendTipoPieza(tipoPieza);
		}
	}
};