var nodemailer = require('nodemailer');
// var inlineBase64 = require('nodemailer-plugin-inline-base64');

var config = require('../config');

module.exports = class EmailSender {

  static async sendContact(to, names, email, message) {

    this.transporter = nodemailer.createTransport(config.mail_settings);

    // this.transporter.use('compile', inlineBase64({ cidPrefix: 'somePrefix_' }));

    var ejs = require('ejs')
    
    var data = {
      names,
      email,
      message
    };

    var transporter = this.transporter;
    
    var html = await ejs.renderFile('email_templates/contact.ejs', data).then(output => output);
    var mailOptions = {
      from: 'Briefcase 😄:)',
      subject: 'Briefcase contact message 😏',
      to: to,
      html: html
    };

    return transporter.sendMail(mailOptions).then(output => 'Email sent')
  }
}