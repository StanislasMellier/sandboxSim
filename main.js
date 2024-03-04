import MouseTracker from './Mouse';
import './style.css';
const canva = document.querySelector('#sandbox');
const ctx = canva.getContext('2d');

let width = canva.width;
let height = canva.height;
let cellSize = 20;
const ELEMENTS = {
    1: {
        id: 1,
        name: "sand",
        properties: {
            color: 'yellow',
        },
        process(x, y, grid, nextGrid) {
            // Check below
            if (grid[x][y + 1] === 0 && nextGrid[x][y + 1] === 0) {
                nextGrid[x][y + 1] = this
            }
            // Check to the left
            else if (
                ((x - 1) >= 0 && grid[x - 1][y + 1] === 0) && nextGrid[x - 1][y + 1] === 0
            ) {
                nextGrid[x - 1][y + 1] = this
            }
            // Check to the right
            else if (
                (x + 1) < grid.length && grid[x + 1][y + 1] === 0 && nextGrid[x + 1][y + 1] === 0
            ) {
                nextGrid[x + 1][y + 1] = this
            }
            else {
                nextGrid[x][y] = this
            }
            ctx.fillStyle = this.properties.color
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
            return nextGrid
        },
    },
    2: {
        id: 2,
        name: "water",
        properties: {
            color: 'blue',
        },
        process(x, y, grid, nextGrid) {
            // Check below
            if (grid[x][y + 1] === 0 && nextGrid[x][y + 1] === 0) {
                nextGrid[x][y + 1] = this
            }
            // Check bottom left
            else if (
                ((x - 1) >= 0 && grid[x - 1][y + 1] === 0) && nextGrid[x - 1][y + 1] === 0
            ) {
                nextGrid[x - 1][y + 1] = this
            }
            // Check bottom right
            else if (
                (x + 1) < grid.length && grid[x + 1][y + 1] === 0 && nextGrid[x + 1][y + 1] === 0
            ) {
                nextGrid[x + 1][y + 1] = this
            }
            // Check left
            else if (
                ((x - 1) >= 0 && grid[x - 1][y] === 0) && nextGrid[x - 1][y] === 0
            ) {
                nextGrid[x - 1][y] = this
            }
            // Check right
            else if (
                (x + 1) < grid.length && grid[x + 1][y] === 0 && nextGrid[x + 1][y] === 0
            ) {
                nextGrid[x + 1][y] = this
            }
            else {
                nextGrid[x][y] = this
            }
            ctx.fillStyle = this.properties.color
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
            return nextGrid
        },
    }
}

console.log(ELEMENTS);
let selectedElements = ELEMENTS[2]

function createEmptyGrid(rows, cols) {
    let grid = [];
    for (let r = 0; r < rows; r++) {
        grid[r] = []
        for (let c = 0; c < cols; c++) {
            grid[r][c] = 0;
        }
    }
    return grid
}
let grid = createEmptyGrid(width / cellSize, height / cellSize);

const mouseInfo = new MouseTracker(canva, cellSize)
mouseInfo.Init()

document.getElementById('resetGrid').addEventListener('click', () => {
    grid = createEmptyGrid(width / cellSize, height / cellSize);
})
document.getElementById('changeElement').addEventListener('click', () => {
    if (selectedElements.id === 1) {
        selectedElements = ELEMENTS[2]

    } else {
        selectedElements = ELEMENTS[1]

    }
})


function processGrid(grid) {
    let nextGrid = createEmptyGrid(width / cellSize, height / cellSize);
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {

            if (grid[x][y] !== 0) {
                let cell = grid[x][y]
                nextGrid = cell.process(x, y, grid, nextGrid)
            }

        }
    }
    return nextGrid
}


let lastTimestamp = 0
let timeDiff = 0
function animate(ts) {
    timeDiff = ts - lastTimestamp
    if (timeDiff > 66) {

        if (mouseInfo.clicked === true) {
            if (grid[mouseInfo.x][mouseInfo.y] === 0) {
                let element = { ...ELEMENTS[selectedElements.id] }

                grid[mouseInfo.x][mouseInfo.y] = element


            }
        }

        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, width, height)
        let nextGrid = processGrid(grid)
        grid = nextGrid
        lastTimestamp = ts
    }

    requestAnimationFrame(animate);
}

animate();
