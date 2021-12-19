const nodemailer = require('nodemailer');
const { getAPIHostURL } = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projectlinkedlist@gmail.com',
    pass: process.env.EMAILPASSWORD
  }
});

let mailOptions = {
  from: 'LinkStack <projectlinkedlist@gmail.com>',
  to: 'siddhant.dixit23@gmail.com',
  subject: 'Account Verification',
};


module.exports.sendEmailVerificationLink = function(username,email,verificationToken,request,callback)
{
    let bodycontent = `Hi ${username}, Please verify your LinkedList Account <br> <br>`;
    bodycontent+=`Verification URL <br> ${getAPIHostURL(request)}/verify?token=${verificationToken}`;

    mailOptions.to = email;
    mailOptions.html = bodycontent;
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        callback(error);
      } else {
        console.log('Email sent: ' + info.response);
        callback(200);
      }
    }); 
}
