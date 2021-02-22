import './scss/app.scss';
import {Spaceship} from "./app/spaceship";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const SMALLER_SCREEN_VALUE = WIDTH<HEIGHT?HEIGHT:WIDTH
const rows = 8;
const cols = 16;
const aliens: any = []
const width: number = SMALLER_SCREEN_VALUE / cols, height: number = SMALLER_SCREEN_VALUE / cols

document.addEventListener("keydown",moveKey)

const createCanvas = (width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);

    return canvas;
}

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');


class Alien {
    public x: number = 0;
    public y: number = 0;

    constructor(protected positionX: number, protected positionY: number) {
        this.x = positionX;
        this.y = positionY;

    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, WIDTH / cols, WIDTH / cols);
        ctx.stroke();
    }
};


for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
        aliens.push(new Alien(j * (WIDTH / cols), i * (WIDTH / cols)))
    }
}

function drawLines() {

    const midWidth = WIDTH / 2 - (cols / 2) * width
    const midHeight = HEIGHT / 2 - (rows / 2) * height

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

function moveKey(e:any) {
    // console.log(e.keyCode)
    switch (e.keyCode) {

        case 37: {
            console.log("W lewo")
            Player.move(-10)
            break;
        }
        case 39: {
            console.log("W prawo")
            Player.move(10)
            break;
        }
        default: {
            console.log("Nie poprawny klawisz!")
            break;
        }
    }
}
const Player = new Spaceship(WIDTH / 2, HEIGHT / 2 + ((rows / 2)-1) * (SMALLER_SCREEN_VALUE / cols))

function renderGame() {

    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        drawLines()
        Player.render(ctx)
        window.requestAnimationFrame(renderGame);
    }

}


renderGame()