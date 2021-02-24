import './scss/app.scss';
import {Spaceship} from "./app/spaceship";
import {Bullet} from "./app/bullet";
import {AlienRow} from './app/alienrow'
import {Points} from './app/points'
import {Alien} from './app/alien'
import {
    WIDTH, HEIGHT, SMALLER_SCREEN_VALUE, rows, cols, aliens, width, height,
    canvas, ctx, aliensInRow, midWidth, midHeight, columnsOfAliens
} from "./app/variables";

let isGameOver = false
let Player = new Spaceship(WIDTH / 2, HEIGHT - width)
const bullets: Bullet[] = []
let Score = new Points(0)
let hasWon: boolean | null = null
document.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.keyCode) {
        case 32: {
            bullets.push(new Bullet(Player.x, Player.y, "player"))
            break;
        }
        case 37: {
            moveSpaceship(Player, -width)
            break;
        }
        case 39: {
            moveSpaceship(Player, width)
            break;
        }
        case 65: {
            moveSpaceship(Player, -width)
            break;
        }
        case 68: {
            moveSpaceship(Player, width)
            break;
        }
        case 13: {
            isGameOver = false
            hasWon = null
            aliensRows = [new AlienRow(0), new AlienRow(width)]
            Player = new Spaceship(WIDTH / 2, HEIGHT - width)
            Score = new Points(0)
            setTimeout(renderAliens, 10)
            break
        }
        default: {
            console.log("Nie poprawny klawisz!")
            break;
        }
    }

})

function moveSpaceship(player: Spaceship, amount: number) {
    Player.move(amount)
}

//Sprawdzam czy wiersze z obcymi sa puste, aby zakonczyc gre
function checkIsOverGame(aliens: AlienRow[]) {
    let flag = true
    for (const row of aliens) {
        for (const alien of row.aliens) {
            if (alien.isAlive) {
                flag = false
            }
        }
    }
    if (flag) {
        hasWon = true
    }
    return flag
}

function collisionDetector(bullets: Bullet[], aliens: AlienRow[], player: Spaceship) {
    //sprawdzam czy sa kule i obcy w tablicach
    if (bullets.length > 0 && aliens.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
            for (let j = 0; j < aliens.length; j++) {
                if (bullets[i].y >= aliens[j].y && bullets[i].y <= aliens[j].y + width) {
                    for (let k = 0; k < aliens[j].aliens.length; k++) {
                        if (aliens[j].aliens.length > 0) {
                            if (aliens[j].aliens[k].x <= bullets[i].x && aliens[j].aliens[k].x + width >= bullets[i].x && aliens[j].aliens[k].isAlive) {
                                bullets.splice(i, 1)
                                aliens[j].removeAlien(k)
                                Score.addPoints()
                                for (const row of aliens) {
                                    row.changeLengthOfRow(indexOfFirstAndLastAlien(aliensRows))
                                }
                                return
                            }
                        }
                    }
                }
            }
        }
    }
}

let aliensRows: AlienRow[] = [new AlienRow(0), new AlienRow(width)]
const renderAliens = (fr: number) => {

    for (const row of aliensRows) {
        if (fr % 20 === 0) {
            row.move()
            if ((row.x + row.width >= WIDTH || row.x <= 0 - indexOfFirstAlien(aliensRows) * width) && row.canAdvance) {
                row.advance()
            } else if (row.y + width >= HEIGHT - width * 2) {
                isGameOver = true
                hasWon = false
            }
        }
        row.update()
        row.render(ctx)
    }

}


let frameCount = 0;

function renderGame() {
    frameCount++;
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    if (!isGameOver) {
        isGameOver = checkIsOverGame(aliensRows)
        renderAliens(frameCount)
    }
    if (isGameOver) {
        Score.renderNewGame(ctx, hasWon)
    }


    //Rysowanie pocisku
    for (let i = 0; i < bullets.length; ++i) {
        bullets[i].render(ctx)
        bullets[i].update(bullets[i].shooter)

        //Usuwanie pocisku
        if (bullets[i].y < 0) {
            bullets.splice(i, 1)
        }
    }
    collisionDetector(bullets, aliensRows, Player)
    Player.render(ctx)
    Score.render(ctx)
    window.requestAnimationFrame(renderGame);
}

renderGame()

function indexOfFirstAlien(rowOfAliens: AlienRow[]) {
    let firstAlien = aliensInRow
    for (const alien of rowOfAliens) {
        const indexOfFirstAlien = alien.aliens.findIndex((item: Alien) => {
            return item.isAlive === true
        })
        if (firstAlien > indexOfFirstAlien && indexOfFirstAlien !== -1) {
            firstAlien = indexOfFirstAlien
        }
    }
    return firstAlien
}

function indexOfFirstAndLastAlien(rowOfAliens: AlienRow[]) {
    let lastAlien = 0
    for (const alien of rowOfAliens) {
        const indexOfFirstAlien = alien.aliens.findIndex((item: Alien) => {
            return item.isAlive === true
        })
        const reversedArray = [...alien.aliens].reverse()
        const indexOfLastAliveAlien = aliensInRow - reversedArray.findIndex((item: Alien) => {
            return item.isAlive === true
        })

        if (lastAlien < indexOfLastAliveAlien && indexOfFirstAlien !== -1) {
            lastAlien = indexOfLastAliveAlien
        }
    }
    return lastAlien
}
