var React = require('react');

var SearchResults = React.createClass({
    render: function() {
        var hasResults = this.props.hasResults;

        return (
            <div className="clearfix">
            <hr />
            {this.props.tracks.map(function(track, index) {
                var image = 'http://placehold.it/136x136';

                if (typeof track.image !== 'undefined') {
                    var image = track.image[2]['#text'];
                }

                return (
                    <div className={hasResults ? 'info pull-left' : 'info pull-left hide'} key={index}>
                        <img src={image} className="clearfix thumbnail" />
                        <div className="pull-left caption">
                            <span className="artist-name">
                                <a href={track.artist.url}>{track.artist.name}</a>
                            </span>
                            <p className="track-name">{track.name}</p>
                        </div>
                    </div>
                );
            })}
            </div>
        );
    }
});

module.exports = SearchResults;
