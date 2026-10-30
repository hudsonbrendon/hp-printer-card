import {
  DEFAULT_INK_COLORS,
  ENTITY_SPECS,
  HP_PLATFORM,
  INK_SUFFIX_RE,
  INK_TRANSLATION_KEY,
  type EntityKey,
} from "../const";
import type { HassObject, HPPrinterCardConfig, InkEntity, ResolvedEntities } from "../types";

/**
 * Figure out which entity ids belong to the printer.
 *
 * 1. `config.entities` explicit overrides always win.
 * 2. With `config.device`, every registry entry of that device with the
 *    hp_printer platform is matched by `translation_key`.
 * 3. With `config.entity` (prefix or status sensor id), the device is looked up
 *    through the registry; without a registry the English slug fallback is used.
 */
export function resolveEntities(
  hass: HassObject | undefined,
  config: HPPrinterCardConfig
): { entities: ResolvedEntities; inks: InkEntity[]; deviceId?: string } {
  const entities: ResolvedEntities = { ...(config.entities ?? {}) };
  const inks: InkEntity[] = [];
  const registry = hass?.entities;
  let deviceId = config.device;
  const prefix = normalizePrefix(config.entity);

  if (registry && !deviceId && prefix) {
    const statusId = `sensor.${prefix}_status`;
    const match =
      registry[config.entity ?? ""] ??
      registry[statusId] ??
      Object.values(registry).find(
        (e) => e.platform === HP_PLATFORM && e.entity_id.includes(`.${prefix}_`)
      );
    deviceId = match?.device_id;
  }

  if (registry && deviceId) {
    for (const entry of Object.values(registry)) {
      if (entry.device_id !== deviceId || entry.platform !== HP_PLATFORM) continue;
      const [domain] = entry.entity_id.split(".");
      if (entry.translation_key === INK_TRANSLATION_KEY && domain === "sensor") {
        inks.push(buildInk(hass, entry.entity_id));
        continue;
      }
      for (const [key, spec] of Object.entries(ENTITY_SPECS)) {
        if (
          spec.domain === domain &&
          spec.translation_key === entry.translation_key &&
          !entities[key as EntityKey]
        ) {
          entities[key as EntityKey] = entry.entity_id;
        }
      }
    }
  }

  if (prefix) {
    for (const [key, spec] of Object.entries(ENTITY_SPECS)) {
      const id = `${spec.domain}.${prefix}_${spec.suffix}`;
      if (!entities[key as EntityKey] && hass?.states[id]) {
        entities[key as EntityKey] = id;
      }
    }
    if (inks.length === 0 && hass) {
      for (const id of Object.keys(hass.states)) {
        if (id.startsWith(`sensor.${prefix}_`) && INK_SUFFIX_RE.test(id) && !id.includes("raw")) {
          inks.push(buildInk(hass, id));
        }
      }
    }
  }

  inks.sort((a, b) => a.entity_id.localeCompare(b.entity_id));
  return { entities, inks, deviceId };
}

export function normalizePrefix(entity?: string): string | undefined {
  if (!entity) return undefined;
  if (entity.includes(".")) {
    // sensor.deskjet_2700_series_status -> deskjet_2700_series
    const object = entity.split(".")[1];
    return object.replace(/_status$/, "");
  }
  return entity;
}

export function buildInk(hass: HassObject | undefined, entityId: string): InkEntity {
  const stateObj = hass?.states[entityId];
  const attrs = stateObj?.attributes ?? {};
  const rawColor = String(attrs.color ?? inferColor(entityId));
  const color = rawColor.replace(/[\s-]+/g, "_").toLowerCase();
  const css =
    (typeof attrs.css_color === "string" && color !== "tri_color" && attrs.css_color) ||
    DEFAULT_INK_COLORS[color] ||
    "#888";
  const level = stateObj ? Number(stateObj.state) : NaN;
  return {
    entity_id: entityId,
    color,
    css,
    level: Number.isFinite(level) ? level : null,
    low: Boolean(attrs.low) || (Number.isFinite(level) && level <= 15),
    empty: Boolean(attrs.empty) || level === 0,
  };
}

function inferColor(entityId: string): string {
  const object = entityId.split(".")[1] ?? "";
  for (const color of Object.keys(DEFAULT_INK_COLORS)) {
    if (object.includes(color)) return color;
  }
  return "gray";
}
