import { describe, it, expect, vi } from "vitest";
import "../src/hp-printer-card";
import { CARD_NAME } from "../src/const";
import { resolveEntities, normalizePrefix, buildInk } from "../src/helpers/resolve-entities";
import { localize } from "../src/localize";
import { mockHass, DEVICE_ID, PREFIX, type MockHassOpts } from "./fixtures/hass";
import type { HPPrinterCardConfig } from "../src/types";

interface CardEl extends HTMLElement {
  setConfig(c: HPPrinterCardConfig): void;
  hass: ReturnType<typeof mockHass>;
  updateComplete: Promise<boolean>;
  getCardSize(): number;
  getGridOptions(): { rows: number; columns: number };
}

async function mount(config: Partial<HPPrinterCardConfig>, opts: MockHassOpts = {}): Promise<CardEl> {
  const el = document.createElement(CARD_NAME) as CardEl;
  el.setConfig({ type: `custom:${CARD_NAME}`, ...config } as HPPrinterCardConfig);
  el.hass = mockHass(opts);
  document.body.appendChild(el);
  await el.updateComplete;
  return el;
}

const $ = (el: CardEl, sel: string) => el.shadowRoot!.querySelector(sel);
const $$ = (el: CardEl, sel: string) => el.shadowRoot!.querySelectorAll(sel);

describe("registration", () => {
  it("registers the custom element and card picker entry", () => {
    expect(customElements.get(CARD_NAME)).toBeDefined();
    const entry = window.customCards!.find((c) => c.type === CARD_NAME) as Record<string, unknown>;
    expect(entry).toBeDefined();
    expect(entry.preview).toBe(true);
    const suggest = entry.getEntitySuggestion as (h: unknown, id: string) => unknown;
    const hass = mockHass();
    expect(suggest(hass, `sensor.${PREFIX}_status`)).toEqual({
      config: { type: `custom:${CARD_NAME}`, device: DEVICE_ID },
    });
    expect(suggest(hass, `sensor.${PREFIX}_total_pages`)).toBeNull();
    expect(suggest(hass, "sensor.other_thing")).toBeNull();
  });

  it("builds a stub config from the registry", () => {
    const ctor = customElements.get(CARD_NAME) as unknown as {
      getStubConfig(h: unknown, e: string[]): Partial<HPPrinterCardConfig>;
      getConfigForm(): { schema: unknown[]; computeLabel(s: { name: string }): string };
    };
    expect(ctor.getStubConfig(mockHass(), [])).toEqual({ type: `custom:${CARD_NAME}`, device: DEVICE_ID });
    expect(ctor.getStubConfig(mockHass({ withRegistry: false }), [`sensor.${PREFIX}_status`])).toEqual({
      type: `custom:${CARD_NAME}`,
      entity: `sensor.${PREFIX}_status`,
    });
    const form = ctor.getConfigForm();
    expect(form.schema.length).toBeGreaterThan(3);
    expect(form.computeLabel({ name: "device" })).toBe("Printer device");
  });
});

describe("setConfig", () => {
  it("rejects configs without a printer reference", () => {
    const el = document.createElement(CARD_NAME) as CardEl;
    expect(() => el.setConfig({ type: `custom:${CARD_NAME}` })).toThrow(/device/);
    expect(() => el.setConfig(undefined as unknown as HPPrinterCardConfig)).toThrow(/Invalid/);
  });

  it("reports sizes", async () => {
    const el = await mount({ device: DEVICE_ID });
    expect(el.getCardSize()).toBe(8);
    expect(el.getGridOptions().rows).toBe(8);
    const compact = await mount({ device: DEVICE_ID, compact_view: true });
    expect(compact.getCardSize()).toBe(3);
    expect(compact.getGridOptions().rows).toBe(3);
  });
});

