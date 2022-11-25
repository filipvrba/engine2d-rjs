import "../css/style.css";
import Scene from "./core/objects/scene";
import BasicObject from "./core/objects/basic_object";
import TDRenderer from "./core/td_renderer";
document.querySelector("#app").innerHTML = "<canvas-2d></canvas-2d>";
let canvas_2d = document.querySelector("canvas-2d");

class Box extends BasicObject {
  get ready() {
    return console.log(this.id)
  };

  // console.log dt
  update(dt) {};

  // console.log r
  draw(r) {}
};

class Circle extends BasicObject {
  get ready() {
    return console.log(this.id)
  };

  // console.log dt
  update(dt) {};

  // console.log r
  draw(r) {}
};

let box = new Box;
canvas_2d.scene_r.add(box, "box");
console.log(canvas_2d.scene_r)