// const express = require('express');

// const app = express();
require('../configs/api-ver.config')
const clients = require('./clients');
const servises = require('./services');
const invoices = require('./invoices')
const users = require('./users')


module.exports = ({ mongoose, express }) => ({

    app: () => {
        const app = express();
        console.log(process.env.VERSION_1);
        const version = process.env.VERSION_1 || 'v1'

        const dependInject = {
            mongoose,
            express,
            version
        }
        const handleClients = clients(dependInject)
        const handleServises = servises(dependInject)
        const handleInvoices = invoices(dependInject)
        const handleUsers = users(dependInject)
        app.use(handleClients.app())
        app.use(handleServises.app())
        app.use(handleInvoices.app())
        app.use(handleUsers.app())
        return app;
    }
})




//module.exports = app;