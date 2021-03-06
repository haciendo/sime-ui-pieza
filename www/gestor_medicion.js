
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
		
		console.log('-_-_-_-_-_-_gestor_medicion.js');
		
		var self = this;
        
        this.pedido_medicion = {remove: function(){}}; 
        this.pedido_medicion_tr = {remove: function(){}}; 
        
//		gestor_instrumentos.onNuevoInstrumento(function(instrumento){
//            self.seleccionarInstrumento(instrumento);
//		});
//		
        gestor_instrumentos.onInstrumentoModificado(function(instrumento){
             if(self.instrumentoSeleccionado.id == instrumento.id) self.seleccionarInstrumento(instrumento);
        });
		//_.each(datos.instrumentos, function(instrumento){
            if(datos.instrumentos[0]) self.seleccionarInstrumento(datos.instrumentos[0]);
		//});        
	},
	seleccionarInstrumento: function(instrumento){
        var self = this;
		
        this.instrumentoSeleccionado = instrumento;
        
        this.pedido_medicion.remove();
		this.pedido_medicion = Vx.when({
			tipoDeMensaje:"medicion",
			instrumento: instrumento.codigo    
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
            
            RepositorioLocal.save();
            
			self.onMedicion(medicion);
			
			
			self.moveCotaNext();
			//self.moveCotaPrevious();
			
		});
		
		
		this.pedido_medicion_tr.remove();
		this.pedido_medicion_tr = Vx.when({
			tipoDeMensaje:"medicionTiempoReal",
			instrumento: instrumento.codigo    
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
	moveCotaNext: function(){
		
		var  self = this;
		var newCotaIndex = datos.cotaSeleccionada.index + 1;
		
		var cotas = datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza].cotas;
		
		
		if(newCotaIndex > Object.keys(cotas).length-1){
			newCotaIndex = 0;
		}
		
		datos.cotaAnterior = datos.cotaSeleccionada;
		datos.cotaSeleccionada = cotas[Object.keys(cotas)[newCotaIndex]];
		RepositorioLocal.save();
		
		self.onMoveCotaNext(datos.cotaSeleccionada);
		self.onChangeCota(datos.cotaSeleccionada);
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
	moveCotaPrevious: function(){
		
		var  self = this;
		var newCotaIndex = datos.cotaSeleccionada.index - 1;
		
		
		var cotas = datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza].cotas;
		
		
		if(newCotaIndex < 0){
			newCotaIndex = Object.keys(cotas).length-1;
		}
		
		datos.cotaAnterior = datos.cotaSeleccionada;
		
		datos.cotaSeleccionada = cotas[Object.keys(cotas)[newCotaIndex]];
		
        RepositorioLocal.save();
        
		self.onMoveCotaPrevious(datos.cotaSeleccionada);
		self.onChangeCota(datos.cotaSeleccionada);
	},
	
	
	
	
	
	onMoveTipoPiezaNext_vEventos: [],
	onMoveTipoPiezaNext: function(param){
		if(typeof param == "function"){
			this.onMoveTipoPiezaNext_vEventos.push(param);
		}else{
			_.each(this.onMoveTipoPiezaNext_vEventos, function(evento){
				evento(param);
			});
		}
	},
	moveTipoPiezaNext: function(){
		
		var  self = this;
		
		
		var tipoPiezaSeleccionada = datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza];
		
		var newPiezaIndex = tipoPiezaSeleccionada.index + 1;
		
		
		if(newPiezaIndex > Object.keys(datos.tipoPiezas).length-1){
			newPiezaIndex = 0;
		}
		datos.cotaAnterior = datos.cotaSeleccionada;
		
		
		var tipoPieza = datos.tipoPiezas[Object.keys(datos.tipoPiezas)[newPiezaIndex]];
		var cotas = tipoPieza.cotas;
		datos.cotaSeleccionada = cotas[Object.keys(cotas)[0]];
		
		
		RepositorioLocal.save();
        
		self.onMoveTipoPiezaNext(datos.cotaSeleccionada);
		self.onChangeCota(datos.cotaSeleccionada);
	},
	
	onMoveTipoPiezaPrevious_vEventos: [],
	onMoveTipoPiezaPrevious: function(param){
		if(typeof param == "function"){
			this.onMoveTipoPiezaPrevious_vEventos.push(param);
		}else{
			_.each(this.onMoveTipoPiezaPrevious_vEventos, function(evento){
				evento(param);
			});
		}
	},
	moveTipoPiezaPrevious: function(){
		
		var self = this;
		var tipoPiezaSeleccionada = datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza];
		var newPiezaIndex = tipoPiezaSeleccionada.index - 1;
		
		var cotas = datos.tipoPiezas[datos.cotaSeleccionada.idTipoPieza].cotas;
		
		if(newPiezaIndex < 0){
			newPiezaIndex = Object.keys(datos.tipoPiezas).length-1;
		}
		datos.cotaAnterior = datos.cotaSeleccionada;
		
		
		var tipoPieza = datos.tipoPiezas[Object.keys(datos.tipoPiezas)[newPiezaIndex]];
		var cotas = tipoPieza.cotas;
		datos.cotaSeleccionada = cotas[Object.keys(cotas)[0]];
		
        RepositorioLocal.save();
        
		self.onMoveTipoPiezaPrevious(datos.cotaSeleccionada);
		self.onChangeCota(datos.cotaSeleccionada);
	},
    onMoveInstrumentoNext_vEventos: [],
	onMoveInstrumentoNext: function(p1, p2){
		if(typeof p1 == "function"){
			this.onMoveInstrumentoNext_vEventos.push(p1);
		}else{
			_.each(this.onMoveInstrumentoNext_vEventos, function(evento){
				evento(p1, p2);
			});
		}
	},
    moveInstrumentoNext: function(){
        var  self = this;		
        var proximo_instrumento;
        var instrumento_actual = self.instrumentoSeleccionado;
        var keys_instrumentos = _.keys(datos.instrumentos);
        for(var i=0; i<keys_instrumentos.length; i++){
            var instrumento_iteracion = datos.instrumentos[keys_instrumentos[i]];
            if(instrumento_iteracion.id == self.instrumentoSeleccionado.id){
                if(i==keys_instrumentos.length-1) proximo_instrumento = datos.instrumentos[keys_instrumentos[0]];
                else proximo_instrumento = datos.instrumentos[keys_instrumentos[i+1]];
                break;
            }
        }
        
        self.seleccionarInstrumento(proximo_instrumento);
		self.onMoveInstrumentoNext(instrumento_actual, proximo_instrumento);
    },
    onMoveInstrumentoPrevious_vEventos: [],
	onMoveInstrumentoPrevious: function(p1, p2){
		if(typeof p1 == "function"){
			this.onMoveInstrumentoPrevious_vEventos.push(p1);
		}else{
			_.each(this.onMoveInstrumentoPrevious_vEventos, function(evento){
				evento(p1, p2);
			});
		}
	},
    moveInstrumentoPrevious: function(){
        var  self = this;		
        var instrumento_anterior;
        var instrumento_actual = self.instrumentoSeleccionado;
        var keys_instrumentos = _.keys(datos.instrumentos);
        for(var i=0; i<keys_instrumentos.length; i++){
            var instrumento_iteracion = datos.instrumentos[keys_instrumentos[i]];
            if(instrumento_iteracion.id == self.instrumentoSeleccionado.id){
                if(i==0) instrumento_anterior = datos.instrumentos[keys_instrumentos[keys_instrumentos.length-1]];
                else instrumento_anterior = datos.instrumentos[keys_instrumentos[i-1]];
                break;
            }
        }
        self.seleccionarInstrumento(instrumento_anterior);
		self.onMoveInstrumentoPrevious(instrumento_actual, instrumento_anterior);
        
    }
};
