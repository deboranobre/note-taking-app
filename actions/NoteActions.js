var Reflux=require('reflux');

var NoteActions = Reflux.createActions([
    "createNote",
    "editNote",
    "getNotes"
]);

module.exports=NoteActions;