/*!
 * Files
 * Front End Development Recuitment Homework
 * http://izebb.com
 * @author gabriel izebhigie
 * @version 1.0.0
 *  React Component for files  action buttons,
 * Copyright 2016.  licensed.
 */
var React = require('react');
var ReactDOM =require('react-dom')
var FileView = require('./file.jsx');
var classNames = require('classnames');

// Mixin for Backbone collection
var mixin = {
        // Force update when collection is updated
        componentDidMount: function () {
            this.getCollections().forEach(function (collection) {
                console.log(collection);
                collection.on('add remove change', this.forceUpdate.bind(this, null));
            }, this);
        },
        // Cleanup events
        componentWillUnmount: function () {
            this.getCollections().forEach(function (collection) {
                collection.off(null, null, this);
            }, this);
        }
};
//FilesView contains brings all the components together
var FilesView  = React.createClass({
    mixins: [mixin],
    getCollections: function (){
        return [this.props.files];
    },
    //  React initail state
    getInitialState: function (){
        console.log(this.props.files.getSelected().length)
        return {
            editing: null,
            isCreating: null,
            selectAll:false,
            disabled: this.props.files.getSelected().length == 0
        }
    },
    // on Editing File
    editFile: function (file, callback){
        this.setState({editing: idx}, callback);
    },
    // on Renaming  File
    onRenameFile:function(){
        this.props.files.getSelected().forEach(function(model){
            model.edit();
        })
    },
    // Select all the files
    toggleAll: function (){
        var scope = this;
        this.setState({selectAll: !this.state.selectAll})
        if(this.state.selectAll){
             this.props.files.each(function(model){
                model.unselect();
            })
         }else{
            this.props.files.each(function(model){
                model.select();
            })
         }

        this.setState({disabled: this.props.files.getSelected().length == 0})
    },
    // Delete files Function
    onDeleteFile: function (){
        var  scope = this;
        if( this.props.files.getSelected().length && window.confirm('Are you sure you want to delete this file?')){
            this.props.files.getSelected().forEach(function(model){
                var removed = scope.props.files.remove(model.get('id'))
            });
        }
         this.setState({disabled: this.props.files.getSelected().length == 0})
    },
     // Select a Single File
    toggleFile: function( file, ev){
        file.toggle();
        if(this.props.files.getSelected().length === this.props.files.length){
            this.setState({selectAll:true});
        }else{
            this.setState({selectAll:false});
        }
       this.setState({disabled: this.props.files.getSelected().length == 0})
    },
    openNewFolderForm:function(){
        this.setState({isCreating:true});
    },
    createFolder: function (ev){
        ev.preventDefault();
        var file = ReactDOM.findDOMNode(this.refs.folderName);
        this.props.files.push({
            name: file.value,
            id:this.props.files.length+1
        })
        console.log(this.props.files.length)
        this.setState({isCreating:false});

    },
    cancelSave: function (){
        this.setState({isCreating:false});
    },
    render: function(){
        var self = this;

        return (
            <div className="container  ">
                <div className="clearfix action_container ">
                    <div className="col-md-1">
                        <input type="checkbox" onChange={this.toggleAll} checked={this.state.selectAll} />
                    </div>
                    <div className="col-md-11">
                        <div className={(classNames({
                                edit: this.state.isCreating
                            }))}>
                            <div>
                                <button className="rename btn btn-info" onClick={this.onRenameFile}
                                disabled={this.state.disabled?true:false}>Rename</button>
                                <button
                                    className=" delete btn btn-danger"
                                    onClick={this.onDeleteFile}
                                disabled={this.state.disabled?true:false}>
                                    Delete
                                </button>

                                <button
                                    className=" pull-right  btn btn-primary"
                                    onClick={this.openNewFolderForm}
                                    >
                                    New button
                                </button>
                            </div>
                            <form className="new_folder" onSubmit={this.createFolder}>
                                <input className="form-control"  type="text" defaultValue="New Folder" placeholder="Name of Folder" ref="folderName"/>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-success save-btn " >Save</button>
                                        <button type="button" className="btn btn-default " onClick={this.cancelSave}>Cancel</button>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="clearfix  folder_container">
                    <div>
                        {this.props.files.map(function(file, idx){
                              return (  <FileView
                                    file={file}
                                    key={file.get('id')}
                                    editFile = {self.editFile.bind(null, file, idx)}
                                    editing={self.state.editing}
                                    onToggle = {self.toggleFile.bind(null, file)}
                                />)
                        })}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = FilesView;