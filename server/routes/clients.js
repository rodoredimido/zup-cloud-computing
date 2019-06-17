// const express = require('express');

// const mongoose = require('mongoose');

const CLientesDB = require('../models/clientes.model')

const { clients } = require('../endpoints')
module.exports = ({ mongoose, express, version }) => ({
    app: () => {
        const clientHandler = clients({ CLientesDB })
        const app = express();
        console.log('version: ', version);
        app.get(`/api/${version}/clientes`, clientHandler.get)
        app.get(`/api/${version}/clientes/:id`, clientHandler.get_unit)
        app.post(`/api/${version}/clientes`, clientHandler.post)
        app.put(`/api/${version}/clientes/:id`, clientHandler.put)
        app.delete(`/api/${version}/clientes/:id`, clientHandler.delete)

        return app;

    }

})



//module.exports = app