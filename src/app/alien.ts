const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const cols = 16;

export class Alien {
    public x: number = 0;
    public y: number = 0;

    constructor(protected positionX: number, protected positionY: number) {
        this.x = positionX;
        this.y = positionY;

    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, WIDTH / cols, WIDTH / cols);
        ctx.stroke();
    }
};