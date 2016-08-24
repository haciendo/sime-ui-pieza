$(function() {  
	
    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});


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
		//pantalla_abm_tipoPieza_detalle.start();
		
		
		/* START POINT */
		pantalla_medicion.show();
		/* */
		
		//Vx.conectarCon(new NodoConectorSocketCliente('ws://192.168.4.1:1234'));
		
		
		/***************/
		if(window.isphone){
			cordova.plugins.backgroundMode.enable();
		}
	});
};



