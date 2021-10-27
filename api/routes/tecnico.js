const router = require('express').Router();
const Autoriza = require("../middleware/autoriza");
const Pedidos = require("../models/pedido");
const User= require("../models/User");
const session= require("../middleware/session");


const Tecnicocontroller = require('../controllers/tecnicoController');



/**
 * @swagger
 * /lab-tests:
 *   get:
 *     description: Returns a list of lab tests
 *     tags: [Lab Tests]
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: List of tests
 *         schema:
 *           type: array
 *           items:
 *             type: object
 */


router.get('/', (req, res) => {
    res.render("paginaInicialTecnico");
})

router.get('/aceitarPedido', (req, res) => {
    if (req.user) {
        const pedido = Pedidos.find({ grupo_de_risco: "SIM", status: "Em espera..."}, function(err, found) {
            const pedido_n = Pedidos.find({ grupo_de_risco: "NÃO" ,status: "Em espera..."}, function(err, foundn) {
                res.render("aceitarPedidos", { pedidosUrgentes: found, pedidosNormais: foundn });
            });


        });



    }

})
//, Autoriza(['TECNICO'])

router.get('/lancarPedido/:idutilizador', (req, res) => {
   // if (req.user) {

        const pedido = Pedidos.find({ _id: req.params.idutilizador, status: "Em espera..."}, function(err, found) {
            res.status(200).send(found);


        });



   // }

})


router.get('/verpedidoaceite/:idutilizador', async (req, res) => {
   // if (req.user) {
       const user=await User.findOne({_id:req.user._id});
       console.log(user.nome)
        const pedido = await Pedidos.find({ _id: req.params.idutilizador, status: "Aceite",nome_do_tecnico:user.nome}, function(err, found) {
            res.status(200).send(found);
            console.log(found)


        });



   // }

})

router.get('/pedidosaceites', async (req, res) => {
   // if (req.user) {
       
       const user=await User.findOne({_id:req.user._id});
       

       const pedido = await Pedidos.find({ status: "Aceite", nome_do_tecnico:user.nome}, function(err, found) {
         res.status(200).send(found);
           
            
        });
    
     



   // }

})
router.get('/verPedidosconcluidos', async (req, res) => {
   // if (req.user) {
       
       const user=await User.findOne({_id:req.user._id});
       

       const pedido = await Pedidos.find({ status: "Terminado", nome_do_tecnico:user.nome}, function(err, found) {
         res.status(200).send(found);
           
            
        });
    
     



   // }

})
//, Autoriza(['TECNICO'])




router.put('/aceitarPedido/:idutilizador', Tecnicocontroller.aceitarpedido)
 //Autoriza(['TECNICO']),

router.delete('/eliminarPedido/:idutilizador', Tecnicocontroller.eliminarPedido)
//, Autoriza(['TECNICO'])

router.post('/lancarResultado/:idutilizador', Tecnicocontroller.lancarresultado)
//, Autoriza(['TECNICO'])


module.exports = router;