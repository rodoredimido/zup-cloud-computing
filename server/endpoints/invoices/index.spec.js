const invoicetHandle = require('./index')



// cliente De test
const invoice = {
    cliente: "Data Base",
    servico: "Giga contratado",
    value: "20,00",
    value_type: "GB",
    status: 'open',
    servicos: [],
    length: 0
}

// descrição do test
describe("Endpoints", () => {
    describe('Invoices', () => {
        describe('GET', () => { // test no methods GET
                it('should get all services', async() => {
                    const req = {
                        body: invoice
                    }

                    const res = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }



                    const InvoicesDB = {
                            find: jest.fn((data, callbacks) => {
                                return callbacks(null, invoice)
                            })
                        }
                        // const next = jest.fn();


                    await invoicetHandle({ InvoicesDB }).get(req, res)


                    expect(res.status.mock.calls).toEqual([
                        [200]
                    ])

                    expect(res.json.mock.calls).toEqual([
                        [{ ok: true, data: invoice }]
                    ])

                });

                it('should get service by id', async() => {
                    const req = {
                        params: {
                            id: '1234567890'
                        }
                    }

                    const res = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }

                    const InvoicesDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, invoice)
                        })
                    }



                    await invoicetHandle({ InvoicesDB }).get(req, res)


                    expect(res.status.mock.calls).toEqual([
                        [200]
                    ])

                    expect(res.json.mock.calls).toEqual([
                        [{ ok: true, data: invoice }]
                    ])


                });

                it('should get services by id when 0 service', async() => {
                    const req = {
                        params: {
                            id: '1234567890'
                        }
                    }

                    const res = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }

                    const InvoicesDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, null)
                        })
                    }



                    await invoicetHandle({ InvoicesDB }).get_unit(req, res)


                    expect(res.status.mock.calls).toEqual([
                        [400]
                    ])

                    expect(res.json.mock.calls).toEqual([])


                });

                it('should get service by id when Internal Server error', async() => {
                    const req = {
                        params: {
                            id: '1234567890'
                        }
                    }

                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }

                    const InvoicesDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(123456, null)
                        })
                    }


                    await invoicetHandle({ InvoicesDB }).get_unit(req, res)


                    expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])

                    expect(res.json.mock.calls).toEqual([])


                });

                it('should Server Error in Methos GET services ', async() => {


                    const req = {
                        body: invoice
                    }

                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }



                    const InvoicesDB = {
                        find: jest.fn((data, callbacks) => {
                            return callbacks(11, invoice)
                        })
                    }


                    await invoicetHandle({ InvoicesDB }).get(req, res)


                    expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])

                });


            })
            // test no methos POST
        describe('POST', () => {
            it('should create a new service', async() => {

                const req = {
                    body: {
                        invoice,
                        cliente: 'id_cliente'
                    }

                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                let where = ''
                let populate1 = {}
                let populate2 = {}
                let equals = ''


                const InvoicesDB =
                    ({
                        find: jest.fn((data) => {
                            return {
                                data,
                                populate: jest.fn((data, opt = null) => {
                                    populate1 = {
                                        data,
                                        opt
                                    }
                                    return {
                                        populate: jest.fn((data, opt = null) => {
                                            populate2 = {
                                                data,
                                                opt
                                            }
                                            return {
                                                where: (data) => {
                                                    where = data;
                                                    return {
                                                        equals: (data) => {
                                                            equals = data;
                                                            return {
                                                                exec: (callbacks) => {
                                                                    invoice.status = 'close'
                                                                    callbacks(null, null)
                                                                    return (invoice)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        })

                                    }
                                }),
                            }
                        }),
                        populate: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        equals: jest.fn().mockReturnThis(),
                        exec: jest.fn().mockReturnThis(),
                        InvoicesDB: () => this,


                        save: (callbacks) => {
                            return callbacks(null, invoice)
                        }

                    })



                await invoicetHandle({ InvoicesDB }).post(req, res)


                // expect(res.status.mock.calls).toEqual([
                //     [201]
                // ]);
                // expect(res.json.mock.calls).toEqual([
                //     [{ ok: true, msg: 'Servico Data Base is created' }]
                // ]);
                // test populate()
                expect(populate1.data).toEqual('cliente')
                expect(populate1.opt).toEqual('name email')

                // test populate()
                expect(populate2.opt).toEqual(null);
                expect(populate2.data.path).toEqual('servicos');
                expect(populate2.data.model).toEqual('Servicos');

                // query 
                expect(populate2.data.select).toEqual('name');

                // test condition where

                expect(where).toEqual('status')
                expect(equals).toEqual('open');




            });

            it('should create Service e simuling Error Server', async() => {

                const req = {
                    body: invoice
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const InvoicesDB = {
                    find: jest.fn((data) => {
                        return {

                            populate: jest.fn((data, opt = null) => {

                                return {
                                    populate: jest.fn((data, opt = null) => {

                                        return {
                                            where: (data) => {

                                                return {
                                                    equals: (data) => {

                                                        return {
                                                            exec: (callbacks) => {
                                                                callbacks(1234, null)
                                                                return (invoice)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    })

                                }
                            }),
                        }
                    }),
                    populate: jest.fn().mockReturnThis(),
                    where: jest.fn().mockReturnThis(),
                    equals: jest.fn().mockReturnThis(),
                    exec: jest.fn().mockReturnThis(),


                    save: (callbacks) => {
                        return callbacks(null, invoice)
                    }

                }
                await invoicetHandle({ InvoicesDB }).post(req, res)

                expect(res.status.mock.calls).toEqual([
                    [500]
                ]);
                expect(res.json.mock.calls[0][0].ok).toEqual(false);
                expect(res.json.mock.calls[0][0].msg.m).toEqual('Server Error, or Client id not exist');
                expect(res.json.mock.calls[0][0].msg.err).toEqual(1234);

            });

            it('should create service Error In database', async() => {

                const req = {
                    body: invoice
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const InvoicesDB = {
                        find: jest.fn((data) => {
                            return {

                                populate: jest.fn((data, opt = null) => {

                                    return {
                                        populate: jest.fn((data, opt = null) => {

                                            return {
                                                where: (data) => {

                                                    return {
                                                        equals: (data) => {

                                                            return {
                                                                exec: (callbacks) => {
                                                                    invoice.status = 'open'
                                                                    invoice.length = 11
                                                                    let inv = [
                                                                        invoice
                                                                    ]

                                                                    callbacks(null, inv)
                                                                    return (inv)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        })

                                    }
                                }),
                            }
                        }),
                        populate: jest.fn().mockReturnThis(),
                        where: jest.fn().mockReturnThis(),
                        equals: jest.fn().mockReturnThis(),
                        exec: jest.fn().mockReturnThis(),


                        save: (callbacks) => {
                            return callbacks(null, invoice)
                        }

                    }
                    // const next = jest.fn();


                await invoicetHandle({ InvoicesDB }).post(req, res)

                expect(res.status.mock.calls).toEqual([
                    [400]
                ]);
                expect(res.json.mock.calls[0][0].err.message).toEqual('Invoices is Open, close this, and retured');

            });
        })

        //test no methos PUT
        describe('PUT', () => {

                it('should Update a service for id', async() => {
                    let services = ['teste']

                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: {

                            cliente: 'cliente id',
                            servicos: services

                        }
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const InvoicesDB = {
                        find: jest.fn((data) => {
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = [
                                                        invoice
                                                    ]
                                                    callbacks(null, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),
                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks(null, invoice)
                        })
                    }

                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(res.status.mock.calls).toEqual([
                        [204]
                    ])
                });

                it('should not update Internal Server Error updating Service for body data empty', async() => {
                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: []
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const InvoicesDB = {

                        find: jest.fn((data) => {
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = [
                                                        invoice
                                                    ]
                                                    callbacks(123, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),

                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {

                            return callbacks(1234, null)
                        })
                    }
                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(res.status.mock.calls).toEqual([
                        [400]
                    ])
                    expect(res.json.mock.calls[0][0].msg.m).toEqual('servisos is undefined')
                });

                it('should not update service By Id Not Mach ', async() => {

                    let services = ['teste']


                    console.log(services.length);

                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: {

                            cliente: 'cliente id',
                            servicos: services

                        }
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }

                    let idMach = true;
                    const InvoicesDB = {

                        find: jest.fn((data) => {
                            if ('1244' !== data) {
                                idMach = false;
                            }
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = [
                                                        invoice
                                                    ]
                                                    callbacks(123, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),


                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            if (id !== '1244223') {
                                return callbacks(null, null)

                            } else {
                                return callbacks(null, client)
                            }
                        })
                    }
                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(idMach).toEqual(false);
                    expect(res.status.mock.calls).toEqual([
                        [500]
                    ])
                    expect(res.json.mock.calls[0][0].msg.m).toEqual('Server Error, or Client id not exist')
                });

                it('should Error in time sabed sata to database', async() => {
                    let services = ['teste']

                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: {

                            cliente: 'cliente id',
                            servicos: services

                        }
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const InvoicesDB = {
                        find: jest.fn((data) => {
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = [
                                                        invoice
                                                    ]
                                                    callbacks(null, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),
                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks('Error provocado para test', invoice)
                        })
                    }

                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(res.status.mock.calls).toEqual([
                        [500]
                    ])
                    expect(res.json.mock.calls[0][0].ok).toEqual(false)
                    expect(res.json.mock.calls[0][0].msg.m).toEqual('internal server error')
                    expect(res.json.mock.calls[0][0].msg.err).toEqual('Error provocado para test')
                });

                it('should Error Server, data is not saved in Database', async() => {
                    let services = ['teste']

                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: {

                            cliente: 'cliente id',
                            servicos: services

                        }
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const InvoicesDB = {
                        find: jest.fn((data) => {
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = [
                                                        invoice
                                                    ]
                                                    callbacks(null, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),
                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks(null, [])
                        })
                    }

                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(res.status.mock.calls).toEqual([
                        [400]
                    ])
                    expect(res.json.mock.calls[0][0].ok).toEqual(false)
                    expect(res.json.mock.calls[0][0].msg.m).toEqual('Data Returned Empty, data is not saved in database')
                    expect(res.json.mock.calls[0][0].msg.err).toEqual(null)

                });

                it('should Find retunen array empty Error Try Catch Test', async() => {
                    let services = ['teste']

                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: {

                            cliente: 'cliente id',
                            servicos: services

                        }
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const InvoicesDB = {
                        find: jest.fn((data) => {
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = []
                                                    callbacks(null, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),
                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks(null, [])
                        })
                    }

                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(res.status.mock.calls).toEqual([
                        [400]
                    ])
                    expect(res.json.mock.calls[0][0].ok).toEqual(false)
                    expect(res.json.mock.calls[0][0].msg.m).toEqual('Invoice open not found')


                });

                it('should test body request When Servicos is not a array', async() => {
                    let services = ['teste']

                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: {

                            cliente: 'cliente id',
                            servicos: []

                        }
                    }
                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const InvoicesDB = {
                        find: jest.fn((data) => {
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = []
                                                    callbacks(null, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),
                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks(null, [])
                        })
                    }

                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(res.status.mock.calls).toEqual([
                        [400]
                    ])
                    expect(res.json.mock.calls[0][0].ok).toEqual(false)
                    expect(res.json.mock.calls[0][0].msg.m).toEqual('servisos is empty')

                });

                it('should Generate Exceptions un try-Catch data body.servicos is undefined', async() => {
                    let services = ['teste']

                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: {

                            cliente: 'cliente id'

                        }
                    }
                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const InvoicesDB = {
                        find: jest.fn((data) => {
                            return {
                                where: (data) => {

                                    return {
                                        equals: (data) => {

                                            return {
                                                exec: (callbacks) => {
                                                    invoice.status = 'open'
                                                    let invoices = []
                                                    callbacks(null, invoices)
                                                    return (invoice)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }),
                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks(null, [])
                        })
                    }

                    await invoicetHandle({ InvoicesDB }).put(req, res)

                    expect(res.status.mock.calls).toEqual([
                        [400]
                    ])
                    expect(res.json.mock.calls[0][0].ok).toEqual(false)
                    expect(res.json.mock.calls[0][0].msg.m).toEqual('servisos is undefined')
                });
            })
            //test no method  DELETE
        describe('DELETE', () => {

            it('should Delete a Service', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }
                let id = {};
                const InvoicesDB = {

                    find: jest.fn((data) => {
                        id = data;
                        return {
                            where: (data) => {
                                return {
                                    equals: (data) => {

                                        return {
                                            exec: (callbacks) => {
                                                //invoice.status = 'open'
                                                // let invoices = [
                                                //     invoice
                                                // ]
                                                callbacks(null, invoice)
                                                return (invoice)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks(null, invoice)

                    })
                }



                await invoicetHandle({ InvoicesDB }).delete(req, res)


                expect(res.status.mock.calls).toEqual([
                    [204]
                ])
                expect(id._id).toEqual('1234567890')

                expect(res.json.mock.calls[0][0].msg.m).toEqual('Invoice is delete')
                expect(res.json.mock.calls[0][0].ok).toEqual(true)



            });

            it('should Delete a service error in Id no mach', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const InvoicesDB = {
                    find: jest.fn((data) => {
                        id = data;
                        return {
                            where: (data) => {
                                return {
                                    equals: (data) => {

                                        return {
                                            exec: (callbacks) => {
                                                //invoice.status = 'open'
                                                // let invoices = [
                                                //     invoice
                                                // ]
                                                callbacks(null, null)
                                                return (invoice)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    deleteOne: jest.fn((id, config, callbacks) => {
                        if (id !== '11223344') {
                            return callbacks(null, null)
                        } else {
                            return callbacks(null, invoice)

                        }

                    })
                }



                await invoicetHandle({ InvoicesDB }).delete(req, res)


                expect(res.status.mock.calls).toEqual([
                    [400]
                ])
                expect(res.json.mock.calls[0][0].ok).toEqual(false)
                expect(res.json.mock.calls[0][0].msg.m).toEqual('Invoice is closed or not exist open')




            });

            it('should Delete servise,  Internal Server error', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const InvoicesDB = {

                    find: jest.fn((data) => {
                        id = data;
                        return {
                            where: (data) => {
                                return {
                                    equals: (data) => {

                                        return {
                                            exec: (callbacks) => {
                                                callbacks(123, invoice)
                                                return (invoice)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks(12345, null)

                    })
                }


                await invoicetHandle({ InvoicesDB }).delete(req, res)


                expect(res.status.mock.calls).toEqual([
                    [500]
                ])

            });

            it('should Error on saved, Interbnal database error', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const InvoicesDB = {

                    find: jest.fn((data) => {
                        id = data;
                        return {
                            where: (data) => {
                                return {
                                    equals: (data) => {

                                        return {
                                            exec: (callbacks) => {
                                                callbacks(null, invoice)
                                                return (invoice)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks(null, null)

                    })
                }


                await invoicetHandle({ InvoicesDB }).delete(req, res)


                expect(res.status.mock.calls).toEqual([
                    [400]
                ])

                expect(res.json.mock.calls[0][0].ok).toEqual(false)
                expect(res.json.mock.calls[0][0].msg.m).toEqual('Server Error, invoice not deleted')
                expect(res.json.mock.calls[0][0].msg.err).toEqual(null)



            });

            it('should test', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const InvoicesDB = {

                    find: jest.fn((data) => {
                        id = data;
                        return {
                            where: (data) => {
                                return {
                                    equals: (data) => {

                                        return {
                                            exec: (callbacks) => {
                                                callbacks(null, invoice)
                                                return (invoice)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }),
                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks('test to create Error', null)

                    })
                }


                await invoicetHandle({ InvoicesDB }).delete(req, res)


                expect(res.status.mock.calls).toEqual([
                    [500]
                ])

                expect(res.json.mock.calls[0][0].ok).toEqual(false)
                expect(res.json.mock.calls[0][0].msg.m).toEqual('Server Error, or Invoice id not closed')
                expect(res.json.mock.calls[0][0].msg.err).toEqual('test to create Error')


            });
        })


    })
})