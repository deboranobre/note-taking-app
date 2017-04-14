import React, {Component, PropTypes} from 'react';

class TextArea extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noteText:'' 
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        this.setState({noteText: event.target.value});
    }

    handleSave(){
       this.props.onSave(this.state.noteText,this.props.id);

       if(!this.props.id) {
           this.refs.textArea.getDOMNode().value = '';
           this.setState({noteText: ''});
       }

    }

    componentWillReceiveProps(nextProps) {

        this.setState({
            noteText: nextProps.noteText
        });

        if(!nextProps.id){
            this.refs.textArea.getDOMNode().focus();
        }
    }

    render() {
        return (
            <div>
                <textarea className="form-control" ref="textArea" cols="100" rows="20" value={this.state.noteText} onChange={this.handleChange}></textarea><br/>
                <input type="button" className="btn btn-success btn-lg" value="Save" onClick={this.handleSave}/>
            </div>
        )
    }
};

export default TextArea