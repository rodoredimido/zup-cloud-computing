// const express = require('express');

// const mongoose = require('mongoose');


const bcrypt = require('bcrypt');
const { verificaToken, verificaAdmin_Role } = require('../middlewares')
const UsuariosDB = require('../models/usuario.model')

const { Usuarios } = require('../endpoints')
module.exports = ({ mongoose, express, version }) => ({
    app: () => {
        const usuariosHandler = Usuarios({ UsuariosDB, bcrypt })
        const app = express()
        const URL = 'usuarios'
        console.log('version: ', version);
        app.get(`/api/${version}/${URL}`, usuariosHandler.get)
        app.get(`/api/${version}/${URL}/:id`, usuariosHandler.get_unit)
        app.post(`/api/${version}/${URL}`, usuariosHandler.post)
        app.put(`/api/${version}/${URL}/:id`, usuariosHandler.put)
        app.delete(`/api/${version}/${URL}/:id`, usuariosHandler.delete)

        return app;

    }

})