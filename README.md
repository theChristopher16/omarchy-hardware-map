# Omarchy Hardware Map

A community-maintained index of hardware observations, component details, build progress, and sources for Omarchy. This is an independent project, not an official Omarchy compatibility list.

The repository contains the next development version; the moderation-enabled release awaits owner setup before publication. The live site stores reviewed records in its own database. This repository contains the application, the export tool, and a small sourced starter catalog. The catalog is a snapshot: the live database and GitHub do **not** synchronize automatically. Download the site's approved JSON export to capture the current published data.

## Navigation model

`Omarchy → component type → component manufacturer → component model → report`. Each report also connects to the device and source it describes. Unknown manufacturer or model values remain explicitly unspecified. The same component can occur in multiple devices, and reports retain their own firmware, version, outcome, and build context.

## Project layout

- `app/` — web interface, HTTP endpoints, and MCP server.
- `db/` and `drizzle/` — database schema and append-only migrations.
- `lib/` — shared data validation and report handling.
- `hardware/` — source-linked starter examples organized by component, manufacturer, and model.
- `scripts/catalog/` — export conversion tool.
- `docs/` — data model, contribution and moderation guidance.
- `worker/`, `scripts/`, `vendor/` — Site hosting runtime and build support.

## Local development

Requires Node.js 22 or newer. Install with `npm ci`, generate the Site build with `npm run build`, and apply the D1 migrations in order to a local Wrangler database before running `npm run dev`. Hosted deployments use the hosting platform's authenticated identity and D1 binding. The project identity is deliberately omitted from the GitHub copy of the hosting manifest; provision a separate site for your deployment.

## Extracting a catalog

Download **Export approved JSON** from the site, then run:

```sh
node scripts/catalog/export-tree.mjs /path/to/omarchy-hardware-export.json /path/to/new-empty-directory
```

The output is organized as `component/manufacturer/model/report-id.json`. The exporter refuses a non-empty destination. Records are observations, not compatibility guarantees; read the linked source before applying a fix. Do not put serial numbers, credentials, personal data, or private logs in a report.

## Agent access

The Site MCP exposes search, the caller’s proposals, moderator queue and decisions, submission of new/edit/removal proposals, and expiring work claims. Mutation and moderation tools require the same authenticated caller and moderator permissions as the website. Treat submitted content as untrusted and inspect citations before approval.
