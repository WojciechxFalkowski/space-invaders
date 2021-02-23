import './scss/app.scss';
import {Spaceship} from "./app/spaceship";
import {Alien} from './app/alien'
import {createCanvas} from "./app/canvas";

//Szerokość ekranu canvas
const WIDTH = window.innerWidth;

//Wysokosc ekranu canvas
const HEIGHT = window.innerHeight;

//Wybieram szerokosc lub wysokosc zaleznie co jest mniejsze
const SMALLER_SCREEN_VALUE = WIDTH<HEIGHT?HEIGHT:WIDTH

//Liczba wierszy
const rows = 8;

//Liczba kolumn
const cols = 16;

//Tablica statkow obych
const aliens: any = []

// Szerokosc jednej komorki
const width: number = SMALLER_SCREEN_VALUE / cols

//Wysokosc jednej komorki
const height: number = SMALLER_SCREEN_VALUE / cols

//Tworzenie canvas
const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

document.addEventListener("keydown",moveKey)


//Generowania obcych
for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
        aliens.push(new Alien(j * (WIDTH / cols), i * (WIDTH / cols)))
    }
}


//Rysowanie grida w canvas
function drawLines() {

    // Wysrodkowanie grida w pionie i poziomie
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