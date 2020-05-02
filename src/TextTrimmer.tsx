import * as React from "react"

import useTextTrimmer, { TextTrimmerOptions } from "./useTextTrimmer"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  options?: TextTrimmerOptions
  children?: string
}

export default React.memo((props: Props) => {
  const ref = React.useRef<HTMLDivElement>(null)

  const { options = {}, children, ...rest } = props

  const value = useTextTrimmer(props.children || "", ref, options)

  return (
    <div ref={ref} {...rest}>
      {value}
    </div>
  )
})
