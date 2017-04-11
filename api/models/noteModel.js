'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NoteSchema = new Schema({
  name: {
    type: String,
    Required: 'Kindly enter the name of the note'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },  
  description: {
    type: String,
    Required: 'Kindly enter some note'
  }
});

module.exports = mongoose.model('Notes', NoteSchema);