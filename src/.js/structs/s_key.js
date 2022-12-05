export default class SKey {
  get is_done() {
    return this._is_done
  };

  set is_done(is_done) {
    this._is_done = is_done
  };

  get time() {
    return this._time
  };

  get value() {
    return this._value
  };

  constructor(time, value) {
    this._time = time;
    this._value = value;
    this._is_done = false
  }
}