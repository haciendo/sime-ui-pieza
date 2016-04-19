
var pantalla_abm_cota = {
	start: function(){
		var pantalla = this;
		
		pantalla.ui = $('#pantalla_abm_cota');
		
		
		var ui = $('#pantalla_abm_cota');
		
		
		ui.on('show', function(){
		
			$('#titulo').text)('Cotas');
			
		});
	
		var btn_agregar  = ui.find('.btn_agregar');
		var btn_aceptar  = ui.find('.btn_aceptar');
		var btn_cancelar = ui.find('.btn_cancelar');
		
		btn_agregar.on('click', function(){
			
			ui.find('#descripcion').focus();
		});
		
		
		btn_aceptar.on('click', function(){
			
			var cota = {
				index: Object.keys(datos.tipoPiezas[pantalla.tipoPieza.id].cotas).length,
				id: "idCota" + Math.random(),
				idTipoPieza: pantalla.tipoPieza.id,
				descripcion: pantalla.ui.find('#descripcion').val(),
				base:  1.0 * pantalla.ui.find('#base').val(),
				tolMax: 1.0 * pantalla.ui.find('#tolMax').val(),
				tolMin: 1.0 * pantalla.ui.find('#tolMin').val()
			};
			
			
			datos.tipoPiezas[cota.idTipoPieza].cotas[cota.id] = cota;
			
			pantalla.appendCota(cota);
			
		});
		


		ui.show();
		
		
	},
	appendCota: function(cota){
		var pantalla = this;
		
		var $cota_item = $('#plantilla_cota_item')
						.clone()
						.attr('id', 'item_' + cota.id)
						.text( cota.descripcion );
		
		pantalla.ui.find('.list>ul').append($cota_item);
		
		pantalla.ui.find('#descripcion').val('');
		
	},
	
	setTipoPieza: function(tipoPieza){
		var pantalla = this;
		
		
		pantalla.ui.find('.list>ul').empty();
		
		pantalla.tipoPieza = tipoPieza;
		
		for(key in pantalla.tipoPieza.cotas){
			var cota = pantalla.tipoPieza.cotas[key];
			pantalla.appendCota(cota);
		}
		
	}
};