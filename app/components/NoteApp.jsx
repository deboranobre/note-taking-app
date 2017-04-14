import React, {Component, PropTypes} from 'react';
import NoteListBox from './NoteListBox.jsx';
import NoteCreationBox from './NoteCreationBox.jsx';

class NoteApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null 
        };

        this.onEdit = this.onEdit.bind(this);
        this.onAdd = this.onAdd.bind(this);
    }

    onEdit(id){
        this.setState({currentlyEdited:id});
    }

    onAdd(){
        this.setState({currentlyEdited:null});
    }

    render() {
        return (
            <div className="container">
                <div className="row header">
                    
                </div>
                <div className="row">
                    <NoteListBox onEdit={this.onEdit} onAdd={this.onAdd}/>
                    <NoteCreationBox id={this.state.currentlyEdited} />
                </div>
            </div>
        )
    }
};

export default NoteApp