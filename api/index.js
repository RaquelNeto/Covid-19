const express = require('express');
const app=express();
app.use(express.static("/public/css"));
app.set('view engine', 'ejs');


//Import Routes
const authRoute= require('./routes/auth');
const reqRoute=require('./routes/pedidos');
const adminRoute = require('./routes/admin');
const pacienteRoute=require('./routes/paciente');
const tecnicoRoute=require("./routes/tecnico");
const uploadRoute=require("./routes/upload");
	

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns api status
 *     tags: [Maintenance]
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Health check
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 */





app.get('/',(req, res)=>{
    res.send({
        status: 'ok'
    })
})



app.use('/user',authRoute);
app.use('/pedidos',reqRoute);
app.use('/admin',adminRoute);
app.use('/paciente',pacienteRoute);
app.use('/tecnico',tecnicoRoute);
app.use('/upload',uploadRoute);


module.exports=app;









