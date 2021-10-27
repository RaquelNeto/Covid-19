const router = require('express').Router();
const Autoriza = require("../middleware/autoriza");

const Pedidoscontroller = require('../controllers/pedidosController');




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

router.get('/verPedidos', Pedidoscontroller.verpedidos)

//, Autoriza(['ADMIN', 'TECNICO'])
router.get('/verPedidosconlcuidos/:numero_utente', Pedidoscontroller.verpedidosconcluidos)

router.get('/verPedidosconcluidos', Pedidoscontroller.vertodospedidosconcluidos)

//, Autoriza(['ADMIN', 'TECNICO'])


module.exports = router;