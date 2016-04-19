var pantalla_abm_tipoPieza = function() {
	
	var ui = $('#pantalla_abm_tipoPieza');
	
	ui.on('show', function(){
		
		$('#titulo').text)('Piezas');
		
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
		
		var $tipoPieza_item = $('#plantilla_tipoPieza_item')
							.clone()
							.attr('id', 'item_' + tipoPieza.id)
							.text( tipoPieza.descripcion );
		
		
		
		$tipoPieza_item.on('click', function(){
			
			
			var tipoPieza = datos.tipoPiezas[$(this).attr('id').replace('item_','')];
			
			pantalla_abm_cota.setTipoPieza(tipoPieza)
			
			// TODO: animar slide a izq
			pantalla_abm_cota.ui.show();
			pantalla_abm_cota.ui.css({
				left: ui.width()
			});
			
			
			pantalla_abm_cota.ui.animate({
				left: 0
			}, 200, function(){
				ui.hide();
			});
			
			
		});
		
		ui.find('.list>ul').append($tipoPieza_item);
		ui.find('#descripcion').val('');
	});
	


	ui.show();
	
};