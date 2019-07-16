require('./server/configs/configs')


const express = require('express');
const parser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const routes = require('./server/routes')
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

const { firtUser } = require('./server/classes')




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


// Injecsão de dependencia express e Mongoose
const handlerAll = routes({ mongoose, express })
    //console.log(handlerAll.app());
app.use(handlerAll.app());

//inicializando o servisio de mongoDB




app.listen(3000, async function() {
    console.log(process.env.URLDB);
    await mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, async(err, res) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');
        //crear  usuario root se não existir
        await firtUser();

    });

    console.log('Example app listening on port 3000!');
});

module.exports = app