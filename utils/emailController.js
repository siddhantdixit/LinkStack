const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'projectlinkedlist@gmail.com',
    pass: 'Lh6RuSma6FT4s7b'
  }
});

let mailOptions = {
  from: 'ProjectLinkedList <projectlinkedlist@gmail.com>',
  to: 'siddhant.dixit23@gmail.com',
  subject: 'Account Verification',
  html: 'Hi Buddy, Please verify your LinkedList Account <br> <br>'
};


module.exports.sendEmailVerificationLink = function(email,verificationToken,callback)
{
    // mailOptions.to = email;
    mailOptions.html+= `Verification URL <br> ${verificationToken}`;
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
