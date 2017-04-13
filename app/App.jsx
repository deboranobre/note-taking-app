import React from 'react';
import ReactDOM from 'react-dom';
import NoteApp from './components/NoteApp.jsx';

var App = React.createClass({
	render: function () {
		return (
			<NoteApp/>
		);
	}
});

ReactDOM.render(<App></App>, document.getElementById('app'));