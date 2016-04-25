var RepositorioLocal = {
	save: function(callback){
		var miFile = new FileHelper("_DatosSIME", function(){
			miFile.write(sTablaMediciones,
				function(){
					window.plugins.socialsharing.share('Archivo generado', 'Archivo de mediciones', self.path);
					ui.find('#btn_exportar').removeClass( "btn_presionado");
				}
			);
		});
	},
	load: load(){
		
	}
};