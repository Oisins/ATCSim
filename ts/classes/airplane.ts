import Shape = createjs.Shape;

export class Airplane{
    shape: Shape;

    tgt_speed: number;
    tgt_heading: number;

    constructor(private x: number,
                private y: number,
                public heading: number,
                public speed: number){
        this.tgt_heading = this.heading;
        this.shape = new Shape();
        this.shape.graphics.beginFill("red").drawCircle(this.x, this.y, 5);
    }

    set_pos(x: number, y: number){
        //console.log("Move to " + x + " - " + y);
        this.shape.setTransform(x, y);
        this.x = x;
        this.y = y;
    }

    tick(){
        if(this.heading > this.tgt_heading){
            this.heading--;
        }else if(this.heading < this.tgt_heading){
            this.heading++;
        }

        if(this.speed > this.tgt_speed){
            this.speed--;
        }else if(this.speed < this.tgt_speed){
            this.speed++;
        }

        function to_deg(angle: number){
            return angle * (Math.PI / 180)
        }

        let x = this.x - (Math.sin(to_deg(this.heading)) * (this.speed / 100));
        let y = this.y - (Math.cos(to_deg(this.heading)) * (this.speed / 100));
        this.set_pos(x, y);
    }
}