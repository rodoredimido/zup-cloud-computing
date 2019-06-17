const servicetHandle = require('./index')

// cliente De test
const service = {
    name: "Data Base",
    type: "Giga contratado",
    value: "20,00",
    value_type: "GB"
}

// descrição do test
describe("Endpoints", () => {
    describe('Servicos', () => {
        describe('GET', () => { // test no methods GET
                it('should get all services', async() => {
                    const req = {
                        body: service
                    }

                    const res = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }



                    const ServicosDB = {
                            find: jest.fn((data, callbacks) => {
                                return callbacks(null, service)
                            })
                        }
                        // const next = jest.fn();


                    await servicetHandle({ ServicosDB }).get(req, res)


                    expect(res.status.mock.calls).toEqual([
                        [200]
                    ])

                    expect(res.json.mock.calls).toEqual([
                        [{ ok: true, data: service }]
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

                    const ServicosDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, service)
                        })
                    }



                    await servicetHandle({ ServicosDB }).get(req, res)


                    expect(res.status.mock.calls).toEqual([
                        [200]
                    ])

                    expect(res.json.mock.calls).toEqual([
                        [{ ok: true, data: service }]
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

                    const ServicosDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, null)
                        })
                    }



                    await servicetHandle({ ServicosDB }).get_unit(req, res)


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

                    const ServicosDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(123456, null)
                        })
                    }


                    await servicetHandle({ ServicosDB }).get_unit(req, res)


                    expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])

                    expect(res.json.mock.calls).toEqual([])


                });

                it('should Server Error in Methos GET services ', async() => {


                    const req = {
                        body: service
                    }

                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }



                    const ServicosDB = {
                        find: jest.fn((data, callbacks) => {
                            return callbacks(11, service)
                        })
                    }


                    await servicetHandle({ ServicosDB }).get(req, res)


                    expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])

                });


            })
            // test no methos POST
        describe('POST', () => {
            it('should create a new service', async() => {

                const req = {
                    body: service
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const ServicosDB = jest.fn().mockResolvedValue({

                    save: (callbacks) => {
                        return callbacks(null, service)
                    }
                })


                await servicetHandle({ ServicosDB }).post(req, res)

                expect(res.status.mock.calls).toEqual([
                    [201]
                ]);
                expect(res.json.mock.calls).toEqual([
                    [{ ok: true, msg: 'Servico Data Base is created' }]
                ]);

            });

            it('should create Service e simuling Error Server', async() => {

                const req = {
                    body: service
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const ServicosDB = jest.fn().mockResolvedValue({

                    save: (callbacks) => {
                        return callbacks(123, service)
                    }
                })


                await servicetHandle({ ServicosDB }).post(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [500]
                ]);
                expect(res.json.mock.calls).toEqual([]);

            });

            it('should create service Error In database', async() => {

                const req = {
                    body: service
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const ServicosDB = jest.fn().mockResolvedValue({

                        save: (callbacks) => {
                            return callbacks(null, null)
                        }
                    })
                    // const next = jest.fn();


                await servicetHandle({ ServicosDB }).post(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ]);
                expect(res.json.mock.calls).toEqual([]);

            });
        })

        //test no methos PUT
        describe('PUT', () => {

                it('should Update a service for id', async() => {
                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: service
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const ServicosDB = {

                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks(null, service)
                        })
                    }
                    await servicetHandle({ ServicosDB }).put(req, res)

                    expect(res.sendStatus.mock.calls).toEqual([
                        [204]
                    ])
                });

                it('should not update Internal Server Error updating Service', async() => {
                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: service
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const ServicosDB = {

                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {

                            return callbacks(1234, null)
                        })
                    }
                    await servicetHandle({ ServicosDB }).put(req, res)

                    expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])
                    expect(res.json.mock.calls).toEqual([])
                });

                it('should not update service By Id Not Mach ', async() => {
                    const req = {
                        params: {
                            id: '1234567890'
                        },
                        body: service
                    }



                    const res = {
                        sendStatus: jest.fn().mockReturnThis(),
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }


                    const ServicosDB = {

                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            if (id !== '1244223') {
                                return callbacks(null, null)

                            } else {
                                return callbacks(null, client)
                            }
                        })
                    }
                    await servicetHandle({ ServicosDB }).put(req, res)

                    expect(res.sendStatus.mock.calls).toEqual([
                        [400]
                    ])
                    expect(res.json.mock.calls).toEqual([])
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
                    sendStatus: jest.fn().mockReturnThis()
                }

                const ServicosDB = {

                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks(null, service)

                    })
                }



                await servicetHandle({ ServicosDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])


            });

            it('should Delete a service error in Id no mach', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis()
                }

                const ServicosDB = {

                    deleteOne: jest.fn((id, config, callbacks) => {
                        if (id !== '11223344') {
                            return callbacks(null, null)
                        } else {
                            return callbacks(null, service)

                        }

                    })
                }



                await servicetHandle({ ServicosDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ])




            });

            it('should Delete servise,  Internal Server error', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis()
                }

                const ServicosDB = {

                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks(12345, null)

                    })
                }


                await servicetHandle({ ServicosDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                    [500]
                ])

            });
        })


    })
})