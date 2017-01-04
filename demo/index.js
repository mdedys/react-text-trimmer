import React from 'react';
import ReactDOM from 'react-dom';
import Trimmer from '../src/trimmer';

class App extends React.Component {
	render() {

		const oneLineStyle = {
			maxWidth: '300px',
			lineHeight: '1.2em',
			marginBottom: '50px',
			fontFamily: 'Arial',
			fontSize: '16px',
			fontWeight: '300',
			fontStyle: 'normal'
		};

		const fiveLineStyle = {
			width: '30%',
			fontSize: '16px',
			lineHeight: '1rem',
			height: '5rem',
			maxHeight: '5rem',
			marginBottom: '50px',
			fontFamily: 'Arial',
			fontSize: '16px',
			fontWeight: '300',
			fontStyle: 'normal',
			overflow: 'hidden'
		};


		return (
			<div>

				<h1> One line of text truncated </h1>
				<div id = 'one-line-of-style' style = { oneLineStyle } >
					<Trimmer maxLines = { 1 } textTail = '...' >
						Some very long text that should be trimmed correctly when it is displayed.
						This text should be on one line.
					</Trimmer>
				</div>

				<h1> Five line of text truncated</h1>
				<div id = 'five-lines-of-text' style = { fiveLineStyle } >
					<Trimmer maxLines = { 5 } textTail = '...' >
						Some very long text that should be trimmed corr when it is displayed.
						This text should be on 5 lines and should be truncated. 500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book.
						It has survived not only five centuries, but also the leap into electronic
						typesetting, remaining essentially unchanged. It was popularised in the
						1960s with the release of Letraset sheets containing Lorem Ipsum
						passages, and more recently with desktop publishing software
						like Aldus PageMaker including versions of Lorem Ipsum.
					</Trimmer>
				</div>

			</div>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById( 'root' )
);
