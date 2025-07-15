import { LitElement, html, css } from 'lit';
import { themes } from '../styles/themes.js';
const themeNumber = 1;
export class CareerSelector extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: var(--font-family, sans-serif);
    }

    .select-container {
      max-width: 300px;
    }

    select {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      border-radius: 6px;
      border: 2px solid var(--select-border, #ccc);
      background-color: var(--select-bg, #fff);
      color: var(--select-text, #000);
      font-family: var(--font-family, sans-serif);
    }

    select:hover {
      background-color: var(--select-hover, #f0f0f0);
    }

    select:focus {
      outline: none;
      box-shadow: 0 0 0 3px var(--focus-outline, #aaa);
    }
  `;

  static properties = {
    careers: { type: Array }
  };

  constructor() {
    super();
    this.careers = [];
  }

  connectedCallback() {
    super.connectedCallback();
    const theme = themes[themeNumber];
    this.style.setProperty('--select-border', theme.selectBorder);
    this.style.setProperty('--select-bg', theme.selectBackground);
    this.style.setProperty('--select-hover', theme.selectHover);
    this.style.setProperty('--select-text', theme.selectText);
    this.style.setProperty('--font-family', theme.fontFamily);
    this.style.setProperty('--focus-outline', theme.focusOutline);

    fetch('./data/careers.json')
      .then(res => res.json())
      .then(data => {
        this.careers = data;
      });
  }

  render() {
    return html`
      <div class="select-container">
        <select @change="${this.onSelect}">
          <option disabled selected>Selecciona una carrera</option>
          ${this.careers.map(
            career => html`
              <option value="${career.nombre}">${career.nombre}</option>
            `
          )}
        </select>
      </div>
    `;
  }

  onSelect(e) {
    const selectedName = e.target.value;
    const selectedCareer = this.careers.find(c => c.nombre === selectedName);
    if (selectedCareer) {
      this.dispatchEvent(
        new CustomEvent('career-selected', {
          detail: selectedCareer,
          bubbles: true,
          composed: true
        })
      );
    }
  }
}

customElements.define('career-selector', CareerSelector);
