// const express = require('express');

// const mongoose = require('mongoose');
module.exports = ({ mongoose, express }) => ({
    app: () => {
        const clientHandler = clients({ mongoose })
        const app = express();
        app.get('/clientes', clientHandler.get)
        app.post('/clientes', clientHandler.post)
        app.get('/clientes/:id', clientHandler.put)
        app.get('/clientes/:id', clientHandler.delete)

        return app;

    }

})
const { clients } = require('../endpoints')



//module.exports = app