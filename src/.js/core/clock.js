// https://www.gafferongames.com/post/fix_your_timestep/
export default class Clock {
  constructor() {
    this._time = Date.now();
    this._fps_time = 1_000;
    this._fix_dt = Number((1 / 60).toFixed(6))
  };

  delta_time(callback) {
    let current_time = Date.now();
    let dt = (current_time - this._time) / this._fps_time;

    if (dt > this._fix_dt) {
      let dt_count = Math.round(dt / this._fix_dt);

      for (let _ = 0; _ < dt_count; _++) {
        callback(this._fix_dt)
      }
    };

    this._time = current_time;
    return dt
  }
}