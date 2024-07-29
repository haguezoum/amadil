class __COMPONENT_NAME__ extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const template = document.getElementById('__COMPONENT_NAME__-template').content.cloneNode(true);
      shadowRoot.appendChild(template);
    }
  }
  
  customElements.define('__COMPONENT_TAG__', __COMPONENT_NAME__);