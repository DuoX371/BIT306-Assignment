const nodemailer = require('nodemailer');
const user = `choojiahan@gmail.com`
const pass = `0L8sFDNd9QMCAYxg`

module.exports.transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: user, // generated ethereal user
      pass: pass, // generated ethereal password
    },
  });
