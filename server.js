const express = require('express');
//const axios = require('axios');
const parser = require('body-parser')
    //const { posts } = require('./endpoints')
    //const { authenticate } = require('./middlewares')
const mongoose = require('mongoose');
const app = express();
const routes = require('./server/routes')
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())


require('./server/configs/configs')

//const postHandler = posts({ axios })

/**
 * Configuracion del HEADER para que sea aceptado por el CORS de los navegadores
 * Es la seguridad 
 */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// app.post('/', authenticate, postHandler.post)

// Injecsão de dependencia express e Mongoose
const handlerAll = routes({ mongoose, express })
    //console.log(handlerAll.app());
app.use(handlerAll.app());

//inicializando o servisio de mongoDB
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});