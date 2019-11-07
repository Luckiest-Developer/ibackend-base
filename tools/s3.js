var uuidv4 = require('uuid/v4');
var aws = require('aws-sdk');
var s3 = new aws.S3();

var config = require('../config');


s3.config.update({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    signatureVersion: config.AWS_SIGNATURE_VERSION,
    region: config.AWS_REGION
});

let getUploadURL = (path, callback) => {

    var params = {
        Bucket: S3_DEFAULT_BUCKET,
        Key: path,
        Expires: 100,
    };
    s3.getSignedUrl('putObject', params, function(err, sinedURL){
        if(err) {
            callback(err);
        } else {
            callback(null, sinedURL);
        }
    });
};

let getDownloadURL = (path, callback) => {
    var params = {
        Bucket: S3_DEFAULT_BUCKET,
        Key: path,
        Expires: 100,
    };
    s3.getSignedUrl('getObject', params, function(err, sinedURL){
        if(err)
            callback(err);
        else 
            callback(null, sinedURL);
    })
};

let deleteFile = (path, callback) => {
    var params = {
        Bucket: config.S3_DEFAULT_BUCKET,
        Delete: {
            Objects: [
                {
                    Key: path 
                }
            ]
        }
    };
    s3.deleteObjects(params, function(err){
        if(err)
            callback(err);
        else
            callback(null);
    })
};

module.exports = {
    getUploadURL,
    getDownloadURL,
    deleteFile
}