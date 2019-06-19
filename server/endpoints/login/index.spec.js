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

        // test no methos POST
        describe('POST', () => {
            it('should  Login', async() => {

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

            it('should Login Error Server', async() => {

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

            it('should Login Error In database', async() => {

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


    })
})