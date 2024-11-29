let template = document.createElement("template");

template.innerHTML =
  /*html*/
  `<div class="container">
        <div class="content">
            <div class="square twitch" style="margin-bottom: 50px;">
                <span class="one"></span>
                <span class="two"></span>
                <span class="three"></span>
                <div class="circle">
                    <h2 class="DrugRadar"> AMADIL </h2>
                    <router-link to="/about" kind="link" title="go to About">
                        <span slot="title" class="about">About</span>
                    </router-link>
                </div>
            </div>

            <a href="https://github.com/haguezoum/amadil" class="button" target="_blank">
                    <span class="actual-text">&nbsp;Contribute with us !&nbsp;</span>
                    <span class="hover-text" aria-hidden="true">&nbsp;Contribute with us !&nbsp;</span>
            </a>
            
        </div>
    </div>`;

class HOME extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.appendChild(template.content.cloneNode(true));
    const linkElem = document.createElement("link"); //add this lines
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "src/assets/style/home-page.css");
    this.shadow.appendChild(linkElem);
  }

  connectedCallback() {
    console.log("HOME is Connected");
  }

  async disconnectedCallback() {
    console.log("HOME is Disonnected");
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
customElements.define("home-page", HOME);

export default HOME;
