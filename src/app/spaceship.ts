import {width} from "./variables";
import {Bullet} from "./bullet";

export class Spaceship {
    public x: number = 0;
    public y: number = 0;
    public bullets: Bullet[] = []

    constructor(protected positionX: number, protected positionY: number) {
        this.x = positionX;
        this.y = positionY;

    }

    //Rysowanie statku gracza
    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y, width, width);
        ctx.stroke();
    }

    move(value: number) {
        this.x += value
    }

}

