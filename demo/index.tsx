import * as React from "react"
import * as ReactDOM from "react-dom"

import useTextTrimmer from "../src/useTextTrimmer"

const App = () => {
  const ref = React.useRef(null)

  const value = useTextTrimmer(
    "But not even an energetic person who had once helped a courageous puppy recover from a flying accident, was prepared for what Raymond had in store today.".substring(
      0,
      63
    ),
    ref
  )

  return (
    <div
      ref={ref}
      style={{
        border: "1px solid black",
        fontSize: "1rem",
        lineHeight: "1rem",
        width: 350,
        height: 48,
        overflow: "hidden",
      }}
    >
      {value}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
