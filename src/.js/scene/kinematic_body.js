import Object2D from "../core/objects/object_2d";
import Vector2 from "../core/math/vector2";

export default class KinematicBody extends Object2D {
  get visible_point() {
    return this._visible_point
  };

  set visible_point(visible_point) {
    this._visible_point = visible_point
  };

  get physics_direction() {
    return this._physics_direction
  };

  get is_move() {
    return this._is_move
  };

  get is_move_vertical() {
    return this._is_move_vertical
  };

  constructor() {
    super();
    this._previoud_position = new Vector2;
    this._physics_direction = new Vector2;
    this._is_move = false;
    this._is_move_vertical = false;
    this._visible_point = false
  };

  update(dt) {
    this._previoud_position = this.position.clone
  };

  physics_update(dt) {
    this._physics_direction = this.position.clone.sub(this._previoud_position).normalized;

    if (this._physics_direction.equals(new Vector2)) {
      this._is_move = false
    } else {
      this._is_move = true
    };

    if (this._physics_direction.equals(Vector2.UP) || this._physics_direction.equals(Vector2.DOWN)) {
      this._is_move_vertical = true
    } else if (this._physics_direction.equals(Vector2.LEFT) || this._physics_direction.equals(Vector2.RIGHT)) {
      this._is_move_vertical = false
    };

    this.update_global_position()
  };

  draw(r) {
    if (!this.visible_point) return;
    let green = "#79b415";
    let red = "#cb3950";
    let width = 20;
    r.lineWidth = 2;

    // x
    r.strokeStyle = red;
    r.beginPath();
    r.moveTo(this.global_position.x - width, this.global_position.y);
    r.lineTo(this.global_position.x + width, this.global_position.y);
    r.fill();
    r.stroke();

    // y
    r.strokeStyle = green;
    r.beginPath();
    r.moveTo(this.global_position.x, this.global_position.y - width);
    r.lineTo(this.global_position.x, this.global_position.y + width);
    r.fill();
    r.stroke()
  }
}