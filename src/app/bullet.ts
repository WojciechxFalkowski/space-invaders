import {width} from "./variables";

export class Bullet {
    public x: number = 0
    public y: number = 0
    public shooter:string = "player"

    constructor(protected positionX: number, protected  positionY: number,protected whoShooted:string) {
        this.x = positionX + width/2
        this.y = positionY
        this.shooter = whoShooted
    }

    update() {
            this.y -= 5
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x , this.y, 10, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }


}