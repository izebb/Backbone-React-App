var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    _ = require("underscore");

 var AppView = require("./components/app.jsx"),
     fileModel = require('./model/file.model'),
    fileCollection = require("./collections/files.js"),
    mountNode  = document.getElementById('App')

var AppJsx = require('./components/app.jsx');
function SimpleListApp(){
    this.init = init;
}
function init(options){
    this.data = options.data;
    var files = new fileCollection(this.data.files);
    ReactDOM.render(<AppView files={files}/>, mountNode)
}
module.exports= SimpleListApp;