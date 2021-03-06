class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #backdroup{
          position:fixed;
          top:0;
          left:0;
          width:100%;
          height:100vh;
          background-color: rgba(0,0,0,.75);
          z-index:10;
          opacity:0;
          pointer-events:none;
        }
        #modal{
          position:fixed;
          top:25vh;
          left:25%;
          width:50%;
          background:white;
          border-radius:3px;
          box-shadow:0 2px 8px rgba(0,0,0,.25);
          z-index:100;
          opacity:0;
          pointer-events:none;
        }
      </style>
      <div id="backdroup"></div>
      <div id="modal">
        <header>
          <h1>Please Confirm</h1>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Yes</button>
        </section>
      </div>
    `;
  }
  attributeChangedCallback(name, oldValue, newValue) {}
  static get observedAttributes() {
    return ["opened"];
  }
}
customElements.define("wc-modal", Modal);
