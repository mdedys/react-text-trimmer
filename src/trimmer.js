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
		while ( element.scrollHeight - ( element.clientHeight || element.offsetHeight ) >= 1 ) {
			textTruncated = true;
			if ( element.contentText === textTail ) {
				break;
			}
			element[domProperty] = element[domProperty].replace( regex, textTail );
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
