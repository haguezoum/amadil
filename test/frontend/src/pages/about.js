let template = document.createElement("template");

template.innerHTML =
  `<div id="about-page" class="about-page"> Hello from ABOUT... ! <br><br>
    <router-link to="/home" kind="link" title="go to Home">
      <span slot="title" class="home">Home</span>
    </router-link>
  </div>`;

class ABOUT extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "src/assets/style/about-page.css");
    this.shadow.appendChild(linkElem);
  }

  connectedCallback() {
    console.log("ABOUT is Connected");
  }

  disconnectedCallback() {
    console.log("ABOUT is Disonnected");
  }

  static get observedAttributes() {
    return [
      /* array of attribute names to monitor for changes */
    ];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }
}
customElements.define("about-page", ABOUT);

export default ABOUT;
