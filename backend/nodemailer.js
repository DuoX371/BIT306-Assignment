const nodemailer = require('nodemailer');
const user = `choojiahan@gmail.com`
const pass = `lcnssgoifuktglht`

module.exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: user, // generated ethereal user
    pass: pass, // generated ethereal password
  },
});

// module.exports.transporter = nodemailer.createTransport({
//     host: "smtp-relay.sendinblue.com",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: user, // generated ethereal user
//       pass: pass, // generated ethereal password
//     },
//   });
