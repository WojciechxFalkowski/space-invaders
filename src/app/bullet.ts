import {width} from "./variables";

/**
 * @param positionX - Position on X axis
 * @param positionY - Position on Y axis
 * @param shooter - Who shoot
 */
export class Bullet {
    public x: number = 0
    public y: number = 0
    public shooter: string = "player"

    constructor(protected positionX: number, protected  positionY: number, protected whoShooted: string) {
        this.x = positionX + width / 2 - width / 16
        this.y = positionY
        this.shooter = whoShooted
    }

    update(shooter: string) {
        if (shooter === 'player') {
            this.y -= 5
        } else if (shooter === 'alien') {
            this.y += 5
        }
    }

    render(ctx: CanvasRenderingContext2D) {

        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, width / 8, width / 4);
        ctx.stroke();

    }


}