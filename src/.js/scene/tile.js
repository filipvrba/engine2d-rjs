import BasicObject from "../core/objects/basic_object";
import Vector2 from "../core/math/vector2";
import Level from "./level";
import SSprite from "../structs/s_sprite";

export default class Tile extends BasicObject {
  get img() {
    return this._img
  };

  set img(img) {
    this._img = img
  };

  get size() {
    return this._size
  };

  set size(size) {
    this._size = size
  };

  get sprites() {
    return this._sprites
  };

  constructor(size, img=null) {
    super(size, img=null);
    this._img = img;
    this._size = size;
    this._sprites = null;
    this._is_error = false
  };

  update(dt) {
    // You need to wait until the functions are
    // synchronized because the image has a delay.
    if (this._img == null) {
      if (this._is_error == false) {
        this._is_error = true;
        console.error(`For this class '${this.constructor.name}', there is no image. (SSprite generation won't take place.)`)
      };

      return
    };

    if (this._img.width != 0 || this._img.height != 0) {
      if (this._sprites == null) {
        this._sprites = this.generate_s_sprites(this._size);
        this.emit_signal(Tile.SPRITE_READY, this._sprites)
      }
    }
  };

  get_s_sprite(id) {
    return this._sprites[id]
  };

  generate_s_sprites(size) {
    let w_img = this._img.width;
    let h_img = this._img.height;
    let dimension = new Vector2(w_img / size.w, h_img / size.h);
    let result_h = {};

    Level.dimension_loop(dimension, (vec, i) => {
      let position_vec = new Vector2(vec.x * this._size.x, vec.y * this._size.y);
      result_h[i] = new SSprite(position_vec, this._size)
    });

    return result_h
  }
};

Tile.SPRITE_READY = "gtspr"