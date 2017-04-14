'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var NoteSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notes', NoteSchema);