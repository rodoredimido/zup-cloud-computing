module.exports = ({ mongoose }) => ({
    get: (req, res) => {

        res.status(200).json({
            ok: true,
            data: [{
                id: 1,
                name: 'Algar telecom',
                endereco: 'uberlandia shopping',
                cnpj: 'XX.XXX.XXX/YYYY-ZZ',
                logo: 'https://logo.com'
            }]
        })
    },
    post: (req, res) => {

    },
    put: (req, res) => {

    },
    delete: (req, res) => {

    }
})