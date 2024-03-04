export default class MouseTracker {
    constructor(canva, cellSize) {
        this.canva = canva
        this.cellSize = cellSize
        this.clicked = false
        this.x = 0
        this.y = 0
        console.log(canva.width);
    }
    Init() {
        this.canva.addEventListener('mousedown', (e) => {
            this.clicked = true

        })
        this.canva.addEventListener('mouseup', (e) => {
            this.clicked = false

        })
        this.canva.addEventListener('mousemove', (e) => {
            if (e.offsetX < this.canva.width && e.offsetX > 0
                && e.offsetY < this.canva.height && e.offsetY > 0) {
                let mouseX = Math.floor(e.offsetX / this.cellSize)
                let mouseY = Math.floor(e.offsetY / this.cellSize)
                this.x = mouseX
                this.y = mouseY
            }
        })
    }
}