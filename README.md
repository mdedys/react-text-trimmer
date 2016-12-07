[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![devDependencies Status](https://david-dm.org/mdedys/react-text-trimmer/dev-status.svg)](https://david-dm.org/mdedys/react-text-trimmer?type=dev)
[![peerDependencies Status](https://david-dm.org/mdedys/react-text-trimmer/peer-status.svg)](https://david-dm.org/mdedys/react-text-trimmer?type=peer)

# react-text-trimmer

React component that trims overflowing multi line text and adds a specified tail

## Installation

Install from NPM:

```shell
npm install react-text-trim
```

## Usage

### Props

`className`: CSS class name to add specific styling

`textTail`: String to append to end of trimmed text

`dangerouslySetInnerHTML`: Used when HTML is needed to be rendered and not converted to string. If this is set, any thing wrapped will not by the component will be ignored.

Wrap the text you want trimmed with react-text-trim. The component will inherit the width, max-height, line-height and trim the text. The default tail added to the text is `...` but any string can be specified.

### Example

```
//Sass

// Will trim text after 3 lines of text
.my-text {
	line-height: 1.4em;
	max-height: 4.2em;
}
```

```js
import TextTrim from 'react-text-trim';

<div className = 'my-text'>
	<TextTrim>
 		Some text to be truncated
	</TextTrim>
</div>

```

### Code Style

This repository is configured with [EditorConfig][EditorConfig].

[npm-url]: https://npmjs.org/package/react-text-trimmer
[npm-image]: https://img.shields.io/npm/v/react-text-trimmer.png
[ci-url]: https://travis-ci.org/mdedys/react-text-trimmer
[ci-image]: https://img.shields.io/travis-ci/mdedys/react-text-trimmer.svg
[EditorConfig]: http://editorconfig.org/
