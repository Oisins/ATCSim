import Ticker = createjs.Ticker;
import { Subject } from "rxjs/Subject";

export class Timer {
    listeners: Listener[];
    max_time: number;
    ticks: number;

    private static _instance: Timer;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    private constructor() {
        this.max_time = 0;
        this.ticks = 0;
        this.listeners = [];
        Ticker.addEventListener("tick", () => this.tick());
    }

    add_listener(time: number) {
        if (time > this.max_time) {
            this.max_time = time;
        }
        let obj = new Listener(time, new Subject());
        this.listeners.push(obj);
        return obj.subject.asObservable();
    }

    tick() {
        for (let listener of this.listeners) {
            if (this.ticks % listener.time == 0) {
                listener.subject.next();
            }
        }
        if (this.ticks == this.max_time) {
            this.ticks = 0;
        } else {
            this.ticks++
        }
    }
}

class Listener {
    constructor(public time: number, public subject: Subject<any>) {
    }
}