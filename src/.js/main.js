import "../css/style.css";
import Scene from "./core/objects/scene";
import BasicObject from "./core/objects/basic_object";
import TDRenderer from "./core/td_renderer";
import Object2D from "./core/objects/object2d";
import Level from "./scene/level";
document.querySelector("#app").innerHTML = "<canvas-2d></canvas-2d>";
let canvas_2d = document.querySelector("canvas-2d");
let scene_r = canvas_2d.scene_r;
scene_r.connect("resize", () => update_scene_pos());

function update_scene_pos() {
  scene_r.global_position = canvas_2d.win_center_position
};

update_scene_pos();

class Player extends Object2D {
  ready() {
    console.log(this.get_scene().id)
  }
};

class Level01 extends Level {
  ready() {
    let player = new Player;
    this.add(player, "player")
  }
};

scene_r.add(new Level01, "level_01")