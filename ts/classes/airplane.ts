import Shape = createjs.Shape;

export class Airplane{
    shape: Shape;
    x: number;
    y: number;

    constructor(x: number, y: number){
        this.x = x;
        this.y = y;
        this.shape = new Shape();
        this.shape.graphics.beginFill("red").drawCircle(this.x, this.y, 5);
    }
}