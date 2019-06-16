// const express = require('express');

// const app = express();
const clients = require('./clients');
module.exports = ({ mongoose, express }) => ({
    app: () => {
        const app = express();

        const handleClients = clients({ mongoose, express })
        app.use(handleClients.app())
        return app;
    }
})




//module.exports = app;