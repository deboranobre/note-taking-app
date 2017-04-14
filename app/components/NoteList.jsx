import React, {Component, PropTypes} from 'react';
import Note from './Note.jsx';

class NoteList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeNoteId:null
        };

        this.setActiveNote = this.setActiveNote.bind(this);
    }

    setActiveNote(id) {
        this.setState({activeNoteId: id});
    }

    render() {
        var self=this,
            notes=this.props.notes.concat().reverse();

        var noteNodes = notes.map(function (note) {
            return (
                <Note key={note._id} active={self.state.activeNoteId === note._id} note={note} onEdit={self.props.onEdit} onSelect={self.setActiveNote}/>
            );
        });
        return (
            <div className="list-group">
                {noteNodes}
            </div>
         )
    }
};

export default NoteList