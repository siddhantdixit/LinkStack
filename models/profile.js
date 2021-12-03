const mongoose = require('mongoose');
const {Link,linkSchema} = require('./link');

const profileSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        unique:true
    },
    title:{
        type:String
    },
    bio:{
        type:String
    },
    totalViews:{
        type:Number,
        default:0,
    },
    links:[linkSchema]
})

const Profile = mongoose.model('profile',profileSchema);

module.exports = Profile;