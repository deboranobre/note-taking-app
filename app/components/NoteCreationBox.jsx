import React, {Component, PropTypes} from 'react';
import TextArea from './TextArea.jsx';
import Actions from './Actions.jsx';
import NoteActions from '../../actions/NoteActions.js';
import NoteStore from '../../stores/NoteStore.js';
import styled from 'styled-components';

class NoteCreationBox extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleDelete(id){
        NoteActions.deleteNote(id);
        this.refs.textArea.refs.textArea.value = '';
    }

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
            <div className="col-md-8 hidden-xs hidden-sm">
                <Actions id={this.props.id} onDelete={this.handleDelete}/>
                <div className="row">
                    <TextArea ref="textArea" onSave={this.handleSave} id={this.props.id} noteText={note ? note.text : ''} />
                </div>
            </div>
        )
    }
};

export default NoteCreationBox