var Reflux=require('reflux');

var NoteActions = Reflux.createActions([
    "createNote",
    "editNote",
    "deleteNote",
    "getNotes"
]);

module.exports=NoteActions;