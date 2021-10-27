const mongoose = require('mongoose');
require('mongoose-type-email');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,

    },
    data_de_nascimento: { type: String, required: true },
    sexo: { type: String, required: true },
    numero_utente: { type: Number, required: true, min: 9 },
    morada: { type: String, required: true },
    profissao: { type: String, required: true },
    telemovel: { type: Number, required: true, min: 9 },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true,
    },
    password: { type: String, required: true },
    date: { type: String, default: new Date().toLocaleDateString() },
    role: { type: String, enum: ["PACIENTE", "ADMIN", "TECNICO"] },
    Estado: { type: String, enum: ["Suspeito", "Infetado", "Não Infetado"], default: "Suspeito" },
    Teste_Realizado:{type:Boolean, default:false}


});

module.exports = mongoose.model('User', userSchema)