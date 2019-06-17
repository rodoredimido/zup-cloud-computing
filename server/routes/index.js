// const express = require('express');

// const app = express();
require('../configs/api-ver.config')
const clients = require('./clients');
module.exports = ({ mongoose, express }) => ({
    app: () => {
        const app = express();
        console.log(process.env.VERSION_1);
        const version = process.env.VERSION_1 || 'v1'
        const handleClients = clients({ mongoose, express, version })
        app.use(handleClients.app())
        return app;
    }
})




//module.exports = app;