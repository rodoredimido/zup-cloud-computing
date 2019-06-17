// const express = require('express');

// const app = express();
require('../configs/api-ver.config')
const clients = require('./clients');
const servises = require('./services');
module.exports = ({ mongoose, express }) => ({
    app: () => {
        const app = express();
        console.log(process.env.VERSION_1);
        const version = process.env.VERSION_1 || 'v1'
        const handleClients = clients({ mongoose, express, version })
        const handleServises = servises({ mongoose, express, version })
        app.use(handleClients.app())
        app.use(handleServises.app())
        return app;
    }
})




//module.exports = app;