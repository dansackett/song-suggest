var AppDispatcher   = require('../dispatcher/AppDispatcher');
var AppConstants    = require('../constants/AppConstants');

var AppActions = {
    // Get track data
    getTracksSimilar: function(artist, track) {
        AppDispatcher.handleAction({
            actionType: AppConstants.GET_TRACKS_SIMILAR,
            artist: artist,
            track: track
        })
    },

    // Update user input
    updateInput: function(key, value) {
        AppDispatcher.handleAction({
            actionType: AppConstants.UPDATE_INPUT,
            key: key,
            value: value
        })
    },

    // Update results visiblity
    updateHasResults: function(value) {
        AppDispatcher.handleAction({
            actionType: AppConstants.UPDATE_HAS_RESULTS,
            value: value
        })
    }
};

module.exports = AppActions;
