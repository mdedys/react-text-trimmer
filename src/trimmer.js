export default {
	trim( element, textTail, regex, isDangerous ) {
		let domProperty = isDangerous ? 'innerHTML' : 'textContent';
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
};
