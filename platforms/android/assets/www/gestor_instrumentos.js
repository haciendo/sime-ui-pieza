var gestor_instrumentos = {
	start: function(){
		console.log('-_-_-_-_-_-_gestor_instrumentos.js');
    },
    addInstrumento: function(instrumento){        
        instrumento.id = _.max(datos.instrumentos.keys) + 1;        
        datos.instrumentos[instrumento.id] = instrumento;
        RepositorioLocal.save();
        this.onNuevoInstrumento(instrumento);
        return instrumento;
    },
    onNuevoInstrumento_vEventos: [],
	onNuevoInstrumento: function(param){
		if(typeof param == "function"){
			this.onNuevoInstrumento_vEventos.push(param);
		}else{
			_.each(this.onNuevoInstrumento_vEventos, function(evento){
				evento(param);
			});
		}
	},    
    modificarInstrumento: function(instrumento){
        datos.instrumentos[instrumento.id] = instrumento;
        RepositorioLocal.save();
        this.onInstrumentoModificado(instrumento);
    },
    onInstrumentoModificado_vEventos: [],
	onInstrumentoModificado: function(param){
		if(typeof param == "function"){
			this.onInstrumentoModificado_vEventos.push(param);
		}else{
			_.each(this.onInstrumentoModificado_vEventos, function(evento){
				evento(param);
			});
		}
	}
};