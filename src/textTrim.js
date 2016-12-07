import React, { PropTypes } from 'react';
import Trimmer from './trimmer.js';

class TextTrim extends React.Component {

	constructor( props ) {
		super( props );
		this.renderDangerously = props.dangerouslySetInnerHTML ? true : false;
		this.textTailRegex = new RegExp( ".(" + props.textTail + ")?$" );
	}

	componentDidMount() {
		Trimmer.trim( this.refs.trimmer, this.props.textTail, this.textTailRegex, this.renderDangerously );
	}

	componentDidUpdate() {
		Trimmer.trim( this.refs.trimmer, this.props.textTail, this.textTailRegex, this.renderDangerously );
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
