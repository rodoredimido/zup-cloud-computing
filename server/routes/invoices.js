// const express = require('express');

// const mongoose = require('mongoose');

const InvoicesDB = require('../models/clienteFactura.model')
const CLientesDB = require('../models/clientes.model')
const ServicosDB = require('../models/services.model')

const { Faturas } = require('../endpoints')
module.exports = ({ mongoose, express, version }) => ({
    app: () => {
        const invoicetHandler = Faturas({ InvoicesDB, ServicosDB, CLientesDB })
        const URL = 'invoices'
        const app = express();
        console.log('version: ', version);
        app.get(`/api/${version}/${URL}`, invoicetHandler.get)
        app.get(`/api/${version}/${URL}/client/:id`, invoicetHandler.getInvoiceByClientId)
        app.get(`/api/${version}/${URL}/:id`, invoicetHandler.get_unit)
        app.post(`/api/${version}/${URL}`, invoicetHandler.post)
        app.put(`/api/${version}/${URL}/:id`, invoicetHandler.put)
        app.put(`/api/${version}/${URL}/closer/:id`, invoicetHandler.closeInvoiseById)
        app.delete(`/api/${version}/${URL}/:id`, invoicetHandler.delete)


        return app;

    }

})



//module.exports = app