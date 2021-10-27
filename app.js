require('dotenv').config();
var express = require('express');
//conectar com os middlewares
var cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./api/swagger/swagger.json")


const apiRouter = require('./api');
const sessionMiddleware = require('./api/middleware/session');
var app = express();

mongoose.Promise = global.Promise;




//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((mongoose) => {
        console.log('Connected to mongo')
    })
    .catch(
        console.error);




app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token',
        'x-authentication'
    );

    next();
});

//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
    'http://localhost:4200', //this is my front-end url for development
    'http://localhost:4200/login'
];
var corsOptions = {
        origin: function(origin, callback) {
            var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
            callback(null, isWhitelisted);
        },
        credentials: true
    }
    //here is the magic
app.use(cors(corsOptions));




app.set('view engine', 'ejs');


app

    .use(express.json())

.use(express.urlencoded({ extended: true }))

.use(cookieParser())

.use(sessionMiddleware)

.use('/api', apiRouter)

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {

    res.render("home");


})











app.listen(process.env.PORT || 3000, () => console.log("Server is UP and running!"));