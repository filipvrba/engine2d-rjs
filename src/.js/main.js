import "../css/style.css";
import Scene from "./core/objects/scene";
import BasicObject from "./core/objects/basic_object";
import TDRenderer from "./core/td_renderer";
document.querySelector("#app").innerHTML = "<canvas id='c2d'></canvas>";

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

let renderer = new TDRenderer(document.getElementById("c2d"));
renderer.set_size(window.innerWidth, window.innerHeight);
let scene_r = new Scene;
let box = new Box;
let circle = new Circle;
scene_r.add(box, "box");
scene_r.add(circle, "circle");
let i = 0;
let is_call = false;

function tick() {
  renderer.render(scene_r);
  requestAnimationFrame(() => tick());

  if (i > 10 && is_call == false) {
    is_call = true;
    scene_r.free;
    console.log(box);
    console.log(circle);
    console.log(scene_r)
  };

  i++
};

tick()