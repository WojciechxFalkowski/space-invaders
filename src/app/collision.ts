import {Bullet} from "./bullet";
import {AlienRow} from "./alienrow";
import {Spaceship} from "./spaceship";
import {aliensInRow, HEIGHT, width} from "./variables";
import {Alien} from "./alien";
import {Points} from './points'

function indexOfFirstAndLastAlien(rowOfAliens: AlienRow[]) {
    let lastAlien = 0
    for (const alien of rowOfAliens) {
        const indexOfFirstAlien = alien.aliens.findIndex((item: Alien) => {
            return item.isAlive
        })
        const reversedArray = [...alien.aliens].reverse()
        const indexOfLastAliveAlien = aliensInRow - reversedArray.findIndex((item: Alien) => {
            return item.isAlive
        })

        if (lastAlien < indexOfLastAliveAlien && indexOfFirstAlien !== -1) {
            lastAlien = indexOfLastAliveAlien
        }
    }
    return lastAlien
}

export function collisionDetector(bullets: Bullet[], aliens: AlienRow[], player: Spaceship, score: Points) {

    //sprawdzam czy sa kule i obcy w tablicach
    if (bullets.length > 0 && aliens.length > 0) {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].shooter === "player") {

                //Zniszczenie aliena
                for (let j = 0; j < aliens.length; j++) {
                    if (bullets[i].y >= aliens[j].y && bullets[i].y <= aliens[j].y + width) {
                        for (let k = 0; k < aliens[j].aliens.length; k++) {
                            if (aliens[j].aliens.length > 0) {
                                if (aliens[j].aliens[k].x <= bullets[i].x && aliens[j].aliens[k].x + width >= bullets[i].x && aliens[j].aliens[k].isAlive) {
                                    bullets.splice(i, 1)
                                    aliens[j].removeAlien(k)
                                    score.addPoints()
                                    for (const row of aliens) {
                                        row.changeLengthOfRow(indexOfFirstAndLastAlien(aliens))
                                    }
                                    return
                                }
                            }
                        }
                    }
                }
                for (let z = 0; z < bullets.length; z++) {
                    if (bullets[z].shooter === "alien" && bullets[i].x === bullets[z].x && bullets[i].y >= bullets[z].y - width / 4 && bullets[i].y <= bullets[z].y + width / 4) {
                        bullets.splice(i, 1)
                        bullets.splice(z, 1)
                        break
                    }
                }
            } else if (bullets[i].shooter === "alien" && bullets[i].y >= HEIGHT - width && bullets[i].y <= HEIGHT && bullets[i].x >= player.x && bullets[i].x <= player.x + width) {
                bullets.splice(i, 1)
                player.removeLife()
            }
        }
    }
}