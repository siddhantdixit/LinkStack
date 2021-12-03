const mongoose = require('mongoose');

mongoose.set('autoCreate', false);

const linkSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
        
    },
    visibility:{
        type:String,
        required:true
    }
})

const Link = mongoose.model("link",linkSchema);

module.exports = {
    Link,
    linkSchema
};