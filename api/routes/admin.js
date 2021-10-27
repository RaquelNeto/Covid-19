const router = require('express').Router();
const Autoriza = require("../middleware/autoriza");

const Admincontroller = require('../controllers/adminController');



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
//router.post('/dados_dashboard',Autoriza(['ADMIN']), Admincontroller.dados_dashboard);
router.post('/registoutilizador',Admincontroller.criaruser_admin);

router.put('/updatepass',Admincontroller.editar_pass);

router.delete('/eliminarutilizador/:idutilizador',Admincontroller.eliminar_utilizador);


router.get('/update_utilizador',Admincontroller.show_utilizador);


router.get('/update_utilizador/:idutilizador',Admincontroller.show_unique_user);


router.put('/update_utilizador/:idutilizador',Admincontroller.editar_uitlizador);

router.get('/testesrealizados',Admincontroller.numero_testes_realizados);
router.get('/testesrealizadosporpessoa',Admincontroller.numero_de_testes_realizados_por_pessoa);
router.get('/pessoasinfetadas',Admincontroller.numero_de_pessoas_infetadas);
router.get('/pessoasnaoinfetadas',Admincontroller.numero_de_pessoas_naoinfetadas);
router.get('/pessoassuspeitas',Admincontroller.numero_de_pessoas_suspeitas);
router.get('/numerodepessoasinfetadasmasculino',Admincontroller.numero_de_pessoas_infetados_masculinos);
router.get('/numerodepessoasinfetadasfemininas',Admincontroller.numero_de_pessoas_infetados_femininos);

module.exports = router;