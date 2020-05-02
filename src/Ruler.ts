export default class Ruler {
  ruler: CanvasRenderingContext2D | null = null

  constructor() {
    this.init()
  }

  init() {
    const canvas = document.createElement("canvas")
    this.ruler = canvas.getContext("2d")
  }

  setFont(font: string): void {
    if (!this.ruler) return
    this.ruler.font = font
  }

  measure(text: string): number {
    if (!this.ruler) return -1
    const result = this.ruler.measureText(text)
    if (!result) return -1
    return result.width
  }
}
