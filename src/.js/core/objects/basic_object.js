import Dispatcher from "../dispatcher";
import Scene from "./scene";

export default class BasicObject extends Dispatcher {
  get id() {
    return this._id
  };

  get parent() {
    return this._parent
  };

  get children() {
    return this._children
  };

  set id(id) {
    this._id = id
  };

  set parent(parent) {
    this._parent = parent
  };

  constructor() {
    super();
    this._id = undefined;
    this._parent = null;
    this._children = []
  };

  add(object, id=undefined) {
    if (object == this) {
      console.error(`${this.class.name}.add: object can't be added as a child of itself.`);
      return this
    };

    if (object) {
      if (object.parent != null) object.parent.remove(object);
      object.parent = this;
      if (object.id == undefined) object.id = id;
      this._children.push(object);

      // TODO: updateGlobalPosition
      this.add_signals(object)
    } else {
      console.error(`${this.class.name}.add: object not an instance of ${this.class.name}`)
    };

    return this
  };

  add_signals(object) {
    // Added
    if (typeof object.ready !== 'undefined') {
      object.connect(Dispatcher.ADDED, obj => obj.ready);
      object.emit_signal(Dispatcher.ADDED, object)
    };

    // Update
    if (typeof object.update !== 'undefined') {
      this.get_scene(true).connect(
        Dispatcher.UPDATE,
        dt => object.update(dt)
      )
    };

    // Draw
    if (typeof object.draw !== 'undefined') {
      this.get_scene(true).connect(
        Dispatcher.DRAW,
        ren => object.draw(ren)
      )
    }
  };

  remove(object) {
    let index = this._children.indexOf(object);

    if (index != -1) {
      object.id = undefined;
      object.parent = null;
      this._children.splice(index, 1)
    };

    return this
  };

  get free() {
    if (this._children.length > 0) {
      this._children.forEach(child => child.free)
    } else if (this._parent) {
      this.free_signals;
      this._parent.remove(this)
    };

    if (this._parent) return this._parent.free
  };

  get free_signals() {
    return this.signals = null
  };

  get_scene(is_root=false) {
    let _scene = this;
    let _parent = _scene.parent;

    while (true) {
      if (is_root) {
        if (_parent == null) break
      } else {
        let super_class_name = Object.getPrototypeOf(Object.getPrototypeOf(_parent)).constructor.name;

        if (_parent.constructor.name == Scene.NAME_SCENE || super_class_name == Scene.NAME_SCENE) {
          _scene = _parent;
          break
        }
      };

      _scene = _parent;
      _parent = _scene.parent
    };

    return _scene
  };

  find_child(id) {
    let result = null;

    for (let i in this._children) {
      let child = this._children[i];

      if (child.id == id) {
        result = child;
        break
      }
    };

    return result
  }
}