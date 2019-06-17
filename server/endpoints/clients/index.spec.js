const clientHandle = require('./index')

const client = {
    name: "Rodolfo",
    address: "uberlandia roosevelt",
    email: "rodolfo@rodolfo.com",
    cnpj: "11.222.333/4444-55",
    phone: "(34)988575307",
    img: "https://img.com"
}

describe("Endpoints", () => {
    describe('Clientes', () => {
        describe('GET', () => {
            it('should get users', async() => {
                const req = {
                    body: client
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }



                const CLientesDB = {
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, client)
                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).get(req, res)


                expect(res.status.mock.calls).toEqual([
                    [200]
                ])

                expect(res.json.mock.calls).toEqual([
                    [{ ok: true, data: client }]
                ])

            });

            it('should get user by id', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const CLientesDB = {
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, client)
                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).get(req, res)


                expect(res.status.mock.calls).toEqual([
                    [200]
                ])

                expect(res.json.mock.calls).toEqual([
                    [{ ok: true, data: client }]
                ])


            });

            it('should get user by id when 0 user', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const CLientesDB = {
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, null)
                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).get_unit(req, res)


                expect(res.status.mock.calls).toEqual([
                    [400]
                ])

                expect(res.json.mock.calls).toEqual([])


            });

            it('should get user by id when Internal Server error', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const CLientesDB = {
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        find: jest.fn((data, callbacks) => {
                            return callbacks(123456, null)
                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).get_unit(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                    [500]
                ])

                expect(res.json.mock.calls).toEqual([])


            });

            it('should Server Error in Methos GET ', async() => {


                const req = {
                    body: client
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }



                const CLientesDB = {
                        find: jest.fn((data, callbacks) => {
                            return callbacks(11, client)
                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).get(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])
                    //console.log(req);
            });


        })

        describe('POST', () => {
            it('should create CLient', async() => {

                const req = {
                    body: client
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const CLientesDB = jest.fn().mockResolvedValue({
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        save: (callbacks) => {
                            return callbacks(null, client)
                        }
                    })
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).post(req, res)

                expect(res.status.mock.calls).toEqual([
                    [201]
                ]);
                expect(res.json.mock.calls).toEqual([
                    [{ ok: true, msg: 'Client Rodolfo saved' }]
                ]);

            });

            it('should create CLient Error Server', async() => {

                const req = {
                    body: client
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const CLientesDB = jest.fn().mockResolvedValue({
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        save: (callbacks) => {
                            return callbacks(123, client)
                        }
                    })
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).post(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [500]
                ]);
                expect(res.json.mock.calls).toEqual([]);

            });

            it('should create CLient Error In database', async() => {

                const req = {
                    body: client
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    sendStatus: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const CLientesDB = jest.fn().mockResolvedValue({
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        save: (callbacks) => {
                            return callbacks(null, null)
                        }
                    })
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).post(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ]);
                expect(res.json.mock.calls).toEqual([]);

            });
        })

        describe('PUT', () => {

            it('should Update a Client', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    },
                    body: client
                }



                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }


                const CLientesDB = {
                    //find: jest.fn().mockResolvedValue({ data: client })
                    // find: jest.fn().mockReturnThis()
                    findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                        return callbacks(null, client)
                    })
                }
                await clientHandle({ CLientesDB }).put(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])
            });

            it('should not update Internal Server Error ', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    },
                    body: client
                }



                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }


                const CLientesDB = {
                    //find: jest.fn().mockResolvedValue({ data: client })
                    // find: jest.fn().mockReturnThis()
                    findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {

                        return callbacks(1234, null)
                    })
                }
                await clientHandle({ CLientesDB }).put(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [500]
                ])
                expect(res.json.mock.calls).toEqual([])
            });

            it('should not update By Id Not Mach ', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    },
                    body: client
                }



                const res = {
                    sendStatus: jest.fn().mockReturnThis(),
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }


                const CLientesDB = {
                    //find: jest.fn().mockResolvedValue({ data: client })
                    // find: jest.fn().mockReturnThis()
                    findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                        if (id !== '1244223') {
                            return callbacks(null, null)

                        } else {
                            return callbacks(null, client)
                        }
                    })
                }
                await clientHandle({ CLientesDB }).put(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ])
                expect(res.json.mock.calls).toEqual([])
            });
        })

        describe('DELETE', () => {

            it('should Delete a Client', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis()
                }

                const CLientesDB = {
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        deleteOne: jest.fn((id, config, callbacks) => {

                            return callbacks(null, client)

                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                        [204]
                    ])
                    //  console.log(CLientesDB.deleteOne.mock.calls);



            });

            it('should Delete a Client error in Id', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis()
                }

                const CLientesDB = {
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        deleteOne: jest.fn((id, config, callbacks) => {
                            if (id !== '11223344') {
                                return callbacks(null, null)
                            } else {
                                return callbacks(null, client)

                            }

                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                        [400]
                    ])
                    //  console.log(CLientesDB.deleteOne.mock.calls);



            });

            it('should Delete a Internal Server error', async() => {
                const req = {
                    params: {
                        id: '1234567890'
                    }
                }

                const res = {
                    sendStatus: jest.fn().mockReturnThis()
                }

                const CLientesDB = {
                        //find: jest.fn().mockResolvedValue({ data: client })
                        // find: jest.fn().mockReturnThis()
                        deleteOne: jest.fn((id, config, callbacks) => {

                            return callbacks(12345, null)

                        })
                    }
                    // const next = jest.fn();


                await clientHandle({ CLientesDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])
                    //  console.log(CLientesDB.deleteOne.mock.calls);



            });
        })


    })
})