//const Clientes = require('../../models/clientes.model')
const _ = require('underscore')


module.exports = ({ UsuariosDB, bcrypt, jwt }) => ({
    post: async(req, res) => {
        const body = req.body;
        const usuario = new UsuariosDB({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });

        UsuariosDB.findOne({ email: body.email }, (err, usuarioDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: {
                        m: 'Internal Server Error',
                        err
                    }
                });
            }
            if (!usuarioDB) {
                return res.status(400).json({
                    ok: false,
                    msg: {
                        m: 'Incorrect User or Password'
                    }
                });
            }

            if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
                return res.status(400).json({
                    ok: false,
                    msg: {
                        m: 'Incorrect User or Password'
                    }
                });
            }

            let token = jwt.sign({
                usuario: usuarioDB
            }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

            res.status(201).json({
                ok: true,
                usuario: usuarioDB,
                token
            });
        })

    }
})