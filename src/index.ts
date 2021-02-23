import './scss/app.scss';
import {Spaceship} from "./app/spaceship";
import {Alien} from './app/alien'
import {
    WIDTH, HEIGHT, SMALLER_SCREEN_VALUE, rows, cols, aliens, width, height,
    canvas, ctx, aliensInRow, midWidth, midHeight, columnsOfAliens
} from "./app/variables";

let isGameOver = false
document.addEventListener("keydown", moveKey)

//Generowania obcych
for (let i = 0; i < columnsOfAliens; ++i) {
    const wartosc2 = HEIGHT / 2 + ((rows / 2) - 8 + i) * (SMALLER_SCREEN_VALUE / cols)
    const newAlienRow: any = []
    for (let j = 0; j < aliensInRow; ++j) {
        const wartosc1 = WIDTH / 2 - (rows + 4) * width + (rows - 2 + j) * width
        const positionX = j * width
        const positionY = i * width
        newAlienRow.push(new Alien(wartosc1, wartosc2))
    }
    aliens.push(newAlienRow)
}

//Rysowanie grida w canvas
function drawLines() {

    for (let i = 0; i < columnsOfAliens; ++i) {
        for (let j = 0; j < aliensInRow; ++j) {
            if (ctx) {
                ctx.beginPath();
                ctx.fillStyle = "#000000";
                ctx.fillRect(aliens[i][j].x, aliens[i][j].y, width, width);
                ctx.stroke();
                // console.log(aliens[i][j])
            }
        }
    }
}

function drawAliens() {
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            if (ctx) {
                ctx.beginPath();
                ctx.rect(midWidth + j * width, midHeight + i * width, width, height);
                ctx.stroke();
            }
        }
    }
}

function moveKey(e: any) {
    console.log(e.keyCode)
    switch (e.keyCode) {
        case 32: {
            console.log("Dziala")
        }
        case 37: {
            Player.move(-width)
            break;
        }
        case 39: {
            Player.move(width)
            break;
        }
        case 65: {
            Player.move(-width)
            break;
        }
        case 68: {
            Player.move(width)
            break;
        }
        default: {
            console.log("Nie poprawny klawisz!")
            break;
        }
    }
}

const Player = new Spaceship(WIDTH / 2, HEIGHT - width)

class AlienRow {
    public x: number = 0
    public width: number = 0
    protected aliens: any[] = []
    public direction: { x: number, y: number } = {x: 1, y: 0}
    public canAdvance: boolean = true

    constructor(public y: number) {
        this.x = 2 * width
        for (let i = 0; i < aliensInRow; i++) {
            this.aliens.push(new Alien(this.x + i * width, this.y))
        }
        this.width = this.aliens.length * width
    }

    update() {
        console.log(width * (rows + 2))
        let i = 0
        if (width * (rows + 2) > this.y) {
            for (const alien of this.aliens) {
                alien.x = this.x + i * width
                alien.y = this.y
                i++
            }

        } else {
            isGameOver = true
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        for (const alien of this.aliens) {
            alien.render(ctx)
        }
    }

    move() {
        if (this.direction.y !== 0) {
            this.y += this.direction.y * height
            this.direction.y = 0
            this.bounce()
        } else {
            this.x += this.direction.x * width
            this.canAdvance = true
        }
    }

    advance() {
        this.direction.y = 1
    }

    bounce() {
        this.canAdvance = false
        this.direction.x *= -1
    }

}

const aliensRows: AlienRow[] = [new AlienRow(0)]

setInterval(() => {
    if (!isGameOver) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        for (const row of aliensRows) {
            row.move()
            row.update()
            // row.render(ctx)
            if ((row.x + row.width >= WIDTH || row.x <= 0) && row.canAdvance) {
                row.advance()
            }
        }
    }


}, 1000)


function renderGame() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    for (const row of aliensRows) {
        row.render(ctx)
    }
    window.requestAnimationFrame(renderGame);
    Player.render(ctx)
}

renderGame()
