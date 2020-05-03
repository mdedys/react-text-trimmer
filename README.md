[![NPM version][npm-image]][npm-url]
[![mdedys](https://circleci.com/gh/mdedys/react-text-trimmer.svg?style=svg)](https://app.circleci.com/pipelines/github/mdedys/react-text-trimmer)
[![dependencies Status](https://david-dm.org/mdedys/react-text-trimmer/status.svg)](https://david-dm.org/mdedys/react-text-trimmer)
[![devDependencies Status](https://david-dm.org/mdedys/react-text-trimmer/dev-status.svg)](https://david-dm.org/mdedys/react-text-trimmer?type=dev)
[![peerDependencies Status](https://david-dm.org/mdedys/react-text-trimmer/peer-status.svg)](https://david-dm.org/mdedys/react-text-trimmer?type=peer)

# react-text-trimmer

React component that trims overflowing multi line text and adds a specified tail

## Installation

Install from NPM:

```shell
yarn install react-text-trimmer
```

## Usage

### Options

`lines`: number of lines to truncate text

`prefix`: prefix to attach to beginning of text, default is empty string

`suffix`: suffix to attach to end of text, default is ...

`interval`: dobounce interval, default is 166

There is two ways to use the text trimmer. One can use the component or the react hook.

### Components

Props: 

`options`: TextTrimmerOptions

```javascript
import TextTrimmer from "react-text-trimmer"

...
<TextTrimmer>
  Long text.........
<TextTrimmer>

...

```

### Hook

```javascript
import { useTextTrimmer } from "react-text-trimmer"

...
const ref = React.useRef(null)

const value = useTextTrimmer(text, ref, options)

return <div ref={ref}>{value}</div>

...
```

### Code Style

This repository is configured with [EditorConfig][editorconfig].

[npm-url]: https://npmjs.org/package/react-text-trimmer
[npm-image]: https://img.shields.io/npm/v/react-text-trimmer.png
[ci-url]: https://travis-ci.org/mdedys/react-text-trimmer
[ci-image]: https://img.shields.io/travis-ci/mdedys/react-text-trimmer.svg
[editorconfig]: http://editorconfig.org/
