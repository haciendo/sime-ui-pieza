var toolbar = {
	invokeButtons:{},
	start: function(){
		var self = this;
		
		var ui = $('#toolbar');
		self.ui = ui;
		
		ui.show();
		
		/**** invokeButtons *******/
		var $btn_pantalla_lista_mediciones = $('#plantilla_toolbar_button')
				.clone()
				.attr('id', 'btn_pantalla_lista_mediciones');
		$('body').delegate('#btn_pantalla_lista_mediciones', 'click', function (){
			$('.pantalla').hide();
			pantalla_lista_mediciones.ui.show();
		});
		/*********/
		var $btn_pantalla_exportar = $('#plantilla_toolbar_button')
				.clone()
				.attr('id', 'btn_pantalla_exportar')
		$('body').delegate('#btn_pantalla_exportar', 'click', function (){
			$('.pantalla').hide();
			pantalla_exportar.ui.show();
		});
		/*********/
		var $btn_pantalla_medicion = $('#plantilla_toolbar_button')
				.clone()
				.attr('id', 'btn_pantalla_medicion')
		$('body').delegate('#btn_pantalla_medicion', 'click', function (){
			$('.pantalla').hide();
			pantalla_medicion.ui.show();
		});
		/***************************/
		
		
		
		self.invokeButtons = {
			pantalla_exportar: $btn_pantalla_exportar,
			pantalla_lista_mediciones: $btn_pantalla_lista_mediciones,
			pantalla_medicion: $btn_pantalla_medicion
		}
		/***************************/
		

		
		/*****************************************************/
		var mueveBrillo = function(){
			$('#brillo_toolbar').show();
			$('#brillo_toolbar').css('left', '0px');
			
			$('#brillo_toolbar').animate({
				left: "+=" + ($('#toolbar').width() - $('#brillo_toolbar').width())
				
			}, 1000, "linear", function(){
				$('#brillo_toolbar').hide();
				$('#marca_sime').addClass('iluminado');
				setTimeout(function(){
					$('#marca_sime').removeClass('iluminado');
				}, 500);
				
			});
			
			
		};
		mueveBrillo();
		/*
		setInterval(function(){
			mueveBrillo();
		},20000);
		*/
		/*****************************************************/
		
		
		
		
		var $options = ui.find('#options');
		var $options_list = $('#options_list');
		
		$options.on('click', function(e){
			e.stopPropagation();
			$options_list.show();
		});
		
		$('html').click(function(e) {
			e.stopPropagation();
			$options_list.hide();
		});
		/********* options_list ITEMS ****************/
		
		$options_list.find('#link_salir').on('click', function(){
			cordova.plugins.backgroundMode.disable();
			navigator.app.exitApp();
		});
		
		
		$options_list.find('#link_pantalla_configuracion').on('click', function(){
			$options_list.hide();
			
			$('.pantalla').hide();
			pantalla_configuracion.ui.show();
		});
		
		$options_list.find('#link_pantalla_abm_tipoPieza').on('click', function(){
			$options_list.hide();
			
			$('.pantalla').hide();
			pantalla_abm_tipoPieza.ui.show();
		});
		
		$options_list.find('#link_pantalla_abm_instrumentos').on('click', function(){
			$options_list.hide();
			
			$('.pantalla').hide();
			pantalla_abm_instrumentos.ui.show();
		});
		/*************************/
		
		
		
	},
	setCustomToolbarButtons: function(vec){
		this.ui.find('#custom_toolbar').empty();
		for(i in vec){
			this.addCustomToolbarButton(vec[i]);
		}
	},
	addCustomToolbarButton: function($toolbar_button){
		
		this.ui.find('#custom_toolbar').append($toolbar_button);
		
	}
	
};