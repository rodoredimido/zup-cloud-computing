// const express = require('express');

// const mongoose = require('mongoose');







const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { verificaToken, verificaAdmin_Role } = require('../middlewares')
const UsuariosDB = require('../models/usuario.model')

const { Login } = require('../endpoints')
module.exports = ({ mongoose, express, version }) => ({
    app: () => {
        const loginHandler = Login({ UsuariosDB, bcrypt, jwt })
        const app = express()
        const URL = 'login'
        console.log('version: ', version);
        app.post(`/api/${version}/${URL}`, loginHandler.post)

        return app;

    }

})