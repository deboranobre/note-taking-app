/**
 * Created by Sandeep on 06/10/14.
 */
var Reflux=require('reflux');
var request=require('superagent');
var NoteActions=require('../actions/NoteActions');

var _notes=[];

var NoteStore = Reflux.createStore({

    init: function() {
        this.listenTo(NoteActions.createNote, this.onCreate);
        this.listenTo(NoteActions.editNote, this.onEdit);
        this.listenTo(NoteActions.getNotes, this.onGetNotes);
    },

    getInitialState: function() {
        return this.data;
    },

    onCreate: function(note) {
        request
            .post('/notes')
            .send(note)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (!err) { 
                    _notes.push(note);
                    this.trigger(_notes);
                }
        });
    },

    onEdit: function(note) {
        request
            .put('/notes/'+note._id)
            .send(note)
            .set('Accept', 'application/json')
            .end((err, res) => {
                if (!err) { 
                    for(var i=0;i<_notes.length;i++){
                        if(_notes[i]._id===note._id){
                            _notes[i].text=note.text;
                            this.trigger({notes: _notes});
                            break;
                        }
                    }
                }
        });
    },
    
    getNotes:function(){
        
        request
            .get('/notes')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
                if (err) {
                    return new Error(err);
                }

                _notes = res.body;
                this.trigger({notes: _notes});
         });
    },

    getNote:function(id){
        for(var i=0;i<_notes.length;i++){
            if(_notes[i]._id===id){
                return _notes[i];
            }
        }
    }

});

module.exports=NoteStore;