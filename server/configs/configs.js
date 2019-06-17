// ===========================
// Banco de dados
// ===========================
process.env.NODE_ENV = 'dev'

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cloud_comp';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;