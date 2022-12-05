// Original: https://github.com/filipvrba/graph/blob/master/src/core/objects/animations/animationPlayer.js
import BasicObject from "../core/objects/basic_object";

export default class AnimationPlayer extends BasicObject {
  get animation() {
    return this._animations[this._current_animation]
  };

  constructor() {
    super();
    this._animations = {};
    this._playback_active = false;
    this._current_animation = null;
    this._time = 0
  };

  update(dt) {
    if (!this._playback_active) return;
    this._time += dt;

    if (this.animation.is_done) {
      this.stop();

      this.emit_signal(
        AnimationPlayer.ANIM_FINISH,
        this._current_animation
      )
    } else {
      this.animation.tracks.forEach((track) => {
        if (!track.is_done) {
          for (let i = 0; i < track.keys.length; i++) {
            let key = track.keys[i];

            if (!key.is_done) {
              this.update_key(dt, track, key);
              break
            }
          }
        }
      })
    }
  };

  update_key(dt, track, key) {
    let value = (key.value - track.key_last.value) / (key.time - track.key_last.time) * dt;
    value = value ? value : 0;
    this.apply_str(track, `+= ${value}`);

    if (this._time >= key.time) {
      key.is_done = true;
      this.apply_str(track, `= ${key.value}`);
      return
    }
  };

  apply_str(track, str_code="") {
    return eval(`this.${track.track} ${str_code.toString()}`)
  };

  add_animation(name, animation) {
    this._animations[name] = animation
  };

  play(name) {
    this._current_animation = name;
    this._playback_active = true
  };

  stop() {
    this._current_animation = null;
    this._playback_active = false;
    this._time = 0
  }
};

AnimationPlayer.ANIM_FINISH = "apf"