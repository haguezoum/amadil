class Routerlink extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `<slot name="title"></slot>`; /*you can add another slot name="icon"*/
    const linkElem = document.createElement("link");
    linkElem.setAttribute("rel", "stylesheet");
    linkElem.setAttribute("href", "src/assets/style/router-link.css");
    this.shadow.appendChild(linkElem);
  }

  connectedCallback() {
    this.addEventListener("click", (e) => {
      const link = this.getAttribute("to");
      const kind = this.getAttribute("kind");
      e.preventDefault();
      if (kind === "ext") {
        if (link.startsWith("http://") || link.startsWith("https://")) {
          window.open(link, "_blank");
        } else {
          console.log("Invalid URL");
          console.log("URL should start with http:// or https://");
        }
        return;
      } else {
        app.state.currentPage = link;
        app.state.pageHistory.push(link);
      }
    });
  }

  disconnectedCallback() {
    console.log("Routerlink is Disonnected");
  }

  static get observedAttributes() {
    return ["to", "kind"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }
}
customElements.define("router-link", Routerlink);

export default Routerlink;
