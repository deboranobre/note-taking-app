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
        
        if(this.props.id) {
            this.props.onSave(this.state.noteText,this.props.id);
        }
    }

    handleSave(){
        this.props.onSave(this.state.noteText,this.props.id);

        if(!this.props.id) {
            this.refs.textArea.value = '';
            this.setState({noteText: ''});
        }

    }

    componentWillReceiveProps(nextProps) {
        this.setState({noteText: nextProps.noteText});
    }

    componentDidUpdate(){
        this.refs.textArea.focus();
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