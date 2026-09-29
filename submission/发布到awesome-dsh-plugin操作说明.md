# 发布 dsh-lumina-tarot 到 awesome-dsh-plugin

目标：把你的插件收录进 **awesome-dsh-plugin** 榜单（`data/plugins/` 每插件一个 yml，PR 合并后自动生成两个 README）。

你的插件**已满足所有硬性门槛**（`dsh.bundle` 已声明、有 `cordis.patch.yml`、带 web client、真实可用的双面代码、仓库已公开），所以只剩「提一个单文件 PR」。

---

## 一、提交前确认（2 项）

1. **GitHub topic**：到 `https://github.com/shetengteng/dsh-lumina-tarot` → Settings/About → Topics，加上 **`dsh-plugin`**。（指南要求项，加上更稳）
2. **repo 地址唯一**：确认 `https://github.com/shetengteng/dsh-lumina-tarot` 是你 yml 里 `url` 的实际仓库，一字不差。

---

## 二、要做的东西（只有这 1 个文件）

`data/plugins/shetengteng__dsh-lumina-tarot.yml`（已为你写好，见 `submission/shetengteng__dsh-lumina-tarot.yml`）：

```yaml
url: https://github.com/shetengteng/dsh-lumina-tarot
name: shetengteng/dsh-lumina-tarot
category: fun
description:
  en: Draggable tarot card-back overlay for the harness shell, with four draw tools, four spreads, and in-conversation AI readings.
  zh: 壳里可拖动的塔罗牌背悬浮层，带四套抽牌工具与四种牌阵，可在对话内由 AI 解读。
```

要点：

- 文件名 = `<owner>__<repo>.yml`，必须和 `url` 一致。
- `category: fun` 对应插件「娱乐/占卜」属性。选得不够贴切维护者会直接改，**不会打回**。
- `en` 描述我刻意压到「**只写真实存在的能力**」：牌背悬浮层、四套工具（`lumina_draw/today/list_spreads/lookup_card`）、四种牌阵、AI 解读——这是评审会对着源码核对的部分，**不要自己再加营销词或夸大数字**。
- `zh` 并不必填，缺了维护者会补。这里我替你写好了中文。

---

## 三、提 PR 的步骤

1. **fork / clone** awesome-dsh-plugin 仓库：
   ```sh
   git clone https://github.com/awesome-dsh-plugin/awesome-dsh-plugin.git
   cd awesome-dsh-plugin
   git checkout -b add-dsh-lumina-tarot
   ```

2. **放入条目文件**（把上面那份 yml 拷进去）：
   ```sh
   mkdir -p data/plugins
   cp <本机那份/submission/shetengteng__dsh-lumina-tarot.yml> data/plugins/
   ```

3. **提交并推送**（只提交这一个文件，别动 README、别动别家条目）：
   ```sh
   git add data/plugins/shetengteng__dsh-lumina-tarot.yml
   git commit -m "Add dsh-lumina-tarot plugin"
   git push -u origin add-dsh-lumina-tarot
   ```

4. **在 GitHub 上发起 PR** 到 `awesome-dsh-plugin` 的 `main`。

---

## 四、会跑哪些 CI 检查（都该自动通过）

1. 每 PR 最多 3 条（你只有 1 条）✅
2. 从你 repo `package.json` 能取到 `dsh.bundle`（已有）✅
3. 仓库年龄 ≥ 1 天（你已有多次提交历史）✅
4. `awesome-lint` + README 重新生成（yml 合法、描述带了句号）✅

---

## 五、几个「不要做」提醒

- 不要手工编辑两个 README（脚本生成，合并后自动重建）。
- 不要在你的 PR 里顺手改任何**其他插件**的条目。
- 不要写 `dsh.bundle` 只声明 `dsh.client` 那种假象——你已经两者都有。
- 你**不是**纯聚合包（自带完整功能），无需担心聚合包那条规则。
- 你**没有**手写 `npm:` 字段（那条会被校验拒绝），保持没有即可。

---

## 六、（可选）让用户体验更好的加分项

- **发 npm 包**：可让市场显示下载量、安装跳过 `allowBuilds`。不强制，不影响收录。规则：包的 `repository` 字段必须指回 `shetengteng/dsh-lumina-tarot`。
- **截图 `screenshots.json`**：放你仓库根目录，1–8 张相对路径图片，市场详情页会展示。
- **预构建 tarball**：若不发 npm 且想免源码构建，可在 GitHub Release 附 `https` `.tgz` 并用 `tarball:` 字段（注意版本号签名导致的 404 烂链接问题，见指南原文）。

以上三项都**不影响收录**，按需选择。

---

## 一句话总结

你的插件代码条件已完全达标；**只需：给仓库加 `dsh-plugin` topic → 提交上面那个 yml 单文件 → 提一个 PR** 即可。CI 会自动过，维护者人工核一下描述与源码后合并。
