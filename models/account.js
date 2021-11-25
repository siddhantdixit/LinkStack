const mongoose = require('mongoose');
const validator = require('validator');

const accountSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:validator.isEmail
    },
    password:{
        type:String,
        required:true,
        validate:validator.isStrongPassword
    },
})