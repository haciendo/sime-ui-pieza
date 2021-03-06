var mockup_handler_id_setInterval_medicionTiempoReal;
//clearInterval(mockup_handler_id_setInterval_medicionTiempoReal)

$(function(){
	console.log('-_-_-_-_-_-_desarrollo_mockups_celu.js');
	
	/**************************************************
	 * Mock del instrumento 111
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(!window.isphone){
		var iSenoMock = 0
		var empezo_tiempo_real = false;
		$('#marca_sime').on('click', function(){
			var valor = ((Math.sin(iSenoMock/180*Math.PI) * 12) + datos.cotaSeleccionada.base).toFixed(0);
			Vx.send({
				tipoDeMensaje:"medicion",
				instrumento: datos.instrumentos["0"].codigo,
				valor: valor,
				unidad: "mm"
			});
			
            if(!empezo_tiempo_real){
                empezo_tiempo_real = true;
                mockup_handler_id_setInterval_medicionTiempoReal = setInterval(function(){
					
					var valor = ((Math.sin(iSenoMock/180*Math.PI) * 12) + datos.cotaSeleccionada.base).toFixed(0);
					
                    Vx.send({
                        tipoDeMensaje:"medicionTiempoReal",
                        instrumento: datos.instrumentos["0"].codigo,
                        valor: valor,
                        unidad: "mm"
                    });
    
                    // no logea, sería mucho
                    iSenoMock++;
    
                    if(iSenoMock>360){
                        iSenoMock=0;
                    }
    
                }, 10);
            }

		});
	};
	/**************************************************
	 * FIN de Mock de instrumento
	 **************************************************/
	
	
	
	
	
	/**************************************************
	 * Mock del objeto serial
	 * borrar al implementar en phoneGap
	 **************************************************/
	
	if(!window.isphone){
		console.log("mockeando objeto serial");
		serial = {
			open: function(config, success_callback, err_callback){

				console.log("mock - serial.open");

				console.log("config");
				console.log(config);

				success_callback();

			},
			write: function(data, success_callback, err_callback){

				console.log("mock - serial.write");

				console.log("data");
				console.log(data);

				success_callback("success");

			},
			registerReadCallback: function(read_callback, err_callback){
				console.log("mock - serial.registerReadCallback");
			},
			requestPermission: function(success_callback, err_callback){
				console.log("mock - serial.requestPermission");

				success_callback('success');
				
			},
			close: function(success_callback, err_callback){
				console.log("mock - serial.close");

				success_callback('success');
				
			}
		};
	}
	/**************************************************
	 * FIN de Mock de objeto serial
	 **************************************************/
	
	
	/**************************************************
	 * Mock del sistema de archivos en el browser
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(!window.isphone){
		/*GLOBAL*/
		LocalFileSystem = {
			PERSISTENT: 999
		};
		/*/GLOBAL*/
		
		
		
		/*GLOBAL*/
		FileReader = function(){
			//console.log('mock - FileReader()');
		};
		FileReader.prototype = {
			readAsText: function(file){
                var _this = this;
				//console.log('mock - FileReader.readAsText');
				//console.log('-file');
				//console.log(file);
                try{
					setTimeout(function(){_this.onloadend();}, 1);
				}catch(e){
					console.log('Error en setTimeout(function(){_this.onloadend();}, 1);');
				}
			},
            result: localStorage.getItem("DatosSIME")
		};
		
		window.requestFileSystem = function(paramConfig1, paramConfig2, success_callback, err_callback){
			//console.log('mock - window.requestFileSystem');
			
			var fileSystem = {
				root: {
					getFile: function(fileName, opt, success_callback, err_callback){
						//console.log('mock - fileSystem.root.getFile');
						
						var fileEntry = {
							createWriter: function(success_callback, err_callback){
								//console.log('mock - fileEntry.createWriter');
								
								var writer = {
									write: function(text){
										//console.log('mock - writer.write');
										//console.log('-text');
										//console.log(text);
                                        localStorage.setItem("DatosSIME", text);
									}
									
								};
                                setTimeout(function(){success_callback(writer);}, 1);
							},
							file: function(success_callback, err_callback){
								//console.log('mock - fileEntry.file');
								var file = {
									fullPath: '//mock-fileEntry.fullPath//'
								};
								setTimeout(function(){success_callback(file);}, 1);
							},
							remove: function(){
								//console.log('mock - fileEntry.remove');
							}
						};
						
						setTimeout(function(){success_callback(fileEntry);}, 1);
					},
                    toURL: function(){ 
                        return "";
                    }
				}
			};
			
			success_callback(fileSystem);
		};
		
	}

	/**************************************************
	 * FIN de Mock del sistema de archivos
	 **************************************************/
	
	
	
	
	
	/**************************************************
	 * Mock simulador de toma de mediciones en el celu
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(window.isphone){
		/*
		setTimeout(function(){
			// DEBUG
			Vx.send({
				tipoDeMensaje:"medicion",
				valor: 123,
				unidad: "mm"
			});
			Vx.send({
				tipoDeMensaje:"medicion",
				valor: 223,
				unidad: "cm"
			});
			Vx.send({
				tipoDeMensaje:"medicion",
				valor: 323,
				unidad: "mm"
			});
			Vx.send({
				tipoDeMensaje:"medicion",
				valor: 423,
				unidad: "cm"
			});
		}, 3000);
		*/
		
	}
	
	
	/**************************************************
	 * FIN de Mock simulador de toma de mediciones en el celu
	 **************************************************/
	
	/**************************************************
	 * Mock simulador de plugines window.plugins...
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(!window.isphone){
		
		window.plugin = {
			backgroundMode: {
				enable: function(){
					console.log('mock - window.plugins.bagroundMode.enable()');
				},
				disable: function(){
					console.log('mock - window.plugins.bagroundMode.disable()');
				}
			},
			
			socialsharing: {
				share: function(){
					console.log('mock - window.plugins.socialsharing.share()');
					console.log('arguments', arguments);
					
				}
			}
		}
	}
	/**************************************************
	 * FIN de Mock simulador de plugines window.plugins...
	 **************************************************/
	
	
	/**************************************************
	 * Mock simulador de navigator.app.exitApp();
	 * borrar al implementar en phoneGap
	 **************************************************/
	if(!window.isphone){
		navigator.app={
			exitApp: function(){
				location.reload();
			}
		}
	}
	/**************************************************
	 * FIN de Mock simulador de navigator.app.exitApp();
	 **************************************************/
	
	
	
	
});