const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
let Schema = mongoose.Schema;


let clientesShema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es nesesario']
    },
    address: {
        type: String,
        required: [true, 'El address es nesesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es necesario']
    },
    cnpj: {
        type: String,
        required: [true, 'La cnpj es necesaria']
    },

    phone: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    }
});

clientesShema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}



module.exports = mongoose.model('Clientes', clientesShema);