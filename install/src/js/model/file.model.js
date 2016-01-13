
var Backbone = require('backbone');
var _ = require('underscore');

var  fileModel = Backbone.Model.extend({
        defaults: {
            name: '',
            extension: '',
            size: '',
            selected: false,
            editing: false
        },
        edit: function(){
            this.set('editing', true)
        },
        stopEdit: function() {
            this.set('editing', false)
        },
        toggle: function(){
            this.set('selected', !this.get('selected'))
        },
        unselect: function(){
            this.set('selected', false)
        },
        select: function(){
            this.set('selected', true)
        },

    });
module.exports = fileModel;