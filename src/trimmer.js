import React, { PropTypes } from 'react';
import ShortId 				from 'shortid';

class TextTrim extends React.Component {

	constructor( props ) {
		super( props );

		let lineIds = [];
		for ( let i = 0; i < props.maxLines; i++ ) {
			lineIds.push( ShortId.generate() );
		}

		this.state = {
			parentWidth: null,
			lineIds: lineIds
		}

		this.resize = this.resize.bind(this);
		this.measureText = this.measureText.bind(this);
	}

	componentDidMount() {

		let canvas = document.createElement( 'canvas' );
		this.canvas = canvas.getContext( '2d' );

		window.addEventListener( 'resize', this.resize );

		window.setTimeout(()=>{
            this.resize();   
        },10)
	}

	componentWillUnmount() {
		window.removeEventListener( 'resize', this.resize );
	}

	shouldComponentUpdate( nextProps, nextState ) {
		return nextProps.children !== this.props.children ||
			nextProps.textTail !== this.props.textTail ||
			nextProps.maxLines !== this.props.maxLines ||
			nextState.parentWidth !== this.state.parentWidth
	}

	resize() {
		const { trimmer } = this.refs;

		const style = window.getComputedStyle( this.refs.trimmer.parentNode );

		const font = [
			style['font-weight'],
			style['font-style'],
			style['font-size'],
			style['font-family']
		].join(' ');

		this.canvas.font = font;

		this.setState({
			parentWidth: this.refs.trimmer.parentNode.getBoundingClientRect().width
		});
	}

	renderLines() {
		const { trimmer, text } = this.refs;
		const { children, maxLines } = this.props;

		let linesOfText = [];
		let textLines = children.split( '\n' );

		let didTextFit = false;
		let index = 1;

		while( index <= maxLines ) {

			let line = textLines.shift();
			let isLastLine = index === maxLines;

			if ( line === undefined ) {
				didTextFit = true;
				break;
			}

			let shouldAppendToLine = index === linesOfText.length;
			if ( shouldAppendToLine ) {
				line = linesOfText[index - 1] + ' ' + line
			}

			let lineLength = this.measureText( line );
			let isTextTooLong = lineLength >= this.state.parentWidth;

			if ( !isTextTooLong ) {
				this.updateLinesOfText( linesOfText, line, shouldAppendToLine );
				continue;
			}

			let { newLine, leftOverText } = this.trimLine( line, lineLength, isLastLine, index );

			if ( !isLastLine ) {
				textLines = [leftOverText, ...textLines];
			}

			this.updateLinesOfText( linesOfText, newLine, shouldAppendToLine, index );
			index++;
		}

		if ( !didTextFit ) {
			linesOfText[linesOfText.length - 1] += this.props.textTail;
		}


		let truncatedText = '';
		for( let i = 0; i < linesOfText.length; i++ ) {
			truncatedText += linesOfText[i] + ' '
		}

		return truncatedText;
	}

	trimLine( line, lineLength, isLastLine ) {

		let words = line.split( ' ' );
		let start = 0;
		let end = words.length - 1;
		let mid = 0;
		let newline = '';
		let tail = isLastLine ? this.props.textTail : '';
		
		while ( start <= end ) {

			mid = Math.floor( ( start + end ) / 2 );

			newline = words.slice( 0, mid + 1 ).join( ' ' );

			lineLength = this.measureText( newline + tail );

			if ( lineLength <= this.state.parentWidth ) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}
		}

		// No words can fit so attempt to trim by character of first word
		if ( end === -1 ) {
			
			let result = this.trimByCharacter( words[0], tail );
			
			return {
				newLine: result.trimmedChars,
				leftOverText: [result.leftOverChars,...words.slice( 1, words.length )].join( ' ' )
			}
		}

		if ( end === 0 ) {
			end = 1;
		}

		return {
			newLine: words.slice( 0, end ).join( ' ' ),
			leftOverText: words.slice( end, words.length ).join( ' ' )
		}
	}

	trimByCharacter( word, tail ) {

		let start = 0;
		let end = word.length - 1;
		let mid = 0;
		let trimmedText = '';
		let lineLength = 0;

		while ( start <= end ) {
			mid = Math.floor( ( start + end ) / 2 );
			trimmedText = word.substring( 0, mid + 1 );
			lineLength = this.measureText( trimmedText + tail );

			if ( lineLength <= this.state.parentWidth ) {
				start = mid + 1;
			} else {
				end = mid - 1;
			}
		}

		return {
			trimmedChars: word.substring( 0, end ),
			leftOverChars: word.substring( end, word.length )
		};
	}

	updateLinesOfText( linesOfText, newLine, shouldAppendToLine, index ) {
		if ( shouldAppendToLine ) {
			linesOfText[index - 1] = newLine;
		} else {
			linesOfText.push( newLine );
		}
	}

	measureText( text ) {
		return this.canvas.measureText( text ).width;
	}

	render() {

		let text = '';

		if ( this.state.parentWidth ) {
			text = this.renderLines()
		}	

		return (
			<div ref = 'trimmer' className = { this.props.className }>
				{ text }
			</div>
		);
	}
}

TextTrim.propTypes = {
	className: PropTypes.string,
	textTail: PropTypes.string,
	maxLines: PropTypes.number
};

TextTrim.defaultProps = {
	className: '',
	textTail: '...',
	maxLines: 3
};

export default TextTrim;
