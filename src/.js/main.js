import "../css/style.css";
import Scene from "./core/objects/scene";
import BasicObject from "./core/objects/basic_object";

// import "Dispatcher", "./core/dispatcher"
let scene = new Scene;
let obj = new BasicObject;
let obj_b = new BasicObject;
scene.add(obj, "tobj");
scene.add(obj_b, "test");

// console.log scene
console.log(obj.get_scene(false))