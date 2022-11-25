import Scene from "../core/objects/scene";
import TDRenderer from "../core/td_renderer";

export default class Canvas2DElement extends HTMLElement {
  get scene_r() {
    return this._scene_r
  };

  constructor() {
    super();
    this._resizeHandler = () => this.resize;
    this._renderer = new TDRenderer(this.init_canvas("c2d"));
    this.resize;
    this._scene_r = new Scene
  };

  init_canvas(id) {
    let template = document.createElement("template");
    template.innerHTML = `${`
      <style type='text/css'>
      canvas {
          position: fixed;
          top: 0;
          left: 0;
          outline: none;
          z-index: -1;
      }
      </style>

      <canvas id='${id}'></canvas>
    `}`;
    this.attachShadow({mode: "open"});
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    return this.shadowRoot.getElementById(id)
  };

  tick() {
    this._renderer.render(this._scene_r);

    requestAnimationFrame(() => {
      return this.tick()
    })
  };

  get resize() {
    return this._renderer.set_size(window.innerWidth, window.innerHeight)
  };

  connectedCallback() {
    this.tick();
    window.addEventListener(Canvas2DElement.RESIZE, this._resizeHandler)
  };

  disconnectedCallback() {
    this._scene_r.free;

    window.removeEventListener(
      Canvas2DElement.RESIZE,
      this._resizeHandler
    )
  }
};

Canvas2DElement.RESIZE = "resize"