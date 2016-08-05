var gestor_instrumentos = {
	start: function(){
    },
    addInstrumento: function(codigo, descripcion){
        if(datos.instrumentos[codigo]) return {error: "Ya existe un instrumento con ese código"};
        var instrumento = {};
        instrumento.codigo = codigo;
        instrumento.descripcion = descripcion;
        datos.instrumentos[codigo] = instrumento;
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
        datos.instrumentos[instrumento.codigo] = instrumento;
        RepositorioLocal.save();
    }
};