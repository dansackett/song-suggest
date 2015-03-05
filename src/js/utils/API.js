var API_KEY     = require('../utils/secrets').API_KEY;
var request     = require('superagent');

var BASE_URL = 'http://ws.audioscrobbler.com/2.0/';

function buildRequestUrl(params) {
    var options = '';

    for (param in params) {
        if (params[param] !== '') {
            options += (options == '') ? '?' : '&';
            options += param + '=' + params[param];
        }
    }

    return BASE_URL + options;
}

module.exports = {
    getTracksSimiliar: function(artist, track) {
        var params = {
            method: 'track.getsimilar',
            artist: artist,
            track: track,
            api_key: API_KEY,
            limit: '9',
            autocorrect: '1',
            format: 'json'
        };

        return request
            .get(buildRequestUrl(params))
            .set('Accept', 'application/json');
    }
}
