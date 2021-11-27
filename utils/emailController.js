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
};


module.exports.sendEmailVerificationLink = function(username,email,verificationToken,callback)
{
    let bodycontent = `Hi ${username}, Please verify your LinkedList Account <br> <br>`;
    bodycontent+=`Verification URL <br> http://localhost/verify?token=${verificationToken}`;

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
