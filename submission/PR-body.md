# 第一部分：PR 标题 / Title

```
Add shetengteng/dsh-lumina-tarot
```

---

# 第二部分：PR 描述 / Body（从下面这条横线开始整段复制）

---

## What this adds / 这个 PR 做了什么

One entry file: `data/plugins/shetengteng__dsh-lumina-tarot.yml` (+1 file, no other changes).
一个条目文件，除此之外没有任何改动。

## About the plugin / 插件简介

**Lumina Tarot** is a tarot plugin for DSH Web, shipped as **one dual-face bundle**: the Host registers the draw tools, and the Web client adds a draggable card-back overlay in the shell corner.

**Lumina 塔罗**是一个 DSH Web 上的塔罗插件，以**单个双面包**发布：Host 注册抽牌工具，Web client 在壳的右下角加一张可拖动的牌背。

- **Overlay / 悬浮牌背**：单击按当前牌阵抽牌（先洗牌动画再翻开）；拖动只改位置、松手记住、刷新还在（这一次不抽牌）；右击打开贴牌扇形菜单（四种牌阵、上次结果、历史）。不想用时可在设置里关掉，工具与命令照常可用。
- **Tools / 工具**：`lumina_draw`、`lumina_today`、`lumina_list_spreads`、`lumina_lookup_card`。模型通过工具拿牌，工具返回确定的牌 id，所以它改不了牌、也编不出牌。
- **Readings / 解读**：结果出来后可以让当前会话基于**已经抽好的牌**写解读。
- **Spreads / 牌阵**：`single`、`three-card`、`cross`、`celtic-lite`（默认三牌）。
- **Deck / 牌库**：完整 78 张（22 大阿 + 56 小阿），关键词与正逆位含义中英双语。
- **Headless / 无界面**：不开悬浮层也能用，模型照样能抽牌。
- **Install / 安装**：`dsh plugin --profile web add github:shetengteng/dsh-lumina-tarot`

Source is MIT (`LICENSE`). Card art is documented in `NOTICE`: the Rider–Waite–Smith deck is public domain; the Aquatic Tarot deck is CC BY-NC-SA 3.0, personal non-commercial use only.

源码为 MIT（见 `LICENSE`）。牌面图源见 `NOTICE`：韦特为公有领域；水彩 Aquatic Tarot 为 CC BY-NC-SA 3.0，仅限个人非商业用途。

---

<!-- Thanks for contributing! Quick checklist / 提交前快速自查 -->

- [x] I added **one file** at `data/plugins/<owner>__<repo>.yml` — that single file is the whole submission. The READMEs are regenerated on `main` after merge: don't edit them by hand, and you don't need to commit them either / 我新增了一个 `data/plugins/<owner>__<repo>.yml` 文件——**这一个文件就是全部投稿**。README 会在合并后由 `main` 自动重新生成：不要手工编辑，也不需要提交
- [x] My repo's `package.json` declares **`dsh.bundle`** (not just `dsh.client`) — [example](../blob/main/contributing.md) / 仓库 `package.json` 已声明 `dsh.bundle`（只有 `dsh.client` 无法安装）
- [x] My repo is at least **1 day old** / 仓库创建满 1 天
- [x] `category` is one of `agi ui usage theme model identity session memory tools wsl browser vision voice docs skill workflow git notify dev security remote market fun` ([full list with descriptions](../blob/main/contributing.md)), and themes/skins go under `theme` / `category` 取值正确（完整清单见 contributing.md），主题/皮肤类请用 `theme`
- [x] Description states what the plugin does, no superlatives / 描述只说功能，不带营销词
- [x] My repo has the `dsh-plugin` topic / 仓库已打 `dsh-plugin` topic

**Recommended (not required) / 推荐但不强制：**

- 📦 Publish to npm — npm installs are prebuilt and skip the `allowBuilds` approval, so users get a one-command install / 发布 npm 包：预构建产物免 `allowBuilds` 授权，用户一条命令装好
- 🔗 Declare official `@deepseek-ai/*` packages as `peerDependencies` (not `dependencies`) — avoids duplicate runtimes inside the profile / 官方 `@deepseek-ai/*` 包用 `peerDependencies` 声明（而非 `dependencies`），避免 profile 里出现重复运行时
- 🖼️ Screenshots go in **your own repository** now: a `screenshots.json` beside your `package.json`, listing image paths. Nothing to add here, and you can change them later without another pull request ([how](../blob/main/contributing.md#screenshots--截图optional-recommended--可选推荐)) / 截图现在放在**你自己的仓库**里：在 `package.json` 旁边放一个 `screenshots.json`，列出图片路径。这个 PR 里不用加任何东西，以后想换也不必再提 PR（[说明](../blob/main/contributing.md#screenshots--截图optional-recommended--可选推荐)）

**Recommended items — current state / 推荐项现状（供参考）**

- npm：未发布（可选，不影响收录；如需补发，包内 `repository` 需指回本仓库）
- `@deepseek-ai/*`：已在 `peerDependencies` 声明 ✅（`@deepseek-ai/cordis`、`@deepseek-ai/dsh-settings`、`@deepseek-ai/schemastery`）
- `screenshots.json`：未声明（可选，市场会自动从 README 抽取截图）

（PR 描述到此结束 / end of PR body）

---

# 第三部分：给你的核对备注（**不要**贴进 PR）

## 六个必勾项为什么都成立（逐条实测）

| 条目 | 实测结果 |
|---|---|
| 只加一个 yml 文件 | `git diff --name-status` = `A data/plugins/shetengteng__dsh-lumina-tarot.yml`，+1/-0 ✅ |
| `dsh.bundle` 已声明 | 从 GitHub API 读根 `package.json`：`dsh.bundle = {'patch': './cordis.patch.yml'}` ✅ |
| 仓库满 1 天 | `created_at = 2026-08-20`，实测 **31.3 天** ✅ |
| `category` 合法 | `fun` 在 `CAT_IDS` 白名单内，仓库自身 `validateEntries` 零问题 ✅ |
| 描述只说功能 | 无最高级、无营销词；「4 个工具 / 4 种牌阵 / 78 张牌」均已对着代码数过 ✅ |
| 有 `dsh-plugin` topic | 已添加：`deepseek-harness` · `deepseek-harness-plugin` · `lumina` · `tarot` · `dsh-plugin` ✅ |

## 简介里每个数字的来源（防止被质疑时说不清）

| 声明 | 来源 |
|---|---|
| 4 个工具 | `grep -rhoE "lumina_[a-z_]+" src/` → `lumina_draw`、`lumina_today`、`lumina_list_spreads`、`lumina_lookup_card` |
| 4 种牌阵 | 源码中的 `'single'`、`'three-card'`、`'cross'`、`'celtic-lite'` |
| 78 张牌 | `src/client/decks/rws/*.webp` 排除 `_back` 后 **78** 个卡面；`src/skill.ts` 亦写明「78 张」 |

## 两件不要做的事

- 不要手工编辑 `README.md` / `README.zh.md`（合并后由 `sync-readme.yml` 自动重生成；只加 yml 是 `pr-check.yml` 明确接受的形态）
- 不要顺手改动任何**其他插件**的条目文件（`pr-guard` 会列出 PR 修改的每个既有条目供追问）

## 补充：checklist 的说明

- 它是仓库的 PR **模板**（`.github/pull_request_template.md`），新建 PR 时自动填进描述框，不是你收到的评论。
- `- [ ]` 改成 `- [x]` 即可；模板原文不要删改。
- **没有任何 CI 解析它**（全仓库 grep 只命中模板文件本身），纯供维护者浏览。
