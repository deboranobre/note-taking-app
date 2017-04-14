import React from 'react';
import Reflux from 'reflux';
import NoteList from './NoteList.jsx';
import NoteStore from '../../stores/NoteStore';

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
                <div className="row">
                    <div className="col-md-10">    
                        <input className="form-control" type="text" placeholder="All notes" />
                    </div>
                    <div className="col-md-2">    
                        <a className="add-button" href="" onClick={this.onAdd} alt="Add New"></a>
                    </div>
                </div>
                <NoteList ref="noteList" notes={this.state.notes} onEdit={this.props.onEdit} />
            </div>
        )
    }
});

export default NoteListBox