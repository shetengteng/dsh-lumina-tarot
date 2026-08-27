# dsh-lumina-tarot

Lumina 塔罗的 DeepSeek Harness 双面插件。Host 管抽牌 / tools / settings；Client 管悬浮牌背与面板。

## DeepSeek Harness plugin development

Before changing plugin code, read https://dsh.pub/develop-plugin.md completely. Follow the pinned runtime contract and verification boundaries there; this repository's own security, testing, and release rules remain authoritative.

项目内细则：

- `.cursor/rules/dsh-plugin.mdc` — 双面包、座椅、数据所有权、构建与验收
- `.cursor/rules/frontend-role.mdc` — Client UI 的前端角色与视觉/交互契约
- `.cursor/rules/module-size.mdc` — 单文件原则上 ≤300 行，超限必须按职责拆模块
- `design/2026-08-19-01-系统设计.md` — 产品行为（单击抽牌、右击扇形菜单、洗牌 loading）
- `design/2026-08-19-02-实施计划.md` — 阶段验收；未勾完前一阶段不要进入下一阶段
- `design/2026-08-27-01-端到端测试场景.md` — 真实 `dsh web` 端到端场景
