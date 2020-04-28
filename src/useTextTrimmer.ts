import * as React from "react"
import { debounce } from "debounce"

import Ruler from "./Ruler"

function getFont(el: HTMLElement): string {
  const weight = el.style["font-weight"]
  const style = el.style["font-style"]
  const size = el.style["font-size"]
  const family = el.style["font-family"]
  return `${weight} ${style} ${size} ${family}`
}

function getMaxHeight(el: HTMLElement, lines?: number) {
  const styles = window.getComputedStyle(el)
  const fontSize = parseInt(styles.fontSize)
  // const lineHeight = parseInt(styles.lineHeight)

  // TODO: get correct height based on line-height
  if (lines) {
    return fontSize * lines
  }

  return el.clientHeight
}

export interface TextTrimmerOptions {
  lines?: number
  prefix?: string
  suffix?: string
  interval?: number
}

export default function (
  text: string,
  ref: React.RefObject<HTMLElement>,
  options?: TextTrimmerOptions
) {
  const { interval } = Object.assign(
    {},
    { lines: 1, prefix: "", suffix: "...", interval: 166 },
    options
  )

  const [value, setValue] = React.useState<string>(text)
  const { current: ruler } = React.useRef<Ruler>(new Ruler())

  const resizeRef = React.useRef(null)

  const trimText = React.useCallback(() => {
    if (!ref.current || !ruler) return

    ruler.setFont(getFont(ref.current))

    const maxHeight = getMaxHeight(ref.current)
    console.log("maxHeight: ", maxHeight)
  }, [ref])

  React.useEffect(() => {
    resizeRef.current = debounce(trimText, interval)
    window.addEventListener("resize", resizeRef.current)
    return () => {
      resizeRef.current && resizeRef.current.flush()
      window.removeEventListener("resize", resizeRef.current)
    }
  }, [])

  return value
}
