// const express = require('express');

// const mongoose = require('mongoose');

const CLientesDB = require('../models/clientes.model')

const { verificaToken } = require('../middlewares')

const { Clients } = require('../endpoints')
module.exports = ({ mongoose, express, version }) => ({
    app: () => {
        const clientHandler = Clients({ CLientesDB })
        const app = express();
        console.log('version: ', version);
        app.get(`/api/${version}/clientes`, verificaToken, clientHandler.get)
        app.get(`/api/${version}/clientes/:id`, verificaToken, clientHandler.get_unit)
        app.post(`/api/${version}/clientes`, verificaToken, clientHandler.post)
        app.put(`/api/${version}/clientes/:id`, verificaToken, clientHandler.put)
        app.delete(`/api/${version}/clientes/:id`, verificaToken, clientHandler.delete)

        return app;

    }

})