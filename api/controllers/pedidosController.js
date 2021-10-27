const Pedido = require('../models/pedido');


//ver pedidos dos pacientes pelo técnico e administrador
const verpedidos = async(req, res) => {
    var pedido3 = null;



    const pedidos = await Pedido.find({ status: "Em espera..." }, function(err, foundpedido) {
        if (err) {
            return res.status(400).send(err);
        }
        pedido3 = foundpedido;

    })

    res.json(pedido3);
    

}

const verpedidosconcluidos = async(req, res) => {
    var pedido3 = null;

    const pedidos = await Pedido.find({ numero_utente: req.params.numero_utente, status: "Terminado" }, function(err, foundpedido) {
        if (err) {
            return res.status(400).send(err);
        }
        pedido3 = foundpedido;


    })

    res.json(pedido3);







}


const vertodospedidosconcluidos = async(req, res) => {
    var pedido3 = null;




    const pedidos = await Pedido.find({ status: "Terminado" }, function(err, foundpedido) {
        if (err) {
            return res.status(400).send(err);
        }
        pedido3 = foundpedido;


    })

    res.json(pedido3);

}



module.exports = {
    verpedidos,
    verpedidosconcluidos,
    vertodospedidosconcluidos

};