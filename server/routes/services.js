// const express = require('express');

// const mongoose = require('mongoose');

const ServicosDB = require('../models/services.model')

const { Services } = require('../endpoints')
module.exports = ({ mongoose, express, version }) => ({
    app: () => {
        const servicestHandler = Services({ ServicosDB })
        const app = express();
        console.log('version: ', version);
        app.get(`/api/${version}/services`, servicestHandler.get)
        app.get(`/api/${version}/services/:id`, servicestHandler.get_unit)
        app.post(`/api/${version}/services`, servicestHandler.post)
        app.put(`/api/${version}/services/:id`, servicestHandler.put)
        app.delete(`/api/${version}/services/:id`, servicestHandler.delete)
        return app;

    }

})



//module.exports = app