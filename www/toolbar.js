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
				parent: pantalla_lista_mediciones
			},
			pantalla_exportar: {
				id: 'btn_pantalla_exportar',
				parent: pantalla_exportar
			},
			pantalla_medicion: {
				id: 'btn_pantalla_medicion',
				parent: pantalla_medicion
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
		/*
		/// TODO: SE COMENTA: refactorizar el llamado a esta opción
		
		}else{
			$('body').delegate('#'+opt.id, 'click', function (){
				$('.pantalla').hide();
				opt.parent.show();
			});
		*/
		}
		
		
		this.ui.find('#custom_toolbar').append($toolbar_button);
		
	},
	addCustomToolbarButtons: function(vec){
		for(i in vec){
			this.addCustomToolbarButton(vec[i]);
		}
	},
	addCrudButtons: function(opt){
		var self = this;
		this.addCustomToolbarButton({
			id: opt.parent.ui.attr('id') + '_btn_agregar',
			parent: opt.parent,
			class: 'btn_agregar',
			click: function(e){
				var ui = opt.parent.ui;
				
				ui.find('.detail').css({
					height: 0
				});
				ui.find('.overlay').css({
					opacity: 0
				});
				// TODO: se puede calcular el opt.parent.height_detail en base a la cantidad de campos (:1_todo_ref:)
				
				ui.find('.detail').show();
				ui.find('>.overlay').show();
				
				ui.find('.detail').animate({
					height: opt.parent.height_detail
				}, 200);
				ui.find('.overlay').animate({
					opacity: 0.6
				}, 200);
				
				
				
				self.custom_toolbar.find('.btn_agregar').hide();
				self.custom_toolbar.find('.btn_aceptar').show();
				self.custom_toolbar.find('.btn_cancelar').show();
				
				
				opt.agregar_callback();
			}
		});
		
		
		// TODO: asignarle a todos el enter que haga el foco al siguiente
		// TODO: buscar último item de los li y asignarle el evento enter para que haga click en aceptar
		
		
		
		var ocultar =  function(){
			var ui = opt.parent.ui;
			
			ui.find('.detail').animate({
				height: 0
			}, 200, function(){
				ui.find('.detail').hide();
			});
			
			
			ui.find('.overlay').animate({
				opacity: 0
			}, 200, function(){
				ui.find('.overlay').hide();
			});
			
			
			self.custom_toolbar.find('.btn_agregar').show();
			self.custom_toolbar.find('.btn_aceptar').hide();
			self.custom_toolbar.find('.btn_cancelar').hide();
			
		};
		
		
		this.addCustomToolbarButton({
			id: opt.parent.ui.attr('id') + '_btn_aceptar',
			parent: opt.parent,
			class: 'btn_aceptar',
			click: function(){
				ocultar();
				opt.aceptar_callback();
				opt.parent.ui.find('>.detail>ul>li.input_field input').val('');
				
			}
		});
		
		this.addCustomToolbarButton({
			id: opt.parent.ui.attr('id') + '_btn_cancelar',
			parent: opt.parent,
			class: 'btn_cancelar',
			click: function(){
				ocultar();
			}
		});
		
		
		self.custom_toolbar.find('.btn_aceptar').hide();
		self.custom_toolbar.find('.btn_cancelar').hide();
		
	}
	
};