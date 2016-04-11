var pantalla_abm_tipoPieza = function() {
	
	var ui = $('#pantalla_abm_tipoPieza');
	
	
	var btn_agregar  = ui.find('.btn_agregar');
	var btn_aceptar  = ui.find('.btn_aceptar');
	var btn_cancelar = ui.find('.btn_cancelar');
	
	btn_agregar.on('click', function(){
		
		ui.find('#descripcion').focus();
	});
	
	
	btn_aceptar.on('click', function(){
		var idTipoPieza = "idTipoPieza" + Math.random()
		var newIndex = 0; // TODO
		
		var tipoPieza = {
			index: newIndex,
			id: idTipoPieza,
			descripcion: ui.find('#descripcion').val(),
			cotas:{}
		};
		
		datos.tipoPiezas[tipoPieza.id] = tipoPieza;
		
		var $tipoPieza_item = $('#plantilla_tipoPieza_item')
							.clone()
							.attr('id', 'item_' + tipoPieza.id)
							.text( tipoPieza.descripcion );
		
		
		
		$tipoPieza_item.on('click', function(){
			
			
			var tipoPieza = datos.tipoPiezas[$(this).attr('id').replace('item_','')];
			
			pantalla_abm_cota.setTipoPieza(tipoPieza)
			
			pantalla_abm_cota.ui.show();
			ui.hide();
			
		});
		
		//TODO: animar slide a izq
		ui.find('.list>ul').append($tipoPieza_item);
		ui.find('#descripcion').val('');
	});
	


	ui.show();
	
};