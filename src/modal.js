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
                pointer-events: none;
              }
              #modal{
                position:fixed;
                top:15vh;
                left:25%;
                width:50%;
                background:white;
                border-radius:3px;
                box-shadow:0 2px 8px rgba(0,0,0,.25);
                z-index:100;
                opacity:0;
                pointer-events: none;
                transition: all 0.3s ease-out;

              }
              :host([opened]) #backdroup,
              :host([opened]) #modal{
                opacity:1;
                pointer-events: all;
              }
              :host([opened]) #modal{
                top:25vh;
              }
              #actions{
                border-top:1px solid #ccc;
                padding:1rem;
                display:flex;
                justify-content: flex-end;
              }
              #actions button{
                padding:5px;
                margin:5px;
                border-radius:4px;
                font-size:14px;
                cursor:pointer;
              }
              header,main{
                padding:.2rem 1rem;
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
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Yes</button>
              </section>
            </div>
          `;
            const cancelBtn = this.shadowRoot.querySelector("#cancel-btn");
            const confirmBtn = this.shadowRoot.querySelector("#confirm-btn");
            cancelBtn.addEventListener('click', this._cancel.bind(this));
            confirmBtn.addEventListener('click', this._confirm.bind(this));
        }
        // attributeChangedCallback(name, oldValue, newValue) {
        //     if (name === "opened") {
        //         if (this.hasAttribute("opened")) {
        //             this.shadowRoot.querySelector("#backdroup").style.opacity = 1;
        //             this.shadowRoot.querySelector("#backdroup").style.pointerEvents = 'all';
        //             this.shadowRoot.querySelector("#modal").style.opacity = 1;
        //             this.shadowRoot.querySelector("#modal").style.pointerEvents = 'all';
        //         }
        //     }
        // }
        // static get observedAttributes() {
        //     return ["opened"]
        // }
    open() {
        this.setAttribute("opened", "");
    }
    hide() {
        this.removeAttribute("opened")
    }
    _cancel(event) {
        this.hide();
        const CancelEvent = new Event('cancel', { bubbles: true, composed: true });
        event.target.dispatchEvent(CancelEvent);
    }
    _confirm() {
        this.hide();
        const CancelEvent = new Event('confirm');
        this.dispatchEvent(CancelEvent);
    }
}
customElements.define("wc-modal", Modal);