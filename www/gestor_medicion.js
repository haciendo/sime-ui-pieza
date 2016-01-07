var mapaUnidad = {
	"u"		: 0.0001	,
	"mm"	: 0.001     ,
	"cm"	: 0.01      ,
	"m"		: 1
};
var printMedicion=function(medicion){
	return (mapaUnidad[medicion.unidad] * medicion.valor).toFixed(3) + ' ' + medicion.unidad;
};



var gestor_medicion = {
	start: function(){
		var self = this;
		
		Vx.when({
			tipoDeMensaje:"medicion"
			
		},function(mensaje){
			
			var medicion = {
				index				: datos.mediciones.length,
				fecha				: moment().format('YYYY-MM-DD hh:mm:ss'),
				idTipoPieza			: datos.cotaSeleccionada.idTipoPieza,
				idCota				: datos.cotaSeleccionada.id,
				valor				: mensaje.valor,
				unidad				: mensaje.unidad
			};
			
			
			datos.mediciones.push(medicion);
			self.onMedicion(medicion);
			
			
			self.moveCotaNext();
			//self.moveCotaPrevious();
			
		});
		
		
		Vx.when({
			tipoDeMensaje:"medicionTiempoReal"

		},function(mensaje){
			
			var medicion = {
				valor				: mensaje.valor,
				unidad				: mensaje.unidad
			};
			
			
			self.onMedicionTiempoReal(medicion);
		});
		
		
	},
	onMedicion_vEventos: [],
	onMedicion: function(param){
		if(typeof param == "function"){
			this.onMedicion_vEventos.push(param);
		}else{
			_.each(this.onMedicion_vEventos, function(evento){
				evento(param);
			});
		}
	},
	onMedicionTiempoReal_vEventos: [],
	onMedicionTiempoReal: function(param){
		if(typeof param == "function"){
			this.onMedicionTiempoReal_vEventos.push(param);
		}else{
			_.each(this.onMedicionTiempoReal_vEventos, function(evento){
				evento(param);
			});
		}
	},
	
	onChangeCota_vEventos: [],
	onChangeCota: function(param){
		if(typeof param == "function"){
			this.onChangeCota_vEventos.push(param);
		}else{
			_.each(this.onChangeCota_vEventos, function(evento){
				evento(param);
			});
		}
	},
	onMoveCotaNext_vEventos: [],
	onMoveCotaNext: function(param){
		if(typeof param == "function"){
			this.onMoveCotaNext_vEventos.push(param);
		}else{
			_.each(this.onMoveCotaNext_vEventos, function(evento){
				evento(param);
			});
		}
	},
	onMoveCotaPrevious_vEventos: [],
	onMoveCotaPrevious: function(param){
		if(typeof param == "function"){
			this.onMoveCotaPrevious_vEventos.push(param);
		}else{
			_.each(this.onMoveCotaPrevious_vEventos, function(evento){
				evento(param);
			});
		}
	},
	
	moveCotaNext: function(){
		
		var  self = this;
		var newCotaIndex = datos.cotaSeleccionada.index + 1;
		
		if(newCotaIndex > Object.keys(datos.cotas).length-1){
			newCotaIndex = 0;
		}
		datos.cotaAnterior = datos.cotaSeleccionada;
		datos.cotaSeleccionada = datos.cotas[Object.keys(datos.cotas)[newCotaIndex]];
		
		self.onMoveCotaNext(datos.cotaSeleccionada);
		self.onChangeCota(datos.cotaSeleccionada);
	},
	moveCotaPrevious: function(){
		
		var  self = this;
		var newCotaIndex = datos.cotaSeleccionada.index - 1;
		
		if(newCotaIndex < 0){
			newCotaIndex = Object.keys(datos.cotas).length-1;
		}
		
		
		datos.cotaAnterior = datos.cotaSeleccionada;
		datos.cotaSeleccionada = datos.cotas[Object.keys(datos.cotas)[newCotaIndex]];
		
		self.onMoveCotaPrevious(datos.cotaSeleccionada);
		self.onChangeCota(datos.cotaSeleccionada);
	}

};
