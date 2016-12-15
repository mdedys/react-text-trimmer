import React from 'react';
import ReactDOM from 'react-dom';
import Trimmer from '../src/trimmer';

class App extends React.Component {
	render() {

		const oneLineStyle = {
			width: '100px',
			fontSize: '16px',
			lineHeight: '1rem',
			height: '1rem',
			maxHeight: '1rem',
			marginBottom: '50px'
		};

		const fiveLineStyle = {
			width: '200px',
			fontSize: '16px',
			lineHeight: '1rem',
			height: '5rem',
			maxHeight: '5rem',
			marginBottom: '50px'
		};

		const innerHTMLWithList = {
			__html: '<ul><li>p for piano</li><li>f for forte</li><li>cresc or &lt; for crescendo or &gt; for decrescendo</li><li>dim for diminuendo</li><li>fast</li><li>slow</li><li>ritardando</li><li>accent</li></ul>'
		};

		const innerHTMLWithVarious = {
			__html: '<div>Some random text in a dev</div><span>some random text in a span</span><div>text with a div inside a div<div> I am a child </div></div>'
		}

		const innerHTMLWithDivAndJustText = {
			__html: '<div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>'
		}

		return (
			<div>
				<h1> One line of text truncated </h1>
				<div id = 'one-line-of-style' style = { oneLineStyle } >
					<Trimmer>
						Some very long text that should be trimmed correctly when it is displayed.
						This text should be on one line.
					</Trimmer>
				</div>

				<h1> Five line of text truncated</h1>
				<div id = 'five-lines-of-text' style = { fiveLineStyle } >
					<Trimmer>
						Some very long text that should be trimmed correctly when it is displayed.
						This text should be on 5 lines and should be truncated. 500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book.
						It has survived not only five centuries, but also the leap into electronic
						typesetting, remaining essentially unchanged. It was popularised in the
						1960s with the release of Letraset sheets containing Lorem Ipsum
						passages, and more recently with desktop publishing software
						like Aldus PageMaker including versions of Lorem Ipsum.
					</Trimmer>
				</div>

				<h1>Render Dangerously Truncated</h1>
				<div id = 'five-lines-of-text' style = { fiveLineStyle } >
					<Trimmer dangerouslySetInnerHTML = { innerHTMLWithList } />
				</div>

				<h1>Render Dangerously Truncated</h1>
				<div id = 'five-lines-of-text' style = { fiveLineStyle } >
					<Trimmer dangerouslySetInnerHTML = { innerHTMLWithVarious } />
				</div>

				<h1>Render Dangerously Truncated</h1>
				<div id = 'five-lines-of-text' style = { fiveLineStyle } >
					<Trimmer dangerouslySetInnerHTML = { innerHTMLWithDivAndJustText } />
				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById( 'root' )
);
