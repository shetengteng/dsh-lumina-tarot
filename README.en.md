# Lumina Tarot

[中文](README.md)

A tarot deck for DeepSeek Harness.

Once installed, a draggable **card back** floats in the corner of the chat. Click it to shuffle and draw, then let the AI read your spread — or just say "how's my career looking?" and it will draw the cards itself instead of making one up.

The deck is a full 78 cards (22 Major Arcana + 56 Minor), with bilingual names, keywords, and upright / reversed meanings.

---

## How it works

Once installed and running:

| Action | What happens |
|--------|--------------|
| **Click** the card back | Draws with your current spread. You'll see a shuffle animation, then the cards flip over |
| **Drag** the card back | Just moves it. The position is remembered for next time — a drag never counts as a draw |
| **Right-click** the card back | Opens a fan menu on the card: switch spreads, see your last result, browse history |

After a draw, hit **"Ask AI to interpret"** and the model in your current chat reads the cards you already drew — **the cards are locked in; the model can't change them**.

Don't want the floating card? Turn off "show floating card" in settings. Drawing from chat still works.

## Four spreads

| Spread | Good for |
|--------|----------|
| **Single card** | One clear answer |
| **Three-card timeline** | Past / present / future (the default) |
| **Cross** | Five cards — the situation and where it's heading |
| **Lite Celtic cross** | Ten cards — a complicated picture, laid out in full |

## What you can tune

Open **DeepSeek Harness Settings → Lumina Tarot**:

Theme colours, UI language, card art (minimal / Rider–Waite–Smith / watercolour), card back, animation level, default spread, reversed-card odds, plus export and clear history.

Themes only tint this plugin's own cards and panel — they **never restyle the Harness interface** itself.

## Just talk to it

No commands to memorise:

- "give me a reading" / "draw a card"
- "today's card" / "how's my day looking?"
- "what does The Fool mean?"

The model calls the right tool instead of inventing cards. Slash commands work too: `/lumina draw`, `/lumina today`, `/lumina interpret`, `/lumina history`.

---

## Install

You'll need the `dsh` CLI first. **The desktop app and the web version use the same package — one install is enough.**

### Desktop app

1. Open the app's **Plugins → Add plugin**
2. Enter the package name `dsh-lumina-tarot` and install
3. **Restart the app**

> The app keeps its own profile that the CLI can't touch (`dsh plugin --profile desktop …` is rejected), so use the panel above.

### Web (`dsh web`)

```sh
dsh plugin --profile web add dsh-lumina-tarot
```

Check that it landed:

```sh
dsh --profile web --dump-config   # you should see a # == dsh-lumina-tarot layer
dsh web
```

Pin a version with `dsh-lumina-tarot@0.1.3`.

## Command cheat sheet

Four commands — day to day you'll only need the first two. `web` here is the profile name (think of it as a config slot); swap it if you use a different profile.

| Command | What it does |
|---------|--------------|
| `dsh plugin --profile web add dsh-lumina-tarot` | **Install.** Pulls the package from npm into the `web` profile |
| `dsh plugin --profile web update dsh-lumina-tarot` | **Update** to the latest release (pinned versions stay put) |
| `dsh plugin --profile web remove dsh-lumina-tarot` | **Uninstall.** Preferences and history are kept |
| `dsh --profile web --dump-config` | **Verify** the install. Look for `# == dsh-lumina-tarot` |

A few notes:

- **Restart after changing anything.** Harness keeps running the code it booted with, so installs and updates only take effect after a restart.
- **The desktop app has no equivalent command.** It manages its own profile, so the CLI can't touch it — use **Plugins → Add plugin** instead (see above).
- **One install is enough.** The draw engine (Host) and the UI (Client) ship in the same package.
- **Headless works too.** A profile without a UI still gets the draw tools — you just won't see the floating card.

## Update

Harness does **not** check for plugin updates on its own:

```sh
dsh plugin --profile web update dsh-lumina-tarot
dsh web
```

⚠️ You **must restart** Harness after updating — a running process keeps using the code it booted with.

## Uninstall

```sh
dsh plugin --profile web remove dsh-lumina-tarot
```

Uninstalling does **not** wipe your preferences or history; reinstalling picks them up again. To clear everything, clear history in settings first.

---

## For developers

Build from source:

```sh
pnpm install
pnpm build     # bundles Host and Client together
pnpm e2e       # live dsh web end-to-end tests (start dsh web first)
```

You can also install straight from GitHub (it runs `prepare` to build on the spot, slower than the npm release):

```sh
dsh plugin --profile web add github:shetengteng/dsh-lumina-tarot
```

pnpm 10+ blocks build scripts by default; if the first attempt fails, follow the CLI hint and allow the package in that profile's `pnpm-workspace.yaml`, then retry:

```yaml
allowBuilds:
  dsh-lumina-tarot: true
```

When working on the source, link your checkout from the repo root:

```sh
dsh plugin --profile web add .
```

After Client changes you need to restart `dsh web` and refresh the browser.

Product behaviour is documented in [design/2026-08-19-01-系统设计.md](design/2026-08-19-01-系统设计.md) (Chinese). This is not a standalone site and has no `/tarot` route — it lives inside the Harness chat shell.

## License

Source is MIT — see [LICENSE](LICENSE). Card art licenses are in [NOTICE](NOTICE): Rider–Waite–Smith is Public Domain; Aquatic Tarot is CC BY-NC-SA 3.0 (**personal non-commercial use only**).
