'use strict';
const _ = require('underscore')

module.exports = ({ InvoicesDB }) => ({
    get: async(req, res) => {
        const test = InvoicesDB.find({}, async(err, invoices) => {
                if (err) {
                    return res.sendStatus(500)
                }
                res.status(200).json({
                    ok: true,
                    data: invoices
                })


            })
            // await res.status(200).json({
            //     ok: true
            // })
    },
    get_unit: (req, res) => {
        const { id } = req.params;

        InvoicesDB.find({ _id: id }, (err, invoice) => {
            if (err) {
                return res.sendStatus(500);
            }

            if (!invoice) {
                return res.status(400);
            }

            res.status(200).json({
                ok: true,
                data: invoice
            })


        })

    },
    post: async(req, res) => {
        const body = req.body;


        await InvoicesDB.find({ cliente: body.cliente })
            .populate('cliente', 'name email')
            .populate({
                path: "servicos",
                model: 'Servicos',
                select: 'name'

            })
            .where('status').equals('open')
            .exec(async(err, invoices) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: {
                            m: 'Server Error, or Client id not exist',
                            err
                        }
                    });
                }

                let data;
                console.log(invoices);
                (typeof invoices === 'object') ? (data = (invoices.length > 0)) : (data = false)
                if (invoices && data) {
                    return res.status(400).json({
                        ok: false,
                        invoices,
                        err: {
                            message: 'Invoices is Open, close this, and retured'
                        }
                    });
                }
                const invoiceDb = InvoicesDB({
                        cliente: body.cliente,
                        servicos: body.servicos,
                        value: body.value,
                        value_type: body.value_type

                    })
                    // console.log(invoices);

                await invoiceDb.save((err, invoice) => {
                    if (err) {

                        return res.send(500).json({
                            ok: false,
                            msg: {
                                m: 'Internal server Error',
                                err
                            }
                        })
                    }
                    if (!invoice) {
                        return res.send(400).json({
                            ok: false,
                            msg: {
                                m: 'Database Error, is not saved'
                            }
                        })
                    }
                    res.status(201).json({
                        ok: true,
                        msg: `Servico  is created`
                    })
                })
            });

    },
    put: async(req, res) => {
        const { id } = req.params;
        const body = await _.pick(req.body, ['status', 'servicos', 'cliente']);



        try {

            if (!body.servicos[0]) {
                return res.status(400).json({
                    ok: false,
                    msg: {
                        m: 'servisos is empty'
                    }
                })
            }

        } catch (error) {
            return res.status(400).json({
                ok: false,
                msg: {
                    m: 'servisos is undefined'
                }
            })
        }

        InvoicesDB.find({ cliente: body.cliente })
            .where('status').equals('open')
            .exec(async(err, invoices) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msg: {
                            m: 'Server Error, or Client id not exist',
                            err
                        }
                    });
                }
                if (!invoices || (invoices.length <= 0)) {
                    return res.status(400).json({
                        ok: false,
                        invoices,
                        msg: {
                            m: 'Invoice open not found'
                        }
                    });
                }


                try {
                    invoices[0].servicos.push(body.servicos[0])
                    await body.servicos.filter((data) => {
                        invoices[0].servicos.push(data)
                    })
                } catch (error) {
                    return res.status(500).json({
                        ok: false,
                        msg: {
                            m: 'servicos is empty'
                        }
                    })
                }
                const serv = _.pick(invoices[0], ['servicos', 'status']);
                await InvoicesDB.findByIdAndUpdate(
                    invoices[0]._id, serv, { new: true, runValidators: true }, async(err, invoice) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                msg: {
                                    m: 'internal server error',
                                    err
                                }
                            })
                        }

                        if (!invoice || (invoice.length <= 0)) {
                            return res.status(400).json({
                                ok: false,
                                msg: {
                                    m: 'Data Returned Empty, data is not saved in database',
                                    err
                                }
                            })
                        }
                        res.status(204).json({
                            ok: true,
                            msg: {
                                m: 'Data is save in Database success',
                                err
                            }
                        });
                    })
            });

    },
    delete: (req, res) => {
        const { id } = req.params;

        InvoicesDB.find({ _id: id })
            .where('status').equals('open')
            .exec(async(err, invoices) => {
                if (err) {

                    return res.status(500).json({
                        ok: false,
                        msg: {
                            m: 'Server Error, or Invoice id not exist',
                            err
                        }
                    });
                }

                if (!invoices || (invoices.length == 0)) {
                    return res.status(400).json({
                        ok: false,
                        msg: {
                            m: 'Invoice is closed or not exist open'
                        }
                    });
                }

                // return res.status(200).json({
                //     ok: true,
                //     invoices
                // })
                InvoicesDB.deleteOne({ _id: id }, { new: true, runValidators: true }, (err, invoice) => {
                    if (err) {

                        return res.status(500).json({
                            ok: false,
                            msg: {
                                m: 'Server Error, or Invoice id not closed',
                                err
                            }
                        });
                    }

                    if (!invoice) {
                        return res.status(400).json({
                            ok: false,
                            msg: {
                                m: 'Server Error, invoice not deleted',
                                err
                            }
                        });
                    }
                    return res.status(204).json({
                        ok: true,
                        msg: {
                            m: `Invoice is delete`
                        }
                    });
                })

            });


    }
})