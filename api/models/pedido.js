const mongoose = require('mongoose');
require('mongoose-type-email');


const pedidoSchema = new mongoose.Schema({
	nome: { type: String, required: true },
	data_de_nascimento: { type: String, required: true },
	sexo: { type: String, required: true },
	numero_utente: { type: Number, required: true, min: 9 },
	profissao: { type: String, required: true },
	telemovel: { type: Number, required: true, min: 9 },
	morada:{type:String, required: true},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true,
	},
	datapedido: { type: String,required: true},
    datarealizacao: {type: String, required: true},
    dataresultado:{type:String,required: true},
	resultado:{type:String,enum:["Suspeito","Infetado","Não Infetado"],required:true},
    recomendacao:{type:String, required: true},
    grupo_de_risco:{type:String,required: true,max:3},
    pq_risco: {type:String},
	nome_do_tecnico: {type:String},
    status:{type:String,enum:["Em espera...","Aceite","Terminado"],required: true}

});

module.exports = mongoose.model('Pedido', pedidoSchema)

