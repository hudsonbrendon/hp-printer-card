export const CARD_NAME = "hp-printer-card";
export const CARD_VERSION = "0.1.0";

/** Integration domain whose entities we resolve from the registry. */
export const HP_PLATFORM = "hp_printer";

export type EntityDomain =
  | "sensor"
  | "binary_sensor"
  | "switch"
  | "button"
  | "image"
  | "update"
  | "select";

export interface EntitySpec {
  domain: EntityDomain;
  /** `translation_key` set by the hp_printer integration (language independent). */
  translation_key: string;
  /** English-name slug fallback when the entity registry is unavailable. */
  suffix: string;
}

export const ENTITY_SPECS = {
  status: { domain: "sensor", translation_key: "status", suffix: "status" },
  scanner: { domain: "sensor", translation_key: "scanner_state", suffix: "scanner" },
  total_pages: { domain: "sensor", translation_key: "total_pages", suffix: "total_pages" },
  scan_pages: { domain: "sensor", translation_key: "scan_pages", suffix: "scanned_pages" },
  copy_pages: { domain: "sensor", translation_key: "copy_pages", suffix: "copied_pages" },
  jam_events: { domain: "sensor", translation_key: "jam_events", suffix: "paper_jams" },
  wifi_rssi: { domain: "sensor", translation_key: "wifi_rssi", suffix: "wi_fi_signal" },
  wifi_ssid: { domain: "sensor", translation_key: "wifi_ssid", suffix: "wi_fi_network" },
  current_job: { domain: "sensor", translation_key: "current_job", suffix: "current_job" },
  queued_jobs: { domain: "sensor", translation_key: "queued_jobs", suffix: "queued_jobs" },
  paper_size: { domain: "sensor", translation_key: "paper_size", suffix: "paper_size" },
  last_scan: { domain: "sensor", translation_key: "last_scan", suffix: "last_scan" },
  problem: { domain: "binary_sensor", translation_key: "problem", suffix: "problem" },
  low_ink: { domain: "binary_sensor", translation_key: "low_ink", suffix: "low_ink" },
  quiet_mode: { domain: "switch", translation_key: "quiet_mode", suffix: "quiet_mode" },
  identify: { domain: "button", translation_key: "identify", suffix: "locate" },
  scan: { domain: "button", translation_key: "scan", suffix: "scan" },
  cancel_job: { domain: "button", translation_key: "cancel_job", suffix: "cancel_current_job" },
  clean_cartridges: {
    domain: "button",
    translation_key: "clean_cartridges",
    suffix: "clean_cartridges",
  },
  align_cartridges: {
    domain: "button",
    translation_key: "align_cartridges",
    suffix: "align_cartridges",
  },
  status_report: {
    domain: "button",
    translation_key: "print_configuration_page",
    suffix: "print_status_report",
  },
  check_firmware: {
    domain: "button",
    translation_key: "check_firmware",
    suffix: "check_for_firmware_update",
  },
  last_scan_image: { domain: "image", translation_key: "last_scan", suffix: "last_scan" },
  firmware: { domain: "update", translation_key: "firmware", suffix: "firmware" },
} as const satisfies Record<string, EntitySpec>;

export type EntityKey = keyof typeof ENTITY_SPECS;

/** translation_key of the per-cartridge level sensors (one per colour). */
export const INK_TRANSLATION_KEY = "consumable_level";
export const INK_SUFFIX_RE = /_(ink|toner)$/;

export const PRINTER_STATES = [
  "idle",
  "printing",
  "scanning",
  "copying",
  "canceling",
  "initializing",
  "calibrating",
  "shutting_down",
  "sleeping",
  "attention",
  "error",
  "unknown",
  "unavailable",
] as const;

export type PrinterState = (typeof PRINTER_STATES)[number];

export const BUSY_STATES: ReadonlySet<string> = new Set([
  "printing",
  "scanning",
  "copying",
  "canceling",
  "initializing",
  "calibrating",
]);

export const DEFAULT_INK_COLORS: Record<string, string> = {
  black: "#111111",
  matte_black: "#1a1a1a",
  photo_black: "#2b2b2b",
  cyan: "#00AEEF",
  magenta: "#EC008C",
  yellow: "#FFD500",
  tri_color: "linear-gradient(90deg,#00AEEF 0 33%,#EC008C 33% 66%,#FFD500 66%)",
  light_cyan: "#7FD6F5",
  light_magenta: "#F57FC3",
  gray: "#808080",
  light_gray: "#B0B0B0",
};
