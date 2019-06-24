/**
 * primer usuario se não existir
 * 
 */

const UsuariosDB = require('../models/usuario.model')
const bcrypt = require('bcrypt');

const USER = 'root'

firtUser = async() => {
    UsuariosDB.findOne({ name: USER }, async(err, user) => {
        console.log(user);
        console.log(err)
        if (user) {
            return {
                ok: false,
                msg: {
                    m: 'true',
                    err
                }
            }
        }
        const usuario = new UsuariosDB({
            nombre: USER,
            email: USER,
            password: bcrypt.hashSync('123456', 10),
            role: 'ADMIN_ROLE'
        });
        await usuario.save((err, UsuarioDb) => {
            if (err) {

                return {
                    ok: false,
                    msg: {
                        m: 'Internal Server Error',
                        err
                    }
                }
            }
            return {
                ok: true,
                msg: {
                    m: 'created'
                }
            }
        })
    })
}

module.exports = {
    firtUser
}