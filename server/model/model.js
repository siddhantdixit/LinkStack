const mongoose=require('mongoose');

var schema=new mongoose.Schema({
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
});

const Userdb=mongoose.model('userdb',schema);

module.exports=Userdb;