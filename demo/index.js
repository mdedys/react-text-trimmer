import React from 'react';
import ReactDOM from 'react-dom';
import Trimmer from '../src/trimmer';

class App extends React.Component {
	render() {

		const oneLineStyle = {
			width: '300px',
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

		const longWordStyle = {
			width: '98px',
			height: '1rem',
			fontWeight: '400',
			fontSize: '0.7rem',
			textAlign: 'left',
			marginBottom: '50px'
		}

		return (
			<div>

				<h1> One Long Word </h1>
				<div id = 'one-long-word' style = { longWordStyle } >
					<Trimmer maxLines = { 1 } textTail = '...'>
						SUBDERMATOGLPHIC
					</Trimmer>
				</div>

				<h1> One Long Word with some short ones</h1>
				<div id = 'one-long-word-with-short-words' style = { longWordStyle } >
					<Trimmer maxLines = { 1 } textTail = '...'>
						SUBDERMATOGLPHIC is very long
					</Trimmer>
				</div>


				<h1> Multi-line large word</h1>
				<div id = 'one-long-word-with-short-words' style = { fiveLineStyle } >
					<Trimmer maxLines = { 5 } textTail = '...'>
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
						SUBDERMATOGLPHIC is very long
					</Trimmer>
				</div>

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
