# Lumina 塔罗

[English](README.en.md)

给 DeepSeek Harness 装一副塔罗牌。

装好之后，聊天界面右下角会出现一张可以拖动的**牌背**。点一下就开始洗牌抽牌，抽完可以让 AI 帮你解读——或者干脆跟它说「帮我看看最近的事业运」，它会自己去抽，不会凭空编一张牌出来。

牌是完整的 78 张（22 张大阿卡那 + 56 张小阿卡那），正逆位含义、关键词都带中英双语。

---

## 怎么玩

装好并启动 Harness 之后：

| 动作 | 会发生什么 |
|------|-----------|
| **单击**牌背 | 按当前牌阵抽一次牌。先看到一叠牌在洗，洗完了翻开 |
| **拖动**牌背 | 只是换个位置，松手后记住，下次打开还在。拖动的这次不会抽牌 |
| **右键**牌背 | 弹出贴着牌的扇形菜单：换牌阵、看上次结果、翻历史 |

抽完牌之后点 **「让 AI 解读」**，当前对话里的模型就会按你已经抽到的牌写解读——**牌是抽好的，模型改不了**。

不想看到浮动牌背？在设置里关掉「显示悬浮牌背」就行，对话里照样能抽牌。

## 四种牌阵

| 牌阵 | 适合 |
|------|------|
| **单张指引** | 想要一句直接的回应 |
| **三牌时间线** | 过去 / 现在 / 未来（默认） |
| **十字** | 五张，看清一件事的处境与走向 |
| **凯尔特精简** | 十张，铺开一个复杂局面 |

## 在设置里调什么

打开 **DeepSeek Harness 设置 → Lumina 塔罗**：

主题配色、界面语言、卡面画风（现代极简 / 韦特 / 水彩）、卡背样式、动画强弱、默认牌阵、逆位概率，以及导出和清空历史记录。

主题只会给插件自己的牌和面板上色，**不会去改 Harness 界面的外观**。

## 跟 AI 说话就行

不用记命令，直接用平常的话说：

- 「帮我占卜」「抽张牌」
- 「今日一牌」「今天运势怎么样」
- 「愚者这张牌什么意思」

模型会调用对应工具去做，而不是自己编牌面。也可以敲斜杠命令：`/lumina draw`、`/lumina today`、`/lumina interpret`、`/lumina history`。

---

## 安装

需要先有 `dsh` CLI。**桌面版和网页版装的是同一个包，装一次就够。**

### 桌面版 App

1. 打开 App 的 **插件 → 添加插件**
2. 填包名 `dsh-lumina-tarot`，点安装
3. **重启 App**

> App 有自己的配置目录，命令行管不了它（`dsh plugin --profile desktop …` 会被拒绝），请从上面的界面入口安装。

### 网页版（`dsh web`）

```sh
dsh plugin --profile web add dsh-lumina-tarot
```

装完确认一下：

```sh
dsh --profile web --dump-config   # 应该能看到 # == dsh-lumina-tarot 这一层
dsh web
```

想锁定版本就写 `dsh-lumina-tarot@0.1.2`。

## 命令速查

四条命令，日常只会用到前两条。命令里的 `web` 是 profile 名（可以理解成"配置档"），如果你用的是别的 profile，把它换掉即可。

| 命令 | 做什么 |
|------|--------|
| `dsh plugin --profile web add dsh-lumina-tarot` | **安装**。从 npm 拉取并装进 `web` 这个 profile |
| `dsh plugin --profile web update dsh-lumina-tarot` | **更新**到最新版（钉了版本号的不动） |
| `dsh plugin --profile web remove dsh-lumina-tarot` | **卸载**。偏好和历史会保留 |
| `dsh --profile web --dump-config` | **检查**装上了没。看到 `# == dsh-lumina-tarot` 就是成功了 |

几点说明：

- **装完要重启**。不管是安装还是更新，正在跑的 Harness 用的还是启动时那份代码，必须重启才生效。
- **桌面版 App 没有对应命令**。App 的配置由它自己管，命令行动不了，只能从 **插件 → 添加插件** 走界面（见上一节）。
- **只需要装一次**。抽牌能力（Host）和界面（Client）在同一个包里，不用再跑第二条命令。
- **headless 环境也能装**。没有界面的 profile 里模型照样能抽牌，只是看不到浮动牌背。

## 更新

Harness **不会**自动检查插件更新，要自己动手：

```sh
dsh plugin --profile web update dsh-lumina-tarot
dsh web
```

⚠️ 插件更新后**必须重启** Harness 才生效——正在运行的进程用的还是启动时那份代码。

## 卸载

```sh
dsh plugin --profile web remove dsh-lumina-tarot
```

卸载**不会**清掉你的偏好设置和历史记录，重新装回来还在。想彻底清干净，先在设置里「清空全部历史」。

---

## 给开发者

从源码构建：

```sh
pnpm install
pnpm build     # Host 与 Client 一起打包
pnpm e2e       # 真实 dsh web 端到端测试（先启动 dsh web）
```

也可以直接从 GitHub 安装（会现场跑 `prepare` 构建，比装 npm 版慢）：

```sh
dsh plugin --profile web add github:shetengteng/dsh-lumina-tarot
```

pnpm 10+ 默认会拦构建脚本，第一次失败的话，按 CLI 提示把包名写进该 profile 的 `pnpm-workspace.yaml` 再重跑：

```yaml
allowBuilds:
  dsh-lumina-tarot: true
```

本地改代码时，在仓库根目录做链接安装：

```sh
dsh plugin --profile web add .
```

改完 Client 代码后需要重启 `dsh web` 并刷新浏览器。

产品行为说明见 [design/2026-08-19-01-系统设计.md](design/2026-08-19-01-系统设计.md)。这不是一个独立网站，没有 `/tarot` 路由——它就住在 Harness 的对话界面里。

## 许可

源码 MIT，见 [LICENSE](LICENSE)。牌面图源见 [NOTICE](NOTICE)：韦特牌为公有领域（Public Domain）；水彩 Aquatic Tarot 为 CC BY-NC-SA 3.0，**仅限个人非商业用途**。
