import type { EntityKey } from "./const";

export interface StatConfig {
  entity?: string;
  /** Resolved entity key (status, total_pages...) instead of an explicit entity id. */
  key?: EntityKey;
  attribute?: string;
  unit?: string;
  subtitle?: string;
}

export interface ShortcutConfig {
  name?: string;
  icon?: string;
  service?: string;
  service_data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  /** Press a resolved button entity instead of calling a service. */
  key?: EntityKey;
}

export interface HPPrinterCardConfig {
  type: string;
  /** Device registry id of the printer (preferred). */
  device?: string;
  /** Entity id prefix (e.g. `deskjet_2700_series`) or the status sensor entity id. */
  entity?: string;
  entities?: Partial<Record<EntityKey, string>>;
  name?: string;
  image?: string;
  show_name?: boolean;
  show_status?: boolean;
  show_toolbar?: boolean;
  show_ink?: boolean;
  show_scan_preview?: boolean;
  compact_view?: boolean;
  language?: string;
  stats?: Partial<Record<string, StatConfig[]>>;
  shortcuts?: ShortcutConfig[];
}

export type ResolvedEntities = Partial<Record<EntityKey, string>>;

export interface InkEntity {
  entity_id: string;
  color: string;
  css: string;
  level: number | null;
  low: boolean;
  empty: boolean;
}

export interface HassState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
}

export interface EntityRegistryEntry {
  entity_id: string;
  platform?: string;
  translation_key?: string;
  device_id?: string;
  hidden?: boolean;
}

export interface DeviceRegistryEntry {
  id: string;
  name?: string;
  name_by_user?: string;
  model?: string;
  manufacturer?: string;
}

export interface HassObject {
  states: Record<string, HassState>;
  entities?: Record<string, EntityRegistryEntry>;
  devices?: Record<string, DeviceRegistryEntry>;
  locale?: { language: string };
  language?: string;
  themes?: { darkMode?: boolean };
  localize?: (key: string, ...args: unknown[]) => string;
  formatEntityState?: (stateObj: HassState, state?: string) => string;
  formatEntityAttributeValue?: (stateObj: HassState, attribute: string, value?: unknown) => string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<unknown>;
  hassUrl?: (path: string) => string;
}
