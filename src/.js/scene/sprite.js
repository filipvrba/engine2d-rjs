import Object2D from "../core/objects/object2d";
import Vector2 from "../core/math/vector2";

export default class Sprite extends Object2D {
  get scale() {
    return this._scale
  };

  set scale(scale) {
    this._scale = scale
  };

  get s_sprite() {
    return this._s_sprite
  };

  set s_sprite(s_sprite) {
    this._s_sprite = s_sprite
  };

  get img() {
    return this._img
  };

  set img(img) {
    this._img = img
  };

  get centered() {
    return this._centered
  };

  set centered(centered) {
    this._centered = centered
  };

  get offset() {
    return this._offset
  };

  set offset(offset) {
    this._offset = offset
  };

  get visible_edge() {
    return this._visible_edge
  };

  set visible_edge(visible_edge) {
    this._visible_edge = visible_edge
  };

  get global_offset() {
    return this._global_offset
  };

  constructor(s_sprite) {
    super(s_sprite);
    this._scale = 1;
    this._s_sprite = s_sprite;
    this._img = null;
    this._centered = false;
    this._offset = new Vector2;
    this._global_offset = new Vector2;
    this._visible_edge = false
  };

  ready() {
    if (this._s_sprite) this.set_position()
  };

  set_position() {
    this.position = this.centered_position
  };

  get centered_position() {
    return new Vector2(-(this._s_sprite.size.w * this._scale) / 2, -(this._s_sprite.size.h * this._scale) / 2)
  };

  update(dt) {
    if (this._s_sprite) {
      let offset_global_pos = new Vector2(this._offset.x + this.global_position.x, this._offset.y + this.global_position.y);
      this._global_offset = this._centered ? this.centered_position.clone.add(offset_global_pos) : offset_global_pos
    }
  };

  draw(r) {
    if (this._img && this._s_sprite) {
      r.drawImage(
        this._img,
        this._s_sprite.position.x,
        this._s_sprite.position.y,
        this._s_sprite.size.w,
        this._s_sprite.size.h,
        this._global_offset.x,
        this._global_offset.y,
        this._s_sprite.size.w * this._scale,
        this._s_sprite.size.h * this._scale
      )
    };

    if (this._visible_edge) {
      if (this._s_sprite) {
        r.beginPath();
        r.strokeStyle = "blue";

        r.rect(
          this._global_offset.x,
          this._global_offset.y,
          this._s_sprite.size.w * this._scale,
          this._s_sprite.size.h * this._scale
        );

        r.stroke()
      }
    }
  }
}