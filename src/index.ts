import './scss/app.scss';
import {Spaceship} from "./app/spaceship";
import {Bullet} from "./app/bullet";
import {AlienRow} from './app/alienrow'
import {Points} from './app/points'
import {Alien} from './app/alien'
import {collisionDetector} from './app/collision'
import {WIDTH, HEIGHT, width, ctx, aliensInRow, columnsOfAliens} from "./app/variables";

let pauseGame = true;
let isGameOver = false
let frameCount = 0;
let hasWon: boolean | null = null
let numberOfAliveAliens: number;

const player = new Spaceship(WIDTH / 2, HEIGHT - width)
const bullets: Bullet[] = []
const score = new Points(0)

score.displayPopup(true)

//Obsługa przycisków
document.addEventListener("keydown", (event: KeyboardEvent) => {
    switch (event.code) {
        case "Space": {
            let flag = true
            for (let i = 0; i < bullets.length; i++) {
                if (bullets[i].shooter === "player") {
                    flag = false
                }
            }
            if (flag) {
                bullets.push(new Bullet(player.x, player.y, "player"))
            }
            break;
        }
        case "KeyA": {
            player.move(-width)
            break;
        }
        case "KeyD": {
            player.move(width)
            break;
        }
        case "ArrowLeft": {
            player.move(-width)
            break;
        }
        case "ArrowRight": {
            player.move(width)
            break;
        }
        case "Enter": {
            restartGame(player, score)
            break
        }
        default: {
            break;
        }
    }

})

//Ustawianie opcji na nowo
function restartGame(player: Spaceship, score: Points) {
    isGameOver = false
    hasWon = null
    pauseGame = false
    player.restartSpaceship()
    score.restartPoints()
    hasWon = null
    for (let i = 0; i <= bullets.length; i++) {
        bullets.pop()
    }
    aliensRows = [new AlienRow(0), new AlienRow(width)]
}

//Sprawdzam czy wiersze z obcymi sa puste, aby zakonczyc gre
function checkIsOverGame(aliens: AlienRow[], player: Spaceship) {
    let flag = true
    numberOfAliveAliens = -columnsOfAliens * 6
    for (const row of aliens) {
        for (const alien of row.aliens) {
            if (alien.isAlive) {
                flag = false
            } else {
                ++numberOfAliveAliens
            }
        }
    }
    if (player.life <= 0) {
        flag = true
    }
    if (flag) {
        hasWon = true
        if (player.life > 0) {
            score.renderNewGame(ctx, hasWon)

        } else {
            score.renderNewGame(ctx, false)

        }
    }
    return flag
}


let aliensRows: AlienRow[] = [new AlienRow(0), new AlienRow(width)]
const renderAliens = (fr: number) => {
    for (const row of aliensRows) {

        if (fr % (120 - numberOfAliveAliens * 6) === 0) {
            row.move()
            if ((row.x + row.width >= WIDTH || row.x <= 0 - indexOfFirstAlien(aliensRows) * width) && row.canAdvance) {
                row.advance()
            } else if (row.y + width >= HEIGHT - width * 2) {
                isGameOver = true
                hasWon = false
                score.renderNewGame(ctx, hasWon)
            }
        }
        row.update()
        row.render(ctx)
    }

}

function renderGame(bullets: Bullet[]) {
    if (!pauseGame) {

        frameCount++;
        ctx.clearRect(0, 0, WIDTH, HEIGHT)
        if (!isGameOver) {
            isGameOver = checkIsOverGame(aliensRows, player)
            renderAliens(frameCount)
            if ((frameCount + 30) % 60 === 0) {
                const aggressiveAlien = randomAlienShoot(aliensRows)
                if (aggressiveAlien) {
                    bullets.push(new Bullet(aggressiveAlien.x, aggressiveAlien.y + width, 'alien'))
                }

            }
        }

        //Rysowanie pocisku
        for (let i = 0; i < bullets.length; ++i) {
            bullets[i].render(ctx)
            bullets[i].update(bullets[i].shooter)

            //Usuwanie pocisku
            if (bullets[i].y < 0 || bullets[i].y >= HEIGHT-width) {
                bullets.splice(i, 1)
            }
        }
        collisionDetector(bullets, aliensRows, player, score)
        player.render(ctx)
    }
    window.requestAnimationFrame(() => renderGame(bullets));
}

renderGame(bullets)


function indexOfFirstAlien(rowOfAliens: AlienRow[]) {
    let firstAlien = aliensInRow
    for (const alien of rowOfAliens) {
        const indexOfFirstAlien = alien.aliens.findIndex((item: Alien) => {
            return item.isAlive
        })
        if (firstAlien > indexOfFirstAlien && indexOfFirstAlien !== -1) {
            firstAlien = indexOfFirstAlien
        }
    }
    return firstAlien
}


function randomAlienShoot(rowOfAliens: AlienRow[]) {
    const aliveAliensInOneLine = checkAliveAliensInLine(rowOfAliens)
    const aliensInFirstRow = rowOfAliens[0].width / width
    const index = Math.floor(Math.random() * aliensInFirstRow)

    if (aliveAliensInOneLine[index] !== 0) {
        return rowOfAliens[aliveAliensInOneLine[index] - 1].aliens[index]
    }

}

function checkAliveAliensInLine(rowOfAliens: AlienRow[]) {
    const aliveAliensInOneLine: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < 12; i++) {
        for (let j = 1; j >= 0; j--) {
            if (rowOfAliens[j].aliens[i].isAlive) {
                ++aliveAliensInOneLine[i]
            }
        }
    }

    return aliveAliensInOneLine
}
