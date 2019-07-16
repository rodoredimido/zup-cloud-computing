const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;


let serviceShema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es nesesario']
    },
    type: {
        type: String,
        required: [true, 'El type es nesesario']
    },
    value: {
        type: String,
        //unique: true,
        required: [true, 'El email es necesario']
    },
    count: {
        type: Number,
        default: 1
    },
    value_type: {
        type: String,
        //unique: true,
        //required: [true, '']
    }
});

serviceShema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}



module.exports = mongoose.model('Servicos', serviceShema);