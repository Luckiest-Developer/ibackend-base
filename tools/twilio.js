
var config = require('../config');

const client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);

let sendSMS = (to, body, callback) => {
    client.messages.create({
        body: body,
        to: to,
        statusCallback: 'http://postb.in/1234abcd',
        from: config.TWILIO_FROM_NUMBER
    })
    .then((message) => callback(null, message))
    .catch((err) => callback(err))
};

module.exports = {
    sendSMS
};