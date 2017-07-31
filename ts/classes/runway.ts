import Shape = createjs.Shape;
import Graphics = createjs.Graphics;

export class Runway {
    x: number;
    y: number;
    heading: number;
    length: number;

    shape: Shape;
    debug: Shape;

    constructor(x: number, y: number, length: number, heading: number) {
        this.x = x;
        this.y = y;
        this.heading = heading - 90;
        this.length = length;

        let graphics = new Graphics().beginFill("#7d7d7d").drawRect(0, 0, length, 25);
        this.shape = new Shape(graphics);
        this.shape.setTransform(x, y, 1, 1, this.heading);

        this.debug = new createjs.Shape();
        this.debug.graphics.beginFill("red").drawCircle(this.x, this.y, 5);
    }
}