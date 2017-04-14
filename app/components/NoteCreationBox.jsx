import React, {Component, PropTypes} from 'react';
import TextArea from './TextArea.jsx';
import NoteActions from '../../actions/NoteActions.js';
import NoteStore from '../../stores/NoteStore.js';

class NoteCreationBox extends Component {

    handleSave(noteText,id){
        if(id){
            NoteActions.editNote({_id:id,text:noteText});
        }
        else{
            NoteActions.createNote({name:noteText.length >= 20 ? noteText.substring(0,20) : noteText, text: noteText});
        }
    }

    render() {

        var note;

        if(this.props.id) {
            note=NoteStore.getNote(this.props.id);
        }

        return (
            <div className="col-md-8">
                <TextArea onSave={this.handleSave} id={this.props.id} noteText={note ? note.text : ''} />
            </div>
        )
    }
};

export default NoteCreationBox