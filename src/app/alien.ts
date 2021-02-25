import { width} from "./variables";
import alienShip from "../images/alien_space_invaders.png";

const alien = new Image()
alien.src = alienShip

export class Alien {
    public x: number = 0;
    public y: number = 0;
    public isAlive:boolean = true

    constructor(protected positionX: number, protected positionY: number) {
        this.x = positionX;
        this.y = positionY;
    }

    //Rysowanie obcego
    render(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(alien, this.x, this.y, width, width)

    }

};