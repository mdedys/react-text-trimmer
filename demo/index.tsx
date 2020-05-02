import * as React from "react"
import * as ReactDOM from "react-dom"
import styled from "styled-components"

const Page = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
`

const Controls = styled.div``

const Label = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
  margin: 0.5rem 0;
`

const Input = styled.input`
  border: 1px solid #000;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  padding: 0.5rem 1rem;

  &:focus {
    border-color: blue;
  }
`

const TextArea = styled.textarea`
  border: 1px solid #000;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  padding: 0.5rem 1rem;
`

const Output = styled.div`
  border: 1px solid black;
  font-size: 1rem;
  line-height: 1rem;
  margin-top: 2rem;
  padding: 0 1rem;
  width: 100%;
`

import TextTrimmer, { useTextTrimmer } from "react-text-trimmer"

function useInput(defaultValue) {
  const [value, setValue] = React.useState(defaultValue)
  const onChange = React.useCallback((evt) => setValue(evt.target.value), [])
  return { value, onChange }
}

const App = () => {
  const prefix = useInput("")
  const suffix = useInput("")
  const lines = useInput("3")
  const width = useInput("300")
  const height = useInput("48")
  const text = useInput(
    "But not even an energetic person who had once helped a courageous puppy recover from a flying accident, was prepared for what Raymond had in the world of pong"
  )

  //const ref = React.useRef(null)

  // const value = useTextTrimmer(text.value, ref, {
  //   lines: parseInt(lines.value),
  //   prefix: prefix.value,
  //   suffix: suffix.value,
  // })

  return (
    <Page>
      <Controls>
        <Label>Prefix</Label>
        <Input value={prefix.value} onChange={prefix.onChange} />
        <Label>Suffix</Label>
        <Input value={suffix.value} onChange={suffix.onChange} />
        <Label>Max Number of Lines</Label>
        <Input value={lines.value} onChange={lines.onChange} />
        <Label>Max Width (px)</Label>
        <Input value={width.value} onChange={width.onChange} />
        <Label>Height (px)</Label>
        <Input value={height.value} onChange={height.onChange} />
        <Label>Height (px)</Label>
        <TextArea
          rows={5}
          name="height"
          value={text.value}
          onChange={text.onChange}
        />
      </Controls>
      {/* <Output
        ref={ref}
        style={{ height: height.value + "px", maxWidth: width.value + "px" }}
      >
        {value}
      </Output> */}
      <TextTrimmer
        options={{
          lines: parseInt(lines.value),
          prefix: prefix.value,
          suffix: suffix.value,
        }}
      >
        {text.value}
      </TextTrimmer>
    </Page>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
