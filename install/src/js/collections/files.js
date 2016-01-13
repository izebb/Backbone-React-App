
var Backbone = require('backbone');
var _ = require('underscore');
var fileModel = require('../model/file.model');
var Files = Backbone.Collection.extend({
        // Reference to this collection's model.
        model: fileModel,
        getSelected: function(){
            return this.where({selected: true})
        }
});
    // Create our global collection of **Todos**.
module.exports= Files;
