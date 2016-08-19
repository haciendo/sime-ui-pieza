var datos = {
    tipoPiezas: {
        "idTipoPiezaXXXXXX": {
            index: 0,
            id: "idTipoPiezaXXXXXX",
            descripcion: "Engranaje espirilénguico",
            cotas:{
                "idCotaXXXXXXXX": {
                    index: 0,
                    id: "idCotaXXXXXXXX",
                    idTipoPieza: "idTipoPiezaXXXXXX",
                    descripcion: "ancho del diente",
                    base: 50220,
                    tolMax: 50230,
                    tolMin: 50210
                },
                "idCotaYYYYYYYY": {
                    index: 1,
                    id: "idCotaYYYYYYYY",
                    idTipoPieza: "idTipoPiezaXXXXXX",
                    descripcion: "radio",
                    base: 32000,
                    tolMax: 32020,
                    tolMin: 31990
                },
                "idCotaZZZZZZZZZ": {
                    index: 2,
                    id: "idCotaZZZZZZZZZ",
                    idTipoPieza: "idTipoPiezaXXXXXX",
                    descripcion: "espesor de la corona",
                    base: 100,
                    tolMax: 120,
                    tolMin: 90
                }
            }
        },
        "idTipoPiezaHHHHHHHH": {
            index: 1,
            id: "idTipoPiezaHHHHHHHH",
            descripcion: "Pitorro del totorocho",
            cotas:{
                "idCotaHHHHHHHHHH": {
                    index: 0,
                    id: "idCotaHHHHHHHHHH",
                    idTipoPieza: "idTipoPiezaHHHHHHHH",
                    descripcion: "Cota de otra pieza",
                    base: 100,
                    tolMax: 120,
                    tolMin: 90
                }

            }
        }
    },
    instrumentos:{
        1: {
            id: 1,
            codigo: "111",
            descripcion: "calibre mitutoyo"
        }
    },
    cotaAnterior: null,
    cotaSeleccionada: null,
    mediciones: []
};

var RepositorioLocal = {
	save: function(callback){
		var miFile = new FileHelper("_DatosSIME", function(){
            var datos_guardar = _.clone(datos);
            datos_guardar.cotaSeleccionada = null;
            datos_guardar.cotaAnterior = null;
            
			miFile.write(JSON.stringify(datos),
				function(){
                    callback();
				}
			);
		});
	},
	load: function(callback){
		var miFile = new FileHelper("_DatosSIME", function(){
			miFile.read(
				function(archivo){
                    if(archivo) datos = JSON.parse(archivo);
                    callback();
				}
			);
		});
	}
};