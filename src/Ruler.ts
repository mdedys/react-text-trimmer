export default class Ruler {
  ruler: CanvasRenderingContext2D

  constructor() {
    this.init()
  }

  init() {
    const canvas = document.createElement("canvas")
    this.ruler = canvas.getContext("2d")
  }

  setFont(font: string): void {
    if (!this.ruler) this.init()
    this.ruler.font = font
  }

  measure(text: string): TextMetrics {
    return this.ruler.measureText(text)
  }
}
