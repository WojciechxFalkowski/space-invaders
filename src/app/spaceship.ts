import {HEIGHT, width} from "./variables";
import {WIDTH} from "./variables";

import spaceship from './../images/space-invaders-ship.png';

const ship = new Image()
ship.src = spaceship

export class Spaceship {
    public x: number = 0;
    public y: number = 0;
    public life: number = 3;
    public lifeInfoElement = document.querySelector('.life')

    constructor(protected positionX: number, protected positionY: number) {
        this.x = positionX;
        this.y = positionY;
        this.showLife()
    }

    //Rysowanie statku gracza
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(ship, this.x, this.y, width, width)
    }

    move(value: number) {
        if ((this.x !== 0 && Math.sign(value) === -1) || (this.x !== WIDTH - width && Math.sign(value) === 1)) {
            this.x += value
        }
    }

    removeLife() {
        this.life -= 1
        this.showLife()
    }

    showLife() {
        if (this.lifeInfoElement) {
            this.lifeInfoElement.innerHTML = `Life: ${this.life}`
        }
    }

    restartSpaceship() {
        this.x = WIDTH / 2
        this.y = HEIGHT - width*2
        this.life = 3
        this.showLife()
    }

}

