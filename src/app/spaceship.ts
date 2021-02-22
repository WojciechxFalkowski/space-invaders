const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const rows = 8;
const cols = 16;
const SMALLER_SCREEN_VALUE = WIDTH<HEIGHT?HEIGHT:WIDTH
const width: number = SMALLER_SCREEN_VALUE / cols, height: number = SMALLER_SCREEN_VALUE / cols

export class Spaceship {
    public x: number = 0;
    public y: number = 0;

    constructor(protected positionX: number, protected positionY: number) {
        this.x = positionX;
        this.y = positionY;

    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(this.x, this.y, width, width);
        ctx.stroke();
    }
    move(value:number)
    {
        console.log(`Wartosc: ${value}pozycja: ${this.x}`)
        if(this.x> Math.abs(value))
        {
            this.x +=value
        }

    }
}
