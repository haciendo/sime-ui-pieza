var toolbar = {
	invokeButtons:{},
	start: function(){
		var self = this;
		
		var ui = $('#toolbar');
		self.ui = ui;
		
		self.custom_toolbar = ui.find('#custom_toolbar');

		
		/**** invokeButtons *******/
		self.invokeButtons = {
			pantalla_lista_mediciones: {
				id: 'btn_pantalla_lista_mediciones',
				click: function(){
					$('.pantalla').hide();
					pantalla_lista_mediciones.show();
				}
			},
			pantalla_exportar: {
				id: 'btn_pantalla_exportar',
				click: function(){
					$('.pantalla').hide();
					pantalla_exportar.show();
				}
			},
			pantalla_medicion: {
				id: 'btn_pantalla_medicion',
				click: function(){
					$('.pantalla').hide();
					pantalla_medicion.show();
				}
			}
		}
		
		/*********/
		
		
		
		
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
			pantalla_configuracion.show();
		});
		
		$options_list.find('#link_pantalla_abm_tipoPieza').on('click', function(){
			$options_list.hide();
			$('.pantalla').hide();
			pantalla_abm_tipoPieza.show();
		});
		
		$options_list.find('#link_pantalla_abm_instrumentos').on('click', function(){
			$options_list.hide();
			
			$('.pantalla').hide();
			pantalla_abm_instrumentos.show();
		});
		/*************************/
		
		
		
	},
	setCustomToolbarButtons: function(vec){
		var self = this;
		self.custom_toolbar.empty();
		self.addCustomToolbarButtons(vec);
	},
	addCustomToolbarButton: function(opt){
		var self = this;
		var $toolbar_button = $('#plantilla_toolbar_button')
				.clone()
				.attr('id', opt.id);
				
				
		if(typeof(opt.class) !== "undefined"){
			$toolbar_button.addClass(opt.class);
		}
		
		if(typeof(opt.click) !== "undefined"){
			$('body').delegate('#'+opt.id, 'click', opt.click);
		}
		
		
		this.ui.find('#custom_toolbar').append($toolbar_button);
		
	},
	addCustomToolbarButtons: function(vec){
		for(i in vec){
			this.addCustomToolbarButton(vec[i]);
		}
	}
};