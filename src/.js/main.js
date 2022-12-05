import "../css/style.css";
import Scene from "./core/objects/scene";
import BasicObject from "./core/objects/basic_object";
import TDRenderer from "./core/td_renderer";
import Object2D from "./core/objects/object2d";
import SAnimations from "./structs/s_animation";
import AnimationPlayer from "./scene/animation_player";
document.querySelector("#app").innerHTML = "<canvas-2d></canvas-2d>";
let canvas_2d = document.querySelector("canvas-2d");
let scene_r = canvas_2d.scene_r;
scene_r.connect("resize", () => update_scene_pos());

function update_scene_pos() {
  scene_r.global_position = canvas_2d.win_center_position
};

update_scene_pos();

class SandboxAnimation extends AnimationPlayer {
  ready() {
    let animation = new SAnimations;
    let track_x = animation.add_track("parent.position.x");
    track_x.add_insert_key(0, 1);
    track_x.add_insert_key(3, 5);
    let track_y = animation.add_track("parent.position.y");
    track_y.add_insert_key(1, 0);
    track_y.add_insert_key(6, 10);
    this.add_animation("change_position_x", animation);
    this.play("change_position_x")
  }
};

class Sandbox extends Object2D {
  constructor() {
    super();
    this._time = 0;
    this._sandbox_animation = new SandboxAnimation
  };

  ready() {
    this.add(this._sandbox_animation, "sandbox_animation")
  };

  update(dt) {
    if (this._time <= 11) {
      this._time += dt;
      console.log(this.position)
    }
  }
};

scene_r.add(new Sandbox, "sandbox")