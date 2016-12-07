[![NPM version][npm-image]][npm-url]
[![Build status][ci-image]][ci-url]
[![Dependency Status][dependencies-image]][dependencies-url]

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

```js

//Sass

// Will trim text after 3 lines of text
.my-text {
	line-height: 1.4em;
	max-height: 4.2em;
}


import TextTrim from 'react-text-trim';

<div className = 'my-text'>
	<TextTrim>
 		Some text to be truncated
	</TextTrim>
</div>

```

## Contributing

1. **Fork** the repository. Committing directly against this repository is
   highly discouraged.

   2. Make your modifications in a branch, updating and writing new unit tests
      as necessary in the `spec` directory.

      3. Ensure that all tests pass with `npm test`

      4. Submit a pull request to this repository. Wait for tests to run and someone
         to chime in.

### Code Style

This repository is configured with [EditorConfig][EditorConfig].

[npm-url]: https://npmjs.org/package/react-text-trimmer
[npm-image]: https://img.shields.io/npm/v/react-text-trimmer.png
[ci-url]: https://travis-ci.org/mdedys/react-text-trimmer
[ci-image]: https://img.shields.io/travis-ci/mdedys/react-text-trimmer.svg
[dependencies-url]: https://david-dm.org/mdedys/react-text-trimmer
[dependencies-image]: https://img.shields.io/david/mdedys/react-text-trimmer.svg
[EditorConfig]: http://editorconfig.org/
