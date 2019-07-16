// ===========================
// Banco de dados
// ===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'
process.env.MONGO_USERNAME = process.env.MONGO_USERNAME || ''
process.env.MONGO_PASSWORD = process.env.MONGO_PASSWORD || ''
process.env.MONGO_URL = process.env.MONGO_URL || 'mongo'
let authMongo = ''

if (process.env.MONGO_USERNAME === '') {
    authMongo = ''
} else {
    authMongo = `${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@`
}

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cloud_comp';
} else {
    urlDB = `mongodb://${authMongo}${process.env.MONGO_URL}:27017/cloud_comp`;
    console.log('URL_DATABASE: ', urlDB);
}

process.env.URLDB = urlDB;



// ===========================
// VEncimiento del Token
// ===========================
// 60 segundos
// 60 minutos
// 24 Horas
// 30 días

process.env.CADUCIDAD_TOKEN = '48h';


// ===========================
// SEED de autentiación
// ===========================

process.env.SEED = process.env.SEED || 'este-es-el-seet-desarrollo';

// ===========================
// Google Client ID
// ===========================

process.env.CLIENT_ID = process.env.CLIENT_ID || 'GOOGLE_ID_OAUTH.apps.googleusercontent.com';