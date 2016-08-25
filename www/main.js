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
		
		/*CONFIGURACION para primera ejecución*/
		if(Object.keys(datos.tipoPiezas).length == 0){
			var tipoPieza = {
				index: 0,
				id: "idTipoPiezaCero",
				descripcion: "sin piezas",
				cotas:{}
			};
			
			datos.tipoPiezas[tipoPieza.id] = tipoPieza;
			RepositorioLocal.save();
			pantalla_abm_tipoPieza.appendTipoPieza(tipoPieza);
			
		}else if( Object.keys(datos.tipoPiezas[Object.keys(datos.tipoPiezas)[0]].cotas).length == 0){
			var cota = {
				index: 0,
				id: "idCota0",
				idTipoPieza: "idTipoPiezaCero",
				descripcion: 'sin cotas',
				base:  10,
				tolMax: 11,
				tolMin: 9
			};
			
			
			datos.tipoPiezas[cota.idTipoPieza].cotas[cota.id] = cota;
			RepositorioLocal.save();
            
			pantalla_abm_tipoPieza_detalle.appendCota(cota);
			
		}
		/**/
		
		gestor_medicion.start();
		gestor_instrumentos.start();
		
		toolbar.start();
		pantalla_medicion.start();
		pantalla_lista_mediciones.start();
		pantalla_configuracion.start();
		pantalla_exportar.start();
		pantalla_abm_instrumentos.start();
		pantalla_instrumento.start();
		
		pantalla_abm_tipoPieza.start();
		pantalla_abm_tipoPieza_detalle.start();
		pantalla_abm_cota_detalle.start();
		
		
		/* START POINT */
		pantalla_medicion.show();
		/* */
		
		Vx.conectarCon(new NodoConectorSocketCliente('ws://192.168.4.1:1234'));
		
		
		/***************/
		if(window.isphone){
			cordova.plugins.backgroundMode.enable();
		}
	});
};



