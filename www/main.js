$(function() {  
	
    if(window.isphone) {
        document.addEventListener("deviceready", onDeviceReady, false);
    } else {
        onDeviceReady();
    }
});


// eventos en show y hide
(function ($) {
	$.each(['show', 'hide'], function (i, ev) {
		var el = $.fn[ev];
		$.fn[ev] = function () {
			this.trigger(ev);
			return el.apply(this, arguments);
		};
	});
})(jQuery);




var datos = {
	tipoPiezas: {
		"idTipoPiezaXXXXXX": {
			id: "idTipoPiezaXXXXXX",
			descripcion: "Engranaje espirilénguico"
		}
		
	},
	cotas:{
		"idCotaXXXXXXXX": {
			id: "idCotaXXXXXXXX",
			idTipoPieza: "idTipoPiezaXXXXXX",
			descripcion: "ancho del diente",
			base: 50220,
			tolMax: 50230,
			tolMin: 50210
		}
	},
	cotaSeleccionada: null,
	
	mediciones: []
};




var onDeviceReady = function() {
    
	// versión mínima no tiene conexion con server
	//Vx.conectarCon(new NodoConectorSocket('https://sime-backend.herokuapp.com'));
	//Vx.conectarCon(new NodoConectorSocket('http://localhost:3000'));
	//
	
	
	
	Vx.when({tipoDeMensaje:"vortex.debug.error"}, function(m){console.log(m);})
	
	//se selecciona la primer cota, me parece que hay que usar un simple vector...TODO: pensar eso
	datos.cotaSeleccionada = datos.cotas[Object.keys(datos.cotas)[0]];
	
	
	toolbar();
	
	pantalla_medicion();
	pantalla_lista_mediciones();
	pantalla_configuracion();
	pantalla_exportar();
	
	
	
	/* START POINT */
	$('.pantalla').hide();
	$('#pantalla_medicion').show();
	
	
	/***************/
	
	window.plugin.backgroundMode.enable();
	
};




