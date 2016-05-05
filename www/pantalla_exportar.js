var pantalla_exportar = {
	buttons:[],
	start: function() {
		var self = this;
		var ui = $('#pantalla_exportar');
		self.ui = ui;
		
		/**** custom_toolbar *******/
		self.buttons.push(toolbar.invokeButtons.pantalla_medicion);
		/***************************/
		
			
		ui.on('show', function(){
			
			self.defaultFileName = 'mediciones'+moment().format('__YYYY_MM_DD_hh_mm_ss') +'.csv';
			ui.find("#fileName").attr('placeholder', self.defaultFileName);
			
			$('#titulo').text('Exportar');
			
			
			
		});
		
		ui.find('#btn_exportar').on('touchstart', function(){
			$(this).addClass( "btn_presionado");
			
			var fileName = ui.find("#fileName").val();
			
			if(fileName==""){
				fileName = self.defaultFileName;
			}
			
			var lineas = _.map(datos.mediciones, function(item){
				return 	item.index 		+ ',' +
						item.fecha		+ ',' +
						item.valor		+ ',' +
						item.unidad;
			});
			
			var miFile = new FileHelper(fileName, function(){
				var self = this;
				
				var sTablaMediciones = lineas.join(';\r\n');
				sTablaMediciones += ';\r\n';
				
				this.write(sTablaMediciones,
					function(){
						window.plugins.socialsharing.share('Archivo generado', 'Archivo de mediciones', self.path);
						ui.find('#btn_exportar').removeClass( "btn_presionado");
					}
				);
			});
			
			
		});
	}
};