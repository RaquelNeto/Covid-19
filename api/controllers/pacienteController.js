const Pedido = require('../models/pedido');
const User = require('../models/User');

//criar pedido por parte do paciente
const criarPedido = async(req, res) => {
    
        const pedido = await Pedido.find({ numero_utente: req.params.numero_utente ,status:"Em espera..."||"Aceite" });
        
        
        if (pedido.length === 0 ) {
            const user = await User.findOne({ numero_utente: req.params.numero_utente });
            
            const pedido1 = new Pedido({
                nome: user.nome,
                data_de_nascimento: user.data_de_nascimento,
                sexo: user.sexo,
                morada: user.morada,
                numero_utente: user.numero_utente,
                profissao: user.profissao,
                telemovel: user.telemovel,
                email: user.email,
                datapedido: new Date().toLocaleDateString(),
                datarealizacao: "Sem data",
                dataresultado: "Sem data",
                resultado: "Suspeito",
                recomendacao: req.body.recomendacao,
                grupo_de_risco: req.body.grupo_de_risco,
                pq_risco: req.body.pq_risco,
                nome_do_tecnico: "Sem técnico atribuido",
                status: "Em espera...",
            }, (err) => {
                if (err) {
                    res.status(400).send(err);
                }
            });
            try {
                const guardarPedido = await pedido1.save();
                return res.send(pedido1._id);
            } catch (err) {

               return res.status(400).send(err);

            }
        } else {
            return res.status(400).send('Já efetou um pedido, terá de aguardar a resposta...');
        }
    
};

//Para os pacientes verem o pedido efetuado
const pedidos = async(req, res) => {
  
        const pedido = await Pedido.find({ numero_utente: req.user.numero_utente }, (err, found) => {
            if (!err) {
             return   res.send(found);
            } else {
              return  res.status(400).send('Não existem pedidos');
            }
        });
  
};

module.exports = {
    criarPedido,
    pedidos,
};