import { LitElement, html, css } from 'lit';
import { themes } from '../styles/themes.js';
const themeNumber = 1;
export class CareerCard extends LitElement {
  static properties = {
    career: { type: Object }
  };

  static styles = css`
    :host {
      font-family: var(--font-family, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif);
      display: block;
      max-width: 320px;
      margin: 1rem auto;
    }

    .card {
      border-radius: 14px;
      border: 3px solid var(--border-color);
      overflow: hidden;
      background-color: var(--card-bg, #f9fbff);
      box-shadow: 0 6px 12px rgba(0, 85, 164, 0.15);
      transition: box-shadow 0.3s ease;
      cursor: default;
    }

    .card:hover {
      box-shadow: 0 10px 20px rgba(0, 85, 164, 0.3);
    }

    img {
      width: 100%;
      height: auto;
      display: block;
      border-bottom: 3px solid var(--border-color);
      object-fit: cover;
    }

    .header {
      background-color: var(--header-color);
      color: var(--text-color);
      padding: 1.2rem 1rem;
      font-weight: 700;
      font-size: 1.3rem;
      text-align: center;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .content {
      padding: 1rem 1.2rem 1.6rem;
      color: #222;
      font-size: 1rem;
      line-height: 1.5;
      user-select: text;
    }

    .content p {
      margin: 0.5rem 0;
    }

    .content strong {
      color: var(--header-color);
    }
  `;

  constructor() {
    super();
    this.career = null;
  }

  updated() {
    const theme = themes[themeNumber];
    this.style.setProperty('--border-color', theme.borderColor);
    this.style.setProperty('--header-color', theme.backgroundHeader);
    this.style.setProperty('--text-color', theme.textColor);
    this.style.setProperty('--font-family', theme.fontFamily);
    this.style.setProperty('--card-bg', '#f7fbff');
  }

  render() {
    if (!this.career) {
      return html`<p>Seleccione una carrera</p>`;
    }

    return html`
      <div class="card" role="region" aria-label="Información de la carrera">
        <img src="${this.career.imagen}" alt="Imagen representativa de la carrera ${this.career.nombre}" />
        <div class="header">${this.career.nombre}</div>
        <div class="content">
          <p><strong>Facultad:</strong> ${this.career.facultad}</p>
          <p>${this.career.descripcion}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('career-card', CareerCard);
