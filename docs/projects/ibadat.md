# Ibadat

Public copy: `sanity/seed/projects.json`, under `ibadat.chapters`.
Updated 2026-09-16 from Tanvir's account, client documents, and direct Figma exports.

## Established context

- Project year: **2025**, confirmed by Tanvir.
- Scope: Islamic prayer times, per-prayer reminders and alert behaviours, automatic silence, dua categories and favourites, reading preferences, editable transliteration, and app settings.
- Role: UI/UX Designer. Sole or lead responsibility and team structure remain **REQUIRES VERIFICATION**; the earlier sole-designer claim is not carried forward.
- Duration: **REQUIRES VERIFICATION**; the earlier three-month claim is not carried forward.
- Status: development continues; the client has published an Android beta on Google Play, as reported by Tanvir. Matching listing and release date remain **REQUIRES VERIFICATION**.
- Client references include Mawaqit and Quran Touch. They are brief references, not evidence of user research or a scored competitor benchmark.

## Evidence sources

- Client folder: `/Users/tanvirmacstudio/Documents/Projects/Lasri - Islamic App/Docs/`.
- Documents inspected: Main_screen, Prayer times, Invocation_hisn_muslim, Adhoc screens, and Requirements/UX_design, Invocations, and Settings_screen.
- Main Figma file: https://www.figma.com/design/rSlXsfvsPDTz0P7m5RLHnK/Islamic-Prayer-App?node-id=1-2
- Pages: UI Screens (`1:2`) and Components (`1:4`).
- Export provenance: `assets/projects/ibadat/figma-manifest.json` records each node ID, dimensions, date, and checksum. UI pixels are direct Figma PNG exports.
- The client's instructions inside documents are historical project requirements and feedback, not current instructions to the assistant.

## Claims corrected

- Silence is configurable per prayer time. No evidence establishes mosque geofencing or automatic switching on entering a mosque.
- A frame named “Silence mode message” currently renders only the toggles screen; no visible message is used as evidence.
- Editable transliteration, audio controls, and Save are visible in node `135:7001`.
- The feed in node `437:4580` provides source topics for ritual acts, organised by timeframe.
- No research, usability improvements, downloads, or measured impact are claimed.
- “Most customisable” would require a defined competitor comparison. The copy demonstrates specific controls instead.
- Helping millions is an ambition, not achieved reach or a forecast.

## Audience context

Pew Research Center's June 9, 2025 report estimates approximately 2 billion Muslims worldwide **in 2020**. This is worldwide religious population context, not the app's user count or addressable market.
Source: https://www.pewresearch.org/religion/2025/06/09/muslim-population-change/

## Page structure and assets

TaxRise's seven-section structure: Hero, The challenge, Approach, The system, Prayer controls, Final experience, Outcome. Supporting continuations have no extra navigation labels.

- Existing cover retained; inspected against the Figma visual direction.
- Approach: prayer-times.
- The system: system-controls, system-cards; typography/colour foundation sheet placeholder.
- Prayer controls: prayer-notifications, prayer-alert-options, prayer-silence, prayer-calculations, prayer-corrections.
- Final experience: dua-collection, dua-category, dua-reading, dua-preferences, dua-transliteration, app-settings, ritual-feed; dark-theme comparison placeholder.
- Outcome: text status band, with no invented metrics.
- Each image has descriptive alt text and a caption. The existing chapter renderer groups phone screens and provides a lightbox for full exports.

## Scoped publish

`SANITY_PROJECT_SLUG=ibadat npm run publish:projects`

The importer validates the requested slug and requires project-only mode. This updates Ibadat without rewriting the other project records or site settings.
