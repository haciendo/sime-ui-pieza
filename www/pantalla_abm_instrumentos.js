var pantalla_abm_instrumentos = function() {
	var self = this;
	var ui = $('#pantalla_abm_instrumentos');
	var txt_codigo = ui.find('#codigo');
	var txt_descripcion = ui.find('#descripcion');
	
    var lista_instrumentos = ui.find('#lista_instrumentos ul');
    
	ui.on('show', function(){		
		$('#titulo').text('Instrumentos');		
	});

	
	var btn_agregar  = ui.find('.btn_agregar');
	var btn_aceptar  = ui.find('.btn_aceptar');
	var btn_cancelar = ui.find('.btn_cancelar');
	
	btn_agregar.on('click', function(){		
		ui.find('#codigo').focus();
	});
	
	var agregarInstrumentoEnPantalla = function(instrumento){
		var $instrumento_item = $('#plantilla_instrumento_item')
							.clone()
							.attr('id', 'item_' + instrumento.codigo)
							.text( instrumento.descripcion );
	
		ui.find('.list>ul').append($instrumento_item);			
	};
	
	btn_aceptar.on('click', function(){		
        var instrumento = gestor_instrumentos.addInstrumento(txt_codigo.val(), txt_descripcion.val());   
        txt_codigo.val("");
				
		agregarInstrumentoEnPantalla(instrumento);
		txt_codigo.val('');
		txt_descripcion.val('');
	});
	
	_.each(datos.instrumentos, function(instrumento){
		agregarInstrumentoEnPantalla(instrumento);
	});
};