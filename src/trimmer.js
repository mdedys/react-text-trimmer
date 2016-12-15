import React, { PropTypes } from 'react';

class TextTrim extends React.Component {

	constructor( props ) {
		super( props );
		this.renderDangerously = props.dangerouslySetInnerHTML ? true : false;
		this.textTailRegex = new RegExp( ".(" + props.textTail + ")?$" );
	}

	componentDidMount() {
		this.trim();
	}

	componentDidUpdate() {
		this.trim();
	}

	trim() {
		const domProperty = this.renderDangerously ? 'innerHTML' : 'textContent';
		const element = this.refs.trimmer;
		const regex = this.textTailRegex;
		const textTail = this.props.textTail;
		let textTruncated = false;

		let textTailLastListNode = document.createElement( 'li' );
		textTailLastListNode.textContent = textTail;

		if ( this.renderDangerously ) {
			let hasAppendedTail = false;
			let counter = 0;
			while ( element.scrollHeight - ( element.clientHeight || element.offsetHeight ) >= 1 ) {
				textTruncated = true;
				console.log( 'loop iteration' );
				console.log( 'scrollHeight: ' + element.scrollHeight );
				console.log( 'clientHeight: ' + element.clientHeight );

				let lastChild = element.children[element.children.length - 1];
				console.log( 'tagName: ' + lastChild.tagName );
				if ( lastChild.textContent === textTail || counter > 50 ) {
					break;
				}

				if ( lastChild.tagName === 'UL' ) {
					let length = lastChild.childNodes.length;

					if ( length === 0 || ( length === 1 && hasAppendedTail ) ) {
						element.removeChild( lastChild );
					}

					let indexToRemove = hasAppendedTail ? length - 2 : length - 1;
					lastChild.removeChild( lastChild.childNodes[indexToRemove] );

					if ( !hasAppendedTail ) {
						lastChild.appendChild( textTailLastListNode );
						hasAppendedTail = true;
					}
				} else if ( lastChild.tagName === 'TABLE' ) {
					//TODO: Remove Table
				} else {

				}

				counter++;
			}
		} else {

			let counter = 0;
			while ( element.scrollHeight - ( element.clientHeight || element.offsetHeight ) >= 1 ) {
				textTruncated = true;
				if ( element[domProperty] === textTail || counter > 500 ) {
					break;
				}
				element[domProperty] = element[domProperty].replace( regex, textTail );
				counter++;
			}
		}

		if ( !textTruncated ) {
			return;
		}

		const tailLength = textTail.length + 1;
		// If last character is trailing space, remove it.
		if ( element.textContent[element.textContent.length - tailLength] === ' ' ) {
			element[domProperty] =
				element[domProperty].substring( 0, element[domProperty].length - tailLength ) + textTail;
		}
	}

	render() {

		const style = {
			lineHeight: 'inherit',
			maxHeight: 'inherit',
			width: 'inherit',
			overflow: 'hidden'
		};

		if ( !this.renderDangerously ) {

			return (
				<div ref = 'trimmer' className = { this.props.className } style = { style } >
					{ this.props.children }
				</div>
			);
		}

		return (
			<div
				ref = 'trimmer'
				className = { this.props.className }
				style = { style }
				dangerouslySetInnerHTML = { this.props.dangerouslySetInnerHTML } />
		);
	}
}

TextTrim.propTypes = {
	className: PropTypes.string,
	textTail: PropTypes.string,
	dangerouslySetInnerHTML: PropTypes.object
};

TextTrim.defaultProps = {
	className: '',
	textTail: '...',
	dangerouslySetInnerHTML: null
};

export default TextTrim;
