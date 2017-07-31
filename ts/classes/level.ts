import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Runway } from "./runway";
import Stage = createjs.Stage;
import LoadQueue = createjs.LoadQueue;
import Bitmap = createjs.Bitmap;
import { Airplane } from "./airplane";
import { Timer } from "./timer";

export class Level {
    data: any;
    size: number[];
    canvas: HTMLElement;
    stage: Stage;
    private ready: Subject<HTMLElement>;
    $ready: Observable<HTMLElement>;
    queue: LoadQueue;
    background: Bitmap;

    runways: Runway[];
    airplanes: Airplane[];

    constructor(canvas: HTMLElement) {
        this.runways = [];
        this.airplanes = [];
        this.canvas = canvas;
        this.get_data("level.json");
        this.ready = new Subject();
        this.$ready = this.ready.asObservable();
        this.stage = new Stage(this.canvas);
        this.queue = new LoadQueue();
    }

    get_data(file: string) {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    let allText = rawFile.responseText;
                    this.data = JSON.parse(allText);
                    this.load_level();
                }
            }
        };
        rawFile.send(null);
    }

    load_level() {
        console.log("Loading Level");

        this.queue.loadManifest([
            {id: "background", src: this.data.background}
        ]);


        this.queue.on("complete", this.create_level, this);
    }

    create_level() {
        console.log("Creating Level");
        this.background = new createjs.Bitmap(this.queue.getResult("background"));
        this.stage.addChild(this.background);
        let rwy;
        for (let runway of this.data.runways) {
            rwy = new Runway(runway.x, runway.y, runway.length, runway.heading);
            this.runways.push(rwy);

            this.stage.addChild(rwy.shape);
            this.stage.addChild(rwy.debug);
        }

        Timer.Instance.add_listener(1).subscribe(() => {
            this.tick();
        });

        Timer.Instance.add_listener(100).subscribe(() => {
            this.add_plane();
        });


        this.stage.update();
    }

    add_plane() {
        console.log("Add plane");
        let index = Math.floor(Math.random() * this.data.entry_points.length);
        let entry = this.data.entry_points[index];
        let airplane = new Airplane(entry.x, entry.y, entry.heading, 100);
        this.stage.addChild(airplane.shape);

        this.airplanes.push(airplane);
    }

    tick() {
        console.log(this.airplanes.length);
        for (let airplane of this.airplanes) {
            airplane.tick();
        }
        this.stage.update();
    }
}