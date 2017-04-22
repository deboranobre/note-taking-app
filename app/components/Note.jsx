import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Note extends Component {

    constructor(props) {
        super(props);

        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit(id,event){
        event.preventDefault();
        this.props.onEdit(id);
        this.props.onSelect(id);
    }

    render() {
        var note=this.props.note;

        var title=note.text.length >= 20 ? note.text.substring(0,20) : note.text;

        var className = this.props.active ? 'active' : null;

        return (
            <a href="#" className={'list-group-item '+ className} onClick={this.handleEdit.bind(null,note._id)}>{title}</a>
        )
    }
}

export default Note