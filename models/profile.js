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
    links:[linkSchema],
    handles: {
        email: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        youtube: { type: String },
        soundcloud: { type: String },
        bandcamp: { type: String },
        linkedin: { type: String },
        clubhouse: { type: String },
        substack: { type: String },
        whatsapp: { type: String },
        telegram: { type: String },
        signal: { type: String },
        twitch: { type: String },
        patreon: { type: String },
        cameo: { type: String },
        pinterest: { type: String },
        tiktok: { type: String },
        spotify: { type: String },
        amazon: { type: String },
        apple_music: { type: String },
        snapchat: { type: String },
        apple_podcast: { type: String },
        apple_appstore: { type: String },
        apple_playstore: { type: String },
        payment: { type: String },
        etsy: { type: String },
        poshmark: { type: String },
    }
})

const Profile = mongoose.model('profile',profileSchema);

module.exports = Profile;