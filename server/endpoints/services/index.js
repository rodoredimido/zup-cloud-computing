const _ = require('underscore')

module.exports = ({ ServicosDB }) => ({
    get: async(req, res) => {
        const test = ServicosDB.find({}, async(err, servicos) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: {
                            m: 'Internal server error',
                            err
                        }
                    })
                }
                res.status(200).json({
                    ok: true,
                    data: servicos
                })


            })
            // await res.status(200).json({
            //     ok: true
            // })
    },
    get_unit: (req, res) => {
        const { id } = req.params;

        ServicosDB.find({ _id: id }, (err, servico) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    msg: {
                        m: 'Internal server error',
                        err
                    }
                })
            }

            if (!servico) {
                return res.status(400);
            }

            res.status(200).json({
                ok: true,
                data: servico
            })


        })

    },
    post: async(req, res) => {
        const body = req.body;
        const servicoDb = await ServicosDB({
            name: body.name,
            type: body.type,
            value: body.value,
            value_type: body.value_type

        })

        await servicoDb.save((err, servico) => {
            if (err) {

                return res.status(500).json({
                    ok: false,
                    msg: {
                        m: 'Internal server error',
                        err
                    }
                })
            }
            if (!servico) {
                return res.status(400).json({
                    ok: false,
                    msg: {
                        m: 'ERROR Data is not saved'
                    }
                })
            }
            res.status(201).json({
                ok: true,
                msg: `Servico ${servico.name} is created`
            })
        })

    },
    put: async(req, res) => {
        const { id } = req.params;
        let body = _.pick(req.body, ['name', 'value']);
        // recordar modificar

        await ServicosDB.findByIdAndUpdate(
            id, body, { new: true, runValidators: true }, async(err, servico) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: {
                            m: 'Internal server error',
                            err
                        }
                    })
                }

                if (!servico) {
                    return res.sendStatus(400)
                }
                res.sendStatus(204);
            })

    },
    delete: (req, res) => {
        const { id } = req.params;
        ServicosDB.deleteOne({ _id: id }, { new: true, runValidators: true }, (err, servico) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: {
                        m: 'Internal server error',
                        err
                    }
                })
            }

            if (!servico) {
                return res.sendStatus(400)
            }
            res.sendStatus(204);
        })


    }
})