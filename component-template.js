let template = document.createElement("template");

template.innerHTML = `<div id="__COMPONENT_TAG__" class="__COMPONENT_TAG__"> Hello from __COMPONENT_NAME__... ! </div>`;


class __COMPONENT_NAME__ extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.shadow.appendChild(template.content.cloneNode(true));
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'src/assets/style/__COMPONENT_TAG__.css');
    this.shadow.appendChild(linkElem);
  }

  connectedCallback() {
    console.log("__COMPONENT_NAME__ is Connected");
  }
  
  disconnectedCallback() {
    console.log('__COMPONENT_NAME__ is Disonnected');
  }

  static get observedAttributes() {
    return[/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

}
customElements.define('__COMPONENT_TAG__', __COMPONENT_NAME__);

export default __COMPONENT_NAME__;
