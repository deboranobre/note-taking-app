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

    handleSearch:function(event) {
        var needle = event.target.value.toLowerCase();

        if(!needle){
            this.setState({notes: this.preSearchNotes});
            return;
        }else{
            if(!this.preSearchNotes){
                this.preSearchNotes = this.state.notes;
            }

            var searchdata = this.preSearchNotes.filter(function(row) {
                return row.text.toLowerCase().indexOf(needle) > -1;
            });
            
            this.setState({notes: searchdata});
        }
    },

    render: function() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-4">
                <div className="row">
                    <div className="col-xs-10">    
                        <input className="form-control" type="text" placeholder="All notes" onChange={this.handleSearch}/>
                    </div>
                    <div className="col-xs-2">    
                        <a href="" onClick={this.onAdd} alt="Add New"><i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i></a>
                    </div>
                </div>
                <NoteList ref="noteList" notes={this.state.notes} onEdit={this.props.onEdit} />
            </div>
        )
    }
});

export default NoteListBox