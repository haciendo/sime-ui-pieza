$(function() {  
	
    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});

//var datos = {
//	tipoPiezas: {
//		"idTipoPiezaXXXXXX": {
//			index: 0,
//			id: "idTipoPiezaXXXXXX",
//			descripcion: "Engranaje espirilénguico",
//			cotas:{
//				"idCotaXXXXXXXX": {
//					index: 0,
//					id: "idCotaXXXXXXXX",
//					idTipoPieza: "idTipoPiezaXXXXXX",
//					descripcion: "ancho del diente",
//					base: 50220,
//					tolMax: 50230,
//					tolMin: 50210
//				},
//				"idCotaYYYYYYYY": {
//					index: 1,
//					id: "idCotaYYYYYYYY",
//					idTipoPieza: "idTipoPiezaXXXXXX",
//					descripcion: "radio",
//					base: 32000,
//					tolMax: 32020,
//					tolMin: 31990
//				},
//				"idCotaZZZZZZZZZ": {
//					index: 2,
//					id: "idCotaZZZZZZZZZ",
//					idTipoPieza: "idTipoPiezaXXXXXX",
//					descripcion: "espesor de la corona",
//					base: 100,
//					tolMax: 120,
//					tolMin: 90
//				}
//			}
//		},
//		"idTipoPiezaHHHHHHHH": {
//			index: 1,
//			id: "idTipoPiezaHHHHHHHH",
//			descripcion: "Pitorro del totorocho",
//			cotas:{
//				"idCotaHHHHHHHHHH": {
//					index: 0,
//					id: "idCotaHHHHHHHHHH",
//					idTipoPieza: "idTipoPiezaHHHHHHHH",
//					descripcion: "Cota de otra pieza",
//					base: 100,
//					tolMax: 120,
//					tolMin: 90
//				}
//				
//			}
//		}
//		
//		
//	},
//	instrumentos:{
//		"111": {
//			codigo: "111",
//			descripcion: "calibre mitutoyo"
//		}
//	},
//	cotaAnterior: null,
//	cotaSeleccionada: null,
//	mediciones: []
//};




var onDeviceReady = function() {

	// versión mínima no tiene conexion con server
	//Vx.conectarCon(new NodoConectorSocket('https://sime-backend.herokuapp.com'));
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	//

	
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	
	RepositorioLocal.load(function(){
		
		gestor_medicion.start();
		gestor_instrumentos.start();
    
		toolbar.start();
		pantalla_medicion.start();
		pantalla_lista_mediciones.start();
		pantalla_configuracion.start();
		pantalla_exportar.start();
		pantalla_abm_instrumentos.start();
		
		pantalla_abm_tipoPieza.start();
		pantalla_abm_cota.start();
		
		
		
		/* START POINT */
		pantalla_medicion.show();
		/* */
		
		Vx.conectarCon(new NodoConectorSocketCliente('ws://192.168.4.1:1234'));
		
		
		/***************/
		if(window.isphone){
			console.log(cordova.plugins);
			cordova.plugins.backgroundMode.enable();
		}
	});
};



