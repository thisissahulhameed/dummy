const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    age: Number,
    fathername: String,
    mothername: String,
    gender:String,
    religion: String,
    caste: String,
    occupation: String,
    aadhar: Number,
    pan: Number,
    address: String,
    bank: String,
    loan_type: String,
    loan_amt : Number

})

const detailModel = mongoose.model('detail',detailSchema)

module.exports = {detailModel}