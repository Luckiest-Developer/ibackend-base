var elasticsearch = require('elasticsearch');
var config = require('../config')

var client = new elasticsearch.Client({
  host: config.ELASTICSEARCH_HOST,
  log: config.ELASTICSEARCH_LOG
});

let search = (index, type, q, callback) => {
    client.search({
        index: index,
        type: type,
        q: q
    }, (err, result) => {
        if(err) return callback(err);
        callback(null, result.hits.hits)
    })
};

module.exports = {
    search
}