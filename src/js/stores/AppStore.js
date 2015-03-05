var AppDispatcher   = require('../dispatcher/AppDispatcher');
var API             = require('../utils/API');
var EventEmitter    = require('events').EventEmitter;
var AppConstants    = require('../constants/AppConstants');
var _               = require('underscore');

var _tracks = [],
    _artist = '',
    _hasResults = false,
    _errorMessage = null,
    _track = '';

function setInput(key, value) {
    if (key == 'artist') {
        _artist = value;
    }
    else {
        _track = value;
    }
    AppStore.emitChange();
}

function setHasResults(value) {
    _hasResults = value;
    AppStore.emitChange();
}

function setTracks(artist, track) {
    API.getTracksSimiliar(artist, track)
    .end(function(error, res) {
        if (res.body.error) {
            _errorMessage = 'Something went wrong. Make sure you supplied both an artist and track.';
            _hasResults = false;
        }
        else {
            _tracks = res.body.similartracks.track;
            _artist = artist;
            _track = track;
            _errorMessage = null;
        }

        AppStore.emitChange();
    });
}

var AppStore = _.extend({}, EventEmitter.prototype, {
    getTracks: function() {
        return _tracks;
    },

    getArtist: function() {
        return _artist;
    },

    getTrack: function() {
        return _track;
    },

    hasResults: function() {
        return _hasResults;
    },

    getError: function() {
        return _errorMessage;
    },

    // Emit change event
    emitChange: function() {
        this.emit('change');
    },

    // Add change listener
    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    // Remove change listener
    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case AppConstants.GET_TRACKS_SIMILAR:
            setTracks(action.artist, action.track);
            break;

        case AppConstants.UPDATE_INPUT:
            setInput(action.key, action.value);
            break;

        case AppConstants.UPDATE_HAS_RESULTS:
            setHasResults(action.value);
            break;

        default:
            return true;
    }

    return true;
});

module.exports = AppStore;
