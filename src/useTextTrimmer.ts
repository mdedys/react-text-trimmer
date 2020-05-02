import * as React from "react"
import { debounce } from "debounce"

import Ruler from "./Ruler"

type DebounceFunc = (() => void) & {
  clear(): void
} & {
  flush(): void
}

function getFont(styles: CSSStyleDeclaration): string[] {
  let fontAttrs = []
  fontAttrs.push(styles.fontWeight || "400")
  fontAttrs.push(styles.fontStyle || "normal")
  fontAttrs.push(styles.fontVariant || "normal")
  fontAttrs.push(`${styles.fontSize || "16px"}/${styles.lineHeight || "16px"}`)
  fontAttrs.push(styles.fontFamily || "system")

  return fontAttrs
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
  const { interval, lines, prefix, suffix } = Object.assign(
    {},
    { lines: 1, prefix: "", suffix: "...", interval: 166 },
    options
  )

  const words = React.useMemo(() => {
    return text.split(" ")
  }, [text])

  const [value, setValue] = React.useState<string>(text)
  const { current: ruler } = React.useRef<Ruler>(new Ruler())

  const resizeRef = React.useRef<DebounceFunc | null>(null)

  const trimText = React.useCallback(() => {
    if (!ref.current || !ruler) return

    const styles = window.getComputedStyle(ref.current)
    const font = getFont(styles)
    ruler.setFont(font.join(" "))

    const padding = parseInt(styles.paddingLeft) + parseInt(styles.paddingRight)
    const maxLineWidth = ref.current.clientWidth - padding

    let textLines = []
    let wordIdx = 0
    for (let i = 0; i < lines; i++) {
      const lastLine = i === lines - 1
      const firstLine = i === 0

      let currentLine = ""
      let lineWidth = 0

      while (lineWidth < maxLineWidth) {
        const word = words[wordIdx]

        if (!word) break

        const mPrefix = firstLine ? prefix : ""
        const mSuffix = lastLine ? suffix : ""
        const candidate = currentLine + " " + word
        const lineLength = ruler.measure(mPrefix + candidate + mSuffix)

        if (lineLength > maxLineWidth) break
        currentLine = candidate
        wordIdx++
      }
      textLines.push(currentLine)
    }

    const nextText = textLines.join(" ")
    setValue(prefix + nextText + suffix)
  }, [words, lines, text, prefix, suffix])

  React.useEffect(() => {
    resizeRef.current = debounce(trimText, interval)
    window.addEventListener("resize", resizeRef.current)
    return () => {
      if (resizeRef.current) {
        resizeRef.current.flush()
        window.removeEventListener("resize", resizeRef.current)
      }
    }
  }, [])

  React.useLayoutEffect(() => {
    trimText()
  }, [trimText, lines, text, prefix, suffix, ref])

  return value
}
