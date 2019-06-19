const usersHandle = require('./index')

// cliente De test
const client = {
    name: "Rodolfo",
    address: "uberlandia roosevelt",
    email: "rodolfo@rodolfo.com",
    cnpj: "11.222.333/4444-55",
    phone: "(34)988575307",
    img: "https://img.com"
}

class Users {

    constructor() {}

    save(callbacks) {
        return callbacks(null, client)
    }
}

class UsersErr {

    constructor() {}

    save(callbacks) {
        return callbacks('TEst error 500 server', client)
    }
}

class UsersDBErr {

    constructor() {}

    save(callbacks) {
        return callbacks(null, null)
    }
}

// descrição do test
describe("Endpoints", () => {
    describe('Users', () => {
        describe('GET', () => { // test no methods GET
                it('should get users', async() => {
                    const req = {
                        body: client
                    }

                    const res = {
                        status: jest.fn().mockReturnThis(),
                        json: jest.fn().mockReturnThis()
                    }



                    const UsuariosDB = {
                            find: jest.fn((data, callbacks) => {
                                return callbacks(null, client)
                            })
                        }
                        // const next = jest.fn();


                    await usersHandle({ UsuariosDB }).get(req, res)


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

                    const UsuariosDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, client)
                        })
                    }



                    await usersHandle({ UsuariosDB }).get(req, res)


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

                    const UsuariosDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(null, null)
                        })
                    }



                    await usersHandle({ UsuariosDB }).get_unit(req, res)


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

                    const UsuariosDB = {

                        find: jest.fn((data, callbacks) => {
                            return callbacks(123456, null)
                        })
                    }


                    await usersHandle({ UsuariosDB }).get_unit(req, res)


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



                    const UsuariosDB = {
                        find: jest.fn((data, callbacks) => {
                            return callbacks(11, client)
                        })
                    }


                    await usersHandle({ UsuariosDB }).get(req, res)


                    expect(res.sendStatus.mock.calls).toEqual([
                        [500]
                    ])

                });


            })
            // test no methos POST
        describe('POST', () => {
            it('should create CLient', async() => {

                const req = {
                    body: client
                }

                const res = {
                    status: jest.fn().mockReturnThis(),
                    json: jest.fn().mockReturnThis()
                }

                const UsuariosDB = Users

                const bcrypt = {
                    hashSync: jest.fn((pass, level) => {
                        return pass + level
                    })
                }


                await usersHandle({ UsuariosDB, bcrypt }).post(req, res)

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

                const UsuariosDB = UsersErr

                const bcrypt = {
                    hashSync: jest.fn((pass, level) => {
                        return pass + level
                    })
                }


                await usersHandle({ UsuariosDB, bcrypt }).post(req, res)

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

                const UsuariosDB = UsersDBErr
                    // const next = jest.fn();
                const bcrypt = {
                    hashSync: jest.fn((pass, level) => {
                        return pass + level
                    })
                }

                await usersHandle({ UsuariosDB, bcrypt }).post(req, res)

                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ]);
                expect(res.json.mock.calls).toEqual([]);

            });
        })

        //test no methos PUT
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


                    const UsuariosDB = {

                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            return callbacks(null, client)
                        })
                    }
                    await usersHandle({ UsuariosDB }).put(req, res)

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


                    const UsuariosDB = {

                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {

                            return callbacks(1234, null)
                        })
                    }
                    await usersHandle({ UsuariosDB }).put(req, res)

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


                    const UsuariosDB = {

                        findByIdAndUpdate: jest.fn((id, config, data, callbacks) => {
                            if (id !== '1244223') {
                                return callbacks(null, null)

                            } else {
                                return callbacks(null, client)
                            }
                        })
                    }
                    await usersHandle({ UsuariosDB }).put(req, res)

                    expect(res.sendStatus.mock.calls).toEqual([
                        [400]
                    ])
                    expect(res.json.mock.calls).toEqual([])
                });
            })
            //test no method  DELETE
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

                const UsuariosDB = {

                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks(null, client)

                    })
                }



                await usersHandle({ UsuariosDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                    [204]
                ])


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

                const UsuariosDB = {

                    deleteOne: jest.fn((id, config, callbacks) => {
                        if (id !== '11223344') {
                            return callbacks(null, null)
                        } else {
                            return callbacks(null, client)

                        }

                    })
                }



                await usersHandle({ UsuariosDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                    [400]
                ])




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

                const UsuariosDB = {

                    deleteOne: jest.fn((id, config, callbacks) => {

                        return callbacks(12345, null)

                    })
                }


                await usersHandle({ UsuariosDB }).delete(req, res)


                expect(res.sendStatus.mock.calls).toEqual([
                    [500]
                ])

            });
        })


    })
})