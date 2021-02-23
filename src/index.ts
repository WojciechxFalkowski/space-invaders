import './scss/app.scss';
import {Spaceship} from "./app/spaceship";
import {Alien} from './app/alien'
import {Bullet} from "./app/bullet";
import {AlienRow} from './app/alienrow'
import {Points} from './app/points'
import {
    WIDTH, HEIGHT, SMALLER_SCREEN_VALUE, rows, cols, aliens, width, height,
    canvas, ctx, aliensInRow, midWidth, midHeight, columnsOfAliens
} from "./app/variables";

let isGameOver = false
const Player = new Spaceship(WIDTH / 2, HEIGHT - width)
const bullets: Bullet[] = []
const Score = new Points(0)
document.addEventListener("keydown", moveKey)

function moveKey(e: any) {
    switch (e.keyCode) {
        case 32: {
            bullets.push(new Bullet(Player.x, Player.y, "player"))
            break;
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

function collisionDetector(bullets: Bullet[], aliens: AlienRow[], player: Spaceship) {
    if (bullets.length > 0 && aliens.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < aliens.length; j++) {
                if (bullets[i].y >= aliens[j].y && bullets[i].y <= aliens[j].y + width) {
                    for (let k = 0; k < aliens[j].aliens.length; k++) {
                        if (aliens[j].aliens.length > 0) {
                            if (aliens[j].aliens[k].positionX <= bullets[i].x && aliens[j].aliens[k].positionX + width >= bullets[i].x) {
                                bullets.splice(i, 1)
                                aliens[j].removeAlien(k)
                                Score.addPoints()
                                return
                            }
                        }
                    }
                }
            }
        }
    }
}

const aliensRows: AlienRow[] = [new AlienRow(0), new AlienRow(width)]
const renderAliens = () => {
    for (const row of aliensRows) {
        row.move()
        row.update()
        if ((row.x + row.width >= WIDTH || row.x <= 0) && row.canAdvance) {
            row.advance()
        } else if (row.y + width >= HEIGHT - width * 2) {
            isGameOver = true
        }
    }
    if (!isGameOver) {
        setTimeout(renderAliens, 10000)
    }


}
setTimeout(renderAliens, 1000000)


function renderGame() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    for (const row of aliensRows) {
        row.render(ctx)
    }

    //Rysowanie pocisku
    for (let i = 0; i < bullets.length; ++i) {
        bullets[i].render(ctx)
        bullets[i].update()

        //Usuwanie pocisku
        if (bullets[i].y < 0) {
            bullets.splice(i, 1)
        }
    }
    Player.render(ctx)
    collisionDetector(bullets, aliensRows, Player)
    Score.render(ctx)
    window.requestAnimationFrame(renderGame);

}

renderGame()
console.log(width, width * 2)
console.log(HEIGHT)
