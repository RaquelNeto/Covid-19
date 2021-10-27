const router = require('express').Router();
const Autoriza = require("../middleware/autoriza");


const Usercontroller = require('../controllers/userControler');




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

router.get("/registo", (req, res) => {
    res.render("registar");
})

router.post('/registo', Usercontroller.criaruser_paciente)


router.get('/login', (req, res) => {
    res.render("login");
});
router.post('/login', Usercontroller.loginuser)


router.get('/me', (req, res, next) => {
    res.json(req.user)
})




router.get('/perfil', Usercontroller.verperfil)


router.post('/verutilizadornumero', Usercontroller.utilizadoresnumero)

router.get('/perfilPaciente/:id', Usercontroller.verperfil_paciente)

router.put('/updateDados', Usercontroller.update_dados)


router.get('/allusers',Usercontroller.utilizadores);
//, Autoriza(['ADMIN'])





router.get('/logout',Usercontroller.logout_page);

router.post('/logout', Usercontroller.logout);

module.exports = router;