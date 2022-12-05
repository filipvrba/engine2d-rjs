import SKey from "./s_key";

export default class STrack {
  get track() {
    return this._track
  };

  set track(track) {
    this._track = track
  };

  get keys() {
    return this._keys
  };

  constructor(track=null) {
    this._track = track;
    this._keys = [];
    this._key_last = null
  };

  add_insert_key(time, key) {
    if (!this._track) console.warn("There is no declared 'track' value.");
    this._keys.push(new SKey(time, key))
  };

  get is_done() {
    let result = true;

    for (let i = 0; i < this.keys.length; i++) {
      let key = this._keys[i];

      if (!key.is_done) {
        result = false;
        break
      }
    };

    return result
  };

  get key_last() {
    let result = this._keys[0];

    for (let i = 0; i < this.keys.length; i++) {
      let key = this._keys[i];
      if (key.is_done) result = key
    };

    return result
  }
}