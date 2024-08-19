class __COMPONENT_NAME__ extends HTMLElement {
    constructor() {
      super();
      const shadowRoot = this.attachShadow({ mode: 'open' });
      this.render(shadowRoot);
    }
    
    async render(shadowRoot){
      try{
        const response = await fetch('../templates/__COMPONENT_TAG__.html');
        const content = await response.text();
        const template = document.createElement('template');
        template.innerHTML = content;
        shadowRoot.appendChild(template.content.cloneNode(true));
      }catch(err){
      console.error(err);
      }
    }
}
  customElements.define('__COMPONENT_TAG__', __COMPONENT_NAME__);