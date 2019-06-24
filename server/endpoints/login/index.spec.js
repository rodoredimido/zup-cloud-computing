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


class Bcrypt {

    constructor() {
        this.users = {
            name: "Rodolfo",
            address: "uberlandia roosevelt",
            email: "rodolfo@rodolfo.com",
            cnpj: "11.222.333/4444-55",
            phone: "(34)988575307",
            img: "https://img.com"
        }

    }
    static hashSync(pass, level) {
        return true;
    }
    static compareSync(pass, level) {
        return true;
    }

}
class Users {



    constructor() {
        this.users = {
            name: "Rodolfo",
            address: "uberlandia roosevelt",
            email: "rodolfo@rodolfo.com",
            cnpj: "11.222.333/4444-55",
            phone: "(34)988575307",
            img: "https://img.com"
        }
    }

    static findOne(data, callbacks) {
        //callbacks
        return callbacks(null, client)
    }

    find(data, callbacks) {
        data
        return callbacks(null, this.users)
    }

    save(callbacks) {
        return callbacks(null, this.users)
    }

}

class UsersErr {

    constructor() {}

    static findOne(data, callbacks) {
        return callbacks('TEst error 500 server', null)
    }

    static save(callbacks) {
        return callbacks('TEst error 500 server', client)
    }
}

class UsersDBErr {

    constructor() {}

    static findOne(data, callbacks) {
        return callbacks(null, client)
    }

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

                // const UsuariosDB = Users
                UsuariosDB = Users

                console.log(UsuariosDB);
                // console.log(UsuariosDB);

                const bcrypt = Bcrypt;
                // {
                //     hashSync: jest.fn((pass, level) => {
                //         return pass + level
                //     }),
                //     compareSync: jest.fn((pass, level) => {
                //         return true
                //     })

                // }


                await usersHandle({
                    UsuariosDB,
                    bcrypt: Bcrypt,
                    jwt: {
                        sign: jest.fn(() => {
                            return 'funciono'
                        })
                    }
                }).post(req, res)
                expect(res.json.mock.calls[0][0].ok).toEqual(true);
                expect(res.json.mock.calls[0][0].token).toEqual('funciono');

                expect(res.status.mock.calls).toEqual([
                    [201]
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
                    }),
                    compareSync: jest.fn((pass, level) => {
                        return pass + level
                    })

                }


                await usersHandle({ UsuariosDB, bcrypt }).post(req, res)

                expect(res.status.mock.calls).toEqual([
                    [500]
                ]);
                expect(res.json.mock.calls[0][0].msg.m).toEqual('Internal Server Error');

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
                    }),
                    compareSync: jest.fn((pass, level) => {
                        return pass + level
                    })

                }

                await usersHandle({ UsuariosDB, bcrypt }).post(req, res)

                expect(res.status.mock.calls).toEqual([
                    [400]
                ]);
                expect(res.json.mock.calls[0][0].msg.m).toEqual('Incorrect User or Password');

            });
        })


    })
})