//const Clientes = require('../../models/clientes.model')
const _ = require('underscore')


module.exports = ({ UsuariosDB, bcrypt }) => ({
    get: async(req, res) => {

        UsuariosDB.find({}, async(err, UsuarioDb) => {
            if (err) {
                return res.sendStatus(500);
            }


            res.status(200).json({
                ok: true,
                data: UsuarioDb
            })


        })

    },

    get_unit: (req, res) => {
        const { id } = req.params;

        UsuariosDB.find({ _id: id }, (err, UsuarioDb) => {
            if (err) {
                return res.sendStatus(500);
            }

            if (!UsuarioDb) {
                return res.status(400);
            }

            res.status(200).json({
                ok: true,
                data: UsuarioDb
            })


        })
    },
    post: async(req, res) => {
        const body = req.body;
        const usuario = new UsuariosDB({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            role: body.role
        });



        await usuario.save((err, UsuarioDb) => {
            if (err) {

                return res.status(500).json({
                    ok: false,
                    msg: {
                        m: 'Internal Server Error',
                        err
                    }
                })
            }
            if (!UsuarioDb) {
                return res.sendStatus(400)
            }
            res.status(201).json({
                ok: true,
                msg: `Client ${UsuarioDb.name} saved`
            })
        })


    },
    put: async(req, res) => {
        const { id } = req.params;
        let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

        // recordar modificar

        await UsuariosDB.findByIdAndUpdate(
            id, body, { new: true, runValidators: true }, async(err, UsuarioDb) => {
                if (err) {
                    return res.sendStatus(500)
                }

                if (!UsuarioDb) {
                    return res.sendStatus(400)
                }
                res.sendStatus(204);
            })

    },
    delete: (req, res) => {
        const { id } = req.params;
        UsuariosDB.deleteOne({ _id: id }, { new: true, runValidators: true }, (err, UsuarioDb) => {
            if (err) {
                return res.sendStatus(500)
            }

            if (!UsuarioDb) {
                return res.sendStatus(400)
            }
            res.sendStatus(204);
        })

    }
})