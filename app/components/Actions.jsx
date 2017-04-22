import React, {Component, PropTypes} from 'react';

class Actions extends Component {
    
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(event){
        event.preventDefault();
        
        if(this.props.id) {
            this.props.onDelete(this.props.id);
        }
    }

    render() {
        return (
            <div className="row" style={{height: 40, textAlign:'right'}}>
                <a href="" onClick={this.handleDelete} alt="Delete"><i className="fa fa-trash fa-2x" aria-hidden="true"></i></a>
            </div>
        )
    }
}

export default Actions