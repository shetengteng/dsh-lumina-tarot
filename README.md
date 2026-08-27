# Lumina 塔罗

[English](README.en.md)

DeepSeek Harness Web 上的塔罗占卜插件。壳右下角浮着一张可拖动的**牌背**：点一下就抽，抽完可以让当前对话里的模型帮你解读。你也可以直接跟 AI 说「帮我看看最近的事业运」，它会自己调工具抽牌，不会瞎编牌面。

牌库是完整的 78 张（22 大阿 + 56 小阿），牌阵、关键词、正逆位含义都带中英双语。

## 怎么用

装好、打开 `dsh web` 之后：

- **单击**悬浮牌背：按当前默认牌阵立刻抽牌。会先看到一叠牌在洗，洗完翻开。
- **拖动**：只改位置，松手后记住，刷新还在。拖过的这次不会抽牌。
- **右击**：打开贴牌的扇形快捷菜单（四种牌阵、上次结果、查看历史）。不会弹出浏览器自带的右键菜单。卡面、今日一牌、重置位置在设置页或 slash / 对话工具里。
- 结果出来后点 **「让 AI 解读」**：当前会话会基于**已经抽好的牌**写解读，模型改不了牌。
- 不想用悬浮牌：关掉设置里的「显示悬浮牌背」，slash 命令和对话工具照样能用。

四种牌阵：单张指引、三牌时间线、十字、凯尔特精简。默认是三牌。

完整偏好在 DeepSeek Harness **设置 → Lumina 塔罗**：主题、语言、卡面、牌背、动画强弱、默认牌阵、逆位率、导出 / 清空历史。主题只染插件自己的牌和面板，不会去改壳的外观。

## 安装

本机要有 `dsh` CLI。装一次就够：Host（抽牌、工具、设置）和界面是**同一个包**，不要再跑第二条安装命令。

在仓库根目录：

```sh
dsh plugin --profile web add .
```

从 GitHub 装：

```sh
dsh plugin --profile web add github:shetengteng/dsh-lumina-tarot
```

Git 装的是源码，靠 `prepare` 打出 `lib/`。pnpm 10 默认会拦这个脚本，第一次失败的话，按 CLI 提示把包名写进该 profile 的 `pnpm-workspace.yaml` 再重跑：

```yaml
allowBuilds:
  dsh-lumina-tarot: true
```

核对有没有装上：

```sh
dsh --profile web --dump-config
dsh web
```

`dump-config` 里应出现 `# == dsh-lumina-tarot`。没有界面的 headless profile 也能装，模型照样能抽牌，只是没有悬浮牌背。

卸载（两面一起卸）：

```sh
dsh plugin --profile web remove dsh-lumina-tarot
```

卸载不清你的偏好和历史。下次再装会读回来。要连记录一起删，先在设置里「清空全部历史」。

## 对话里能做什么

跟模型说话即可，例如「帮我占卜」「今日一牌」。它会走这些工具，而不是自己编一张愚者：

| 工具 | 干什么 |
|------|--------|
| `lumina_draw` | 按牌阵抽牌 |
| `lumina_today` | 今日一牌（同一天结果稳定） |
| `lumina_list_spreads` | 列出四种牌阵 |
| `lumina_lookup_card` | 按 id / 中英文名查一张牌 |

也可以自己敲 slash 命令：`/lumina draw`、`/lumina today`、`/lumina interpret`、`/lumina history`。

## 开发

```sh
pnpm install
pnpm build    # 同时打出 Host ESM 和 Client 包
```

`prepare` 和 `build` 是同一条构建。改完 Client 后，已 link 进 profile 的包通常要重启 `dsh web`，再刷新浏览器。

产品行为见 `design/2026-08-19-01-系统设计.md`。这不是独立网站，也没有 `/tarot` 路由——它住在 Harness 的对话壳里。

## License

源码 MIT，见 `LICENSE`。牌面图源见 `NOTICE`：韦特为 Public Domain；水彩 Aquatic Tarot 为 CC BY-NC-SA 3.0，仅限个人非商业用途。
