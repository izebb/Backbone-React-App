var React = require('react');
var FilesView = require('./files.jsx');
var AppView  = React.createClass({
    render: function(){
        return (
            <FilesView files={this.props.files}/>
        );
    }
});

module.exports = AppView;