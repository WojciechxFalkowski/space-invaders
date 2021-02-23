import {width} from "./variables";

export class Points{
  public points:number =0;
  constructor(private x:number) {
      this.points = x
  }

  render(ctx:CanvasRenderingContext2D)
  {
      ctx.font = "20px Arial";
      ctx.fillText(`Points: ${this.points}`, 10, 20);
  }
  addPoints()
  {
      this.points +=1
  }
}