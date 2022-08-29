const mongoose = require('mongoose')

const UserTransactionInfo = new mongoose.Schema({
    accountId:{
        type: String
    },
    transferId:{
        type: String
    },
    transactionId:{
        type: String
    },
    cart:{
        type: Array,
        default: []
    },
    amount:{
        type: Number
    },
    orderID:{
        type: String
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('transactionInfo', UserTransactionInfo)