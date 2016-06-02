
var pantalla_abm_cota = {
	show: function(){
		var self = this;
		
		var aceptar_callback = function(){
			var cota = {
				index: Object.keys(datos.tipoPiezas[self.tipoPieza.id].cotas).length,
				id: "idCota" + Math.random(),
				idTipoPieza: self.tipoPieza.id,
				descripcion: self.ui.find('#descripcion').val(),
				base:  1.0 * self.ui.find('#base').val(),
				tolMax: 1.0 * self.ui.find('#tolMax').val(),
				tolMin: 1.0 * self.ui.find('#tolMin').val()
			};
			
			
			datos.tipoPiezas[cota.idTipoPieza].cotas[cota.id] = cota;
			RepositorioLocal.save();
            
			self.appendCota(cota);
		};
		var agregar_callback = function(){
			self.ui.find('#descripcion').focus();
		};
		
		

		toolbar.custom_toolbar.empty();
		toolbar.addCrudButtons({
			parent: self,
			aceptar_callback: aceptar_callback,
			agregar_callback: agregar_callback
		});

		self.ui.show();
		
		//TODO: un parche, des emparchar
		if(typeof(self.height_detail) === "undefined"){
			self.height_detail = self.ui.find('.detail').height();
		}

	},
	
	start: function(){
		var self = this;
		
		self.ui = $('#pantalla_abm_cota');
		
		
		self.ui.find('#tipoPieza_descripcion').on('click', function(){
			
			self.ui.css({
				left: 0
			});
			
			pantalla_abm_tipoPieza.ui.show();
			
			self.ui.animate({
				left: self.ui.width()
			}, 300, function(){
				self.ui.hide();
				pantalla_abm_tipoPieza.show();
			});
		});
		
		
	},
	appendCota: function(cota){
		var self = this;
		
		var $cota_item = $('#plantilla_cota_item')
						.clone()
						.attr('id', 'item_' + cota.id)
						.text( cota.descripcion );
		
		self.ui.find('.list>ul').append($cota_item);
		
	},
	
	setTipoPieza: function(tipoPieza){
		var self = this;
		
		self.show();
		self.ui.css({
			left: pantalla_abm_tipoPieza.ui.width()
		});
		
		
		self.ui.animate({
			left: 0
		}, 300, function(){
			pantalla_abm_tipoPieza.ui.hide();
			$('#titulo').text('Cotas');
		});
		
		
		self.ui.find('.list>ul').empty();
		self.ui.find('#tipoPieza_descripcion').text('Pieza: ' + tipoPieza.descripcion);
		
		self.tipoPieza = tipoPieza;
		
		for(key in self.tipoPieza.cotas){
			var cota = self.tipoPieza.cotas[key];
			self.appendCota(cota);
		}
	}
};