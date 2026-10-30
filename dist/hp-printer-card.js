function t(t,e,i,s){var n,r=arguments.length,a=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var o=t.length-1;o>=0;o--)(n=t[o])&&(a=(r<3?n(a):r>3?n(e,i,a):n(e,i))||a);return r>3&&a&&Object.defineProperty(e,i,a),a}"function"==typeof SuppressedError&&SuppressedError;const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),n=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=n.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(e,t))}return t}toString(){return this.cssText}};const a=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:o,defineProperty:c,getOwnPropertyDescriptor:l,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:d}=Object,u=globalThis,_=u.trustedTypes,f=_?_.emptyScript:"",g=u.reactiveElementPolyfillSupport,m=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},v=(t,e)=>!o(t,e),b={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&c(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:n}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);n?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=d(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...p(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),n=e.litNonce;void 0!==n&&s.setAttribute("nonce",n),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),n="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=n.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(void 0!==t){const r=this.constructor;if(!1===s&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??v)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==n||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,g?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,x=t=>t,k=w.trustedTypes,A=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,P=`<${C}>`,j=document,z=()=>j.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,M=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,I=/>/g,N=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,L=/"/g,D=/^(?:script|style|textarea|title)$/i,q=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),B=q(1),F=q(2),W=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),Q=new WeakMap,X=j.createTreeWalker(j,129);function G(t,e){if(!M(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const Z=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":3===e?"<math>":"",a=H;for(let e=0;e<i;e++){const i=t[e];let o,c,l=-1,h=0;for(;h<i.length&&(a.lastIndex=h,c=a.exec(i),null!==c);)h=a.lastIndex,a===H?"!--"===c[1]?a=T:void 0!==c[1]?a=I:void 0!==c[2]?(D.test(c[2])&&(n=RegExp("</"+c[2],"g")),a=N):void 0!==c[3]&&(a=N):a===N?">"===c[0]?(a=n??H,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,o=c[1],a=void 0===c[3]?N:'"'===c[3]?L:R):a===L||a===R?a=N:a===T||a===I?a=H:(a=N,n=void 0);const p=a===N&&t[e+1].startsWith("/>")?" ":"";r+=a===H?i+P:l>=0?(s.push(o),i.slice(0,l)+S+i.slice(l)+E+p):i+E+(-2===l?e:p)}return[G(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class J{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const a=t.length-1,o=this.parts,[c,l]=Z(t,e);if(this.el=J.createElement(c,i),X.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=X.nextNode())&&o.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=l[r++],i=s.getAttribute(t).split(E),a=/([.?@])?(.*)/.exec(e);o.push({type:1,index:n,name:a[2],strings:i,ctor:"."===a[1]?it:"?"===a[1]?st:"@"===a[1]?nt:et}),s.removeAttribute(t)}else t.startsWith(E)&&(o.push({type:6,index:n}),s.removeAttribute(t));if(D.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],z()),X.nextNode(),o.push({type:2,index:++n});s.append(t[e],z())}}}else if(8===s.nodeType)if(s.data===C)o.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)o.push({type:7,index:n}),t+=E.length-1}n++}}static createElement(t,e){const i=j.createElement("template");return i.innerHTML=t,i}}function Y(t,e,i=t,s){if(e===W)return e;let n=void 0!==s?i._$Co?.[s]:i._$Cl;const r=O(e)?void 0:e._$litDirective$;return n?.constructor!==r&&(n?._$AO?.(!1),void 0===r?n=void 0:(n=new r(t),n._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=n:i._$Cl=n),void 0!==n&&(e=Y(t,n._$AS(t,e.values),n,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??j).importNode(e,!0);X.currentNode=s;let n=X.nextNode(),r=0,a=0,o=i[0];for(;void 0!==o;){if(r===o.index){let e;2===o.type?e=new tt(n,n.nextSibling,this,t):1===o.type?e=new o.ctor(n,o.name,o.strings,this,t):6===o.type&&(e=new rt(n,this,t)),this._$AV.push(e),o=i[++a]}r!==o?.index&&(n=X.nextNode(),r++)}return X.currentNode=j,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Y(this,t,e),O(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==W&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>M(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(j.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Q.get(t.strings);return void 0===e&&Q.set(t.strings,e=new J(t)),e}k(t){M(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new tt(this.O(z()),this.O(z()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Y(this,t,e,0),r=!O(t)||t!==this._$AH&&t!==W,r&&(this._$AH=t);else{const s=t;let a,o;for(t=n[0],a=0;a<n.length-1;a++)o=Y(this,s[i+a],e,a),o===W&&(o=this._$AH[a]),r||=!O(o)||o!==this._$AH[a],o===V?t=V:t!==V&&(t+=(o??"")+n[a+1]),this._$AH[a]=o}r&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class nt extends et{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=Y(this,t,e,0)??V)===W)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Y(this,t)}}const at=w.litHtmlPolyfillSupport;at?.(J,tt),(w.litHtmlVersions??=[]).push("3.3.3");const ot=globalThis;let ct=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let n=s._$litPart$;if(void 0===n){const t=i?.renderBefore??null;s._$litPart$=n=new tt(e.insertBefore(z(),t),t,void 0,i??{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return W}};ct._$litElement$=!0,ct.finalized=!0,ot.litElementHydrateSupport?.({LitElement:ct});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:ct}),(ot.litElementVersions??=[]).push("4.2.2");const ht={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:v},pt=(t=ht,e,i)=>{const{kind:s,metadata:n}=i;let r=globalThis.litPropertyMetadata.get(n);if(void 0===r&&globalThis.litPropertyMetadata.set(n,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const n=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,n,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const n=this[s];e.call(this,i),this.requestUpdate(s,n,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function ut(t){return dt({...t,state:!0,attribute:!1})}const _t=1;let ft=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};const gt="important",mt=" !"+gt,yt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends ft{constructor(t){if(super(t),t.type!==_t||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const t of this.ft)null==e[t]&&(this.ft.delete(t),t.includes("-")?i.removeProperty(t):i[t]=null);for(const t in e){const s=e[t];if(null!=s){this.ft.add(t);const e="string"==typeof s&&s.endsWith(mt);t.includes("-")||e?i.setProperty(t,e?s.slice(0,-11):s,e?gt:""):i[t]=s}}return W}});function vt(t){return F`
    <svg
      class="printer ${t}"
      viewBox="0 0 320 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="printer"
    >
      <!-- shadow -->
      <ellipse cx="160" cy="186" rx="130" ry="8" fill="rgba(0,0,0,0.12)" />

      <!-- output tray + paper (paper slides out from under the body) -->
      <g clip-path="url(#tray-clip)">
        <rect class="paper" x="92" y="126" width="136" height="60" rx="3"
              fill="var(--hpc-paper)" stroke="var(--hpc-outline)" stroke-width="1.2" />
        <g class="paper" fill="none" stroke="var(--hpc-outline)" stroke-width="2" opacity="0.5">
          <line x1="106" y1="140" x2="190" y2="140" />
          <line x1="106" y1="150" x2="214" y2="150" />
          <line x1="106" y1="160" x2="170" y2="160" />
        </g>
      </g>
      <defs>
        <clipPath id="tray-clip">
          <rect x="80" y="126" width="160" height="60" />
        </clipPath>
        <linearGradient id="hpc-body-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="var(--hpc-lid)" />
          <stop offset="1" stop-color="var(--hpc-body)" />
        </linearGradient>
        <linearGradient id="hpc-scan-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="var(--hpc-accent)" stop-opacity="0" />
          <stop offset="0.5" stop-color="var(--hpc-accent)" stop-opacity="0.9" />
          <stop offset="1" stop-color="var(--hpc-accent)" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- body -->
      <rect x="40" y="70" width="240" height="70" rx="10"
            fill="url(#hpc-body-grad)" stroke="var(--hpc-outline)" stroke-width="1.5" />
      <!-- front output slot -->
      <rect x="86" y="118" width="148" height="12" rx="4" fill="var(--hpc-body-dark)" />
      <!-- carriage (print head) visible through the slot -->
      <rect class="carriage" x="92" y="120" width="40" height="8" rx="2"
            fill="var(--hpc-panel)" />

      <!-- scanner lid -->
      <rect x="48" y="52" width="224" height="22" rx="6"
            fill="var(--hpc-lid)" stroke="var(--hpc-outline)" stroke-width="1.5" />
      <!-- glass line under the lid -->
      <rect x="60" y="72" width="200" height="3" fill="var(--hpc-body-dark)" />
      <!-- scan glow + bar -->
      <rect class="glow" x="56" y="58" width="208" height="14" rx="4"
            fill="var(--hpc-accent)" />
      <rect class="scan-bar" x="60" y="54" width="60" height="19" rx="3"
            fill="url(#hpc-scan-grad)" />

      <!-- rear paper input (sheet standing) -->
      <path d="M96 52 L104 18 L216 18 L224 52 Z" fill="var(--hpc-paper)"
            stroke="var(--hpc-outline)" stroke-width="1.2" />
      <path d="M90 50 L96 52 L224 52 L230 50 Z" fill="var(--hpc-body-dark)" />

      <!-- control panel -->
      <rect x="226" y="80" width="42" height="26" rx="5" fill="var(--hpc-panel)" />
      <circle class="led" cx="236" cy="93" r="4" />
      <rect x="246" y="88" width="16" height="10" rx="2" fill="#444a53" />
      <rect x="248" y="90" width="12" height="6" rx="1" fill="#7fd8ff" opacity="0.7" />

      <!-- HP logo -->
      <circle cx="68" cy="94" r="11" fill="none" stroke="var(--hpc-panel)" stroke-width="2.2" />
      <text x="68" y="98.5" text-anchor="middle" font-family="Arial, Helvetica, sans-serif"
            font-weight="700" font-size="11" fill="var(--hpc-panel)">hp</text>

      <!-- sleep indicator -->
      <text class="zz" x="286" y="60" font-family="Arial, Helvetica, sans-serif" font-weight="700"
            font-size="18" fill="var(--hpc-secondary-text-color)">z</text>
      <text class="zz zz2" x="298" y="48" font-family="Arial, Helvetica, sans-serif" font-weight="700"
            font-size="13" fill="var(--hpc-secondary-text-color)">z</text>
    </svg>
  `}const bt="hp-printer-card",$t="hp_printer",wt={status:{domain:"sensor",translation_key:"status",suffix:"status"},scanner:{domain:"sensor",translation_key:"scanner_state",suffix:"scanner"},total_pages:{domain:"sensor",translation_key:"total_pages",suffix:"total_pages"},scan_pages:{domain:"sensor",translation_key:"scan_pages",suffix:"scanned_pages"},copy_pages:{domain:"sensor",translation_key:"copy_pages",suffix:"copied_pages"},jam_events:{domain:"sensor",translation_key:"jam_events",suffix:"paper_jams"},wifi_rssi:{domain:"sensor",translation_key:"wifi_rssi",suffix:"wi_fi_signal"},wifi_ssid:{domain:"sensor",translation_key:"wifi_ssid",suffix:"wi_fi_network"},current_job:{domain:"sensor",translation_key:"current_job",suffix:"current_job"},queued_jobs:{domain:"sensor",translation_key:"queued_jobs",suffix:"queued_jobs"},paper_size:{domain:"sensor",translation_key:"paper_size",suffix:"paper_size"},last_scan:{domain:"sensor",translation_key:"last_scan",suffix:"last_scan"},problem:{domain:"binary_sensor",translation_key:"problem",suffix:"problem"},low_ink:{domain:"binary_sensor",translation_key:"low_ink",suffix:"low_ink"},quiet_mode:{domain:"switch",translation_key:"quiet_mode",suffix:"quiet_mode"},identify:{domain:"button",translation_key:"identify",suffix:"locate"},scan:{domain:"button",translation_key:"scan",suffix:"scan"},cancel_job:{domain:"button",translation_key:"cancel_job",suffix:"cancel_current_job"},clean_cartridges:{domain:"button",translation_key:"clean_cartridges",suffix:"clean_cartridges"},align_cartridges:{domain:"button",translation_key:"align_cartridges",suffix:"align_cartridges"},status_report:{domain:"button",translation_key:"print_configuration_page",suffix:"print_status_report"},check_firmware:{domain:"button",translation_key:"check_firmware",suffix:"check_for_firmware_update"},last_scan_image:{domain:"image",translation_key:"last_scan",suffix:"last_scan"},firmware:{domain:"update",translation_key:"firmware",suffix:"firmware"}},xt=/_(ink|toner)$/,kt=new Set(["printing","scanning","copying","canceling","initializing","calibrating"]),At={black:"#111111",matte_black:"#1a1a1a",photo_black:"#2b2b2b",cyan:"#00AEEF",magenta:"#EC008C",yellow:"#FFD500",tri_color:"linear-gradient(90deg,#00AEEF 0 33%,#EC008C 33% 66%,#FFD500 66%)",light_cyan:"#7FD6F5",light_magenta:"#F57FC3",gray:"#808080",light_gray:"#B0B0B0"};function St(t,e){const i={...e.entities??{}},s=[],n=t?.entities;let r=e.device;const a=function(t){if(!t)return;if(t.includes(".")){return t.split(".")[1].replace(/_status$/,"")}return t}(e.entity);if(n&&!r&&a){const t=`sensor.${a}_status`,i=n[e.entity??""]??n[t]??Object.values(n).find(t=>t.platform===$t&&t.entity_id.includes(`.${a}_`));r=i?.device_id}if(n&&r)for(const e of Object.values(n)){if(e.device_id!==r||e.platform!==$t)continue;const[n]=e.entity_id.split(".");if("consumable_level"!==e.translation_key||"sensor"!==n)for(const[t,s]of Object.entries(wt))s.domain!==n||s.translation_key!==e.translation_key||i[t]||(i[t]=e.entity_id);else s.push(Et(t,e.entity_id))}if(a){for(const[e,s]of Object.entries(wt)){const n=`${s.domain}.${a}_${s.suffix}`;!i[e]&&t?.states[n]&&(i[e]=n)}if(0===s.length&&t)for(const e of Object.keys(t.states))e.startsWith(`sensor.${a}_`)&&xt.test(e)&&!e.includes("raw")&&s.push(Et(t,e))}return s.sort((t,e)=>t.entity_id.localeCompare(e.entity_id)),{entities:i,inks:s,deviceId:r}}function Et(t,e){const i=t?.states[e],s=i?.attributes??{},n=String(s.color??function(t){const e=t.split(".")[1]??"";for(const t of Object.keys(At))if(e.includes(t))return t;return"gray"}(e)),r=n.replace(/[\s-]+/g,"_").toLowerCase(),a="string"==typeof s.css_color&&"tri_color"!==r&&s.css_color||At[r]||"#888",o=i?Number(i.state):NaN;return{entity_id:e,color:r,css:a,level:Number.isFinite(o)?o:null,low:Boolean(s.low)||Number.isFinite(o)&&o<=15,empty:Boolean(s.empty)||0===o}}var Ct={common:{name:"HP Printer Card",description:"Card animado para impressoras HP: status, tinta, scanner, trabalhos e atalhos.",not_available:"Impressora indisponível",missing_entity:"Defina `device` ou `entity` com a impressora HP.",invalid_config:"Configuração inválida",scan:"Digitalizar",locate:"Localizar",cancel:"Cancelar",clean:"Limpar",align:"Alinhar",report:"Relatório",quiet_on:"Modo silencioso ligado",quiet_off:"Modo silencioso desligado",firmware_update:"Atualização de firmware disponível",last_scan:"Última digitalização",more_info:"Mais informações",confirm_cancel:"Cancelar a impressão atual?",confirm_clean:"Limpar os cartuchos? Isso imprime uma página.",confirm_align:"Alinhar os cartuchos? Isso imprime uma página."},status:{idle:"Pronta",printing:"Imprimindo",scanning:"Digitalizando",copying:"Copiando",canceling:"Cancelando",initializing:"Inicializando",calibrating:"Calibrando",shutting_down:"Desligando",sleeping:"Em suspensão",attention:"Atenção",error:"Erro",unknown:"Desconhecido",unavailable:"Indisponível"},stat:{total_pages:"Páginas",scan_pages:"Digitalizações",copy_pages:"Cópias",jam_events:"Atolamentos",wifi_rssi:"Wi-Fi",current_job:"Trabalho",queued_jobs:"Na fila",paper_size:"Papel",last_scan:"Última digitalização"},ink:{black:"Preto",matte_black:"Preto fosco",photo_black:"Preto fotográfico",cyan:"Ciano",magenta:"Magenta",yellow:"Amarelo",tri_color:"Colorido",light_cyan:"Ciano claro",light_magenta:"Magenta claro",gray:"Cinza",light_gray:"Cinza claro"},editor:{device:"Dispositivo da impressora",entity:"Prefixo das entidades ou sensor de status",name:"Nome",image:"URL de imagem personalizada",show_name:"Mostrar nome",show_status:"Mostrar status",show_toolbar:"Mostrar barra de ações",show_ink:"Mostrar níveis de tinta",show_scan_preview:"Mostrar prévia da última digitalização",compact_view:"Modo compacto"}};const Pt={en:{common:{name:"HP Printer Card",description:"Animated card for HP printers: status, ink, scanner, jobs and shortcuts.",not_available:"Printer not available",missing_entity:"Set `device` or `entity` to the HP printer.",invalid_config:"Invalid configuration",scan:"Scan",locate:"Locate",cancel:"Cancel",clean:"Clean",align:"Align",report:"Report",quiet_on:"Quiet mode on",quiet_off:"Quiet mode off",firmware_update:"Firmware update available",last_scan:"Last scan",more_info:"More info",confirm_cancel:"Cancel the current print job?",confirm_clean:"Clean the cartridges? This prints a page.",confirm_align:"Align the cartridges? This prints a page."},status:{idle:"Ready",printing:"Printing",scanning:"Scanning",copying:"Copying",canceling:"Canceling",initializing:"Initializing",calibrating:"Calibrating",shutting_down:"Shutting down",sleeping:"Sleeping",attention:"Attention needed",error:"Error",unknown:"Unknown",unavailable:"Unavailable"},stat:{total_pages:"Pages",scan_pages:"Scans",copy_pages:"Copies",jam_events:"Jams",wifi_rssi:"Wi-Fi",current_job:"Job",queued_jobs:"Queued",paper_size:"Paper",last_scan:"Last scan"},ink:{black:"Black",matte_black:"Matte black",photo_black:"Photo black",cyan:"Cyan",magenta:"Magenta",yellow:"Yellow",tri_color:"Tri-color",light_cyan:"Light cyan",light_magenta:"Light magenta",gray:"Gray",light_gray:"Light gray"},editor:{device:"Printer device",entity:"Entity prefix or status sensor",name:"Name",image:"Custom image URL",show_name:"Show name",show_status:"Show status",show_toolbar:"Show toolbar",show_ink:"Show ink levels",show_scan_preview:"Show last scan preview",compact_view:"Compact view"}},"pt-BR":Ct,pt:Ct};function jt(t,e){let i=t;for(const t of e){if(!i||"object"!=typeof i||!(t in i))return;i=i[t]}return"string"==typeof i?i:void 0}function zt(t,e="en",i={}){const s=t.split(".");return(jt(Pt[e],s)??jt(Pt[e.split("-")[0]],s)??jt(Pt.en,s)??t).replace(/\{(\w+)\}/g,(t,e)=>e in i?String(i[e]):`{${e}}`)}const Ot=((t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)})`
  :host {
    --hpc-background: var(--ha-card-background, var(--card-background-color, transparent));
    --hpc-primary-text-color: var(--primary-text-color);
    --hpc-secondary-text-color: var(--secondary-text-color);
    --hpc-icon-color: var(--secondary-text-color);
    --hpc-divider-color: var(--entities-divider-color, var(--divider-color));
    --hpc-accent: var(--primary-color, #03a9f4);
    --hpc-ok: var(--success-color, #43a047);
    --hpc-warning: var(--warning-color, #ffa600);
    --hpc-error: var(--error-color, #db4437);
    --hpc-spacing: 10px;
    /* printer illustration palette (overridable by themes / card-mod) */
    --hpc-body: #e9eaec;
    --hpc-body-dark: #cfd2d6;
    --hpc-lid: #f6f7f8;
    --hpc-panel: #2b2f36;
    --hpc-paper: #ffffff;
    --hpc-outline: #9aa0a6;
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  :host([dark-mode]) {
    --hpc-body: #3a3f47;
    --hpc-body-dark: #2a2e34;
    --hpc-lid: #4a4f58;
    --hpc-panel: #15171b;
    --hpc-paper: #e6e7ea;
    --hpc-outline: #6b7178;
  }

  ha-card {
    background: var(--hpc-background);
    display: flex;
    flex-direction: column;
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .preview {
    position: relative;
    text-align: center;
  }
  .preview.not-available {
    filter: grayscale(1);
  }

  /* ── header: tips + more-info ─────────────────────────────────────── */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .tips {
    display: flex;
    gap: var(--hpc-spacing);
    flex-grow: 1;
    flex-wrap: wrap;
    align-items: center;
    padding: var(--hpc-spacing);
    color: var(--hpc-secondary-text-color);
    font-size: 0.95rem;
  }
  .tip {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    line-height: 1;
    white-space: nowrap;
  }
  .tip ha-icon {
    --mdc-icon-size: 18px;
  }
  .tip.active {
    color: var(--hpc-accent);
  }
  .tip.update {
    color: var(--hpc-warning);
  }
  .ink .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
  }
  .ink.low {
    color: var(--hpc-warning);
  }
  .ink.low .dot {
    animation: pulse 1.6s ease-in-out infinite;
  }
  .ink.empty {
    color: var(--hpc-error);
  }
  .more-info {
    color: var(--hpc-icon-color);
    margin: 2px;
  }
  .more-info ha-icon {
    display: flex;
  }

  /* ── printer illustration ──────────────────────────────────────────── */
  .hero {
    display: block;
    margin: var(--hpc-spacing) auto 0;
    cursor: pointer;
    width: min(78%, 320px);
  }
  .hero img {
    max-width: 100%;
    max-height: 200px;
  }
  .printer {
    width: 100%;
    height: auto;
    overflow: visible;
    transition: opacity 0.4s ease;
  }
  .printer .paper,
  .printer .carriage,
  .printer .scan-bar,
  .printer .zz,
  .printer .glow {
    opacity: 0;
  }
  .printer .led {
    fill: var(--hpc-ok);
    transition: fill 0.4s ease;
  }
  /* printing / copying: paper feeds out, carriage shuttles, LED breathes */
  .printer.printing .paper,
  .printer.copying .paper {
    opacity: 1;
    animation: feed 2.6s ease-in-out infinite;
  }
  .printer.printing .carriage,
  .printer.copying .carriage {
    opacity: 1;
    animation: carriage 0.9s ease-in-out infinite alternate;
  }
  .printer.printing .led,
  .printer.copying .led {
    fill: var(--hpc-accent);
    animation: breathe 1.2s ease-in-out infinite;
  }
  /* scanning: the light bar sweeps under the lid */
  .printer.scanning .scan-bar,
  .printer.copying .scan-bar {
    opacity: 1;
    animation: sweep 2.2s ease-in-out infinite alternate;
  }
  .printer.scanning .glow,
  .printer.copying .glow {
    opacity: 0.55;
    animation: breathe 2.2s ease-in-out infinite;
  }
  .printer.scanning .led {
    fill: var(--hpc-accent);
  }
  /* sleeping */
  .printer.sleeping {
    opacity: 0.6;
  }
  .printer.sleeping .led {
    fill: var(--hpc-outline);
  }
  .printer.sleeping .zz {
    opacity: 1;
    animation: zz 2.8s ease-in-out infinite;
  }
  .printer.sleeping .zz2 {
    animation-delay: 0.9s;
  }
  /* attention / error */
  .printer.attention .led {
    fill: var(--hpc-warning);
    animation: breathe 1s ease-in-out infinite;
  }
  .printer.error .led {
    fill: var(--hpc-error);
    animation: blink 0.8s steps(2, start) infinite;
  }
  .printer.error {
    animation: shake 0.5s ease-in-out 2;
  }
  .printer.unavailable,
  .printer.unknown {
    opacity: 0.45;
  }
  .printer.unavailable .led,
  .printer.unknown .led {
    fill: var(--hpc-outline);
  }
  .printer.calibrating .carriage,
  .printer.initializing .carriage {
    opacity: 1;
    animation: carriage 1.6s ease-in-out infinite alternate;
  }

  @keyframes feed {
    0% {
      transform: translateY(-34px);
      opacity: 0;
    }
    12% {
      opacity: 1;
    }
    70% {
      transform: translateY(0);
      opacity: 1;
    }
    100% {
      transform: translateY(0);
      opacity: 0;
    }
  }
  @keyframes carriage {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(96px);
    }
  }
  @keyframes sweep {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(140px);
    }
  }
  @keyframes breathe {
    0%,
    100% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes blink {
    to {
      opacity: 0.2;
    }
  }
  @keyframes zz {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    20% {
      opacity: 1;
    }
    100% {
      transform: translate(10px, -22px);
      opacity: 0;
    }
  }
  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-4px);
    }
    75% {
      transform: translateX(4px);
    }
  }
  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.35);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .printer *,
    .ink .dot {
      animation: none !important;
    }
    .printer .paper,
    .printer .carriage,
    .printer .scan-bar {
      opacity: 1;
    }
  }

  /* ── metadata ─────────────────────────────────────────────────────── */
  .metadata {
    margin: var(--hpc-spacing) auto;
  }
  .printer-name {
    text-align: center;
    font-weight: bold;
    color: var(--hpc-primary-text-color);
    font-size: 16px;
  }
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    color: var(--hpc-secondary-text-color);
  }
  .status.error {
    color: var(--hpc-error);
  }
  .status.attention {
    color: var(--hpc-warning);
  }
  .status .status-spinner {
    --ha-spinner-color: var(--hpc-secondary-text-color);
  }
  .status-text {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .not-available .offline {
    text-align: center;
    color: var(--hpc-primary-text-color);
    font-size: 16px;
    padding: 24px var(--hpc-spacing);
  }

  /* ── stats ────────────────────────────────────────────────────────── */
  .stats {
    border-top: 1px solid var(--hpc-divider-color);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    color: var(--hpc-secondary-text-color);
  }
  .stats-block {
    cursor: pointer;
    padding: var(--hpc-spacing) 4px;
    text-align: center;
    border-right: 1px solid var(--hpc-divider-color);
    flex-grow: 1;
    min-width: 0;
  }
  .stats-block:last-of-type {
    border-right: 0;
  }
  .stats-value {
    font-size: 20px;
    color: var(--hpc-primary-text-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stats-subtitle {
    font-size: 0.85rem;
  }

  /* ── last scan preview ────────────────────────────────────────────── */
  .scan-preview {
    border-top: 1px solid var(--hpc-divider-color);
    display: flex;
    align-items: center;
    gap: var(--hpc-spacing);
    padding: var(--hpc-spacing);
    cursor: pointer;
    color: var(--hpc-secondary-text-color);
  }
  .scan-preview img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid var(--hpc-divider-color);
    background: #fff;
  }

  /* ── toolbar ──────────────────────────────────────────────────────── */
  .toolbar {
    min-height: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    padding: 5px;
    border-top: 1px solid var(--hpc-divider-color);
    color: var(--hpc-secondary-text-color);
  }
  .toolbar .fill-gap {
    flex-grow: 1;
  }
  .toolbar ha-icon-button {
    color: var(--hpc-secondary-text-color);
    width: 44px;
    height: 44px;
    --mdc-icon-button-size: 44px;
  }
  .toolbar ha-icon-button ha-icon {
    display: flex;
    color: var(--hpc-icon-color);
  }
  .toolbar .text-button {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 0;
    background: transparent;
    color: var(--hpc-secondary-text-color);
    font: inherit;
    padding: 12px 10px;
    cursor: pointer;
    border-radius: 8px;
  }
  .toolbar .text-button:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }
  .toolbar .text-button.danger {
    color: var(--hpc-error);
  }
  .toolbar .text-button ha-icon {
    --mdc-icon-size: 20px;
  }
  .toolbar .text-button:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;console.info("%c HP-PRINTER-CARD %c v0.1.0 ","color: white; background: #0096d6; font-weight: 700;","color: white; background: #23272e; font-weight: 700;");const Mt={default:[{key:"total_pages",subtitle:"stat.total_pages"},{key:"scan_pages",subtitle:"stat.scan_pages"},{key:"wifi_rssi",subtitle:"stat.wifi_rssi",unit:"dBm"}],printing:[{key:"current_job",subtitle:"stat.current_job"},{key:"queued_jobs",subtitle:"stat.queued_jobs"},{key:"total_pages",subtitle:"stat.total_pages"}],copying:[{key:"copy_pages",subtitle:"stat.copy_pages"},{key:"total_pages",subtitle:"stat.total_pages"}],scanning:[{key:"scan_pages",subtitle:"stat.scan_pages"},{key:"last_scan",subtitle:"stat.last_scan"}]};let Ut=class extends ct{constructor(){super(...arguments),this._requestInProgress=!1,this._entities={},this._inks=[]}static{this.styles=Ot}static getStubConfig(t,e=[]){const i=t?.entities;if(i){const t=Object.values(i).find(t=>t.platform===$t&&"status"===t.translation_key);if(t?.device_id)return{type:`custom:${bt}`,device:t.device_id};if(t)return{type:`custom:${bt}`,entity:t.entity_id}}const s=e.find(t=>t.startsWith("sensor.")&&t.endsWith("_status"));return{type:`custom:${bt}`,entity:s??""}}static getConfigForm(){return{schema:[{name:"device",selector:{device:{filter:{integration:$t}}}},{name:"entity",selector:{entity:{filter:{domain:"sensor",integration:$t}}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_status",selector:{boolean:{}}},{name:"show_toolbar",selector:{boolean:{}}},{name:"show_ink",selector:{boolean:{}}},{name:"show_scan_preview",selector:{boolean:{}}},{name:"compact_view",selector:{boolean:{}}}]},{name:"image",selector:{text:{}}}],computeLabel:t=>zt(`editor.${t.name}`)}}setConfig(t){if(!t)throw new Error(zt("common.invalid_config"));if(!t.device&&!t.entity&&!t.entities?.status)throw new Error(zt("common.missing_entity"));this._config={show_name:!0,show_status:!0,show_toolbar:!0,show_ink:!0,show_scan_preview:!0,compact_view:!1,...t},this._resolve()}getCardSize(){return this._config?.compact_view?3:8}getGridOptions(){return this._config?.compact_view?{columns:6,rows:3,min_columns:4,min_rows:2}:{columns:6,rows:8,min_columns:4,min_rows:5}}willUpdate(t){if(t.has("hass")){const e=t.get("hass");e&&e.entities===this.hass?.entities&&this._entities.status||this._resolve(),e&&e.themes?.darkMode!==this.hass?.themes?.darkMode&&this._applyDarkMode();const i=this._entities.status;i&&e&&e.states[i]?.state!==this.hass?.states[i]?.state&&(this._requestInProgress=!1)}}shouldUpdate(t){if(t.has("_config")||t.has("_requestInProgress"))return!0;const e=t.get("hass");if(!e||!this.hass)return!0;const i=[...Object.values(this._entities),...this._inks.map(t=>t.entity_id)];return i.some(t=>t&&e.states[t]!==this.hass.states[t])}connectedCallback(){super.connectedCallback(),this._applyDarkMode()}_applyDarkMode(){this.toggleAttribute("dark-mode",Boolean(this.hass?.themes?.darkMode))}_resolve(){if(!this._config)return;const t=St(this.hass,this._config);this._entities=t.entities,this._inks=t.inks}get _lang(){return t=this.hass,e=this._config?.language,e??t?.locale?.language??t?.language??"en";var t,e}_stateObj(t){const e=this._entities[t];return e?this.hass?.states[e]:void 0}get _printerState(){const t=this._stateObj("status");return t?t.state:"unavailable"}_formatState(t){try{if(this.hass?.formatEntityState)return this.hass.formatEntityState(t)}catch{}return t.state}_moreInfo(t){const e=t??this._entities.status;var i,s;e&&(i="hass-more-info",s={entityId:e},this.dispatchEvent(new CustomEvent(i,{detail:s,bubbles:!0,composed:!0})))}_press(t,e){const i=this._entities[t];i&&this.hass&&(e&&!window.confirm(zt(e,this._lang))||(this._requestInProgress=!0,this.hass.callService("button","press",{entity_id:i})))}_toggleQuiet(){const t=this._stateObj("quiet_mode");t&&this.hass&&this.hass.callService("switch","on"===t.state?"turn_off":"turn_on",{entity_id:t.entity_id})}_runShortcut(t){if(!this.hass)return;if(t.key)return void this._press(t.key);if(!t.service)return;const[e,i]=t.service.split(".");this.hass.callService(e,i,t.service_data,t.target)}render(){if(!this._config)return V;const t=this._stateObj("status");if(!t||"unavailable"===t.state)return this._renderUnavailable();const e=this._printerState;return B`
      <ha-card>
        <ha-ripple></ha-ripple>
        <div class="preview">
          <div class="header">
            <div class="tips">
              ${this._renderInks()} ${this._renderQuietTip()} ${this._renderFirmwareTip()}
            </div>
            <ha-icon-button
              class="more-info"
              .label=${zt("common.more_info",this._lang)}
              @click=${()=>this._moreInfo()}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._renderHero(e)}
          <div class="metadata">${this._renderName()} ${this._renderStatus(t,e)}</div>
          ${this._renderStats(e)}
          ${this._renderScanPreview()}
        </div>
        ${this._renderToolbar(e)}
      </ha-card>
    `}_renderUnavailable(){return B`
      <ha-card>
        <div class="preview not-available">
          ${this._config.compact_view?V:B`<div class="hero">${vt("unavailable")}</div>`}
          <div class="metadata">
            <div class="offline">${zt("common.not_available",this._lang)}</div>
          </div>
        </div>
      </ha-card>
    `}_renderInks(){return this._config.show_ink&&this._inks.length?B`${this._inks.map(t=>B`
        <div
          class="tip ink ${t.empty?"empty":t.low?"low":""}"
          title=${zt(`ink.${t.color}`,this._lang)}
          @click=${()=>this._moreInfo(t.entity_id)}
        >
          <span class="dot" style=${yt({background:t.css})}></span>
          <span class="tip-title">${null===t.level?"—":`${t.level}%`}</span>
        </div>
      `)}`:V}_renderQuietTip(){const t=this._stateObj("quiet_mode");if(!t)return V;const e="on"===t.state;return B`
      <div
        class="tip ${e?"active":""}"
        title=${zt(e?"common.quiet_on":"common.quiet_off",this._lang)}
        @click=${()=>this._toggleQuiet()}
      >
        <ha-icon icon=${e?"mdi:volume-low":"mdi:volume-high"}></ha-icon>
      </div>
    `}_renderFirmwareTip(){const t=this._stateObj("firmware");return t&&"on"===t.state?B`
      <div
        class="tip update"
        title=${zt("common.firmware_update",this._lang)}
        @click=${()=>this._moreInfo(t.entity_id)}
      >
        <ha-icon icon="mdi:update"></ha-icon>
      </div>
    `:V}_renderHero(t){return this._config.compact_view?V:this._config.image?B`<div class="hero" @click=${()=>this._moreInfo()}>
        <img class="printer ${t}" src=${this._config.image} alt="printer" />
      </div>`:B`<div class="hero" @click=${()=>this._moreInfo()}>${vt(t)}</div>`}_renderName(){if(!this._config.show_name)return V;const t=this._stateObj("status"),e=String(t?.attributes.friendly_name??""),i=this._config.name??e.replace(/\s+status$/i,"");return B`<div class="printer-name">${i}</div>`}_renderStatus(t,e){if(!this._config.show_status)return V;const i=this.hass?.formatEntityState?this._formatState(t):zt(`status.${e}`,this._lang),s=kt.has(e)||this._requestInProgress;return B`
      <div class="status ${e}">
        ${s?B`<ha-spinner class="status-spinner" size="tiny"></ha-spinner>`:V}
        <span class="status-text">${i}</span>
      </div>
    `}_statValue(t){const e=t.entity??(t.key?this._entities[t.key]:void 0);if(!e)return null;const i=this.hass?.states[e];if(!i)return null;if(t.attribute){const s=i.attributes[t.attribute];return{value:null==s?"—":String(s),entityId:e}}return"unknown"===i.state||"unavailable"===i.state?{value:"—",entityId:e}:"timestamp"===i.attributes.device_class?{value:B`<ha-relative-time .hass=${this.hass} .datetime=${i.state}></ha-relative-time>`,entityId:e}:t.unit?{value:`${i.state} ${t.unit}`,entityId:e}:{value:this._formatState(i),entityId:e}}_renderStats(t){if(this._config.compact_view)return V;const e=this._config.stats??{},i=(e[t]??e.default??Mt[t]??Mt.default).map(t=>{const e=this._statValue(t);if(!e)return V;const i=t.subtitle?t.subtitle.startsWith("stat.")?zt(t.subtitle,this._lang):t.subtitle:"";return B`
          <div class="stats-block" @click=${()=>this._moreInfo(e.entityId)}>
            <span class="stats-value">${e.value}</span>
            <div class="stats-subtitle">${i}</div>
          </div>
        `}).filter(t=>t!==V);return i.length?B`<div class="stats">${i}</div>`:V}_renderScanPreview(){if(this._config.compact_view||!this._config.show_scan_preview)return V;const t=this._stateObj("last_scan_image"),e=t?.attributes.entity_picture;if(!t||"string"!=typeof e||"unknown"===t.state)return V;const i=this._stateObj("last_scan"),s=this.hass?.hassUrl?this.hass.hassUrl(e):e;return B`
      <div class="scan-preview" @click=${()=>this._moreInfo(t.entity_id)}>
        <img src="${s}&v=${t.state}" alt=${zt("common.last_scan",this._lang)} />
        <div>
          <div>${zt("common.last_scan",this._lang)}</div>
          ${i&&"unknown"!==i.state?B`<ha-relative-time .hass=${this.hass} .datetime=${i.state}></ha-relative-time>`:V}
        </div>
      </div>
    `}_iconButton(t,e,i,s){if(!this._entities[t])return V;const n=zt(i,this._lang);return B`
      <ha-icon-button .label=${n} title=${n} @click=${()=>this._press(t,s)}>
        <ha-icon icon=${e}></ha-icon>
      </ha-icon-button>
    `}_renderToolbar(t){if(!this._config.show_toolbar)return V;const e=(this._config.shortcuts??[]).map(t=>B`
        <ha-icon-button .label=${t.name??""} title=${t.name??""} @click=${()=>this._runShortcut(t)}>
          <ha-icon icon=${t.icon??"mdi:flash"}></ha-icon>
        </ha-icon-button>
      `);switch(t){case"printing":case"copying":case"canceling":return B`
          <div class="toolbar">
            <button
              class="text-button danger"
              ?disabled=${"canceling"===t||!this._entities.cancel_job}
              @click=${()=>this._press("cancel_job","common.confirm_cancel")}
            >
              <ha-icon icon="mdi:stop"></ha-icon>
              ${zt("common.cancel",this._lang)}
            </button>
          </div>
        `;case"scanning":return B`
          <div class="toolbar">
            <button class="text-button" disabled>
              <ha-icon icon="mdi:scanner"></ha-icon>
              ${zt("status.scanning",this._lang)}
            </button>
          </div>
        `;default:return B`
          <div class="toolbar">
            ${this._entities.scan?B`
                  <button class="text-button" @click=${()=>this._press("scan")}>
                    <ha-icon icon="mdi:scanner"></ha-icon>
                    ${zt("common.scan",this._lang)}
                  </button>
                `:V}
            ${this._iconButton("identify","mdi:crosshairs-gps","common.locate")}
            ${this._iconButton("clean_cartridges","mdi:spray-bottle","common.clean","common.confirm_clean")}
            ${this._iconButton("align_cartridges","mdi:format-align-middle","common.align","common.confirm_align")}
            ${this._iconButton("status_report","mdi:file-document","common.report")}
            <div class="fill-gap"></div>
            ${e}
          </div>
        `}}};t([dt({attribute:!1})],Ut.prototype,"hass",void 0),t([ut()],Ut.prototype,"_config",void 0),t([ut()],Ut.prototype,"_requestInProgress",void 0),Ut=t([(t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)})(bt)],Ut),window.customCards=window.customCards||[],window.customCards.push({type:bt,name:zt("common.name"),description:zt("common.description"),preview:!0,documentationURL:"https://github.com/hudsonbrendon/hp-printer-card",getEntitySuggestion:(t,e)=>{const i=t.entities?.[e];return i&&i.platform===$t&&"status"===i.translation_key?{config:i.device_id?{type:`custom:${bt}`,device:i.device_id}:{type:`custom:${bt}`,entity:e}}:null}});export{Ut as HPPrinterCard};
//# sourceMappingURL=hp-printer-card.js.map
