import type { EntityRegistryEntry, HassObject, HassState } from "../../src/types";

export const DEVICE_ID = "dev-hp-1";
export const PREFIX = "deskjet_2700_series";

export function mockEntity(
  entity_id: string,
  state: string,
  attributes: Record<string, unknown> = {}
): HassState {
  return { entity_id, state, attributes };
}

export interface MockHassOpts {
  status?: string;
  black?: string;
  tri_color?: string;
  quiet?: string;
  firmware?: string;
  total_pages?: string;
  current_job?: string;
  language?: string;
  withRegistry?: boolean;
  scanImage?: boolean;
  unavailable?: boolean;
}

export interface MockHass extends HassObject {
  _calls: Array<{
    domain: string;
    service: string;
    service_data?: Record<string, unknown>;
    target?: Record<string, unknown>;
  }>;
}

function reg(
  entity_id: string,
  translation_key: string,
  platform = "hp_printer"
): EntityRegistryEntry {
  return { entity_id, translation_key, platform, device_id: DEVICE_ID };
}

export function mockHass(opts: MockHassOpts = {}): MockHass {
  const p = PREFIX;
  const states: Record<string, HassState> = {
    [`sensor.${p}_status`]: mockEntity(`sensor.${p}_status`, opts.status ?? "idle", {
      friendly_name: "DeskJet 2700 series Status",
      device_class: "enum",
      problems: [],
    }),
    [`sensor.${p}_black_ink`]: mockEntity(`sensor.${p}_black_ink`, opts.black ?? "70", {
      color: "black",
      css_color: "#000000",
      unit_of_measurement: "%",
    }),
    [`sensor.${p}_tri_color_ink`]: mockEntity(`sensor.${p}_tri_color_ink`, opts.tri_color ?? "90", {
      color: "tri_color",
      css_color: "#00AEEF",
      unit_of_measurement: "%",
    }),
    [`sensor.${p}_black_ink_raw_level`]: mockEntity(`sensor.${p}_black_ink_raw_level`, "65"),
    [`sensor.${p}_total_pages`]: mockEntity(`sensor.${p}_total_pages`, opts.total_pages ?? "66"),
    [`sensor.${p}_scanned_pages`]: mockEntity(`sensor.${p}_scanned_pages`, "5"),
    [`sensor.${p}_copied_pages`]: mockEntity(`sensor.${p}_copied_pages`, "3"),
    [`sensor.${p}_wi_fi_signal`]: mockEntity(`sensor.${p}_wi_fi_signal`, "-49"),
    [`sensor.${p}_current_job`]: mockEntity(`sensor.${p}_current_job`, opts.current_job ?? "unknown"),
    [`sensor.${p}_queued_jobs`]: mockEntity(`sensor.${p}_queued_jobs`, "0"),
    [`sensor.${p}_scanner`]: mockEntity(`sensor.${p}_scanner`, "idle"),
    [`sensor.${p}_last_scan`]: mockEntity(`sensor.${p}_last_scan`, "2026-10-30T10:00:00+00:00", {
      device_class: "timestamp",
    }),
    [`binary_sensor.${p}_problem`]: mockEntity(`binary_sensor.${p}_problem`, "off"),
    [`switch.${p}_quiet_mode`]: mockEntity(`switch.${p}_quiet_mode`, opts.quiet ?? "off"),
    [`button.${p}_locate`]: mockEntity(`button.${p}_locate`, "unknown"),
    [`button.${p}_scan`]: mockEntity(`button.${p}_scan`, "unknown"),
    [`button.${p}_cancel_current_job`]: mockEntity(`button.${p}_cancel_current_job`, "unknown"),
    [`button.${p}_clean_cartridges`]: mockEntity(`button.${p}_clean_cartridges`, "unknown"),
    [`button.${p}_align_cartridges`]: mockEntity(`button.${p}_align_cartridges`, "unknown"),
    [`button.${p}_print_status_report`]: mockEntity(`button.${p}_print_status_report`, "unknown"),
    [`update.${p}_firmware`]: mockEntity(`update.${p}_firmware`, opts.firmware ?? "off"),
  };
  if (opts.scanImage) {
    states[`image.${p}_last_scan`] = mockEntity(`image.${p}_last_scan`, "2026-10-30T10:00:00+00:00", {
      entity_picture: `/api/image_proxy/image.${p}_last_scan?token=abc`,
    });
  }
  if (opts.unavailable) states[`sensor.${p}_status`].state = "unavailable";

  const entities: Record<string, EntityRegistryEntry> = {
    [`sensor.${p}_status`]: reg(`sensor.${p}_status`, "status"),
    [`sensor.${p}_black_ink`]: reg(`sensor.${p}_black_ink`, "consumable_level_black"),
    [`sensor.${p}_tri_color_ink`]: reg(`sensor.${p}_tri_color_ink`, "consumable_level"),
    [`sensor.${p}_black_ink_raw_level`]: reg(`sensor.${p}_black_ink_raw_level`, "consumable_raw_level_black"),
    [`sensor.${p}_total_pages`]: reg(`sensor.${p}_total_pages`, "total_pages"),
    [`sensor.${p}_scanned_pages`]: reg(`sensor.${p}_scanned_pages`, "scan_pages"),
    [`sensor.${p}_copied_pages`]: reg(`sensor.${p}_copied_pages`, "copy_pages"),
    [`sensor.${p}_wi_fi_signal`]: reg(`sensor.${p}_wi_fi_signal`, "wifi_rssi"),
    [`sensor.${p}_current_job`]: reg(`sensor.${p}_current_job`, "current_job"),
    [`sensor.${p}_queued_jobs`]: reg(`sensor.${p}_queued_jobs`, "queued_jobs"),
    [`sensor.${p}_scanner`]: reg(`sensor.${p}_scanner`, "scanner_state"),
    [`sensor.${p}_last_scan`]: reg(`sensor.${p}_last_scan`, "last_scan"),
    [`binary_sensor.${p}_problem`]: reg(`binary_sensor.${p}_problem`, "problem"),
    [`switch.${p}_quiet_mode`]: reg(`switch.${p}_quiet_mode`, "quiet_mode"),
    [`button.${p}_locate`]: reg(`button.${p}_locate`, "identify"),
    [`button.${p}_scan`]: reg(`button.${p}_scan`, "scan"),
    [`button.${p}_cancel_current_job`]: reg(`button.${p}_cancel_current_job`, "cancel_job"),
    [`button.${p}_clean_cartridges`]: reg(`button.${p}_clean_cartridges`, "clean_cartridges"),
    [`button.${p}_align_cartridges`]: reg(`button.${p}_align_cartridges`, "align_cartridges"),
    [`button.${p}_print_status_report`]: reg(`button.${p}_print_status_report`, "print_configuration_page"),
    [`update.${p}_firmware`]: reg(`update.${p}_firmware`, "firmware"),
    [`image.${p}_last_scan`]: reg(`image.${p}_last_scan`, "last_scan"),
    "sensor.other_thing": reg("sensor.other_thing", "status", "other"),
  };

  const calls: MockHass["_calls"] = [];
  return {
    states,
    entities: opts.withRegistry === false ? undefined : entities,
    locale: { language: opts.language ?? "en" },
    themes: { darkMode: false },
    _calls: calls,
    formatEntityState: (stateObj) =>
      stateObj.attributes.device_class === "enum"
        ? stateObj.state.charAt(0).toUpperCase() + stateObj.state.slice(1)
        : `${stateObj.state}${stateObj.attributes.unit_of_measurement ? " " + stateObj.attributes.unit_of_measurement : ""}`,
    callService(domain, service, service_data, target) {
      calls.push({ domain, service, service_data, target });
      return Promise.resolve();
    },
    hassUrl: (path) => `http://ha.local:8123${path}`,
  };
}
