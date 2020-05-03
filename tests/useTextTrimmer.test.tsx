import * as React from "react"
import { render, fireEvent } from "@testing-library/react"

import TextTrimmer from "../src/TextTrimmer"

describe("useTextTrimmer", () => {
  beforeAll(() => {
    Object.defineProperty(window.HTMLElement.prototype, "clientWidth", {
      value: 0,
      configurable: true,
      writable: true,
    })
  })

  it("text is smaller than containers, all text should be visible", () => {
    Object.assign(window.HTMLElement.prototype, { clientWidth: 300 })

    const text = "simple text"
    const { container } = render(<TextTrimmer options={{}}>{text}</TextTrimmer>)

    const element = container.firstElementChild!
    expect(element.innerHTML).toBe(text)
  })

  it("text is longer, max lines is 1, text should truncate", () => {
    Object.assign(window.HTMLElement.prototype, { clientWidth: 75 })

    const text = "simple text"
    const { container } = render(
      <TextTrimmer options={{ lines: 1 }}>{text}</TextTrimmer>
    )

    const element = container.firstElementChild!
    expect(element.innerHTML).toBe(`simple...`)
  })

  it("text is longer, max lines is 3, text should truncate", () => {
    Object.assign(window.HTMLElement.prototype, { clientWidth: 100 })

    const text =
      "simple text that is longer and longer and can be quite confusing "
    const { container } = render(
      <TextTrimmer options={{ lines: 3 }}>{text}</TextTrimmer>
    )

    const element = container.firstElementChild!
    expect(element.innerHTML).toBe(`simple text  that is longer  and longer...`)
  })

  it("custom prefix and suffix", () => {
    Object.assign(window.HTMLElement.prototype, { clientWidth: 100 })

    const text =
      "simple text that is longer and longer and can be quite confusing "
    const { container } = render(
      <TextTrimmer options={{ prefix: "---", lines: 3, suffix: "---" }}>
        {text}
      </TextTrimmer>
    )

    const element = container.firstElementChild!
    expect(element.innerHTML).toBe(
      `---simple text  that is longer  and longer---`
    )
  })
})
