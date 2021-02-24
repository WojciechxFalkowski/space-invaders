import {aliensInRow, height} from "./variables";
import {Alien} from "./alien";
import {width} from "./variables";

export class AlienRow {
    public x: number = 0
    public width: number = 0
    public aliens: any[] = []
    public direction: { x: number, y: number } = {x: 1, y: 0}
    public canAdvance: boolean = true

    constructor(public y: number) {
        this.x = 2 * width
        for (let i = 0; i < aliensInRow; i++) {
            this.aliens.push(new Alien(this.x + i * width, this.y))
        }
        console.log(this.aliens)

        this.width = this.aliens.length * width
    }

    update() {
        let i = 0
        for (const alien of this.aliens) {
            alien.x = this.x + i * width
            alien.y = this.y
            i++
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

    removeAlien(indexOfAlienToRemove:number) {
        const deletedElement = this.aliens.splice(indexOfAlienToRemove,1)
    console.log(deletedElement)
        console.log(this.aliens)
    }

}