/*!
 * Files
 * Front End Development Recuitment Homework
 * http://izebb.com
 * @author gabriel izebhigie
 * @version 1.0.0
 *  React Component for file  action buttons,
 * Copyright 2016.  licensed.
 */
var React = require('react');
var ReactDOM =require('react-dom')
var classNames = require('classnames');

var FileView  = React.createClass({
    getInitialState: function () {
        return {
            name:this.props.file.get('name'),
            editing: this.props.editing
        };
    },
    // Select a  File uses props from files.jsx
    onSelectFile:function(evt){
        this.props.editFile(function(){
        }.bind(this));
    },
    // Cancel update
    cancelSave: function (){
        var file = ReactDOM.findDOMNode(this.refs.fileName);
        this.props.file.set('name', file.defaultValue);
        file.value = this.props.file.get('name');
        this.props.file.stopEdit();
    },
    // Update file function
    updateFile: function(ev){
        ev.preventDefault();
        var file = ReactDOM.findDOMNode(this.refs.fileName);
        file.defaultValue = file.value;
        this.props.file.set('name', file.value);
        this.props.file.set('editing', false);
        this.setState({name: file.value});
    },
    render: function(){
        return (
            <div className={
                (classNames({
                    edit: this.props.file.get('editing'),
                    file_wrapper: true,
                    clearfix: true
                }))
            }>
                <div className="col-md-1">
                    {!this.props.file.get('editing')?
                    <input type="checkbox" onChange={this.props.onToggle}
                    checked={this.props.file.get('selected')}/> : ""
                    }
                </div>
                <div className="col-md-11">
                    <div className="file-label">
                        {this.state.name}
                    </div>
                    <form className="edit_form" onSubmit={this.updateFile}>
                        <input className="form-control" ref="fileName" type="text" defaultValue={this.props.file.get('name')} />
                        <div className="form-group">
                            <button type="submit" className="btn btn-success save-btn ">Save</button>
                            <button type="button" className="btn btn-default " onClick={this.cancelSave}>Cancel</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
});
module.exports = FileView;