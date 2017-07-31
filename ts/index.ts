import { Level } from "./classes/level";

window.onload = function () {
    let canvas = document.getElementById("demoCanvas");
    if (canvas) {
        let level = new Level(canvas);
    }
};