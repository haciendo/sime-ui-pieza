var gui_dial = function(opt){
	
	$.extend(this, {
		XPorcMargenTolerancias: 0.25,
		Ycero: 20,
		svge: null,
		burbuja: null
	}, opt);
	
	
	this.ui = $(opt.idDial);
	
	
	
	this.start();
};

gui_dial.prototype = {
	
	start: function(){
		console.log('-_-_-_-_-_-_gui_dial.js');
		
		var dial = this;
		
		dial.ui.empty();
		
		var pDialMedicion = Snap(dial.idDial);
		
		
		dial.widthTolerancia = dial.ui.width() * ( 1.0 - (dial.XPorcMargenTolerancias * 2.0));
		
		var escala = dial.widthTolerancia / (datos.cotaSeleccionada.tolMax - datos.cotaSeleccionada.tolMin)
		
		var svge = pDialMedicion.g();
		
		var lineHorizontal 	= pDialMedicion.rect(5, dial.Ycero, dial.ui.width() - 10, 4);
		svge.add(lineHorizontal);
		//var lineBase 		= pDialMedicion.rect(((datos.cotaSeleccionada.base - datos.cotaSeleccionada.tolMin) * escala) + dial.XPorcMargenTolerancias, dial.Ycero - 5, 4, 15);
		var lineBase 		= pDialMedicion.rect(dial.escalar(datos.cotaSeleccionada.base), dial.Ycero - 5, 4, 15);
		svge.add(lineBase);
		//var lineTolMax 		= pDialMedicion.rect(((datos.cotaSeleccionada.tolMax - datos.cotaSeleccionada.tolMin) * escala) + dial.XPorcMargenTolerancias, dial.Ycero - 5, 4, 15);
		var lineTolMax 		= pDialMedicion.rect(dial.escalar(datos.cotaSeleccionada.tolMax), dial.Ycero - 5, 4, 15);
		svge.add(lineTolMax);
		//var lineTolMin 		= pDialMedicion.rect(dial.XPorcMargenTolerancias, dial.Ycero - 5, 4, 15);
		var lineTolMin 		= pDialMedicion.rect(dial.escalar(datos.cotaSeleccionada.tolMin), dial.Ycero - 5, 4, 15);
		svge.add(lineTolMin);
		
		var burbuja 		= pDialMedicion.circle(dial.escalar(datos.cotaSeleccionada.base), dial.Ycero, 15);
		svge.add(burbuja);

		svge.attr({
			fill: dial.color/*,
			opacity: 0.9*/
		});
		
		dial.svge = svge;
		dial.burbuja = burbuja;

	},
	escalar: function(valor){
		var dial = this;
		return (((valor - datos.cotaSeleccionada.tolMin) / (datos.cotaSeleccionada.tolMax - datos.cotaSeleccionada.tolMin)) * dial.widthTolerancia) + (dial.XPorcMargenTolerancias * dial.ui.width());
	},
	setValue: function(medicion, color){
		var dial = this;
		
		if(typeof(color)==="undefined"){
			color = dial.color
		}
		
		dial.burbuja.attr({
			cx: dial.escalar(medicion.valor),
			fill: color
		});


	}
	
	
	
}