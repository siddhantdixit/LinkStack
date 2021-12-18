const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    orderid: {
        type: String,
        unique: true
    },
    userid: {
        type: String
    }
})

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;