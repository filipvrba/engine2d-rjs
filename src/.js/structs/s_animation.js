import STrack from "./s_track";

export default class SAnimation {
  get tracks() {
    return this._tracks
  };

  constructor() {
    this._tracks = []
  };

  add_track(object_attr) {
    let track = new STrack(object_attr);
    this._tracks.push(track);
    return track
  };

  get is_done() {
    let result = true;

    for (let i = 0; i < this._tracks.length; i++) {
      let track = this._tracks[i];

      if (!track.is_done) {
        result = false;
        break
      }
    };

    return result
  }
}