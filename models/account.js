const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcrypt");

const accountSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,'Please enter valid email']
    },
    password:{
        type:String,
        required:true,
        validate:[validator.isStrongPassword,'Please enter a strong password']
    },
    subscription:{
      type:String,
      enum: ['free','pro'],
      default: 'free'
    },
    createdDate:{
      type:String
    },
    status:{
      type:String,
      enum:['verification','active'],
      default:'verification'
    }
},{strict:false});

accountSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});


accountSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Username");
};


const Account = mongoose.model("account",accountSchema);

module.exports = Account;
