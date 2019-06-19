// ,
//     device: {
//         type: Schema.Types.ObjectId,
//         ref: 'Device'
//     }

const mongoose = require('mongoose');
require('mongoose-double')(mongoose);

mongoose.set('useCreateIndex', true);


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema;

const SchemaTypes = mongoose.Schema.Types;

let servicosSchema = new Schema({
    count: {
        type: Number,
        default: 1
    },
    servicos: {
        type: Schema.Types.ObjectId,
        ref: 'Servicos'
    }

})

let invoiceShema = new Schema({
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Clientes',
        required: true
    },
    // servicos: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'Servicos'
    // },
    servicos: [servicosSchema],
    value: {
        type: SchemaTypes.Double,
        require: true
    },
    value_type: {
        type: String
    },
    status: {
        type: String,
        default: 'open'
    }
});

invoiceShema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}



module.exports = mongoose.model('Faturas', invoiceShema);