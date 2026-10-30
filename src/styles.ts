import { css } from "lit";

export const cardStyles = css`
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
`;
