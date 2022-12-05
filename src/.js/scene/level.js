import Scene from "../core/objects/scene";
import Vector2 from "../core/math/vector2";

export default class Level extends Scene {
  static dimension_loop(dimension, callback) {
    let i = 0;

    for (let y = 0; y < dimension.h; y++) {
      for (let x = 0; x < dimension.w; x++) {
        let vec = new Vector2(x, y);
        callback(vec, i);
        i++
      }
    }
  }
}