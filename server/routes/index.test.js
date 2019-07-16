process.env.NODE_ENV = 'dev'
require('../configs/configs')
const request = require('supertest')
const app = require('../../server')
const URI = '/api/v1/'
let token = ''
let clienteId = '';
describe('Server', () => {
    describe('Endpoints', () => {
        describe('login', () => {
            it('create login and get token', async() => {
                // generano login 
                const response = await request(app)
                    .post(`${URI}login`)
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({
                        email: 'root',
                        password: '123456'
                    })
                    // console.log(response.status);
                let body
                try {
                    body = JSON.parse(response.res.text)
                        // salvando el tocken 
                    token = body.token
                } catch (error) {
                    // Error En el objeto
                    expect('ok').toEqual('false')
                }
                expect(response.status).toEqual(201)
                expect(body.ok).toEqual(true)
                    // console.log(response.res.text)

            });

            it('create login err', async() => {
                // generano login 
                const response = await request(app)
                    .post(`${URI}login`)
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({
                        email: 'other',
                        password: 'other'
                    })
                    // console.log(response.status);
                    //let body

                expect(response.status).toEqual(400)

                // console.log(response.res.text)

            });
        })

        describe('CLIENTES', () => {
            it('create a new Cliente', async() => {

                const cliente = {
                        name: 'test_integration',
                        address: 'test_address',
                        email: 'test_email',
                        cnpj: 'test_cnpj',
                        phone: 'test_phone',
                        img: 'test_img'
                    }
                    // generano login 
                const response = await request(app)
                    .post(`${URI}clientes`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send(cliente)

                expect(response.status).toEqual(201)
                expect(response.body.ok).toEqual(true)
                expect(response.body.msg).toEqual('Client test_integration saved')
                    // console.log(response.res.text)

            });

            it('create a duplicate Cliente', async() => {

                const cliente = {
                        name: 'test_integration',
                        address: 'test_address',
                        email: 'test_email',
                        cnpj: 'test_cnpj',
                        phone: 'test_phone',
                        img: 'test_img'
                    }
                    // generano login 
                const response = await request(app)
                    .post(`${URI}clientes`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send(cliente)

                expect(response.status).toEqual(500 || 400)


            });
            it('GET  Clientes', async() => {


                // generano login 
                const response = await request(app)
                    .get(`${URI}clientes`)
                    .set('token', token) // se usa para setearel headers
                    // .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send()

                try {
                    const client = response.body.data.filter((user) => {
                        return user.email === 'test_email'
                    })
                    clienteId = client[0]._id;
                } catch (error) {

                }



                expect(response.status).toEqual(200)


            });

            it('GET  Cliente by id', async() => {


                // generano login 
                const response = await request(app)
                    .get(`${URI}clientes/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    // .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send()


                expect(response.status).toEqual(200)


            });

            it('PUT  edit Cliente by id', async() => {


                // generano login 
                const response = await request(app)
                    .put(`${URI}clientes/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({ name: 'test_integration_edited' })


                expect(response.status).toEqual(204)


            });



            it('DELETE  edit Cliente by id', async() => {


                // generano login 
                const response = await request(app)
                    .delete(`${URI}clientes/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({ name: 'test_integration_edited' })


                expect(response.status).toEqual(204)


            });
            it('PUT ERROR edit Cliente by id ', async() => {


                // generano login 
                const response = await request(app)
                    .put(`${URI}clientes/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({ name: 'test_integration_edited' })


                expect(response.status).toEqual(400)


            });
        })

        describe('SERVICES', () => {
            it('create a new Service', async() => {


                const cervico = {
                        name: 'test_integration',
                        type: 'test_type',
                        value: 122.123,
                        value_type: 'value_type'
                    }
                    // generano login 
                const response = await request(app)
                    .post(`${URI}services`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send(cervico)
                    // console.log(response.status);

                expect(response.status).toEqual(201)
                expect(response.body.ok).toEqual(true)
                expect(response.body.msg).toEqual('Servico test_integration is created')
                    // console.log(response.res.text)

            });


            it('GET  Services', async() => {


                // generano login 
                const response = await request(app)
                    .get(`${URI}services`)
                    .set('token', token) // se usa para setearel headers
                    // .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send()

                try {
                    const service = response.body.data.filter((user) => {
                        return user.type === 'test_type'
                    })
                    clienteId = service[0]._id;
                } catch (error) {
                    expect('ok').toEqual('false')
                }



                expect(response.status).toEqual(200)


            });

            it('GET  Service by id', async() => {


                // generano login 
                const response = await request(app)
                    .get(`${URI}services/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    // .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send()


                expect(response.status).toEqual(200)


            });

            it('PUT  edit Service by id', async() => {


                // generano login 
                const response = await request(app)
                    .put(`${URI}services/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({ name: 'test_integration_cervice_edited' })


                expect(response.status).toEqual(204)


            });



            it('DELETE  edit service by id', async() => {


                // generano login 
                const response = await request(app)
                    .delete(`${URI}services/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({ name: 'test_integration_edited' })


                expect(response.status).toEqual(204)


            });
            it('PUT ERROR edit Service by id ', async() => {


                // generano login 
                const response = await request(app)
                    .put(`${URI}services/${clienteId}`)
                    .set('token', token) // se usa para setearel headers
                    .set('Content-Type', 'application/json') // se usa para setearel headers
                    .send({ name: 'test_integration_edited' })


                expect(response.status).toEqual(400)


            });
        })
    })
})