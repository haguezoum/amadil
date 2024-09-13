class __COMPONENT_NAME__ extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    console.log('Nav bar connected');
    const templateContent = await this.fetchTemplate();
    this.shadowRoot.innerHTML = templateContent;
  }
  
  async disconnectedCallback() {
    console.log('Nav bar disconnected');
  }

  static get observedAttributes() {
    return[/* array of attribute names to monitor for changes */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // called when one of attributes listed above is modified
  }

  async fetchTemplate() {
  
    return(
    `
    <style>
        @import "../styles/__COMPONENT_TAG__.css";
    </style>
    <h1>
      this is __COMPONENT_NAME__ component
    </h1>
    `
    );
  }
}
  customElements.define('__COMPONENT_TAG__', __COMPONENT_NAME__);

export default __COMPONENT_NAME__;
