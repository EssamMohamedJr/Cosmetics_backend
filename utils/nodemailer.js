  import nodemailer from 'nodemailer'
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

export const createOptions=(toEmail,baseURL,link)=>{
    var mailOptions = {
        from: process.env.EMAIL,
        to: `${toEmail}`,
        subject: 'verfication to skinCare account ',
        html: `<p>verify your account</p><a href="${baseURL}${link}">verify</a>`
      };
      return mailOptions
  }

export const sendEmail=(mailOptions)=>{
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

