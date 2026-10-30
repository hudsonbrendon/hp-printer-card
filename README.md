# HP Printer Card

[![HACS](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://hacs.xyz)
[![Release](https://img.shields.io/github/v/release/hudsonbrendon/hp-printer-card)](https://github.com/hudsonbrendon/hp-printer-card/releases)
[![Lint and Test](https://github.com/hudsonbrendon/hp-printer-card/actions/workflows/lint.yml/badge.svg)](https://github.com/hudsonbrendon/hp-printer-card/actions/workflows/lint.yml)

<img src="assets/hp.png" alt="HP" width="72" align="right">

Lovelace card for HP printers running the
[HP Printer integration](https://github.com/hudsonbrendon/ha-hp-printer).
Same layout as the popular vacuum card — tips row, animated illustration,
name + status, stats and a toolbar — but for a printer:

- **Animated printer**: paper feeds out and the carriage shuttles while
  printing, the scanner light sweeps while scanning or copying, "z z" while
  sleeping, LED turns amber / red on attention / error, greyed out when
  unavailable. Respects `prefers-reduced-motion` and dark mode.
- **Ink pills** in the header (one per cartridge / toner / tank, with the real
  cartridge colour; pulsing when low, red when empty), quiet-mode toggle and a
  firmware-update badge.
- **Status** localised by Home Assistant (`Ready`, `Printing`, `Scanning`,
  `Sleeping`, `Attention needed`, `Error`...).
- **Stats** per state (pages / scans / Wi-Fi by default; current job and queue
  while printing) and an optional **last scan thumbnail**.
- **Toolbar**: Scan, Locate, Clean, Align, Status report when idle; Cancel
  while printing; your own shortcuts.

![HP Printer Card](assets/example.png)

## Installation

1. HACS → Frontend → ⋮ → *Custom repositories* → add
   `https://github.com/hudsonbrendon/hp-printer-card` as *Dashboard*.
2. Install **HP Printer Card**. HACS adds the resource automatically.

Manual: copy `dist/hp-printer-card.js` to `config/www/` and add
`/local/hp-printer-card.js` as a JavaScript module resource.

## Configuration

The card finds every entity of the printer from the entity registry, so the
minimal config is just the device:

```yaml
type: custom:hp-printer-card
device: 3f2a0c…   # device id of the printer (pick it in the visual editor)
```

or the entity prefix / status sensor:

```yaml
type: custom:hp-printer-card
entity: sensor.deskjet_2700_series_status
```

| Option | Default | Description |
| --- | --- | --- |
| `device` | — | Device registry id of the printer (preferred). |
| `entity` | — | Entity prefix (`deskjet_2700_series`) or the status sensor id. |
| `entities` | — | Explicit overrides per key (`status`, `scan`, `identify`, `quiet_mode`...). |
| `name` | device name | Title shown under the illustration. |
| `image` | built-in SVG | URL of a custom image (gets the state as CSS class). |
| `show_name` / `show_status` / `show_toolbar` / `show_ink` / `show_scan_preview` | `true` | Toggle sections. |
| `compact_view` | `false` | Hide the illustration and stats. |
| `language` | HA language | Force `en` or `pt-BR`. |
| `stats` | see below | Per-state list of `{ key \| entity, attribute, unit, subtitle }`. |
| `shortcuts` | `[]` | Extra toolbar buttons `{ name, icon, service, service_data, target }` or `{ key }`. |

Stats keys: `total_pages`, `scan_pages`, `copy_pages`, `jam_events`,
`wifi_rssi`, `wifi_ssid`, `current_job`, `queued_jobs`, `paper_size`,
`last_scan`, `scanner`. Subtitles starting with `stat.` are translated.

```yaml
type: custom:hp-printer-card
device: 3f2a0c…
stats:
  default:
    - key: total_pages
      subtitle: stat.total_pages
    - key: scan_pages
      subtitle: stat.scan_pages
    - entity: sensor.deskjet_2700_series_paper_size
      subtitle: Paper
  printing:
    - key: current_job
      subtitle: stat.current_job
    - key: queued_jobs
      subtitle: stat.queued_jobs
shortcuts:
  - name: Network summary
    icon: mdi:lan
    service: hp_printer.print_report
    service_data:
      device_id: 3f2a0c…
      page: networkSummary
```

## Development

```bash
npm install
npm run build      # dist/hp-printer-card.js
npm test           # vitest
npm run lint && npm run typecheck
```

## License

MIT
