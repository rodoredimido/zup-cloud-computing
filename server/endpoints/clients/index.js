//const Clientes = require('../../models/clientes.model')
const _ = require('underscore')


module.exports = ({ CLientesDB }) => ({
    get: async(req, res) => {

        const test = CLientesDB.find({}, async(err, CLientDB) => {
            if (err) {
                return res.sendStatus(500);
            }


            res.status(200).json({
                ok: true,
                data: CLientDB
            })


        })

    },

    get_unit: (req, res) => {
        const { id } = req.params;

        CLientesDB.find({ _id: id }, (err, CLientDB) => {
            if (err) {
                return res.sendStatus(500);
            }

            if (!CLientDB) {
                return res.status(400);
            }

            res.status(200).json({
                ok: true,
                data: CLientDB
            })


        })
    },
    post: async(req, res) => {
        const body = req.body;
        const cliente = await CLientesDB({
            name: body.name,
            address: body.address,
            email: body.email,
            cnpj: body.cnpj,
            phone: body.phone,
            img: body.img
        })



        await cliente.save((err, clienteDb) => {
            if (err) {

                return res.sendStatus(500)
            }
            if (!clienteDb) {
                return res.sendStatus(400)
            }
            res.status(201).json({
                ok: true,
                msg: `Client ${clienteDb.name} saved`
            })
        })


    },
    put: async(req, res) => {
        const { id } = req.params;
        let body = _.pick(req.body, ['name', 'address']);
        // recordar modificar

        await CLientesDB.findByIdAndUpdate(
            id, body, { new: true, runValidators: true }, async(err, clienteDb) => {
                if (err) {
                    return res.sendStatus(500)
                }

                if (!clienteDb) {
                    return res.sendStatus(400)
                }
                res.sendStatus(204);
            })

    },
    delete: (req, res) => {
        const { id } = req.params;
        CLientesDB.deleteOne({ _id: id }, { new: true, runValidators: true }, (err, clienteDb) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500)
            }

            if (!clienteDb) {
                return res.sendStatus(400)
            }
            res.sendStatus(204);
        })

    }
})