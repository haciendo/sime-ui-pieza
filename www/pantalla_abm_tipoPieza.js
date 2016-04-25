var pantalla_abm_tipoPieza = {
	start: function(){
		var pantalla = this;
		var ui = $('#pantalla_abm_tipoPieza');
		pantalla.ui = ui;
		
		ui.on('show', function(){
			
			$('#titulo').text('Piezas');
			
		});
		
		var btn_agregar  = ui.find('.btn_agregar');
		var btn_aceptar  = ui.find('.btn_aceptar');
		var btn_cancelar = ui.find('.btn_cancelar');
		
		btn_agregar.on('click', function(){
			
			ui.find('#descripcion').focus();
		});
		
		
		btn_aceptar.on('click', function(){
			var idTipoPieza = "idTipoPieza" + Math.random()
			
			var tipoPieza = {
				index: Object.keys(datos.tipoPiezas).length,
				id: idTipoPieza,
				descripcion: ui.find('#descripcion').val(),
				cotas:{}
			};
			
			datos.tipoPiezas[tipoPieza.id] = tipoPieza;
			pantalla.appendTipoPieza(tipoPieza);
			
		});
		
		
		pantalla.refresh();
	},
	appendTipoPieza: function(tipoPieza){
		var pantalla = this;
		
		var $tipoPieza_item = $('#plantilla_tipoPieza_item')
							.clone()
							.attr('id', 'item_' + tipoPieza.id)
							.text( tipoPieza.descripcion );
		
		
		
		$tipoPieza_item.on('click', function(){
			
			var tipoPieza = datos.tipoPiezas[$(this).attr('id').replace('item_','')];
			
			pantalla_abm_cota.setTipoPieza(tipoPieza)
			
		});
		
		pantalla.ui.find('.list>ul').append($tipoPieza_item);
		pantalla.ui.find('#descripcion').val('');
		
	},
	refresh: function(){
		var pantalla = this;
		pantalla.ui.find('.list>ul').empty();
		
		for(key in datos.tipoPiezas){
			var tipoPieza = datos.tipoPiezas[key];
			pantalla.appendTipoPieza(tipoPieza);
		}
	}
};