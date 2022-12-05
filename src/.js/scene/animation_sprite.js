import BasicObject from "../core/objects/basic_object";

export default class AnimationSprite extends BasicObject {
  get frame_speed() {
    return this._frame_speed
  };

  set frame_speed(frame_speed) {
    this._frame_speed = frame_speed
  };

  get current_tile() {
    return this._current_tile
  };

  constructor(sprite, frame_speed=0.25) {
    super(sprite, frame_speed=0.25);
    this._handlers = {};
    this._handlers_length = () => Object.keys(this._handlers).length;
    this._tiles = new BasicObject;
    this._sprite = sprite;
    this._current_tile = null;
    this._bitwase = 0;
    this._time = 0;
    this._frame_speed = frame_speed
  };

  ready() {
    this.add(this._tiles, "tiles")
  };

  get is_update_unlock() {
    let result = true;

    this._tiles.children.forEach((t) => {
      if (Math.pow(this._handlers_length.call() + 1, 2) & this._handlers[t.id].bit == 0) {
        result = false
      }
    });

    return result
  };

  update(dt) {
    if (!this.is_update_unlock) return;
    if (this._current_tile == null) return;
    this._time += dt;

    if (this._time >= this._frame_speed) {
      this._time = 0;
      this._current_tile.id_tile = (this._current_tile.id_tile + 1) % Object.keys(this._current_tile.sprites).length;
      this._sprite.s_sprite = this._current_tile.sprites[this._current_tile.id_tile]
    }
  };

  add_tile(tile) {
    this._handlers[tile.id] = {
      bit: Math.pow(this._handlers_length.call() + 1, 2),
      fn: () => this._bitwase |= this._handlers[tile.id].bit
    };

    tile.connect(Tile.SPRITE_READY, this._handlers[tile.id].fn);
    this._tiles.add(tile, tile.id)
  };

  play_tile(id_tile) {
    this._current_tile = this._tiles.find_child(id_tile);

    if (this._current_tile == null) {
      console.error(`Since this tile '${id_tile}', isn't on the list, it won't launch. Add it, please.`);
      return
    };

    this._current_tile.id_tile = 0;
    this._sprite.img = this._current_tile.img
  };

  free() {
    this._tiles.children.forEach(t => (
      t.disconnect(Tile.SPRITE_READY, this._handlers[t.id].fn)
    ));

    this._handlers = null;
    super.free()
  }
}