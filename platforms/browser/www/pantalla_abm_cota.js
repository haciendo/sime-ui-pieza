
var pantalla_abm_cota = {
	start: function(){
		var pantalla = this;
		
		pantalla.ui = $('#pantalla_abm_cota');
		
		
		var ui = $('#pantalla_abm_cota');
		
		
		ui.find('.btn_agregar').on('click', function(){
			
			ui.find('#descripcion').focus();
		});
		
		
		ui.find('.btn_aceptar').on('click', function(){
			
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
		
		pantalla.ui.find('#tipoPieza_descripcion').on('click', function(){
			pantalla.ui.css({
				left: 0
			});
			
			
			pantalla.ui.animate({
				left: ui.width()
			}, 300, function(){
				pantalla.ui.hide();
				pantalla_abm_tipoPieza.ui.show();
			});
		});
		
		
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
		
		pantalla.ui.show();
		pantalla.ui.css({
			left: pantalla_abm_tipoPieza.ui.width()
		});
		
		
		pantalla.ui.animate({
			left: 0
		}, 300, function(){
			pantalla_abm_tipoPieza.ui.hide();
			$('#titulo').text('Cotas');
		});
		
		
		pantalla.ui.find('.list>ul').empty();
		pantalla.ui.find('#tipoPieza_descripcion').text('Pieza: ' + tipoPieza.descripcion);
		
		pantalla.tipoPieza = tipoPieza;
		
		for(key in pantalla.tipoPieza.cotas){
			var cota = pantalla.tipoPieza.cotas[key];
			pantalla.appendCota(cota);
		}
	}
};