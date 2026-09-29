Adds one entry: `data/plugins/shetengteng__dsh-lumina-tarot.yml`, category `fun`.

**What it does.** A tarot plugin for DSH Web. It puts a draggable card back in the corner of the shell — click to draw with the current spread after a shuffle, drag to move it (the position is remembered), right-click for a menu with the four spreads, the last result and the history. The same deck works in a conversation through four tools (`lumina_draw`, `lumina_today`, `lumina_list_spreads`, `lumina_lookup_card`) and the `/lumina` commands, and it still works headless with the overlay switched off. Four spreads over a full 78-card deck, with bilingual keywords and upright/reversed meanings.

Cards are drawn by the plugin, never by the model: the tools hand back concrete card ids, so a reading always refers to cards that were actually drawn.

**Requirements.**

`dsh.bundle` → `./cordis.patch.yml` at the repository root.  
Carries the `dsh-plugin` topic; created 2026-08-20, past the 1-day bar.  
Not on npm and no `tarball:` declared — it installs from source, `dsh plugin --profile web add github:shetengteng/dsh-lumina-tarot`.  
yml-only — the generated READMEs are untouched.

**Local CI-equivalent run, all green:** `npm ci`, `generate-readme` (4063 entries), `awesome-lint` (exit 0; 92 pre-existing warnings), added-dates (3/3), and `build-site` with `SKIP_PUBLISH_CHECKS=1` (4063 rows × 2 locales).
