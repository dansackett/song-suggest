var React           = require('react');
var AppActions      = require('../actions/AppActions');
var AppStore        = require('../stores/AppStore');
var SearchForm      = require('../components/SearchForm.react');
var SearchResults   = require('../components/SearchResults.react');

function getAppState() {
    return {
        tracks: AppStore.getTracks(),
        artist: AppStore.getArtist(),
        hasResults: AppStore.hasResults(),
        track: AppStore.getTrack(),
        error: AppStore.getError()
    };
}

var App = React.createClass({
    getInitialState: function() {
        return getAppState();
    },

    sendRequest: function() {
        AppActions.getTracksSimilar(this.state.artist, this.state.track);
        AppActions.updateHasResults(true);
    },

    newSearch: function() {
        AppActions.updateHasResults(false);
        AppActions.updateInput('artist', '');
        AppActions.updateInput('track', '');
    },

    componentDidMount: function() {
        AppStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AppStore.removeChangeListener(this._onChange);
    },

    handleInputChange: function(e) {
        AppActions.updateInput(e.target.name, e.target.value);
    },

    render: function() {
        return (
            <div className="wrapper">
                <h1>Song Suggest</h1>
                <p>Have a song you're digging? Let's find some like it!</p>
                <div className={this.state.error ? 'alert alert-danger' : 'hide'} role="alert">
                    <strong>Oh snap!</strong> {this.state.error}
                </div>
                <SearchForm
                    artist={this.state.artist}
                    track={this.state.track}
                    hasResults={this.state.hasResults}
                    handleInputChange={this.handleInputChange}
                    sendRequest={this.sendRequest}
                    newSearch={this.newSearch}
                />
                <SearchResults
                    tracks={this.state.tracks}
                    hasResults={this.state.hasResults}
                />
            </div>
        );
    },

    _onChange: function() {
        this.setState(getAppState());
    }
});

module.exports = App;
