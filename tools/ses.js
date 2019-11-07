var aws = require('aws-sdk');
var config = require('../config');


aws.config.update({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    signatureVersion: config.AWS_SIGNATURE_VERSION,
    region: config.AWS_REGION
});
  
let sendEmail = (toEmail, subject, body, callback) => {
    var params = {
        Destination: { 
            ToAddresses: [
                toEmail,
            ]
        },
        Message: { 
            Body: { 
                Html: {
                    Charset: "UTF-8",
                    Data: body
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        Source: config.SES_DEFAULT_SOURCE_EMAIL
    };
    var sendPromise = new aws.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    sendPromise.then((result) => callback(null, result)).catch((err) => callback(err));
  }
  
  module.exports = {
    sendEmail
  }
  