import { svg, type TemplateResult } from "lit";

/**
 * Inline illustration of an HP all-in-one (DeskJet 2700 silhouette).
 *
 * Animated parts carry classes targeted by styles.ts: `.paper`, `.carriage`,
 * `.scan-bar`, `.glow`, `.led`, `.zz`. Colours come from CSS variables so
 * themes and dark mode restyle it.
 */
export function printerSvg(state: string): TemplateResult {
  return svg`
    <svg
      class="printer ${state}"
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
  `;
}
