import { LitElement, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { printerSvg } from "./assets/printer-svg";
import { BUSY_STATES, CARD_NAME, CARD_VERSION, HP_PLATFORM, type EntityKey } from "./const";
import { resolveEntities } from "./helpers/resolve-entities";
import { localize, resolveLanguage } from "./localize";
import { cardStyles } from "./styles";
import type {
  HassObject,
  HassState,
  HPPrinterCardConfig,
  InkEntity,
  ResolvedEntities,
  ShortcutConfig,
  StatConfig,
} from "./types";

console.info(
  `%c HP-PRINTER-CARD %c v${CARD_VERSION} `,
  "color: white; background: #0096d6; font-weight: 700;",
  "color: white; background: #23272e; font-weight: 700;"
);

type Template = TemplateResult | typeof nothing;

const DEFAULT_STATS: Record<string, StatConfig[]> = {
  default: [
    { key: "total_pages", subtitle: "stat.total_pages" },
    { key: "scan_pages", subtitle: "stat.scan_pages" },
    { key: "wifi_rssi", subtitle: "stat.wifi_rssi", unit: "dBm" },
  ],
  printing: [
    { key: "current_job", subtitle: "stat.current_job" },
    { key: "queued_jobs", subtitle: "stat.queued_jobs" },
    { key: "total_pages", subtitle: "stat.total_pages" },
  ],
  copying: [
    { key: "copy_pages", subtitle: "stat.copy_pages" },
    { key: "total_pages", subtitle: "stat.total_pages" },
  ],
  scanning: [
    { key: "scan_pages", subtitle: "stat.scan_pages" },
    { key: "last_scan", subtitle: "stat.last_scan" },
  ],
};

function fireEvent(node: HTMLElement, type: string, detail?: unknown): void {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

@customElement(CARD_NAME)
export class HPPrinterCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HassObject;
  @state() private _config!: HPPrinterCardConfig;
  @state() private _requestInProgress = false;

  private _entities: ResolvedEntities = {};
  private _inks: InkEntity[] = [];

  // ── HA card API ──────────────────────────────────────────────────────────
  static getStubConfig(hass?: HassObject, entities: string[] = []): Partial<HPPrinterCardConfig> {
    const registry = hass?.entities;
    if (registry) {
      const status = Object.values(registry).find(
        (e) => e.platform === HP_PLATFORM && e.translation_key === "status"
      );
      if (status?.device_id) return { type: `custom:${CARD_NAME}`, device: status.device_id };
      if (status) return { type: `custom:${CARD_NAME}`, entity: status.entity_id };
    }
    const guess = entities.find((e) => e.startsWith("sensor.") && e.endsWith("_status"));
    return { type: `custom:${CARD_NAME}`, entity: guess ?? "" };
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "device",
          selector: { device: { filter: { integration: HP_PLATFORM } } },
        },
        { name: "entity", selector: { entity: { filter: { domain: "sensor", integration: HP_PLATFORM } } } },
        { name: "name", selector: { text: {} } },
        {
          type: "grid",
          name: "",
          schema: [
            { name: "show_name", selector: { boolean: {} } },
            { name: "show_status", selector: { boolean: {} } },
            { name: "show_toolbar", selector: { boolean: {} } },
            { name: "show_ink", selector: { boolean: {} } },
            { name: "show_scan_preview", selector: { boolean: {} } },
            { name: "compact_view", selector: { boolean: {} } },
          ],
        },
        { name: "image", selector: { text: {} } },
      ],
      computeLabel: (schema: { name: string }) => localize(`editor.${schema.name}`),
    };
  }

  public setConfig(config: HPPrinterCardConfig): void {
    if (!config) throw new Error(localize("common.invalid_config"));
    if (!config.device && !config.entity && !config.entities?.status) {
      throw new Error(localize("common.missing_entity"));
    }
    this._config = {
      show_name: true,
      show_status: true,
      show_toolbar: true,
      show_ink: true,
      show_scan_preview: true,
      compact_view: false,
      ...config,
    };
    this._resolve();
  }

  public getCardSize(): number {
    return this._config?.compact_view ? 3 : 8;
  }

  public getGridOptions() {
    return this._config?.compact_view
      ? { columns: 6, rows: 3, min_columns: 4, min_rows: 2 }
      : { columns: 6, rows: 8, min_columns: 4, min_rows: 5 };
  }

  // ── lifecycle ────────────────────────────────────────────────────────────
  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass")) {
      const before = changed.get("hass") as HassObject | undefined;
      if (!before || before.entities !== this.hass?.entities || !this._entities.status) {
        this._resolve();
      }
      if (before && before.themes?.darkMode !== this.hass?.themes?.darkMode) {
        this._applyDarkMode();
      }
      const status = this._entities.status;
      if (status && before && before.states[status]?.state !== this.hass?.states[status]?.state) {
        this._requestInProgress = false;
      }
    }
  }

  protected shouldUpdate(changed: PropertyValues): boolean {
    if (changed.has("_config") || changed.has("_requestInProgress")) return true;
    const before = changed.get("hass") as HassObject | undefined;
    if (!before || !this.hass) return true;
    const ids = [...Object.values(this._entities), ...this._inks.map((i) => i.entity_id)];
    return ids.some((id) => id && before.states[id] !== this.hass!.states[id]);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._applyDarkMode();
  }

  private _applyDarkMode(): void {
    this.toggleAttribute("dark-mode", Boolean(this.hass?.themes?.darkMode));
  }

  private _resolve(): void {
    if (!this._config) return;
    const resolved = resolveEntities(this.hass, this._config);
    this._entities = resolved.entities;
    this._inks = resolved.inks;
  }

  // ── helpers ──────────────────────────────────────────────────────────────
  private get _lang(): string {
    return resolveLanguage(this.hass, this._config?.language);
  }

  private _stateObj(key: EntityKey): HassState | undefined {
    const id = this._entities[key];
    return id ? this.hass?.states[id] : undefined;
  }

  private get _printerState(): string {
    const status = this._stateObj("status");
    if (!status) return "unavailable";
    return status.state;
  }

  private _formatState(stateObj: HassState): string {
    try {
      if (this.hass?.formatEntityState) return this.hass.formatEntityState(stateObj);
    } catch {
      /* fall through */
    }
    return stateObj.state;
  }

  private _moreInfo(entityId?: string): void {
    const id = entityId ?? this._entities.status;
    if (!id) return;
    fireEvent(this, "hass-more-info", { entityId: id });
  }

  private _press(key: EntityKey, confirmKey?: string): void {
    const id = this._entities[key];
    if (!id || !this.hass) return;
    if (confirmKey && !window.confirm(localize(confirmKey, this._lang))) return;
    this._requestInProgress = true;
    void this.hass.callService("button", "press", { entity_id: id });
  }

  private _toggleQuiet(): void {
    const quiet = this._stateObj("quiet_mode");
    if (!quiet || !this.hass) return;
    void this.hass.callService("switch", quiet.state === "on" ? "turn_off" : "turn_on", {
      entity_id: quiet.entity_id,
    });
  }

  private _runShortcut(shortcut: ShortcutConfig): void {
    if (!this.hass) return;
    if (shortcut.key) {
      this._press(shortcut.key);
      return;
    }
    if (!shortcut.service) return;
    const [domain, service] = shortcut.service.split(".");
    void this.hass.callService(domain, service, shortcut.service_data, shortcut.target);
  }

  // ── render ───────────────────────────────────────────────────────────────
  protected render(): Template {
    if (!this._config) return nothing;
    const status = this._stateObj("status");
    if (!status || status.state === "unavailable") return this._renderUnavailable();
    const printerState = this._printerState;
    return html`
      <ha-card>
        <ha-ripple></ha-ripple>
        <div class="preview">
          <div class="header">
            <div class="tips">
              ${this._renderInks()} ${this._renderQuietTip()} ${this._renderFirmwareTip()}
            </div>
            <ha-icon-button
              class="more-info"
              .label=${localize("common.more_info", this._lang)}
              @click=${() => this._moreInfo()}
            >
              <ha-icon icon="mdi:dots-vertical"></ha-icon>
            </ha-icon-button>
          </div>
          ${this._renderHero(printerState)}
          <div class="metadata">${this._renderName()} ${this._renderStatus(status, printerState)}</div>
          ${this._renderStats(printerState)}
          ${this._renderScanPreview()}
        </div>
        ${this._renderToolbar(printerState)}
      </ha-card>
    `;
  }

  private _renderUnavailable(): Template {
    return html`
      <ha-card>
        <div class="preview not-available">
          ${this._config.compact_view ? nothing : html`<div class="hero">${printerSvg("unavailable")}</div>`}
          <div class="metadata">
            <div class="offline">${localize("common.not_available", this._lang)}</div>
          </div>
        </div>
      </ha-card>
    `;
  }

  private _renderInks(): Template {
    if (!this._config.show_ink || !this._inks.length) return nothing;
    return html`${this._inks.map(
      (ink) => html`
        <div
          class="tip ink ${ink.empty ? "empty" : ink.low ? "low" : ""}"
          title=${localize(`ink.${ink.color}`, this._lang)}
          @click=${() => this._moreInfo(ink.entity_id)}
        >
          <span class="dot" style=${styleMap({ background: ink.css })}></span>
          <span class="tip-title">${ink.level === null ? "—" : `${ink.level}%`}</span>
        </div>
      `
    )}`;
  }

  private _renderQuietTip(): Template {
    const quiet = this._stateObj("quiet_mode");
    if (!quiet) return nothing;
    const on = quiet.state === "on";
    return html`
      <div
        class="tip ${on ? "active" : ""}"
        title=${localize(on ? "common.quiet_on" : "common.quiet_off", this._lang)}
        @click=${() => this._toggleQuiet()}
      >
        <ha-icon icon=${on ? "mdi:volume-low" : "mdi:volume-high"}></ha-icon>
      </div>
    `;
  }

  private _renderFirmwareTip(): Template {
    const firmware = this._stateObj("firmware");
    if (!firmware || firmware.state !== "on") return nothing;
    return html`
      <div
        class="tip update"
        title=${localize("common.firmware_update", this._lang)}
        @click=${() => this._moreInfo(firmware.entity_id)}
      >
        <ha-icon icon="mdi:update"></ha-icon>
      </div>
    `;
  }

  private _renderHero(printerState: string): Template {
    if (this._config.compact_view) return nothing;
    if (this._config.image) {
      return html`<div class="hero" @click=${() => this._moreInfo()}>
        <img class="printer ${printerState}" src=${this._config.image} alt="printer" />
      </div>`;
    }
    return html`<div class="hero" @click=${() => this._moreInfo()}>${printerSvg(printerState)}</div>`;
  }

  private _renderName(): Template {
    if (!this._config.show_name) return nothing;
    const status = this._stateObj("status");
    const friendly = String(status?.attributes.friendly_name ?? "");
    const name = this._config.name ?? friendly.replace(/\s+status$/i, "");
    return html`<div class="printer-name">${name}</div>`;
  }

  private _renderStatus(status: HassState, printerState: string): Template {
    if (!this._config.show_status) return nothing;
    const text = this.hass?.formatEntityState
      ? this._formatState(status)
      : localize(`status.${printerState}`, this._lang);
    const busy = BUSY_STATES.has(printerState) || this._requestInProgress;
    return html`
      <div class="status ${printerState}">
        ${busy ? html`<ha-spinner class="status-spinner" size="tiny"></ha-spinner>` : nothing}
        <span class="status-text">${text}</span>
      </div>
    `;
  }

  private _statValue(stat: StatConfig): { value: string; entityId?: string } | null {
    const entityId = stat.entity ?? (stat.key ? this._entities[stat.key] : undefined);
    if (!entityId) return null;
    const stateObj = this.hass?.states[entityId];
    if (!stateObj) return null;
    if (stat.attribute) {
      const raw = stateObj.attributes[stat.attribute];
      return { value: raw === undefined || raw === null ? "—" : String(raw), entityId };
    }
    if (stateObj.state === "unknown" || stateObj.state === "unavailable") {
      return { value: "—", entityId };
    }
    if (stateObj.attributes.device_class === "timestamp") {
      return { value: html`<ha-relative-time .hass=${this.hass} .datetime=${stateObj.state}></ha-relative-time>` as unknown as string, entityId };
    }
    if (stat.unit) return { value: `${stateObj.state} ${stat.unit}`, entityId };
    return { value: this._formatState(stateObj), entityId };
  }

  private _renderStats(printerState: string): Template {
    if (this._config.compact_view) return nothing;
    const configured = this._config.stats ?? {};
    const list = configured[printerState] ?? configured.default ?? DEFAULT_STATS[printerState] ?? DEFAULT_STATS.default;
    const blocks = list
      .map((stat) => {
        const resolved = this._statValue(stat);
        if (!resolved) return nothing;
        const subtitle = stat.subtitle
          ? stat.subtitle.startsWith("stat.")
            ? localize(stat.subtitle, this._lang)
            : stat.subtitle
          : "";
        return html`
          <div class="stats-block" @click=${() => this._moreInfo(resolved.entityId)}>
            <span class="stats-value">${resolved.value}</span>
            <div class="stats-subtitle">${subtitle}</div>
          </div>
        `;
      })
      .filter((b) => b !== nothing);
    if (!blocks.length) return nothing;
    return html`<div class="stats">${blocks}</div>`;
  }

  private _renderScanPreview(): Template {
    if (this._config.compact_view || !this._config.show_scan_preview) return nothing;
    const image = this._stateObj("last_scan_image");
    const picture = image?.attributes.entity_picture;
    if (!image || typeof picture !== "string" || image.state === "unknown") return nothing;
    const lastScan = this._stateObj("last_scan");
    const url = this.hass?.hassUrl ? this.hass.hassUrl(picture) : picture;
    return html`
      <div class="scan-preview" @click=${() => this._moreInfo(image.entity_id)}>
        <img src="${url}&v=${image.state}" alt=${localize("common.last_scan", this._lang)} />
        <div>
          <div>${localize("common.last_scan", this._lang)}</div>
          ${lastScan && lastScan.state !== "unknown"
            ? html`<ha-relative-time .hass=${this.hass} .datetime=${lastScan.state}></ha-relative-time>`
            : nothing}
        </div>
      </div>
    `;
  }

  private _iconButton(key: EntityKey, icon: string, labelKey: string, confirmKey?: string): Template {
    if (!this._entities[key]) return nothing;
    const label = localize(labelKey, this._lang);
    return html`
      <ha-icon-button .label=${label} title=${label} @click=${() => this._press(key, confirmKey)}>
        <ha-icon icon=${icon}></ha-icon>
      </ha-icon-button>
    `;
  }

  private _renderToolbar(printerState: string): Template {
    if (!this._config.show_toolbar) return nothing;
    const shortcuts = (this._config.shortcuts ?? []).map(
      (shortcut) => html`
        <ha-icon-button .label=${shortcut.name ?? ""} title=${shortcut.name ?? ""} @click=${() => this._runShortcut(shortcut)}>
          <ha-icon icon=${shortcut.icon ?? "mdi:flash"}></ha-icon>
        </ha-icon-button>
      `
    );
    switch (printerState) {
      case "printing":
      case "copying":
      case "canceling":
        return html`
          <div class="toolbar">
            <button
              class="text-button danger"
              ?disabled=${printerState === "canceling" || !this._entities.cancel_job}
              @click=${() => this._press("cancel_job", "common.confirm_cancel")}
            >
              <ha-icon icon="mdi:stop"></ha-icon>
              ${localize("common.cancel", this._lang)}
            </button>
          </div>
        `;
      case "scanning":
        return html`
          <div class="toolbar">
            <button class="text-button" disabled>
              <ha-icon icon="mdi:scanner"></ha-icon>
              ${localize("status.scanning", this._lang)}
            </button>
          </div>
        `;
      default:
        return html`
          <div class="toolbar">
            ${this._entities.scan
              ? html`
                  <button class="text-button" @click=${() => this._press("scan")}>
                    <ha-icon icon="mdi:scanner"></ha-icon>
                    ${localize("common.scan", this._lang)}
                  </button>
                `
              : nothing}
            ${this._iconButton("identify", "mdi:crosshairs-gps", "common.locate")}
            ${this._iconButton("clean_cartridges", "mdi:spray-bottle", "common.clean", "common.confirm_clean")}
            ${this._iconButton("align_cartridges", "mdi:format-align-middle", "common.align", "common.confirm_align")}
            ${this._iconButton("status_report", "mdi:file-document", "common.report")}
            <div class="fill-gap"></div>
            ${shortcuts}
          </div>
        `;
    }
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD_NAME,
  name: localize("common.name"),
  description: localize("common.description"),
  preview: true,
  documentationURL: "https://github.com/hudsonbrendon/hp-printer-card",
  getEntitySuggestion: (hass: HassObject, entityId: string) => {
    const entry = hass.entities?.[entityId];
    if (!entry || entry.platform !== HP_PLATFORM || entry.translation_key !== "status") return null;
    return {
      config: entry.device_id
        ? { type: `custom:${CARD_NAME}`, device: entry.device_id }
        : { type: `custom:${CARD_NAME}`, entity: entityId },
    };
  },
});
