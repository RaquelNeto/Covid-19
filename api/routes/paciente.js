const router = require('express').Router();
const Autoriza = require("../middleware/autoriza");
const Pacientecontroller = require('../controllers/pacienteController');




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
    res.render("paginaInicial_Paciente")
})
router.get('/criarPedido', Autoriza(['PACIENTE']), (req, res) => {
    res.render("criarPedido")
})
router.post('/criarPedido/:numero_utente', Pacientecontroller.criarPedido)

router.get('/pedidos', Pacientecontroller.pedidos)




module.exports = router;