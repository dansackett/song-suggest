var React           = require('react');

var SearchForm = React.createClass({
    render: function() {
        return (
            <div>
                <div className={!this.props.hasResults ? 'form' : 'form hide'}>
                    <div className="form-element">
                        <label htmlFor="name">Artist</label>
                        <input onChange={this.props.handleInputChange} ref="artist" type="text" value={this.props.artist} name="artist" placeholder="ex. Bon Iver" />
                    </div>
                    <div className="form-element">
                        <label htmlFor="track">Track</label>
                        <input onChange={this.props.handleInputChange} ref="track" type="text" value={this.props.track} name="track" placeholder="ex. Skinny Love" />
                    </div>
                    <a href="javascript:;" className="send-button" onClick={this.props.sendRequest}>Search</a>
                </div>

                <div className={this.props.hasResults ? 'form' : 'form hide'}>
                    <a href="javascript:;" className="send-button" onClick={this.props.newSearch}>New Search</a>
                </div>
            </div>
        );
    }
});

module.exports = SearchForm;