describe("entity resolution", () => {
  it("resolves every entity of the device through the registry", () => {
    const hass = mockHass();
    const { entities, inks, deviceId } = resolveEntities(hass, { type: "x", device: DEVICE_ID });
    expect(deviceId).toBe(DEVICE_ID);
    expect(entities.status).toBe(`sensor.${PREFIX}_status`);
    expect(entities.scan).toBe(`button.${PREFIX}_scan`);
    expect(entities.firmware).toBe(`update.${PREFIX}_firmware`);
    expect(inks.map((i) => i.color)).toEqual(["black", "tri_color"]);
    expect(inks[1].css).toContain("linear-gradient");
    expect(inks[0].level).toBe(70);
  });

  it("resolves from an entity prefix or status id via the registry", () => {
    const hass = mockHass();
    expect(resolveEntities(hass, { type: "x", entity: PREFIX }).deviceId).toBe(DEVICE_ID);
    expect(resolveEntities(hass, { type: "x", entity: `sensor.${PREFIX}_status` }).entities.total_pages).toBe(
      `sensor.${PREFIX}_total_pages`
    );
    expect(normalizePrefix(`sensor.${PREFIX}_status`)).toBe(PREFIX);
    expect(normalizePrefix(undefined)).toBeUndefined();
  });

  it("falls back to english slugs without a registry", () => {
    const hass = mockHass({ withRegistry: false });
    const { entities, inks } = resolveEntities(hass, { type: "x", entity: PREFIX });
    expect(entities.status).toBe(`sensor.${PREFIX}_status`);
    expect(entities.identify).toBe(`button.${PREFIX}_locate`);
    expect(inks.map((i) => i.entity_id)).toEqual([`sensor.${PREFIX}_black_ink`, `sensor.${PREFIX}_tri_color_ink`]);
  });

  it("honours explicit entity overrides", () => {
    const hass = mockHass();
    const { entities } = resolveEntities(hass, {
      type: "x",
      device: DEVICE_ID,
      entities: { status: "sensor.custom_status" },
    });
    expect(entities.status).toBe("sensor.custom_status");
  });

  it("flags low and empty inks", () => {
    const hass = mockHass({ black: "0", tri_color: "10" });
    const black = buildInk(hass, `sensor.${PREFIX}_black_ink`);
    const tri = buildInk(hass, `sensor.${PREFIX}_tri_color_ink`);
    expect(black.empty && black.low).toBe(true);
    expect(tri.low && !tri.empty).toBe(true);
    expect(buildInk(hass, "sensor.missing_cyan_ink").color).toBe("cyan");
    expect(buildInk(hass, "sensor.missing_cyan_ink").level).toBeNull();
  });
});

describe("rendering", () => {
  it("renders header inks, name, status, stats and toolbar when idle", async () => {
    const el = await mount({ device: DEVICE_ID });
    expect($$(el, ".tip.ink").length).toBe(2);
    expect($(el, ".tip.ink .tip-title")!.textContent).toContain("70%");
    expect($(el, ".printer-name")!.textContent).toContain("DeskJet 2700 series");
    expect($(el, ".status-text")!.textContent).toContain("Idle");
    expect($(el, "svg.printer")!.classList.contains("idle")).toBe(true);
    expect($$(el, ".stats-block").length).toBe(3);
    expect($(el, ".stats-value")!.textContent).toContain("66");
    expect($(el, ".toolbar .text-button")!.textContent).toContain("Scan");
    expect($$(el, ".toolbar ha-icon-button").length).toBe(4);
    expect($(el, ".scan-preview")).toBeNull();
  });

  it("switches animation class and toolbar while printing", async () => {
    const el = await mount({ device: DEVICE_ID }, { status: "printing", current_job: "report.pdf" });
    expect($(el, "svg.printer")!.classList.contains("printing")).toBe(true);
    expect($(el, "ha-spinner")).not.toBeNull();
    const cancel = $(el, ".toolbar .text-button.danger") as HTMLButtonElement;
    expect(cancel.textContent).toContain("Cancel");
    expect($(el, ".stats-value")!.textContent).toContain("report.pdf");
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);
    cancel.click();
    confirm.mockRestore();
    expect(el.hass._calls[0]).toEqual({
      domain: "button",
      service: "press",
      service_data: { entity_id: `button.${PREFIX}_cancel_current_job` },
      target: undefined,
    });
  });

  it("shows the scanning state", async () => {
    const el = await mount({ device: DEVICE_ID }, { status: "scanning" });
    expect($(el, "svg.printer")!.classList.contains("scanning")).toBe(true);
    expect(($(el, ".toolbar .text-button") as HTMLButtonElement).disabled).toBe(true);
  });

  it("renders sleeping and error states", async () => {
    const sleeping = await mount({ device: DEVICE_ID }, { status: "sleeping" });
    expect($(sleeping, "svg.printer")!.classList.contains("sleeping")).toBe(true);
    const error = await mount({ device: DEVICE_ID }, { status: "error" });
    expect($(error, ".status")!.classList.contains("error")).toBe(true);
  });

  it("renders unavailable", async () => {
    const el = await mount({ device: DEVICE_ID }, { unavailable: true });
    expect($(el, ".offline")!.textContent).toContain("not available");
    expect($(el, ".toolbar")).toBeNull();
  });

  it("supports compact view, custom name/image and hidden sections", async () => {
    const el = await mount({
      device: DEVICE_ID,
      compact_view: true,
      name: "Office",
      show_ink: false,
      show_toolbar: false,
    });
    expect($(el, ".hero")).toBeNull();
    expect($(el, ".stats")).toBeNull();
    expect($$(el, ".tip.ink").length).toBe(0);
    expect($(el, ".toolbar")).toBeNull();
    expect($(el, ".printer-name")!.textContent).toContain("Office");
    const img = await mount({ device: DEVICE_ID, image: "/local/printer.png" });
    expect(($(img, ".hero img") as HTMLImageElement).getAttribute("src")).toBe("/local/printer.png");
  });

  it("shows the last scan preview and firmware tip", async () => {
    const el = await mount({ device: DEVICE_ID }, { scanImage: true, firmware: "on" });
    const preview = $(el, ".scan-preview img") as HTMLImageElement;
    expect(preview.getAttribute("src")).toContain("http://ha.local:8123/api/image_proxy/image.");
    expect($(el, ".tip.update")).not.toBeNull();
  });

  it("uses custom stats and shortcuts", async () => {
    const el = await mount({
      device: DEVICE_ID,
      stats: { default: [{ key: "copy_pages", subtitle: "Copies made" }, { entity: "sensor.nope" }] },
      shortcuts: [{ name: "Report", icon: "mdi:file", service: "hp_printer.print_report", service_data: { page: "networkSummary" } }],
    });
    expect($$(el, ".stats-block").length).toBe(1);
    expect($(el, ".stats-subtitle")!.textContent).toContain("Copies made");
    const buttons = $$(el, ".toolbar ha-icon-button");
    (buttons[buttons.length - 1] as HTMLElement).click();
    expect(el.hass._calls[0]).toEqual({
      domain: "hp_printer",
      service: "print_report",
      service_data: { page: "networkSummary" },
      target: undefined,
    });
  });
});

