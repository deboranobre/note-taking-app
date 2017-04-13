var React = require('react');
var Reflux = require('reflux');
var NoteList = require('./NoteList.jsx');
var NoteStore = require('../../stores/NoteStore');

var NoteListBox = React.createClass({
    mixins: [
        Reflux.connect(NoteStore)
    ],

    getInitialState:function(){
      return {notes:[]}
    },

    componentDidMount: function() {
        NoteStore.getNotes();
    },

    componentWillUnmount: function() {
        this.unsubscribe();
    },

    onAdd:function(event){
        event.preventDefault();
        this.props.onAdd();
        this.refs.noteList.setActiveNote(null);
    },

    render: function() {
        return (
            <div className="col-md-4">
                <div className="centered"><a href="" onClick={this.onAdd}>Add New</a></div>
                <NoteList ref="noteList" notes={this.state.notes} onEdit={this.props.onEdit} />
            </div>
        )
    }
});

module.exports=NoteListBox;