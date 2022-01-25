var EmailSender = require('../helpers/EmailSender');

module.exports = class ContactService {

    static async sendEmail(item) {
      if(!item.id){
        item.id = 1;
      }
      var to = item.id == 1 ? 'parrarojasandresfelipe@gmail.com' : 'johnarlinton@gmail.com'
      item.names = !item.names ? 'Anonym :(' : item.names
      item.email = !item.email ? 'Anonym :(' : item.email
      if(!item.id){
        throw Error('You must have enter a id')
      }
      if(!item.message){
        throw Error('You must have send a message')
      }
      console.log(to, item)
      return EmailSender.sendContact(to, item.names, item.email, item.message);
    }
}