describe("actions", () => {
  it("presses scan and locate, toggles quiet mode, opens more-info", async () => {
    const el = await mount({ device: DEVICE_ID });
    ($(el, ".toolbar .text-button") as HTMLButtonElement).click();
    expect(el.hass._calls[0].service_data).toEqual({ entity_id: `button.${PREFIX}_scan` });
    ($$(el, ".toolbar ha-icon-button")[0] as HTMLElement).click();
    expect(el.hass._calls[1].service_data).toEqual({ entity_id: `button.${PREFIX}_locate` });
    ($(el, ".tip:not(.ink)") as HTMLElement).click();
    expect(el.hass._calls[2]).toMatchObject({ domain: "switch", service: "turn_on" });
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(false);
    ($$(el, ".toolbar ha-icon-button")[1] as HTMLElement).click(); // clean, declined
    confirm.mockRestore();
    expect(el.hass._calls.length).toBe(3);
    const events: string[] = [];
    el.addEventListener("hass-more-info", (e) => events.push((e as CustomEvent).detail.entityId));
    ($(el, ".hero") as HTMLElement).click();
    ($(el, ".tip.ink") as HTMLElement).click();
    expect(events).toEqual([`sensor.${PREFIX}_status`, `sensor.${PREFIX}_black_ink`]);
  });

  it("re-renders only when a tracked entity changes", async () => {
    const el = await mount({ device: DEVICE_ID });
    const hass = mockHass({ status: "printing" });
    el.hass = hass;
    await el.updateComplete;
    expect($(el, "svg.printer")!.classList.contains("printing")).toBe(true);
  });
});

describe("localize", () => {
  it("falls back through region, language and english", () => {
    expect(localize("common.scan", "pt-BR")).toBe("Digitalizar");
    expect(localize("common.scan", "pt")).toBe("Digitalizar");
    expect(localize("common.scan", "de")).toBe("Scan");
    expect(localize("nope.missing", "en")).toBe("nope.missing");
    expect(localize("ink.black", "pt-BR")).toBe("Preto");
  });

  it("renders portuguese when configured", async () => {
    const el = await mount({ device: DEVICE_ID, language: "pt-BR" });
    expect($(el, ".toolbar .text-button")!.textContent).toContain("Digitalizar");
  });
});
