$(function(){
	
	console.log('-_-_-_-_-_-_adaptador_usb.js');
	
	var buffer_entrada_serie = "";
	var abrirPuertoSerie = function(){
		serial.open (
			{baudRate: 115200},
			
			
			function(successMessage) {
				console.log("puerto serie abierto:", successMessage);
				
				/*
				serial.write(
					"1",
					function(successMessage) {
						console.log(successMessage);
					},
					function(err){
						console.log("error al enviar por puerto serie:", err);
					}
				);	
				*/
			
				serial.registerReadCallback(
					function(data){
						if(_.isString(data)) dataString = data;
						else{
							var dataArray = new Uint8Array(data);
							var dataString = String.fromCharCode.apply(null, dataArray);
						}
						
						buffer_entrada_serie += dataString;
						var mensajes_en_buffer = buffer_entrada_serie.split(/\r?\n/);
						for(var i=0; i<mensajes_en_buffer.length-1; i++){
							
							var sep = " ";
							
							var _tipoDeMensaje;
							if(mensajes_en_buffer[i].split(sep)[2]=="tr"){
								_tipoDeMensaje = "medicionTiempoReal";
							}else{
								_tipoDeMensaje = "medicion";
							}
							
							Vx.send({
								tipoDeMensaje: _tipoDeMensaje,
								valor: mensajes_en_buffer[i].split(sep)[0],
								unidad: mensajes_en_buffer[i].split(sep)[1]
							});
							
						}
						buffer_entrada_serie = mensajes_en_buffer[mensajes_en_buffer.length-1];
						
					},
					function(err){
						console.log("error al registrar callback:", err);
					}
				);
			},
			
			
			function(err){
				console.log("error al abrir puerto serie:", err);
			}
		);
	};
	
	var pedirPermisoParaUsarSerie = function(){
		console.log("pido permiso para usar serie...");
		serial.requestPermission(
			 function(successMessage) {
				console.log("permiso concedido para usar puerto serie:", successMessage);
				serial.close(function(){
					console.log("puerto serie cerrado");
					abrirPuertoSerie();
				}, function(err){
					console.log("error al cerrar puerto serie");
					abrirPuertoSerie();
				});
			},
			function(err){
				console.log("error al pedir permiso para usar puerto serie:", err);
			}
		);		
	};
	
	if(window.isphone) document.addEventListener("deviceready", pedirPermisoParaUsarSerie, false);
	else pedirPermisoParaUsarSerie();
});