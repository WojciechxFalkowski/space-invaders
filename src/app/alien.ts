import {WIDTH,cols} from "./variables";

export class Alien {
    public x: number = 0;
    public y: number = 0;

    constructor(protected positionX: number, protected positionY: number) {
        this.x = positionX;
        this.y = positionY;

    }

    //Rysowanie obcego
    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, WIDTH / cols, WIDTH / cols);
        ctx.stroke();
    }
};