window.__ModuleLoader__.load({
  id: 'dsh-lumina-tarot',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject,
  name: () => name
});
module.exports = __toCommonJS(index_exports);

// src/client/settings/Section.tsx
var import_react7 = require("react");
var import_dsh_client_ui_primitives4 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/defaults.ts
var DEFAULT_CONFIG = {
  theme: "mystic",
  followDshLocale: true,
  locale: "zh-CN",
  cardArtTheme: "minimal",
  cardBack: "classic",
  minorStyle: "symbol",
  animationLevel: "full",
  showFloatCard: true,
  floatX: 0.92,
  floatY: 0.82,
  panelOpacity: 0.8,
  defaultSpread: "three-card",
  reversedRate: 0.35,
  historyLimit: 100
};
var CARD_W = 48;
var CARD_H = Math.round(48 * (8.6 / 5));
var DRAG_THRESHOLD = 6;
var SPREAD_OPTIONS = [
  { id: "single", label: "\u5355\u5F20\u6307\u5F15" },
  { id: "three-card", label: "\u4E09\u724C\u65F6\u95F4\u7EBF" },
  { id: "cross", label: "\u5341\u5B57" },
  { id: "celtic-lite", label: "\u51EF\u5C14\u7279\u7CBE\u7B80" }
];
var ART_OPTIONS = [
  { id: "minimal", label: "\u6781\u7B80" },
  { id: "rws", label: "\u7ECF\u5178\u97E6\u7279" },
  { id: "aquatic", label: "\u6C34\u5F69\u91CD\u7ED8" }
];
var THEME_OPTIONS = [
  { id: "mystic", label: "\u795E\u79D8\u6697\u9ED1" },
  { id: "minimal", label: "\u73B0\u4EE3\u6781\u7B80" },
  { id: "nature", label: "\u7597\u6108\u81EA\u7136" }
];
var BACK_OPTIONS = [
  { id: "classic", label: "\u7ECF\u5178" },
  { id: "celestial", label: "\u661F\u56FE" },
  { id: "sacred", label: "\u795E\u5723\u51E0\u4F55" },
  { id: "floral", label: "\u751F\u547D\u4E4B\u82B1" },
  { id: "eye", label: "\u795E\u79D8\u4E4B\u773C" }
];
var ANIMATION_OPTIONS = [
  { id: "off", label: "\u5173\u95ED", desc: "\u65E0\u6D17\u724C\u52A8\u753B \xB7 \u9002\u5408\u4F4E\u7AEF\u673A" },
  { id: "lite", label: "\u8F7B\u91CF", desc: "\u7B80\u5316\u52A8\u753B \xB7 \u5E73\u8861" },
  { id: "full", label: "\u5B8C\u6574", desc: "\u6C89\u6D78\u6D17\u724C \xB7 \u5B8C\u6574\u4F53\u9A8C" }
];
var MINOR_OPTIONS = [
  { id: "symbol", label: "\u7B26\u53F7\u7CFB", desc: "\u6756 \xB7 \u676F \xB7 \u5251 \xB7 \u4E94\u8292\u94B1" },
  { id: "geometric", label: "\u51E0\u4F55\u7CFB", desc: "\u7EBF \xB7 \u73AF \xB7 \u4E09\u89D2 \xB7 \u83F1\u5F62" }
];
function radiusFor(theme) {
  if (theme === "mystic") return 2;
  if (theme === "nature") return 8;
  return 5;
}
function minShuffleMs(level) {
  if (level === "full") return 1800;
  if (level === "lite") return 700;
  return 120;
}
function effectiveCardBack(config) {
  if (config.cardArtTheme === "minimal") return config.cardBack;
  return "classic";
}
function mergeConfig(value) {
  return { ...DEFAULT_CONFIG, ...value ?? {} };
}

// src/client/decks/url.ts
var DECK_PUBLIC_PREFIX = "/lumina-tarot/decks";
function deckImageUrl(theme, id) {
  return `${DECK_PUBLIC_PREFIX}/${theme}/${id}.webp`;
}

// src/client/card-back.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Classic() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 6, y: 6, width: 88, height: 148, rx: 4, fill: "none", stroke: "currentColor", strokeWidth: 0.5, opacity: 0.4 }, "r"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 32, fill: "none", stroke: "currentColor", strokeWidth: 0.7, opacity: 0.5 }, "c1"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 22, fill: "none", stroke: "currentColor", strokeWidth: 0.5, opacity: 0.7 }, "c2"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M50 60 L52 78 L70 80 L52 82 L50 100 L48 82 L30 80 L48 78 Z", fill: "currentColor", opacity: 0.95 }, "star"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 2, fill: "hsl(var(--lumina-card))" }, "dot")
  ] });
}
function Celestial() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { x: 6, y: 6, width: 88, height: 148, rx: 4, fill: "none", stroke: "currentColor", strokeWidth: 0.4, opacity: 0.3 }, "r"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { opacity: 0.85, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 20, y1: 40, x2: 32, y2: 48, stroke: "currentColor", strokeWidth: 0.4, opacity: 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 32, y1: 48, x2: 44, y2: 58, stroke: "currentColor", strokeWidth: 0.4, opacity: 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 44, y1: 58, x2: 56, y2: 62, stroke: "currentColor", strokeWidth: 0.4, opacity: 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 56, y1: 62, x2: 68, y2: 58, stroke: "currentColor", strokeWidth: 0.4, opacity: 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 68, y1: 58, x2: 78, y2: 50, stroke: "currentColor", strokeWidth: 0.4, opacity: 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", { x1: 78, y1: 50, x2: 86, y2: 40, stroke: "currentColor", strokeWidth: 0.4, opacity: 0.5 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 20, cy: 40, r: 1.6, fill: "currentColor" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 32, cy: 48, r: 1.3, fill: "currentColor" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 44, cy: 58, r: 1.4, fill: "currentColor" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 56, cy: 62, r: 1.5, fill: "currentColor" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 68, cy: 58, r: 1.3, fill: "currentColor" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 78, cy: 50, r: 1.4, fill: "currentColor" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 86, cy: 40, r: 1.7, fill: "currentColor" })
    ] }, "const"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M50 90 A20 20 0 1 0 50 130 A14 20 0 1 1 50 90 Z", fill: "currentColor", opacity: 0.85 }, "moon")
  ] });
}
function Sacred() {
  const dots = Array.from({ length: 12 }, (_, i) => {
    const a = i * Math.PI * 2 / 12 - Math.PI / 2;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "circle",
      {
        cx: 50 + 38 * Math.cos(a),
        cy: 80 + 38 * Math.sin(a),
        r: 1.2,
        fill: "currentColor"
      },
      `z-${i}`
    );
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 38, fill: "none", stroke: "currentColor", strokeWidth: 0.5, opacity: 0.4 }, "o1"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { opacity: 0.7, children: dots }, "z"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 26, fill: "none", stroke: "currentColor", strokeWidth: 0.4, opacity: 0.5 }, "o2"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "50,55 72,90 28,90", fill: "none", stroke: "currentColor", strokeWidth: 0.7, opacity: 0.9 }, "p1"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "50,105 28,70 72,70", fill: "none", stroke: "currentColor", strokeWidth: 0.7, opacity: 0.9 }, "p2"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 2, fill: "currentColor" }, "dot")
  ] });
}
function Floral() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { opacity: 0.75, stroke: "currentColor", strokeWidth: 0.55, fill: "none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 66, r: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 94, r: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 62.12, cy: 73, r: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 62.12, cy: 87, r: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 37.88, cy: 73, r: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 37.88, cy: 87, r: 14 })
    ] }, "flower"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 34, fill: "none", stroke: "currentColor", strokeWidth: 0.4, opacity: 0.4 }, "ring"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 1.5, fill: "currentColor", opacity: 0.95 }, "dot")
  ] });
}
function Eye() {
  const rays = Array.from({ length: 12 }, (_, i) => {
    const a = i * Math.PI * 2 / 12 - Math.PI / 2;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "line",
      {
        x1: 50 + 26 * Math.cos(a),
        y1: 80 + 26 * Math.sin(a),
        x2: 50 + 32 * Math.cos(a),
        y2: 80 + 32 * Math.sin(a)
      },
      `r-${i}`
    );
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 34, fill: "none", stroke: "currentColor", strokeWidth: 0.5, opacity: 0.4 }, "o1"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 22, fill: "none", stroke: "currentColor", strokeWidth: 0.55, opacity: 0.5 }, "o2"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { opacity: 0.5, stroke: "currentColor", strokeWidth: 0.4, children: rays }, "rays"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M30 80 Q50 60 70 80 Q50 100 30 80 Z", fill: "none", stroke: "currentColor", strokeWidth: 0.7, opacity: 0.95 }, "eye"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 6.5, fill: "currentColor", opacity: 0.85 }, "iris"),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: 50, cy: 80, r: 2.4, fill: "hsl(var(--lumina-card))" }, "pupil")
  ] });
}
function pattern(variant) {
  if (variant === "celestial") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Celestial, {});
  if (variant === "sacred") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sacred, {});
  if (variant === "floral") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Floral, {});
  if (variant === "eye") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {});
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Classic, {});
}
function CardBackSvg(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { viewBox: "0 0 100 160", preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true", children: pattern(props.variant) });
}
function CardBack(props) {
  if (props.art === "rws" || props.art === "aquatic") {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: deckImageUrl(props.art, "_back"), alt: "", draggable: false });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBackSvg, { variant: props.variant });
}

// src/client/i18n.ts
var ZH = {
  pageTitle: "Lumina \u5854\u7F57",
  pageVersion: "v0.1.0",
  pageSub: "\u60AC\u6D6E\u724C\u80CC\u62BD\u724C\u63D2\u4EF6\u3002\u5355\u51FB\u5199\u4E0B\u95EE\u9898\uFF0C\u53F3\u51FB\u9009\u62E9\u724C\u7EC4\u3002",
  readonly: "\u5F53\u524D\u65E0\u6CD5\u4FDD\u5B58\u8BBE\u7F6E\u3002",
  theme: "\u4E3B\u9898",
  themeDesc: "\u9009\u62E9\u4E00\u4E2A\u6700\u7B26\u5408\u4F60\u5F53\u4E0B\u5FC3\u5883\u7684\u6C1B\u56F4\u3002",
  theme_mystic: "\u795E\u79D8\u6697\u9ED1",
  theme_minimal: "\u73B0\u4EE3\u6781\u7B80",
  theme_nature: "\u7597\u6108\u81EA\u7136",
  language: "\u8BED\u8A00",
  languageDesc: "\u5207\u6362\u754C\u9762\u8BED\u8A00\u4E0E\u5361\u724C\u6587\u6848\u3002\u5360\u535C\u7ED3\u679C\u4F1A\u6309\u5F53\u524D\u8BED\u8A00\u663E\u793A\u3002",
  langFollow: "\u8DDF\u968F",
  langZh: "\u4E2D\u6587",
  langEn: "\u82F1\u8BED",
  cardArt: "\u5361\u9762\u4E3B\u9898",
  cardArtDesc: "\u5207\u6362\u724C\u6B63\u9762\u7684\u89C6\u89C9\u98CE\u683C\u3002",
  art_minimal: "\u6781\u7B80",
  art_rws: "\u7ECF\u5178\u97E6\u7279",
  art_aquatic: "\u6C34\u5F69\u91CD\u7ED8",
  artUnavailable: "\u6682\u4E0D\u53EF\u7528",
  artAquaticFallback: "\u6C34\u5F69\u724C\u7EC4\u6682\u4E0D\u53EF\u7528\uFF0C\u5DF2\u56DE\u9000\u6781\u7B80\u3002",
  artAquaticWarning: "Aquatic Tarot \u7531 Andreas Schr\xF6ter \u521B\u4F5C\uFF0C\u6388\u6743\u4E3A CC BY-NC-SA 3.0\uFF0C\u4EC5\u9650\u4E2A\u4EBA\u975E\u5546\u4E1A\u7528\u9014\u3002\u5546\u4E1A\u4F7F\u7528\u8BF7\u6539\u7528\u6781\u7B80\u6216\u7ECF\u5178\u97E6\u7279\u3002",
  cardBack: "\u724C\u80CC\u56FE\u6848",
  cardBackDesc: "\u672A\u7FFB\u5F00\u7684\u724C\u90FD\u4F1A\u4F7F\u7528\u6B64\u56FE\u6848\u3002",
  back_classic: "\u7ECF\u5178",
  back_celestial: "\u661F\u56FE",
  back_sacred: "\u795E\u5723\u51E0\u4F55",
  back_floral: "\u751F\u547D\u4E4B\u82B1",
  back_eye: "\u795E\u79D8\u4E4B\u773C",
  minor: "\u5C0F\u963F\u5361\u90A3\u63D2\u753B\u98CE\u683C",
  minorDesc: "\u5F71\u54CD\u5C0F\u963F\u5361\u90A3\u6B63\u9762\u7684\u4E2D\u592E\u63D2\u56FE\u3002\u5927\u963F\u5361\u90A3\u4E0D\u53D7\u5F71\u54CD\u3002",
  minor_symbol: "\u7B26\u53F7\u7CFB",
  minor_symbolDesc: "\u6756 \xB7 \u676F \xB7 \u5251 \xB7 \u4E94\u8292\u94B1",
  minor_geometric: "\u51E0\u4F55\u7CFB",
  minor_geometricDesc: "\u7EBF \xB7 \u73AF \xB7 \u4E09\u89D2 \xB7 \u83F1\u5F62",
  animation: "\u52A8\u753B\u5F3A\u5EA6",
  animationDesc: "\u63A7\u5236\u6D17\u724C\u4E0E\u7FFB\u724C\u3002\u4F4E\u6027\u80FD\u8BBE\u5907\u6216\u6655\u52A8\u75C7\u7528\u6237\u5EFA\u8BAE\u9009\u62E9\u300C\u5173\u95ED\u300D\u3002",
  anim_off: "\u5173\u95ED",
  anim_offDesc: "\u65E0\u6D17\u724C\u52A8\u753B \xB7 \u9002\u5408\u4F4E\u7AEF\u673A",
  anim_lite: "\u8F7B\u91CF",
  anim_liteDesc: "\u7B80\u5316\u52A8\u753B \xB7 \u5E73\u8861",
  anim_full: "\u5B8C\u6574",
  anim_fullDesc: "\u6C89\u6D78\u6D17\u724C \xB7 \u5B8C\u6574\u4F53\u9A8C",
  drawDefaults: "\u62BD\u724C\u9ED8\u8BA4",
  drawDefaultsDesc: "\u5355\u51FB\u60AC\u6D6E\u724C\u65F6\u4F7F\u7528\u8FD9\u4E9B\u9ED8\u8BA4\u503C\u3002",
  defaultSpread: "\u9ED8\u8BA4\u724C\u9635",
  floatSection: "\u60AC\u6D6E\u724C",
  floatCard: "\u663E\u793A\u5361\u724C",
  floatCardDesc: "\u5173\u95ED\u540E\u5C4F\u5E55\u4E0A\u4E0D\u518D\u51FA\u73B0\u5854\u7F57\u724C\u80CC\uFF0C\u4ECD\u53EF\u7528\u547D\u4EE4\u62BD\u724C\u3002",
  floatOn: "\u663E\u793A",
  floatOff: "\u4E0D\u663E\u793A",
  reversedRate: "\u9006\u4F4D\u7387",
  reversedRateDesc: "\u6BCF\u5F20\u724C\u62BD\u6210\u9006\u4F4D\uFF08\u5012\u7F6E\uFF09\u7684\u6982\u7387\u30020% \u59CB\u7EC8\u6B63\u4F4D\uFF0C100% \u59CB\u7EC8\u9006\u4F4D\u3002",
  panelOpacity: "\u9762\u677F\u900F\u660E\u5EA6",
  resetFloat: "\u91CD\u7F6E\u60AC\u6D6E\u724C\u4F4D\u7F6E",
  resetAction: "\u91CD\u7F6E",
  about: "\u5173\u4E8E",
  aboutLine1: "Lumina Tarot \u662F\u4E00\u5EA7\u5B89\u9759\u724C\u684C\u3002",
  aboutLine2: "\u613F\u6BCF\u4E00\u6B21\u62BD\u724C\uFF0C\u90FD\u6210\u4E3A\u4E0E\u81EA\u5DF1\u76F8\u5904\u7684\u5C0F\u5C0F\u4EEA\u5F0F\u3002",
  spread_single: "\u5355\u5F20\u6307\u5F15",
  spread_three_card: "\u4E09\u724C\u65F6\u95F4\u7EBF",
  spread_cross: "\u5341\u5B57",
  spread_celtic_lite: "\u51EF\u5C14\u7279\u7CBE\u7B80",
  menuTitle: "\u724C\u7EC4\u9009\u62E9\u8BBE\u7F6E",
  menuSpread: "\u724C\u9635",
  menuDrawNow: "\u7528\u6B64\u9635\u7ACB\u5373\u62BD",
  menuArt: "\u724C\u7EC4\uFF08\u5361\u9762\u4E3B\u9898\uFF09",
  today: "\u4ECA\u65E5\u4E00\u724C",
  openLast: "\u4E0A\u6B21\u7ED3\u679C",
  viewHistory: "\u67E5\u770B\u5386\u53F2",
  historyTitle: "\u5360\u535C\u5386\u53F2",
  historyEmpty: "\u8FD8\u6CA1\u6709\u5360\u535C\u8BB0\u5F55\u3002",
  historyEmptyTitle: "\u8FD8\u6CA1\u6709\u4EFB\u4F55\u8BB0\u5F55\uFF0C\u62BD\u4E00\u6B21\u724C\u5C31\u4F1A\u843D\u5728\u8FD9\u91CC\u3002",
  historyKeepHint: "\u6700\u591A\u4FDD\u7559 100 \u6761\uFF0C\u4EC5\u5B58\u5728\u4E8E\u4F60\u7684\u8BBE\u5907\u3002",
  historyUnnamed: "\u672A\u547D\u540D\u5360\u535C",
  historyLoading: "\u6B63\u5728\u8BFB\u53D6\u5386\u53F2\u2026",
  historyCount: "\u5171 {n} \u6761",
  historyCountMonthly: "\u5171 {n} \u6761 \xB7 \u672C\u6708 {m} \u6761",
  historyNeedSession: "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u540E\u518D\u67E5\u770B\u5386\u53F2\u3002",
  historyPeriodToday: "\u4ECA\u5929",
  historyPeriodYesterday: "\u6628\u5929",
  historyPeriodThisWeek: "\u672C\u5468",
  historySummarySingle: "\u62BD\u5230 {name} {status} \u2014 {brief}",
  historySummaryMany: "{count} \u5F20\u724C \u2014 {names}{more}",
  historySummaryMore: "\u2026\u7B49 {count} \u5F20",
  historyRevBadge: "\u9006",
  resetPos: "\u91CD\u7F6E\u4F4D\u7F6E",
  menuHint: "\u5B8C\u6574\u504F\u597D\u5728 DSH \u8BBE\u7F6E \u2192 Lumina \u5854\u7F57\u3002",
  close: "\u5173\u95ED",
  drawing: "\u62BD\u724C\u4E2D\u2026",
  shuffling: "\u6D17\u724C\u4E2D\u2026",
  retry: "\u91CD\u8BD5",
  upright: "\u6B63\u4F4D",
  reversed: "\u9006\u4F4D",
  reversedShort: "\uFF08\u9006\uFF09",
  interpret: "\u8BA9 AI \u89E3\u8BFB",
  interpretSent: "\u5DF2\u628A\u724C\u9762\u4EA4\u7ED9\u5F53\u524D\u4F1A\u8BDD\u3002",
  interpretNeedSession: "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u518D\u89E3\u8BFB",
  love: "\u60C5\u611F",
  career: "\u4E8B\u4E1A",
  advice: "\u5EFA\u8BAE",
  moreFields: "\u60C5\u611F / \u4E8B\u4E1A / \u5EFA\u8BAE",
  shuffleAgain: "\u518D\u6D17\u4E00\u6B21",
  floatTitle: "Lumina \u5854\u7F57 \xB7 \u5355\u51FB\u5199\u4E0B\u95EE\u9898 \xB7 \u53F3\u51FB\u9009\u62E9\u724C\u9635",
  askTitle: "\u5199\u4E0B\u4F60\u7684\u95EE\u9898",
  askSub: "\u4E00\u4E2A\u5177\u4F53\u3001\u53EF\u56DE\u7B54\u7684\u95EE\u9898\uFF0C\u4F1A\u8BA9\u724C\u9762\u66F4\u805A\u7126\u3002",
  askPlaceholder: "\u4F8B\u5982\uFF1A\u8FD9\u6BB5\u5173\u7CFB\u4E2D\u6211\u771F\u6B63\u5728\u610F\u7684\u662F\u4EC0\u4E48\uFF1F / \u4E0B\u4E00\u6B65\u5DE5\u4F5C\u9009\u62E9\u8BE5\u8003\u8651\u54EA\u4E9B\u56E0\u7D20\uFF1F",
  askLabel: "\u4F60\u7684\u95EE\u9898",
  askHint: "\u6700\u591A 280 \u5B57\u3002",
  askNext: "\u53BB\u6D17\u724C",
  askSpread: "\u5F53\u524D\u724C\u9635\uFF1A",
  data: "\u6570\u636E",
  dataDesc: "\u6240\u6709\u5386\u53F2\u4FDD\u5B58\u5728\u672C\u673A\uFF0C\u6700\u591A\u4FDD\u7559 100 \u6761\uFF0C\u4E0D\u4F1A\u79BB\u5F00\u4F60\u7684\u8BBE\u5907\u3002\u4F60\u53EF\u4EE5\u5BFC\u51FA\u4E3A JSON \u4F5C\u4E3A\u5907\u4EFD\u3002",
  exportJSON: "\u5BFC\u51FA JSON",
  clearAll: "\u6E05\u7A7A\u5168\u90E8\u5386\u53F2",
  clearConfirm: "\u5C06\u6E05\u7A7A\u6240\u6709\u5360\u535C\u5386\u53F2\u4E0E\u5F53\u524D\u8FDB\u884C\u4E2D\u7684\u5360\u535C\uFF0C\u786E\u5B9A\u5417\uFF1F",
  dataNeedSession: "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u540E\u518D\u5BFC\u51FA\u6216\u6E05\u7A7A\u3002",
  exportDone: "\u5DF2\u5BFC\u51FA\u5386\u53F2\u3002"
};
var EN = {
  pageTitle: "Lumina Tarot",
  pageVersion: "v0.1.0",
  pageSub: "A floating card-back plugin. Click to write a question, right-click to choose a deck.",
  readonly: "Settings cannot be saved right now.",
  theme: "Theme",
  themeDesc: "Pick the atmosphere that best matches your current mood.",
  theme_mystic: "Mystic Dark",
  theme_minimal: "Modern Minimal",
  theme_nature: "Healing Nature",
  language: "Language",
  languageDesc: "Switch the interface language and card text. Readings display in the chosen language.",
  langFollow: "Follow",
  langZh: "Chinese",
  langEn: "English",
  cardArt: "Card art",
  cardArtDesc: "Switch the visual style of the card faces.",
  art_minimal: "Minimal",
  art_rws: "Classic Waite",
  art_aquatic: "Watercolour",
  artUnavailable: "Unavailable",
  artAquaticFallback: "Watercolour deck is unavailable. Reverted to Minimal.",
  artAquaticWarning: "Aquatic Tarot is by Andreas Schr\xF6ter, licensed CC BY-NC-SA 3.0 \u2014 personal non-commercial use only. For commercial use, switch to Minimal or Classic Waite.",
  cardBack: "Card back",
  cardBackDesc: "Used for every face-down card.",
  back_classic: "Classic",
  back_celestial: "Celestial",
  back_sacred: "Sacred Geometry",
  back_floral: "Flower of Life",
  back_eye: "Mystic Eye",
  minor: "Minor Arcana art",
  minorDesc: "Affects Minor Arcana artwork. Major Arcana is unchanged.",
  minor_symbol: "Symbolic",
  minor_symbolDesc: "Wand \xB7 Cup \xB7 Sword \xB7 Pentacle",
  minor_geometric: "Geometric",
  minor_geometricDesc: "Lines \xB7 Rings \xB7 Triangles \xB7 Diamonds",
  animation: "Animation",
  animationDesc: "Controls shuffle and flip motion. Choose Off on low-end devices or if you are motion-sensitive.",
  anim_off: "Off",
  anim_offDesc: "No shuffle animation \xB7 best on low-end",
  anim_lite: "Lite",
  anim_liteDesc: "Simplified motion \xB7 balanced",
  anim_full: "Full",
  anim_fullDesc: "Immersive shuffle \xB7 full experience",
  drawDefaults: "Draw defaults",
  drawDefaultsDesc: "Used when you click the floating card.",
  defaultSpread: "Default spread",
  floatSection: "Floating card",
  floatCard: "Show card",
  floatCardDesc: "Turn off to hide the card back. Draws via commands still work.",
  floatOn: "Shown",
  floatOff: "Hidden",
  reversedRate: "Reversal rate",
  reversedRateDesc: "Chance each drawn card appears reversed. 0% always upright, 100% always reversed.",
  panelOpacity: "Panel opacity",
  resetFloat: "Reset floating card position",
  resetAction: "Reset",
  about: "About",
  aboutLine1: "Lumina Tarot is a quiet card table.",
  aboutLine2: "May every draw become a small ritual of being with yourself.",
  spread_single: "Single Card",
  spread_three_card: "Three-Card Timeline",
  spread_cross: "Cross",
  spread_celtic_lite: "Celtic Lite",
  menuTitle: "Deck settings",
  menuSpread: "Spread",
  menuDrawNow: "Draw with this spread",
  menuArt: "Deck (card art)",
  today: "Card of the day",
  openLast: "Last result",
  viewHistory: "View history",
  historyTitle: "Reading history",
  historyEmpty: "No readings yet.",
  historyEmptyTitle: "Nothing here yet \u2014 a draw will land in this list.",
  historyKeepHint: "Up to 100 entries, kept only on this device.",
  historyUnnamed: "Untitled reading",
  historyLoading: "Loading history\u2026",
  historyCount: "{n} readings",
  historyCountMonthly: "{n} readings \xB7 {m} this month",
  historyNeedSession: "Open a session before viewing history.",
  historyPeriodToday: "Today",
  historyPeriodYesterday: "Yesterday",
  historyPeriodThisWeek: "This week",
  historySummarySingle: "Drew {name} {status} \u2014 {brief}",
  historySummaryMany: "{count} cards \u2014 {names}{more}",
  historySummaryMore: "\u2026 +{count} more",
  historyRevBadge: "R",
  resetPos: "Reset position",
  menuHint: "Full preferences live in DSH Settings \u2192 Lumina Tarot.",
  close: "Close",
  drawing: "Drawing\u2026",
  shuffling: "Shuffling\u2026",
  retry: "Retry",
  upright: "Upright",
  reversed: "Reversed",
  reversedShort: " (rev.)",
  interpret: "Ask AI to interpret",
  interpretSent: "Sent the cards to this conversation.",
  interpretNeedSession: "Open a session before asking for an interpretation",
  love: "Love",
  career: "Career",
  advice: "Advice",
  moreFields: "Love / Career / Advice",
  shuffleAgain: "Shuffle again",
  floatTitle: "Lumina Tarot \xB7 click to write a question \xB7 right-click to choose a spread",
  askTitle: "Write your question",
  askSub: "A specific, answerable question makes the cards more focused.",
  askPlaceholder: "e.g. What truly matters to me in this relationship? / What should guide my next career move?",
  askLabel: "Your question",
  askHint: "Up to 280 characters.",
  askNext: "Go shuffle",
  askSpread: "Current spread:",
  data: "Data",
  dataDesc: "All history stays on this machine (up to 100 entries) and never leaves your device. You can export JSON as a backup.",
  exportJSON: "Export JSON",
  clearAll: "Clear all history",
  clearConfirm: "This will erase all readings and any in-progress reading. Continue?",
  dataNeedSession: "Open a session before exporting or clearing history.",
  exportDone: "History exported."
};
function dshToPluginLocale(active) {
  return active === "en" || active === "en-US" ? "en-US" : "zh-CN";
}
function resolveUiLocale(config, dshActive) {
  if (config.followDshLocale) return dshToPluginLocale(dshActive);
  return config.locale === "en-US" ? "en-US" : "zh-CN";
}
function t(locale, key) {
  if (locale === "en-US") return EN[key];
  return ZH[key];
}
function spreadLabel(locale, id) {
  if (id === "three-card") return t(locale, "spread_three_card");
  if (id === "celtic-lite") return t(locale, "spread_celtic_lite");
  if (id === "cross") return t(locale, "spread_cross");
  return t(locale, "spread_single");
}

// src/client/store.ts
var current = { ...DEFAULT_CONFIG };
var listeners = /* @__PURE__ */ new Set();
var writesInFlight = 0;
function emit() {
  for (const listener of listeners) listener();
}
function luminaConfig() {
  return current;
}
function watchLuminaConfig(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
function hydrateLuminaConfig(value) {
  current = mergeConfig(value);
  emit();
}
function patchLuminaConfig(partial) {
  current = { ...current, ...partial };
  emit();
}
function bindLuminaScope(scope) {
  if (!scope?.subscribe) return () => void 0;
  const sync = () => {
    if (writesInFlight > 0) return;
    const snap = scope.getSnapshot();
    if (snap?.value) hydrateLuminaConfig(snap.value);
  };
  sync();
  return scope.subscribe(sync);
}
async function persistLuminaField(scope, field, value) {
  return persistLuminaPatch(scope, { [field]: value });
}
async function persistLuminaPatch(scope, partial) {
  patchLuminaConfig(partial);
  writesInFlight += 1;
  try {
    for (const [field, value] of Object.entries(partial)) {
      try {
        await scope?.set?.(field, value);
      } catch (error) {
        console.warn("[lumina-tarot] settings write skipped", field, error);
      }
    }
  } finally {
    writesInFlight -= 1;
    if (writesInFlight === 0) {
      const snap = scope?.getSnapshot?.();
      hydrateLuminaConfig({ ...snap?.value, ...partial });
    }
  }
}
async function unsetLuminaField(scope, field) {
  try {
    await scope?.unset?.(String(field));
  } catch (error) {
    console.warn("[lumina-tarot] settings unset skipped", field, error);
  }
}

// src/client/decks/aquatic/fool.webp
var fool_default = "data:image/webp;base64,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";

// src/client/decks/rws/fool.webp
var fool_default2 = "data:image/webp;base64,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";

// src/client/settings/art-previews.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function MinimalPreview() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { viewBox: "0 0 68 117", "aria-hidden": "true", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { width: "68", height: "117", rx: "4", fill: "#1c2233" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "5", y: "5", width: "58", height: "107", rx: "3", fill: "none", stroke: "#c9a961", strokeWidth: "1", opacity: "0.55" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: "10", y: "18", fill: "#c9a961", fontSize: "8", fontFamily: "Georgia, serif", children: "0" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "34", cy: "52", r: "14", fill: "none", stroke: "#c9a961", strokeWidth: "1.2" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "34", cy: "52", r: "4", fill: "#c9a961" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M34 38 L36 50 L48 52 L36 54 L34 66 L32 54 L20 52 L32 50 Z", fill: "#e8d5a3" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: "34", y: "96", textAnchor: "middle", fill: "#e8d5a3", fontSize: "9", fontFamily: "Georgia, serif", children: "\u2600" })
  ] });
}
function ArtPreview(props) {
  if (props.id === "minimal") return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MinimalPreview, {});
  const src = props.id === "rws" ? fool_default2 : fool_default;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src, alt: "", decoding: "async" });
}

// src/client/settings/data.tsx
var import_react6 = require("react");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/history/HistoryDialog.tsx
var import_react5 = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/fx/ModalDust.tsx
var import_react = require("react");

// src/client/fx/dust.ts
var COLORS = ["#c9a961", "#e6cf95", "#f8e9c1"];
function dustCount(level) {
  return level === "full" ? 60 : 28;
}
function spawnDust(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.6 + Math.random() * 1.2,
    a: 0.25 + Math.random() * 0.5,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -(0.08 + Math.random() * 0.18),
    da: (Math.random() - 0.5) * 8e-3,
    color: COLORS[Math.floor(Math.random() * COLORS.length)]
  };
}
function stepDust(dot, width, height) {
  dot.x += dot.vx;
  dot.y += dot.vy;
  dot.a += dot.da;
  if (dot.a < 0.2 || dot.a > 0.75) dot.da *= -1;
  if (dot.y < -4) {
    dot.y = height + 4;
    dot.x = Math.random() * width;
  }
  if (dot.x < -4) dot.x = width + 4;
  if (dot.x > width + 4) dot.x = -4;
}

// src/client/fx/ModalDust.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function ModalDust(props) {
  const canvasRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (props.level === "off") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.closest(".dsh-lumina-ask-modal, .dsh-lumina-mask");
    const parent = host ?? canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dots = [];
    const count = dustCount(props.level === "lite" ? "lite" : "full");
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;
    const resize = () => {
      const nextW = Math.max(1, parent.clientWidth);
      const nextH = Math.max(1, parent.clientHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = nextW;
      height = nextH;
      canvas.width = Math.round(nextW * dpr);
      canvas.height = Math.round(nextH * dpr);
      canvas.style.width = `${nextW}px`;
      canvas.style.height = `${nextH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      while (dots.length < count) dots.push(spawnDust(width, height));
    };
    const tick = () => {
      if (!running) return;
      if (document.visibilityState !== "hidden") {
        ctx.clearRect(0, 0, width, height);
        for (const dot of dots) {
          stepDust(dot, width, height);
          ctx.beginPath();
          ctx.globalAlpha = dot.a;
          ctx.fillStyle = dot.color;
          ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      raf = window.requestAnimationFrame(tick);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(parent);
    raf = window.requestAnimationFrame(tick);
    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [props.level]);
  if (props.level === "off") return null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-lumina-fx", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("canvas", { ref: canvasRef }) });
}

// src/client/fx/scrim.ts
function scrimFill(opacity) {
  const clamped = Math.min(0.8, Math.max(0.2, opacity));
  return { background: `rgba(16, 18, 26, ${(0.38 + clamped * 0.5).toFixed(3)})` };
}

// src/client/overlay/commands.ts
var LUMINA_HISTORY_CLEARED = "dsh-lumina-history-cleared";
function isHistoryItem(value) {
  if (!value || typeof value !== "object") return false;
  const rec = value;
  return typeof rec.id === "string" && typeof rec.createdAt === "number" && typeof rec.spreadId === "string" && Array.isArray(rec.cards);
}
function parseHistory(text) {
  if (!text) return [];
  const data = JSON.parse(text);
  if (!Array.isArray(data)) throw new Error("\u5386\u53F2\u65E0\u6CD5\u89E3\u6790");
  return data.filter(isHistoryItem);
}
function parseReading(text) {
  if (!text) throw new Error("\u62BD\u724C\u7ED3\u679C\u4E3A\u7A7A");
  const data = JSON.parse(text);
  if (!data || !Array.isArray(data.cards)) throw new Error("\u62BD\u724C\u7ED3\u679C\u65E0\u6CD5\u89E3\u6790");
  return data;
}
function unwrapCommandResult(exec) {
  const remote = exec;
  if (remote && typeof remote === "object" && "ok" in remote) {
    if (!remote.ok) {
      throw new Error(remote.error?.message || remote.error?.code || "\u62BD\u724C\u547D\u4EE4\u5931\u8D25");
    }
    const result = remote.value?.result;
    if (!result) throw new Error("\u672A\u77E5\u547D\u4EE4\u6216 Host \u672A\u6CE8\u518C /lumina");
    return result;
  }
  return remote?.result ?? remote ?? {};
}

// src/client/history/format.ts
function cardName(card, locale) {
  return locale === "en-US" ? card.nameEn : card.name;
}
function positionLabel(card, locale) {
  if (locale === "en-US" && card.positionRole) return card.positionRole;
  return card.positionName;
}
function formatWhen(ts, locale) {
  return new Date(ts).toLocaleString(locale === "en-US" ? "en-US" : "zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function monthlyCount(items, now = Date.now()) {
  const date = new Date(now);
  const year = date.getFullYear();
  const month = date.getMonth();
  return items.filter((item) => {
    const created = new Date(item.createdAt);
    return created.getFullYear() === year && created.getMonth() === month;
  }).length;
}
function sameDay(left, right) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth() && left.getDate() === right.getDate();
}
function periodKey(ts, now = Date.now()) {
  const day = new Date(ts);
  const today = new Date(now);
  if (sameDay(day, today)) return "historyPeriodToday";
  if (sameDay(day, new Date(now - 864e5))) return "historyPeriodYesterday";
  if (now - ts < 7 * 864e5) return "historyPeriodThisWeek";
  return void 0;
}
function clip(text, max = 36) {
  const trimmed = text.trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max)}\u2026`;
}
function summarize(item, locale, tx) {
  const cards = item.cards;
  if (cards.length === 0) return "\u2014";
  if (cards.length === 1) {
    const only = cards[0];
    const brief = clip(only.summary || only.meaning || (only.keywords ?? []).slice(0, 3).join(" \xB7 ") || "");
    return tx("historySummarySingle").replace("{name}", cardName(only, locale)).replace("{status}", only.reversed ? tx("reversed") : tx("upright")).replace("{brief}", brief || tx("historyUnnamed"));
  }
  const shown = cards.slice(0, cards.length <= 3 ? cards.length : 4);
  const names = shown.map((card) => {
    const pos = positionLabel(card, locale);
    const mark = card.reversed ? `\xB7${tx("historyRevBadge")}` : "";
    return cards.length <= 3 ? `${pos}\uFF1A${cardName(card, locale)}${mark}` : cardName(card, locale);
  }).join(locale === "en-US" ? ", " : "\u3001");
  const extra = cards.length > shown.length ? tx("historySummaryMore").replace("{count}", String(cards.length)) : "";
  return tx("historySummaryMany").replace("{count}", String(cards.length)).replace("{names}", names).replace("{more}", extra);
}

// src/client/history/HistoryList.tsx
var import_react4 = require("react");

// src/client/history/HistoryItem.tsx
var import_react3 = require("react");

// src/client/face/CardArt.tsx
var import_react2 = require("react");

// src/client/face/layout.ts
var RANK_LABEL = {
  ace: "A",
  "2": "II",
  "3": "III",
  "4": "IV",
  "5": "V",
  "6": "VI",
  "7": "VII",
  "8": "VIII",
  "9": "IX",
  "10": "X",
  page: "P",
  knight: "Kn",
  queen: "Q",
  king: "K"
};
var COURT_RANKS = ["page", "knight", "queen", "king"];
var MINOR_LAYOUTS = {
  ace: [{ x: 50, y: 65, scale: 2.6 }],
  "2": [
    { x: 50, y: 32 },
    { x: 50, y: 98 }
  ],
  "3": [
    { x: 50, y: 28 },
    { x: 30, y: 92 },
    { x: 70, y: 92 }
  ],
  "4": [
    { x: 30, y: 32 },
    { x: 70, y: 32 },
    { x: 30, y: 98 },
    { x: 70, y: 98 }
  ],
  "5": [
    { x: 30, y: 30 },
    { x: 70, y: 30 },
    { x: 50, y: 65 },
    { x: 30, y: 100 },
    { x: 70, y: 100 }
  ],
  "6": [
    { x: 30, y: 28 },
    { x: 70, y: 28 },
    { x: 30, y: 65 },
    { x: 70, y: 65 },
    { x: 30, y: 102 },
    { x: 70, y: 102 }
  ],
  "7": [
    { x: 30, y: 26 },
    { x: 70, y: 26 },
    { x: 50, y: 50 },
    { x: 30, y: 78 },
    { x: 70, y: 78 },
    { x: 30, y: 108 },
    { x: 70, y: 108 }
  ],
  "8": [
    { x: 30, y: 24 },
    { x: 70, y: 24 },
    { x: 30, y: 54 },
    { x: 70, y: 54 },
    { x: 30, y: 84 },
    { x: 70, y: 84 },
    { x: 30, y: 114 },
    { x: 70, y: 114 }
  ],
  "9": [
    { x: 26, y: 28 },
    { x: 50, y: 28 },
    { x: 74, y: 28 },
    { x: 26, y: 65 },
    { x: 50, y: 65 },
    { x: 74, y: 65 },
    { x: 26, y: 102 },
    { x: 50, y: 102 },
    { x: 74, y: 102 }
  ],
  "10": [
    { x: 26, y: 22 },
    { x: 50, y: 22 },
    { x: 74, y: 22 },
    { x: 26, y: 50 },
    { x: 50, y: 50 },
    { x: 74, y: 50 },
    { x: 26, y: 80 },
    { x: 50, y: 80 },
    { x: 74, y: 80 },
    { x: 50, y: 108 }
  ],
  page: [{ x: 50, y: 80, scale: 2.4 }],
  knight: [{ x: 50, y: 80, scale: 2.4 }],
  queen: [{ x: 50, y: 80, scale: 2.4 }],
  king: [{ x: 50, y: 80, scale: 2.4 }]
};

// src/client/face/glyphs.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
function WandMark() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: -6, x2: 0, y2: 6, stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: -2.5, y1: -6, x2: 2.5, y2: -6, stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: -2.5, y1: 6, x2: 2.5, y2: 6, stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M-1.6 -6 Q-1 -8.5 0 -8.5 Q1 -8.5 1.6 -6 Q1.2 -7 0 -7 Q-1.2 -7 -1.6 -6 Z", fill: "currentColor", opacity: 0.85 })
  ] });
}
function CupMark() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M-3.6 -5.5 Q-3.6 1.5 0 4 Q3.6 1.5 3.6 -5.5 Z", fill: "none", stroke: "currentColor", strokeWidth: 1.1, strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M-3.6 -5.5 Q0 -4.2 3.6 -5.5", fill: "none", stroke: "currentColor", strokeWidth: 0.7, opacity: 0.55 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: 4, x2: 0, y2: 6.5, stroke: "currentColor", strokeWidth: 1.1, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("ellipse", { cx: 0, cy: 6.8, rx: 2.6, ry: 0.7, fill: "currentColor", opacity: 0.85 })
  ] });
}
function SwordMark() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M0 -8 L1.1 5 L-1.1 5 Z", fill: "currentColor", opacity: 0.9 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: -3.5, y1: 5, x2: 3.5, y2: 5, stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: 5, x2: 0, y2: 7.6, stroke: "currentColor", strokeWidth: 1.1, strokeLinecap: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 0, cy: 8.2, r: 0.9, fill: "currentColor" })
  ] });
}
function PentacleMark() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 0, cy: 0, r: 4.2, fill: "none", stroke: "currentColor", strokeWidth: 1.1 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M0 -3.4 L1 -1.05 L3.4 -1.05 L1.4 0.4 L2.1 2.75 L0 1.3 L-2.1 2.75 L-1.4 0.4 L-3.4 -1.05 L-1 -1.05 Z", fill: "currentColor", opacity: 0.9 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 0, cy: 0, r: 0.55, fill: "currentColor", opacity: 0.6 })
  ] });
}
function GeoWand() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: -0.9, y: -6.5, width: 1.8, height: 13, rx: 0.5, fill: "currentColor", opacity: 0.9 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 0, cy: -7.6, r: 0.95, fill: "currentColor", opacity: 0.95 })
  ] });
}
function GeoCup() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 0, cy: 0, r: 4.2, fill: "none", stroke: "currentColor", strokeWidth: 1.2 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 0, cy: 0, r: 2.1, fill: "currentColor", opacity: 0.55 })
  ] });
}
function GeoSword() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M0 -5.5 L4.5 4.2 L-4.5 4.2 Z", fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinejoin: "round" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 0, y1: -3.8, x2: 0, y2: 3.4, stroke: "currentColor", strokeWidth: 0.7, opacity: 0.6 })
  ] });
}
function GeoPentacle() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: -3.6, y: -3.6, width: 7.2, height: 7.2, rx: 0.6, transform: "rotate(45)", fill: "none", stroke: "currentColor", strokeWidth: 1.2 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: -1.6, y: -1.6, width: 3.2, height: 3.2, transform: "rotate(45)", fill: "currentColor", opacity: 0.85 })
  ] });
}
function SuitGlyph(props) {
  if (props.style === "geometric") {
    if (props.suit === "wands") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GeoWand, {});
    if (props.suit === "cups") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GeoCup, {});
    if (props.suit === "swords") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GeoSword, {});
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(GeoPentacle, {});
  }
  if (props.suit === "wands") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(WandMark, {});
  if (props.suit === "cups") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CupMark, {});
  if (props.suit === "swords") return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SwordMark, {});
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PentacleMark, {});
}
function CourtMark(props) {
  if (props.rank === "page") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M46 22 L50 14 L54 22 Z", fill: "currentColor", opacity: 0.85 }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 50, cy: 14, r: 1, fill: "currentColor", opacity: 0.9 })
    ] });
  }
  if (props.rank === "knight") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M40 22 L50 12 L60 22", fill: "none", stroke: "currentColor", strokeWidth: 1.2, opacity: 0.85 }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: 58, y1: 14, x2: 68, y2: 8, stroke: "currentColor", strokeWidth: 0.8, opacity: 0.7 })
    ] });
  }
  if (props.rank === "queen") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M40 22 Q50 8 60 22", fill: "none", stroke: "currentColor", strokeWidth: 1.2, opacity: 0.85 }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 50, cy: 14, r: 2, fill: "none", stroke: "currentColor", strokeWidth: 0.7, opacity: 0.8 }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 50, cy: 14, r: 0.7, fill: "currentColor" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M38 24 L40 14 L46 22 L50 10 L54 22 L60 14 L62 24 Z", fill: "none", stroke: "currentColor", strokeWidth: 1.1, opacity: 0.9 }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 40, cy: 14, r: 0.8, fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 50, cy: 10, r: 1, fill: "currentColor" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: 60, cy: 14, r: 0.8, fill: "currentColor" })
  ] });
}

// src/client/face/MinorArt.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
function MinorArt(props) {
  const slots = MINOR_LAYOUTS[props.rank] ?? MINOR_LAYOUTS.ace;
  const court = COURT_RANKS.includes(props.rank);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("svg", { viewBox: "0 0 100 130", preserveAspectRatio: "xMidYMid meet", "aria-hidden": "true", children: [
    court ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("g", { className: "court-frame", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("path", { d: "M22 32 Q50 14 78 32", fill: "none", stroke: "currentColor", strokeWidth: 0.6, opacity: 0.55 }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(CourtMark, { rank: props.rank })
    ] }) : null,
    slots.map((slot, index) => /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "g",
      {
        transform: `translate(${slot.x}, ${slot.y}) scale(${slot.scale ?? 1})`,
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(SuitGlyph, { suit: props.suit, style: props.style })
      },
      `${props.suit}-${props.rank}-${index}`
    ))
  ] });
}

// src/client/face/CardArt.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
function cornerLabel(arcana, number, rank) {
  if (arcana === "minor" && rank) return RANK_LABEL[rank];
  if (typeof number === "number") return String(number).padStart(2, "0");
  return "";
}
function FacePhoto(props) {
  const [failed, setFailed] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    setFailed(false);
  }, [props.theme, props.cardId]);
  if (failed) return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(import_jsx_runtime6.Fragment, { children: props.fallback });
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "img",
    {
      className: props.theme === "rws" ? "is-rws" : void 0,
      src: deckImageUrl(props.theme, props.cardId),
      alt: "",
      decoding: "async",
      onError: () => setFailed(true)
    }
  );
}
function CardArt(props) {
  const cls = props.reversed ? "art is-reversed" : "art";
  const fallback = props.arcana === "minor" && props.suit && props.rank ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(MinorArt, { suit: props.suit, rank: props.rank, style: props.minorStyle }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "sym", children: props.symbol });
  const photo = props.cardId && (props.artTheme === "rws" || props.artTheme === "aquatic") ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(FacePhoto, { theme: props.artTheme, cardId: props.cardId, fallback }) : fallback;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cls, children: photo });
}

// src/domain/cards.json
var cards_default = [
  {
    id: "fool",
    number: 0,
    name: "\u611A\u8005",
    nameEn: "The Fool",
    arcana: "major",
    keywords: [
      "\u65B0\u5F00\u59CB",
      "\u81EA\u7531",
      "\u5192\u9669",
      "\u76F4\u89C9"
    ],
    element: "\u98CE",
    planet: "\u5929\u738B\u661F",
    symbol: "\u2600",
    summary: "\u8E0F\u5165\u672A\u77E5\u7684\u7B2C\u4E00\u6B65\uFF0C\u50CF\u5B69\u7AE5\u4E00\u6837\u65E0\u6240\u754F\u60E7\uFF0C\u76F8\u4FE1\u76F4\u89C9\u5E26\u4F60\u7A7F\u8D8A\u8FF7\u96FE\u3002",
    upright: {
      meaning: "\u5F00\u59CB\u65B0\u7684\u65C5\u7A0B\uFF0C\u653E\u4E0B\u5BF9\u7ED3\u679C\u7684\u6267\u5FF5\uFF0C\u8BA9\u597D\u5947\u5FC3\u5F15\u9886\u4F60\u3002",
      love: "\u4E00\u6BB5\u8F7B\u76C8\u81EA\u7531\u7684\u611F\u60C5\u6B63\u5728\u5F00\u59CB\uFF0C\u4E0D\u8981\u88AB\u8FC7\u53BB\u6846\u4F4F\u3002",
      career: "\u9002\u5408\u5C1D\u8BD5\u65B0\u8D5B\u9053\u3001\u63A5\u53D7\u610F\u6599\u4E4B\u5916\u7684\u673A\u4F1A\u3002",
      advice: "\u8DF3\u8FDB\u53BB\uFF0C\u4E00\u5207\u6700\u7EC8\u4F1A\u957F\u51FA\u610F\u4E49\u3002"
    },
    reversed: {
      meaning: "\u9C81\u83BD\u3001\u51B2\u52A8\uFF0C\u6216\u56E0\u6050\u60E7\u505C\u7559\u5728\u539F\u5730\u3002",
      love: "\u5BB3\u6015\u6295\u5165\uFF0C\u6216\u5BF9\u5173\u7CFB\u8FC7\u5EA6\u7406\u60F3\u5316\u3002",
      career: "\u51B3\u7B56\u8349\u7387\u6216\u62D2\u7EDD\u6210\u957F\u3002",
      advice: "\u5148\u843D\u5730\uFF0C\u518D\u8FFD\u5149\u3002"
    }
  },
  {
    id: "magician",
    number: 1,
    name: "\u9B54\u672F\u5E08",
    nameEn: "The Magician",
    arcana: "major",
    keywords: [
      "\u610F\u5FD7",
      "\u521B\u9020",
      "\u6574\u5408",
      "\u884C\u52A8"
    ],
    element: "\u98CE",
    planet: "\u6C34\u661F",
    symbol: "\u221E",
    summary: "\u624B\u63E1\u5929\u5730\u4E4B\u95F4\u7684\u6240\u6709\u5143\u7D20\uFF0C\u4F60\u5DF2\u62E5\u6709\u8BA9\u4E8B\u60C5\u53D1\u751F\u7684\u5168\u90E8\u6750\u6599\u3002",
    upright: {
      meaning: "\u8D44\u6E90\u9F50\u5907\uFF0C\u4E13\u6CE8\u610F\u5FD7\u5373\u53EF\u663E\u5316\u3002",
      love: "\u4E3B\u52A8\u8868\u8FBE\uFF0C\u5438\u5F15\u529B\u6B63\u5728\u9876\u5CF0\u3002",
      career: "\u9002\u5408\u542F\u52A8\u9879\u76EE\u3001\u8C08\u5224\u4E0E\u63A8\u8FDB\u3002",
      advice: "\u60F3\u6E05\u695A\uFF0C\u518D\u52A8\u624B\u3002"
    },
    reversed: {
      meaning: "\u624D\u534E\u88AB\u8BEF\u7528\uFF0C\u6216\u9677\u5165\u81EA\u6211\u6000\u7591\u3002",
      love: "\u8A00\u884C\u4E0D\u4E00\uFF0C\u6216\u73A9\u5F04\u4ED6\u4EBA\u611F\u60C5\u3002",
      career: "\u52A8\u529B\u5206\u6563\u3001\u6267\u884C\u8131\u8282\u3002",
      advice: "\u56DE\u5230\u76EE\u6807\u672C\u8EAB\uFF0C\u51CF\u5C11\u8868\u6F14\u3002"
    }
  },
  {
    id: "high-priestess",
    number: 2,
    name: "\u5973\u796D\u53F8",
    nameEn: "The High Priestess",
    arcana: "major",
    keywords: [
      "\u76F4\u89C9",
      "\u6F5C\u610F\u8BC6",
      "\u9759\u9ED8",
      "\u795E\u79D8"
    ],
    element: "\u6C34",
    planet: "\u6708\u4EAE",
    symbol: "\u263E",
    summary: "\u5728\u5B89\u9759\u4E2D\u542C\u89C1\u5185\u5728\u7684\u58F0\u97F3\uFF0C\u771F\u76F8\u85CF\u5728\u8868\u8C61\u7684\u5E37\u5E55\u4E4B\u540E\u3002",
    upright: {
      meaning: "\u4FE1\u4EFB\u76F4\u89C9\uFF0C\u7B54\u6848\u6B63\u5728\u6C34\u9762\u4E0B\u915D\u917F\u3002",
      love: "\u6DF1\u5C42\u8FDE\u7ED3\u6B63\u5728\u751F\u957F\uFF0C\u4E0D\u6025\u4E8E\u8A00\u8BED\u3002",
      career: "\u9002\u5408\u7814\u7A76\u3001\u6784\u601D\u3001\u6574\u7406\u5185\u5728\u79E9\u5E8F\u3002",
      advice: "\u542C\uFF0C\u6BD4\u8BF4\u66F4\u91CD\u8981\u3002"
    },
    reversed: {
      meaning: "\u538B\u6291\u60C5\u611F\uFF0C\u6216\u88AB\u8868\u8C61\u8FF7\u60D1\u3002",
      love: "\u56DE\u907F\u771F\u5B9E\u611F\u53D7\uFF0C\u6216\u88AB\u79D8\u5BC6\u56F0\u4F4F\u3002",
      career: "\u5FFD\u89C6\u76F4\u89C9\uFF0C\u505A\u51FA\u9519\u8BEF\u63A8\u65AD\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u77E5\u9053\u4F60\u6240\u77E5\u9053\u7684\u3002"
    }
  },
  {
    id: "empress",
    number: 3,
    name: "\u7687\u540E",
    nameEn: "The Empress",
    arcana: "major",
    keywords: [
      "\u4E30\u76DB",
      "\u6ECB\u517B",
      "\u611F\u6027",
      "\u5B55\u80B2"
    ],
    element: "\u5730",
    planet: "\u91D1\u661F",
    symbol: "\u2640",
    summary: "\u81EA\u7136\u7684\u6BCD\u4EB2\uFF0C\u8BA9\u4E07\u7269\u5728\u6E29\u67D4\u7684\u8282\u594F\u91CC\u751F\u957F\u3001\u76DB\u653E\u3002",
    upright: {
      meaning: "\u4E30\u9976\u3001\u521B\u9020\u529B\u3001\u88AB\u7231\u73AF\u7ED5\u7684\u9636\u6BB5\u3002",
      love: "\u5173\u7CFB\u7A33\u5B9A\u4E14\u5145\u6EE1\u4EB2\u5BC6\u611F\u3002",
      career: "\u521B\u610F\u578B\u5DE5\u4F5C\u8FCE\u6765\u4E30\u6536\u3002",
      advice: "\u5BF9\u81EA\u5DF1\u548C\u4ED6\u4EBA\u90FD\u6E29\u67D4\u4E00\u70B9\u3002"
    },
    reversed: {
      meaning: "\u81EA\u6211\u4EF7\u503C\u5931\u8861\uFF0C\u6216\u9677\u5165\u4F9D\u8D56\u3002",
      love: "\u8FC7\u5EA6\u4ED8\u51FA\uFF0C\u5FFD\u89C6\u81EA\u8EAB\u9700\u8981\u3002",
      career: "\u505C\u6EDE\uFF0C\u521B\u610F\u5835\u585E\u3002",
      advice: "\u5148\u628A\u81EA\u5DF1\u586B\u6EE1\u3002"
    }
  },
  {
    id: "emperor",
    number: 4,
    name: "\u7687\u5E1D",
    nameEn: "The Emperor",
    arcana: "major",
    keywords: [
      "\u79E9\u5E8F",
      "\u6743\u5A01",
      "\u638C\u63A7",
      "\u7ED3\u6784"
    ],
    element: "\u706B",
    zodiac: "\u767D\u7F8A\u5EA7",
    symbol: "\u2642",
    summary: "\u7ACB\u4E0B\u8FB9\u754C\u4E0E\u89C4\u5219\uFF0C\u624D\u6709\u5B89\u7A33\u751F\u957F\u7684\u738B\u56FD\u3002",
    upright: {
      meaning: "\u5EFA\u7ACB\u79E9\u5E8F\u3001\u7A33\u5B9A\u6839\u57FA\u7684\u9636\u6BB5\u3002",
      love: "\u9700\u8981\u627F\u62C5\u4E0E\u627F\u8BFA\u7684\u6210\u719F\u5173\u7CFB\u3002",
      career: "\u9002\u5408\u7BA1\u7406\u3001\u5236\u5B9A\u8BA1\u5212\u3001\u7A33\u4E2D\u6C42\u8FDB\u3002",
      advice: "\u7ED3\u6784\u662F\u81EA\u7531\u7684\u524D\u63D0\u3002"
    },
    reversed: {
      meaning: "\u72EC\u65AD\u3001\u63A7\u5236\u6B32\u8FC7\u5F3A\uFF0C\u6216\u6743\u5A01\u7F3A\u4F4D\u3002",
      love: "\u5F3A\u52BF\u538B\u5236\u6216\u9003\u907F\u8D23\u4EFB\u3002",
      career: "\u673A\u5236\u50F5\u5316\uFF0C\u6216\u7F3A\u4E4F\u51B3\u65AD\u3002",
      advice: "\u6743\u529B\u7684\u53CD\u9762\u662F\u503E\u542C\u3002"
    }
  },
  {
    id: "hierophant",
    number: 5,
    name: "\u6559\u7687",
    nameEn: "The Hierophant",
    arcana: "major",
    keywords: [
      "\u4F20\u7EDF",
      "\u6559\u5BFC",
      "\u4FE1\u5FF5",
      "\u4EEA\u5F0F"
    ],
    element: "\u5730",
    zodiac: "\u91D1\u725B\u5EA7",
    symbol: "\u2720",
    summary: "\u4F20\u627F\u7684\u667A\u6167\u8FDE\u63A5\u8FC7\u53BB\u4E0E\u672A\u6765\uFF0C\u5728\u65E2\u6709\u9053\u8DEF\u4E0A\u4E5F\u80FD\u8D70\u51FA\u81EA\u5DF1\u7684\u6B65\u8C03\u3002",
    upright: {
      meaning: "\u5411\u524D\u8F88\u5B66\u4E60\uFF0C\u5C0A\u91CD\u5171\u540C\u7684\u4EF7\u503C\u6846\u67B6\u3002",
      love: "\u4F20\u7EDF\u3001\u627F\u8BFA\u578B\u7684\u5173\u7CFB\u3002",
      career: "\u901A\u8FC7\u7CFB\u7EDF\u5316\u5B66\u4E60\u83B7\u5F97\u8FDB\u9636\u3002",
      advice: "\u7AD9\u5728\u5DE8\u4EBA\u7684\u80A9\u8180\u4E0A\u518D\u5F80\u4E0A\u8D70\u4E00\u6B65\u3002"
    },
    reversed: {
      meaning: "\u6253\u7834\u9648\u89C4\uFF0C\u6216\u88AB\u6559\u6761\u675F\u7F1A\u3002",
      love: "\u8DF3\u51FA\u7236\u8F88\u671F\u5F85\uFF0C\u9009\u62E9\u771F\u5B9E\u3002",
      career: "\u53CD\u53DB\u65E2\u6709\u7CFB\u7EDF\uFF0C\u5BFB\u627E\u65B0\u8DEF\u5F84\u3002",
      advice: "\u8FA8\u522B\u54EA\u4E9B\u89C4\u5219\u503C\u5F97\u4FDD\u7559\u3002"
    }
  },
  {
    id: "lovers",
    number: 6,
    name: "\u604B\u4EBA",
    nameEn: "The Lovers",
    arcana: "major",
    keywords: [
      "\u9009\u62E9",
      "\u878D\u5408",
      "\u4EF7\u503C\u89C2",
      "\u5438\u5F15"
    ],
    element: "\u98CE",
    zodiac: "\u53CC\u5B50\u5EA7",
    symbol: "\u2665",
    summary: "\u4E24\u4E2A\u7075\u9B42\u76F8\u9047\uFF0C\u4E5F\u662F\u4E00\u6B21\u5BF9\u81EA\u6211\u4EF7\u503C\u7684\u5766\u8BDA\u786E\u8BA4\u3002",
    upright: {
      meaning: "\u91CD\u8981\u7684\u4EB2\u5BC6\u5173\u7CFB\u6216\u5173\u952E\u9009\u62E9\u3002",
      love: "\u6DF1\u5EA6\u5171\u9E23\u3001\u7075\u9B42\u7EA7\u522B\u7684\u5438\u5F15\u3002",
      career: "\u5408\u4F5C\u4E0E\u5408\u4F19\u5E26\u6765\u673A\u9047\u3002",
      advice: "\u9009\u62E9\u4E0E\u4F60\u771F\u6B63\u540C\u9891\u7684\u4EBA\u4E0E\u4E8B\u3002"
    },
    reversed: {
      meaning: "\u4EF7\u503C\u89C2\u51B2\u7A81\u3001\u4E09\u89D2\u5173\u7CFB\u6216\u72B9\u8C6B\u4E0D\u51B3\u3002",
      love: "\u5173\u7CFB\u5931\u8861\uFF0C\u56DE\u907F\u627F\u8BFA\u3002",
      career: "\u5408\u4F5C\u88C2\u7F1D\u663E\u73B0\u3002",
      advice: "\u5148\u5BF9\u81EA\u5DF1\u8BDA\u5B9E\u3002"
    }
  },
  {
    id: "chariot",
    number: 7,
    name: "\u6218\u8F66",
    nameEn: "The Chariot",
    arcana: "major",
    keywords: [
      "\u610F\u5FD7",
      "\u80DC\u5229",
      "\u524D\u8FDB",
      "\u63A7\u5236"
    ],
    element: "\u6C34",
    zodiac: "\u5DE8\u87F9\u5EA7",
    symbol: "\u26ED",
    summary: "\u9A7E\u9A6D\u5185\u5FC3\u7684\u4E24\u80A1\u529B\u91CF\uFF0C\u5C06\u65B9\u5411\u63E1\u5728\u81EA\u5DF1\u624B\u91CC\u3002",
    upright: {
      meaning: "\u610F\u5FD7\u4E3B\u5BFC\uFF0C\u514B\u670D\u963B\u529B\u524D\u884C\u3002",
      love: "\u4E3A\u5173\u7CFB\u4E3B\u52A8\u8FC8\u51FA\u5173\u952E\u4E00\u6B65\u3002",
      career: "\u514B\u670D\u56F0\u96BE\u3001\u8FBE\u6210\u76EE\u6807\u3002",
      advice: "\u8BBE\u5B9A\u65B9\u5411\uFF0C\u7136\u540E\u5168\u529B\u5954\u8D74\u3002"
    },
    reversed: {
      meaning: "\u5931\u53BB\u7126\u70B9\u3001\u65B9\u5411\u6447\u6446\u3002",
      love: "\u51B7\u6218\u6216\u5931\u8861\u7684\u63A8\u62C9\u3002",
      career: "\u8BA1\u5212\u88AB\u6253\u4E71\uFF0C\u9700\u91CD\u65B0\u6821\u51C6\u3002",
      advice: "\u505C\u4E00\u505C\uFF0C\u518D\u9009\u4E00\u6761\u8DEF\u3002"
    }
  },
  {
    id: "strength",
    number: 8,
    name: "\u529B\u91CF",
    nameEn: "Strength",
    arcana: "major",
    keywords: [
      "\u67D4\u97E7",
      "\u52C7\u6C14",
      "\u8010\u5FC3",
      "\u9A6F\u670D"
    ],
    element: "\u706B",
    zodiac: "\u72EE\u5B50\u5EA7",
    symbol: "\u221E",
    summary: "\u771F\u6B63\u7684\u529B\u91CF\u4E0D\u662F\u538B\u5236\uFF0C\u800C\u662F\u4EE5\u6E29\u67D4\u9A6F\u670D\u81EA\u5DF1\u7684\u731B\u517D\u3002",
    upright: {
      meaning: "\u4EE5\u6E29\u67D4\u800C\u575A\u5B9A\u7684\u65B9\u5F0F\u5904\u7406\u96BE\u9898\u3002",
      love: "\u7A33\u5B9A\u7684\u966A\u4F34\uFF0C\u613F\u610F\u7B49\u5F85\u4E0E\u6210\u957F\u3002",
      career: "\u4EE5\u97E7\u6027\u8D70\u8FC7\u6F2B\u957F\u6311\u6218\u3002",
      advice: "\u6162\u4E0D\u662F\u5F31\uFF0C\u662F\u53E6\u4E00\u79CD\u5F3A\u3002"
    },
    reversed: {
      meaning: "\u81EA\u6211\u6000\u7591\u3001\u60C5\u7EEA\u5931\u63A7\u3002",
      love: "\u8FC7\u5EA6\u538B\u6291\u6216\u60C5\u7EEA\u5316\u3002",
      career: "\u4FE1\u5FC3\u4E0D\u8DB3\uFF0C\u906D\u9047\u5185\u8017\u3002",
      advice: "\u7ED9\u81EA\u5DF1\u4E00\u70B9\u5BBD\u5BB9\u3002"
    }
  },
  {
    id: "hermit",
    number: 9,
    name: "\u9690\u58EB",
    nameEn: "The Hermit",
    arcana: "major",
    keywords: [
      "\u72EC\u5904",
      "\u5185\u7701",
      "\u6307\u5F15",
      "\u667A\u6167"
    ],
    element: "\u5730",
    zodiac: "\u5904\u5973\u5EA7",
    symbol: "\u2726",
    summary: "\u63D0\u706F\u8D70\u8FDB\u81EA\u5DF1\u7684\u5185\u5728\u4E16\u754C\uFF0C\u7B54\u6848\u662F\u4E00\u6BB5\u5411\u5185\u7684\u65C5\u7A0B\u3002",
    upright: {
      meaning: "\u9002\u5408\u9759\u4FEE\u3001\u53CD\u601D\u4E0E\u6574\u7406\u601D\u7EEA\u3002",
      love: "\u5173\u7CFB\u9700\u8981\u7A7A\u95F4\uFF0C\u6216\u6E34\u671B\u771F\u631A\u8FDE\u63A5\u3002",
      career: "\u4E13\u6CE8\u7CBE\u8FDB\uFF0C\u79EF\u84C4\u6DF1\u5EA6\u3002",
      advice: "\u6682\u65F6\u8D70\u8FDC\u4E00\u70B9\uFF0C\u770B\u5F97\u66F4\u6E05\u3002"
    },
    reversed: {
      meaning: "\u5B64\u7ACB\u3001\u5C01\u95ED\u6216\u62D2\u7EDD\u4ED6\u4EBA\u3002",
      love: "\u9003\u907F\u5173\u7CFB\uFF0C\u4E0D\u613F\u6C9F\u901A\u3002",
      career: "\u8FC7\u5EA6\u72EC\u884C\uFF0C\u5FFD\u89C6\u534F\u4F5C\u3002",
      advice: "\u5141\u8BB8\u4E00\u70B9\u5149\u8FDB\u6765\u3002"
    }
  },
  {
    id: "wheel",
    number: 10,
    name: "\u547D\u8FD0\u4E4B\u8F6E",
    nameEn: "Wheel of Fortune",
    arcana: "major",
    keywords: [
      "\u5FAA\u73AF",
      "\u8F6C\u673A",
      "\u547D\u8FD0",
      "\u8D77\u4F0F"
    ],
    element: "\u706B",
    planet: "\u6728\u661F",
    symbol: "\u262F",
    summary: "\u8F6E\u76D8\u8F6C\u52A8\uFF0C\u673A\u4F1A\u4E0E\u53D8\u5316\u5982\u671F\u800C\u81F3\uFF0C\u987A\u5176\u81EA\u7136\u4E5F\u662F\u4E00\u79CD\u667A\u6167\u3002",
    upright: {
      meaning: "\u597D\u8FD0\u5230\u6765\uFF0C\u91CD\u8981\u7684\u8F6C\u6298\u70B9\u3002",
      love: "\u7F18\u5206\u7684\u91CD\u8981\u8282\u70B9\u3002",
      career: "\u83B7\u5F97\u65B0\u673A\u4F1A\u6216\u5C97\u4F4D\u664B\u5347\u3002",
      advice: "\u6293\u4F4F\u673A\u4F1A\uFF0C\u540C\u65F6\u51C6\u5907\u597D\u627F\u62C5\u3002"
    },
    reversed: {
      meaning: "\u9006\u5883\u3001\u5931\u63A7\u6216\u88AB\u60EF\u6027\u62D6\u4F4F\u3002",
      love: "\u91CD\u590D\u7684\u65E7\u6A21\u5F0F\u9700\u8981\u88AB\u6253\u7834\u3002",
      career: "\u906D\u9047\u963B\u788D\uFF0C\u9700\u8981\u8C03\u6574\u3002",
      advice: "\u627F\u8BA4\u5FAA\u73AF\uFF0C\u624D\u80FD\u8DF3\u51FA\u5FAA\u73AF\u3002"
    }
  },
  {
    id: "justice",
    number: 11,
    name: "\u6B63\u4E49",
    nameEn: "Justice",
    arcana: "major",
    keywords: [
      "\u516C\u5E73",
      "\u771F\u76F8",
      "\u6289\u62E9",
      "\u56E0\u679C"
    ],
    element: "\u98CE",
    zodiac: "\u5929\u79E4\u5EA7",
    symbol: "\u2696",
    summary: "\u5929\u5E73\u5728\u9759\u9ED8\u4E2D\u79F0\u91CF\u4E00\u5207\uFF0C\u6BCF\u4E00\u4EFD\u56E0\u90FD\u4F1A\u7ED3\u51FA\u5BF9\u5E94\u7684\u679C\u3002",
    upright: {
      meaning: "\u505A\u51FA\u7406\u6027\u3001\u516C\u6B63\u7684\u9009\u62E9\u3002",
      love: "\u5173\u7CFB\u8FDB\u5165\u5766\u8BDA\u3001\u8D23\u4EFB\u7684\u9636\u6BB5\u3002",
      career: "\u6CD5\u5F8B\u3001\u5408\u540C\u3001\u8C08\u5224\u76F8\u5173\u4E8B\u5B9C\u3002",
      advice: "\u4EE5\u4E8B\u5B9E\u548C\u6E05\u660E\u7684\u5934\u8111\u505A\u51B3\u5B9A\u3002"
    },
    reversed: {
      meaning: "\u504F\u89C1\u3001\u63A8\u8BFF\u6216\u4E0D\u516C\u3002",
      love: "\u56DE\u907F\u8D23\u4EFB\uFF0C\u4E0D\u613F\u9762\u5BF9\u771F\u76F8\u3002",
      career: "\u7EA0\u7EB7\u6216\u9700\u8981\u91CD\u65B0\u6838\u5B9E\u7684\u95EE\u9898\u3002",
      advice: "\u8BDA\u5B9E\u662F\u6700\u9AD8\u6548\u7684\u7B56\u7565\u3002"
    }
  },
  {
    id: "hanged-man",
    number: 12,
    name: "\u540A\u4EBA",
    nameEn: "The Hanged Man",
    arcana: "major",
    keywords: [
      "\u505C\u987F",
      "\u89C6\u89D2",
      "\u727A\u7272",
      "\u81E3\u670D"
    ],
    element: "\u6C34",
    planet: "\u6D77\u738B\u661F",
    symbol: "\u2727",
    summary: "\u6682\u505C\u4E0D\u662F\u5931\u8D25\uFF0C\u6362\u4E00\u4E2A\u89C6\u89D2\uFF0C\u4E16\u754C\u4EE5\u53E6\u4E00\u79CD\u65B9\u5F0F\u5411\u4F60\u5C55\u5F00\u3002",
    upright: {
      meaning: "\u653E\u4E0B\u6267\u5FF5\uFF0C\u5728\u505C\u987F\u4E2D\u83B7\u5F97\u65B0\u89C6\u89D2\u3002",
      love: "\u6682\u505C\uFF0C\u4E0D\u6025\u4E8E\u5B9A\u4E49\u3002",
      career: "\u9700\u8981\u7B49\u5F85\u6216\u6362\u4F4D\u601D\u8003\u3002",
      advice: "\u8BA9\u53D1\u751F\u7684\u4E8B\u5148\u53D1\u751F\u3002"
    },
    reversed: {
      meaning: "\u6297\u62D2\u6539\u53D8\uFF0C\u81EA\u6211\u727A\u7272\u65E0\u6548\u3002",
      love: "\u59D4\u5C48\u6C42\u5168\uFF0C\u5931\u53BB\u771F\u5B9E\u3002",
      career: "\u62D6\u5EF6\u6216\u9003\u907F\u672C\u8BE5\u9762\u5BF9\u7684\u4E8B\u3002",
      advice: "\u533A\u5206\u59A5\u534F\u4E0E\u52C9\u5F3A\u3002"
    }
  },
  {
    id: "death",
    number: 13,
    name: "\u6B7B\u795E",
    nameEn: "Death",
    arcana: "major",
    keywords: [
      "\u7ED3\u675F",
      "\u8F6C\u5316",
      "\u91CA\u653E",
      "\u91CD\u751F"
    ],
    element: "\u6C34",
    zodiac: "\u5929\u874E\u5EA7",
    symbol: "\u2620",
    summary: "\u65E7\u7AE0\u8282\u843D\u5E55\uFF0C\u4E0D\u662F\u7EC8\u7ED3\uFF0C\u800C\u662F\u65B0\u751F\u547D\u7834\u571F\u524D\u5FC5\u7ECF\u7684\u9ED1\u6697\u3002",
    upright: {
      meaning: "\u6DF1\u523B\u7684\u8F6C\u53D8\uFF0C\u5FC5\u8981\u7684\u544A\u522B\u3002",
      love: "\u5173\u7CFB\u9636\u6BB5\u7684\u5F7B\u5E95\u6539\u53D8\u3002",
      career: "\u7ED3\u675F\u4E00\u6BB5\u4E0D\u518D\u9002\u5408\u7684\u5DE5\u4F5C\u6216\u9879\u76EE\u3002",
      advice: "\u653E\u4E0B\u624D\u80FD\u817E\u51FA\u4F4D\u7F6E\u3002"
    },
    reversed: {
      meaning: "\u62D2\u7EDD\u8F6C\u53D8\uFF0C\u6EDE\u7559\u4E8E\u8FC7\u53BB\u3002",
      love: "\u6293\u7740\u5DF2\u7ED3\u675F\u7684\u5173\u7CFB\u4E0D\u653E\u3002",
      career: "\u6297\u62D2\u6539\u53D8\u7684\u4EE3\u4EF7\u5728\u7D2F\u79EF\u3002",
      advice: "\u627F\u8BA4\u7ED3\u675F\uFF0C\u624D\u80FD\u5F00\u59CB\u3002"
    }
  },
  {
    id: "temperance",
    number: 14,
    name: "\u8282\u5236",
    nameEn: "Temperance",
    arcana: "major",
    keywords: [
      "\u5E73\u8861",
      "\u8C03\u548C",
      "\u8010\u5FC3",
      "\u878D\u5408"
    ],
    element: "\u706B",
    zodiac: "\u5C04\u624B\u5EA7",
    symbol: "\u2697",
    summary: "\u5728\u4E24\u6781\u4E4B\u95F4\u5BFB\u627E\u6070\u5230\u597D\u5904\u7684\u6BD4\u4F8B\uFF0C\u751F\u6D3B\u662F\u4E00\u573A\u6E29\u67D4\u7684\u8C03\u548C\u3002",
    upright: {
      meaning: "\u751F\u6D3B\u8282\u594F\u56DE\u5230\u5E73\u8861\uFF0C\u6574\u5408\u5185\u5916\u3002",
      love: "\u7A33\u5B9A\u3001\u4E92\u76F8\u6210\u5168\u7684\u5173\u7CFB\u3002",
      career: "\u5408\u4F5C\u987A\u7545\u3001\u8282\u594F\u7A33\u5B9A\u3002",
      advice: "\u6162\u4E00\u70B9\uFF0C\u7A33\u4E00\u70B9\u3002"
    },
    reversed: {
      meaning: "\u6781\u7AEF\u3001\u51B2\u7A81\u6216\u5931\u8861\u3002",
      love: "\u4E92\u76F8\u6D88\u8017\uFF0C\u7F3A\u4E4F\u8010\u5FC3\u3002",
      career: "\u8FC7\u5EA6\u3001\u62D6\u5EF6\u6216\u8D44\u6E90\u9519\u914D\u3002",
      advice: "\u627E\u56DE\u4F60\u7684\u4E2D\u7EBF\u3002"
    }
  },
  {
    id: "devil",
    number: 15,
    name: "\u6076\u9B54",
    nameEn: "The Devil",
    arcana: "major",
    keywords: [
      "\u675F\u7F1A",
      "\u6267\u5FF5",
      "\u6B32\u671B",
      "\u9634\u5F71"
    ],
    element: "\u5730",
    zodiac: "\u6469\u7FAF\u5EA7",
    symbol: "\u263D",
    summary: "\u67B7\u9501\u662F\u81EA\u5DF1\u6302\u4E0A\u7684\uFF0C\u770B\u6E05\u9634\u5F71\uFF0C\u5C31\u5DF2\u7ECF\u5F00\u59CB\u677E\u52A8\u5B83\u3002",
    upright: {
      meaning: "\u6210\u763E\u3001\u6267\u5FF5\u6216\u7269\u6B32\u4E3B\u5BFC\u3002",
      love: "\u6FC0\u70C8\u5374\u5145\u6EE1\u63A7\u5236\u6B32\u7684\u5173\u7CFB\u3002",
      career: "\u88AB\u5229\u76CA\u6216\u6050\u60E7\u9A71\u52A8\u3002",
      advice: "\u627F\u8BA4\u4F60\u5176\u5B9E\u53EF\u4EE5\u79BB\u5F00\u3002"
    },
    reversed: {
      meaning: "\u6323\u8131\u675F\u7F1A\uFF0C\u770B\u6E05\u6A21\u5F0F\u3002",
      love: "\u4ECE\u6D88\u8017\u5173\u7CFB\u4E2D\u89C9\u9192\u3002",
      career: "\u6446\u8131\u4E0D\u5065\u5EB7\u7684\u5DE5\u4F5C\u6A21\u5F0F\u3002",
      advice: "\u89E3\u5F00\u4E00\u4E2A\u6263\u5B50\uFF0C\u5C31\u4F1A\u677E\u4E00\u5708\u3002"
    }
  },
  {
    id: "tower",
    number: 16,
    name: "\u5854",
    nameEn: "The Tower",
    arcana: "major",
    keywords: [
      "\u5267\u53D8",
      "\u74E6\u89E3",
      "\u771F\u76F8",
      "\u89C9\u9192"
    ],
    element: "\u706B",
    planet: "\u706B\u661F",
    symbol: "\u26A1",
    summary: "\u4E00\u9053\u95EA\u7535\u5288\u5F00\u865A\u5047\u7684\u5854\uFF0C\u75DB\uFF0C\u4F46\u8BA9\u4F60\u91CD\u65B0\u7AD9\u5728\u771F\u5B9E\u7684\u5730\u57FA\u4E0A\u3002",
    upright: {
      meaning: "\u7A81\u5982\u5176\u6765\u7684\u53D8\u52A8\uFF0C\u65E7\u7ED3\u6784\u5D29\u584C\u3002",
      love: "\u5173\u7CFB\u7684\u771F\u76F8\u88AB\u63ED\u5F00\u3002",
      career: "\u9879\u76EE\u6216\u5C97\u4F4D\u53D1\u751F\u5267\u53D8\u3002",
      advice: "\u5D29\u584C\u4E5F\u662F\u4E00\u79CD\u6E05\u7406\u3002"
    },
    reversed: {
      meaning: "\u5EF6\u8FDF\u7684\u5D29\u584C\uFF0C\u5185\u5728\u52A8\u6447\u3002",
      love: "\u5173\u7CFB\u9690\u60A3\u672A\u88AB\u9762\u5BF9\u3002",
      career: "\u5371\u673A\u524D\u7684\u5F81\u5146\u5DF2\u7ECF\u51FA\u73B0\u3002",
      advice: "\u8BE5\u52A8\u5C31\u52A8\uFF0C\u522B\u62D6\u3002"
    }
  },
  {
    id: "star",
    number: 17,
    name: "\u661F\u661F",
    nameEn: "The Star",
    arcana: "major",
    keywords: [
      "\u5E0C\u671B",
      "\u7597\u6108",
      "\u6307\u5F15",
      "\u5B81\u9759"
    ],
    element: "\u98CE",
    zodiac: "\u6C34\u74F6\u5EA7",
    symbol: "\u2726",
    summary: "\u591C\u7A7A\u6700\u4EAE\u7684\u90A3\u9897\u661F\uFF0C\u628A\u67D4\u548C\u7684\u5149\u6D12\u8FDB\u4F60\u7684\u4F24\u53E3\uFF0C\u8BA9\u4E00\u5207\u6162\u6162\u597D\u8D77\u6765\u3002",
    upright: {
      meaning: "\u5E0C\u671B\u91CD\u71C3\uFF0C\u8FDB\u5165\u7597\u6108\u9636\u6BB5\u3002",
      love: "\u6E29\u67D4\u4FEE\u590D\uFF0C\u91CD\u65B0\u76F8\u4FE1\u3002",
      career: "\u7075\u611F\u56DE\u5F52\uFF0C\u770B\u5230\u957F\u671F\u65B9\u5411\u3002",
      advice: "\u6162\u6162\u6765\uFF0C\u4E00\u5207\u90FD\u503C\u5F97\u3002"
    },
    reversed: {
      meaning: "\u4FE1\u5FC3\u4E0D\u8DB3\uFF0C\u6682\u5931\u65B9\u5411\u3002",
      love: "\u6000\u7591\u5BF9\u65B9\u6216\u6000\u7591\u81EA\u5DF1\u3002",
      career: "\u7075\u611F\u67AF\u7AED\uFF0C\u9700\u8981\u4F11\u606F\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u6682\u65F6\u76F8\u4FE1\u3002"
    }
  },
  {
    id: "moon",
    number: 18,
    name: "\u6708\u4EAE",
    nameEn: "The Moon",
    arcana: "major",
    keywords: [
      "\u6F5C\u610F\u8BC6",
      "\u5E7B\u8C61",
      "\u68A6\u5883",
      "\u6A21\u7CCA"
    ],
    element: "\u6C34",
    zodiac: "\u53CC\u9C7C\u5EA7",
    symbol: "\u263D",
    summary: "\u6708\u5149\u6726\u80E7\uFF0C\u771F\u5047\u96BE\u8FA8\uFF0C\u5728\u6050\u60E7\u4E0E\u76F4\u89C9\u7684\u4EA4\u9519\u4E2D\u8D70\u5411\u66F4\u6DF1\u7684\u81EA\u5DF1\u3002",
    upright: {
      meaning: "\u60C5\u7EEA\u4E0E\u6F5C\u610F\u8BC6\u6D6E\u73B0\uFF0C\u771F\u76F8\u672A\u660E\u3002",
      love: "\u5173\u7CFB\u5B58\u5728\u6A21\u7CCA\u4E0E\u8BEF\u89E3\u3002",
      career: "\u4FE1\u606F\u4E0D\u5B8C\u6574\uFF0C\u9700\u8C28\u614E\u5224\u65AD\u3002",
      advice: "\u8DDF\u968F\u76F4\u89C9\uFF0C\u4F46\u4FDD\u7559\u7406\u6027\u3002"
    },
    reversed: {
      meaning: "\u8FF7\u96FE\u6563\u53BB\uFF0C\u771F\u76F8\u6D6E\u73B0\u3002",
      love: "\u770B\u6E05\u5173\u7CFB\u7684\u5168\u8C8C\u3002",
      career: "\u5398\u6E05\u4E4B\u524D\u7684\u6DF7\u4E71\u5C40\u9762\u3002",
      advice: "\u5149\u5DF2\u7ECF\u56DE\u6765\u4E86\u3002"
    }
  },
  {
    id: "sun",
    number: 19,
    name: "\u592A\u9633",
    nameEn: "The Sun",
    arcana: "major",
    keywords: [
      "\u559C\u60A6",
      "\u6210\u529F",
      "\u6E05\u6670",
      "\u6D3B\u529B"
    ],
    element: "\u706B",
    planet: "\u592A\u9633",
    symbol: "\u2600",
    summary: "\u9633\u5149\u6717\u7167\uFF0C\u4E00\u5207\u90FD\u88AB\u770B\u89C1\u3001\u88AB\u795D\u798F\u3001\u88AB\u9F13\u52B1\u3002",
    upright: {
      meaning: "\u559C\u60A6\u3001\u6E05\u6670\u4E0E\u6210\u529F\u7684\u65F6\u523B\u3002",
      love: "\u9633\u5149\u3001\u5766\u7387\u3001\u6109\u5FEB\u7684\u5173\u7CFB\u3002",
      career: "\u6210\u5C31\u5230\u6765\uFF0C\u88AB\u8BA4\u53EF\u3002",
      advice: "\u5E86\u795D\u4F60\u8D70\u5230\u8FD9\u91CC\u3002"
    },
    reversed: {
      meaning: "\u77ED\u6682\u4E4C\u4E91\uFF0C\u4FE1\u5FC3\u53D7\u632B\u3002",
      love: "\u5C0F\u6469\u64E6\uFF0C\u5F88\u5FEB\u6D88\u6563\u3002",
      career: "\u8FDB\u5C55\u4E0D\u5982\u9884\u671F\uFF0C\u4F46\u65B9\u5411\u5BF9\u3002",
      advice: "\u522B\u88AB\u4E91\u6321\u4F4F\uFF0C\u592A\u9633\u8FD8\u5728\u3002"
    }
  },
  {
    id: "judgement",
    number: 20,
    name: "\u5BA1\u5224",
    nameEn: "Judgement",
    arcana: "major",
    keywords: [
      "\u89C9\u9192",
      "\u53EC\u5524",
      "\u6574\u5408",
      "\u91CD\u751F"
    ],
    element: "\u706B",
    planet: "\u51A5\u738B\u661F",
    symbol: "\u271D",
    summary: "\u6765\u81EA\u5185\u5FC3\u6DF1\u5904\u7684\u53EC\u5524\u628A\u4F60\u53EB\u9192\uFF0C\u6574\u5408\u8FC7\u53BB\uFF0C\u6210\u4E3A\u66F4\u5B8C\u6574\u7684\u81EA\u5DF1\u3002",
    upright: {
      meaning: "\u91CD\u8981\u7684\u89C9\u9192\u4E0E\u6574\u5408\u65F6\u523B\u3002",
      love: "\u65E7\u5173\u7CFB\u7684\u91CD\u65B0\u5B9A\u4F4D\u6216\u548C\u89E3\u3002",
      career: "\u56DE\u5E94\u53EC\u5524\uFF0C\u8FDB\u5165\u4E0B\u4E00\u9636\u6BB5\u3002",
      advice: "\u542C\u89C1\u5B83\uFF0C\u7136\u540E\u56DE\u5E94\u3002"
    },
    reversed: {
      meaning: "\u81EA\u6211\u6279\u5224\uFF0C\u96BE\u4EE5\u5BBD\u6055\u3002",
      love: "\u7EA0\u7ED3\u4E8E\u8FC7\u53BB\uFF0C\u4E0D\u613F\u548C\u89E3\u3002",
      career: "\u5FFD\u89C6\u5185\u5728\u53EC\u5524\uFF0C\u9519\u5931\u65F6\u673A\u3002",
      advice: "\u5148\u539F\u8C05\u81EA\u5DF1\u3002"
    }
  },
  {
    id: "world",
    number: 21,
    name: "\u4E16\u754C",
    nameEn: "The World",
    arcana: "major",
    keywords: [
      "\u5B8C\u6210",
      "\u5706\u6EE1",
      "\u6574\u4F53",
      "\u5E86\u795D"
    ],
    element: "\u5730",
    planet: "\u571F\u661F",
    symbol: "\u25EF",
    summary: "\u4E00\u4E2A\u9636\u6BB5\u5706\u6EE1\u843D\u5E55\uFF0C\u56DB\u65B9\u529B\u91CF\u6C47\u805A\uFF0C\u4F60\u5DF2\u6210\u4E3A\u4F60\u60F3\u6210\u4E3A\u7684\u4EBA\u3002",
    upright: {
      meaning: "\u5B8C\u6210\u4E0E\u5706\u6EE1\uFF0C\u8FDB\u5165\u6574\u4F53\u611F\u3002",
      love: "\u5173\u7CFB\u62B5\u8FBE\u4E0B\u4E00\u9636\u6BB5\u7684\u91CC\u7A0B\u7891\u3002",
      career: "\u9879\u76EE\u5706\u6EE1\uFF0C\u6210\u5C31\u611F\u4E30\u6C9B\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u5E86\u795D\u3002"
    },
    reversed: {
      meaning: "\u4E34\u95E8\u4E00\u811A\u672A\u843D\u5730\uFF0C\u672A\u5B8C\u6210\u611F\u3002",
      love: "\u5173\u7CFB\u5361\u5728\u6700\u540E\u4E00\u6B65\u3002",
      career: "\u5DEE\u4E00\u70B9\u5230\u8FBE\uFF0C\u4E0D\u8981\u653E\u5F03\u3002",
      advice: "\u628A\u6700\u540E\u4E00\u73AF\u4E5F\u5B8C\u6210\u3002"
    }
  },
  {
    id: "wands-ace",
    number: 1,
    name: "\u6743\u6756\u4E00",
    nameEn: "Ace of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "ace",
    keywords: [
      "\u7075\u611F",
      "\u51B2\u52B2",
      "\u65B0\u70B9\u5B50",
      "\u706B\u82B1"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u4E00\u675F\u706B\u82D7\u4ECE\u638C\u5FC3\u70B9\u71C3\uFF0C\u65B0\u7684\u51B2\u52A8\u6B63\u5728\u751F\u957F\uFF0C\u7B49\u4F60\u53BB\u70B9\u71C3\u5B83\u3002",
    upright: {
      meaning: "\u7075\u611F\u7A81\u81F3\uFF0C\u884C\u52A8\u7684\u51B2\u52B2\u6B63\u5F3A\uFF0C\u542F\u52A8\u9879\u76EE\u7684\u597D\u65F6\u673A\u3002",
      love: "\u4E00\u89C1\u949F\u60C5\u6216\u4E45\u8FDD\u7684\u60B8\u52A8\uFF0C\u8EAB\u4F53\u5148\u4E8E\u7406\u667A\u4F5C\u51FA\u56DE\u5E94\u3002",
      career: "\u65B0\u673A\u4F1A\u3001\u65B0\u70B9\u5B50\u6D8C\u73B0\uFF0C\u5927\u80C6\u8BF4\u51FA\u4F60\u7684\u63D0\u6848\u3002",
      advice: "\u522B\u60F3\u592A\u591A\uFF0C\u5148\u505A\u4E00\u5C0F\u6B65\u3002"
    },
    reversed: {
      meaning: "\u60F3\u6CD5\u88AB\u538B\u4E0B\uFF0C\u51B2\u52B2\u5361\u5728\u539F\u5730\uFF0C\u6216\u88AB\u73B0\u5B9E\u62C9\u626F\u3002",
      love: "\u72B9\u8C6B\u4E0D\u51B3\uFF0C\u6216\u70ED\u5EA6\u6765\u5F97\u5FEB\u53BB\u5F97\u5FEB\u3002",
      career: "\u9879\u76EE\u542F\u52A8\u53D7\u963B\uFF0C\u52A8\u529B\u4E0D\u8DB3\u3002",
      advice: "\u627E\u56DE\u6700\u521D\u8BA9\u4F60\u5FC3\u52A8\u7684\u90A3\u4E2A\u77AC\u95F4\u3002"
    }
  },
  {
    id: "wands-2",
    number: 2,
    name: "\u6743\u6756\u4E8C",
    nameEn: "Two of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "2",
    keywords: [
      "\u89C4\u5212",
      "\u5C55\u671B",
      "\u9009\u62E9",
      "\u4E16\u754C\u5728\u624B"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u7AD9\u5728\u9AD8\u5904\u4FEF\u77B0\u5730\u56FE\uFF0C\u4F60\u5DF2\u62E5\u6709\u4E00\u5207\u51FA\u53D1\u7684\u6761\u4EF6\uFF0C\u53EA\u5DEE\u4E00\u4E2A\u65B9\u5411\u3002",
    upright: {
      meaning: "\u7AD9\u4E0A\u8D77\u70B9\u4FEF\u77B0\u5168\u5C40\uFF0C\u8BA1\u5212\u5DF2\u6210\u5F62\uFF0C\u7B49\u5F85\u51B3\u5B9A\u5F80\u54EA\u8D70\u3002",
      love: "\u5173\u7CFB\u8D70\u5411\u7A33\u5B9A\uFF0C\u4E24\u4EBA\u5F00\u59CB\u8BA8\u8BBA\u672A\u6765\u3002",
      career: "\u6218\u7565\u89C6\u91CE\u6E05\u6670\uFF0C\u9002\u5408\u505A\u4E2D\u957F\u671F\u89C4\u5212\u3002",
      advice: "\u9009\u4E00\u6761\u8DEF\uFF0C\u5C31\u5168\u529B\u4EE5\u8D74\u3002"
    },
    reversed: {
      meaning: "\u77BB\u524D\u987E\u540E\uFF0C\u9519\u8FC7\u51FA\u53D1\u7684\u7A97\u53E3\u3002",
      love: "\u5BB3\u6015\u627F\u8BFA\uFF0C\u6216\u628A\u9009\u62E9\u6743\u5168\u4EA4\u7ED9\u5BF9\u65B9\u3002",
      career: "\u8FC7\u5EA6\u89C4\u5212\u53CD\u800C\u505C\u6EDE\uFF0C\u6216\u89C6\u91CE\u592A\u5C0F\u3002",
      advice: "\u8D70\u51FA\u53BB\uFF0C\u5730\u56FE\u4F1A\u5728\u811A\u4E0B\u5C55\u5F00\u3002"
    }
  },
  {
    id: "wands-3",
    number: 3,
    name: "\u6743\u6756\u4E09",
    nameEn: "Three of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "3",
    keywords: [
      "\u8FDC\u89C1",
      "\u6269\u5F20",
      "\u7B49\u5F85\u56DE\u97F3",
      "\u8D38\u6613"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u8239\u5DF2\u8D77\u822A\uFF0C\u4F60\u7AD9\u5728\u5CB8\u8FB9\u671B\u5411\u8FDC\u65B9\uFF0C\u8010\u5FC3\u7B49\u5F85\u56DE\u54CD\u3002",
    upright: {
      meaning: "\u524D\u671F\u64AD\u79CD\u5DF2\u5B8C\u6210\uFF0C\u8FDB\u5165\u7B49\u5F85\u4E0E\u6269\u5F20\u9636\u6BB5\u3002",
      love: "\u5F02\u5730\u3001\u8FDC\u7A0B\u6216\u957F\u7EBF\u5173\u7CFB\u6B63\u5728\u7A33\u6B65\u524D\u8FDB\u3002",
      career: "\u5408\u4F5C\u673A\u4F1A\u62D3\u5C55\uFF0C\u5173\u6CE8\u6D77\u5916\u6216\u8DE8\u754C\u3002",
      advice: "\u8010\u5FC3\uFF0C\u597D\u6D88\u606F\u6B63\u5728\u8DEF\u4E0A\u3002"
    },
    reversed: {
      meaning: "\u8BA1\u5212\u5EF6\u8BEF\uFF0C\u6216\u8FDC\u65B9\u7684\u56DE\u4FE1\u8FDF\u8FDF\u672A\u6765\u3002",
      love: "\u8DDD\u79BB\u8BA9\u611F\u60C5\u964D\u6E29\u3002",
      career: "\u5408\u4F5C\u5361\u5728\u5173\u952E\u8282\u70B9\u3002",
      advice: "\u4E0D\u8981\u4E2D\u9014\u653E\u5F03\uFF0C\u7ED9\u5B83\u591A\u4E00\u70B9\u65F6\u95F4\u3002"
    }
  },
  {
    id: "wands-4",
    number: 4,
    name: "\u6743\u6756\u56DB",
    nameEn: "Four of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "4",
    keywords: [
      "\u5E86\u795D",
      "\u5F52\u5C5E",
      "\u91CC\u7A0B\u7891",
      "\u56E2\u805A"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u5E86\u5178\u7684\u82B1\u73AF\u88AB\u9AD8\u9AD8\u6302\u8D77\uFF0C\u4F60\u7EC8\u4E8E\u770B\u89C1\u81EA\u5DF1\u7684\u52AA\u529B\u5F00\u82B1\u7ED3\u679C\u3002",
    upright: {
      meaning: "\u9636\u6BB5\u6027\u6210\u679C\u8FBE\u6210\uFF0C\u9002\u5408\u5E86\u795D\u4E0E\u4F11\u6574\u3002",
      love: "\u5173\u7CFB\u8FDB\u5165\u7A33\u5B9A\u9636\u6BB5\uFF0C\u53EF\u80FD\u8C08\u5230\u540C\u5C45\u3001\u5A5A\u793C\u3002",
      career: "\u9879\u76EE\u4E0A\u7EBF\u3001\u56E2\u961F\u6269\u5F20\uFF0C\u503C\u5F97\u597D\u597D\u7292\u52B3\u81EA\u5DF1\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u4EAB\u53D7\u5F53\u4E0B\u7684\u6210\u5C31\u3002"
    },
    reversed: {
      meaning: "\u8868\u9762\u70ED\u95F9\u4F46\u5185\u5FC3\u7A7A\u843D\uFF0C\u6216\u5BB6\u4EBA\u805A\u4F1A\u6697\u85CF\u5F20\u529B\u3002",
      love: "\u770B\u8D77\u6765\u7A33\u5B9A\uFF0C\u5374\u7F3A\u5C11\u6DF1\u5EA6\u4EA4\u6D41\u3002",
      career: "\u6210\u5C31\u88AB\u5FFD\u89C6\uFF0C\u6216\u5E86\u529F\u6D41\u4E8E\u5F62\u5F0F\u3002",
      advice: "\u95EE\u81EA\u5DF1\uFF1A\u8FD9\u662F\u6211\u771F\u6B63\u60F3\u8981\u7684\u5F52\u5C5E\u5417\uFF1F"
    }
  },
  {
    id: "wands-5",
    number: 5,
    name: "\u6743\u6756\u4E94",
    nameEn: "Five of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "5",
    keywords: [
      "\u7ADE\u4E89",
      "\u6DF7\u6218",
      "\u5206\u6B67",
      "\u78E8\u5408"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u4E94\u628A\u6743\u6756\u5728\u7A7A\u4E2D\u4EA4\u9519\uFF0C\u4EBA\u4EBA\u90FD\u60F3\u53D1\u58F0\uFF0C\u6DF7\u4E71\u672C\u8EAB\u5C31\u662F\u6210\u957F\u7684\u4E00\u90E8\u5206\u3002",
    upright: {
      meaning: "\u5C0F\u51B2\u7A81\u3001\u4E89\u8BBA\u4E0D\u65AD\uFF0C\u7ADE\u4E89\u63A8\u52A8\u4F60\u627E\u51FA\u771F\u5B9E\u7ACB\u573A\u3002",
      love: "\u6C9F\u901A\u5206\u6B67\u660E\u663E\uFF0C\u5435\u8FC7\u4E4B\u540E\u53CD\u800C\u66F4\u9760\u8FD1\u3002",
      career: "\u56E2\u961F\u610F\u89C1\u5206\u6563\uFF0C\u9700\u8981\u4E00\u4E2A\u6E05\u6670\u7684\u4EF2\u88C1\u3002",
      advice: "\u522B\u56DE\u907F\uFF0C\u628A\u8BDD\u8BF4\u6E05\u695A\u3002"
    },
    reversed: {
      meaning: "\u5185\u8017\u52A0\u5267\uFF0C\u6216\u9009\u62E9\u4E86\u538B\u6291\u56DE\u907F\u3002",
      love: "\u51B7\u6218\u4F24\u5BB3\u6BD4\u4E89\u5435\u66F4\u6DF1\u3002",
      career: "\u5185\u90E8\u653F\u6CBB\u6D88\u8017\u6548\u7387\u3002",
      advice: "\u56DE\u5230\u76EE\u6807\u672C\u8EAB\uFF0C\u800C\u4E0D\u662F\u8D62\u8FC7\u5BF9\u65B9\u3002"
    }
  },
  {
    id: "wands-6",
    number: 6,
    name: "\u6743\u6756\u516D",
    nameEn: "Six of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "6",
    keywords: [
      "\u80DC\u5229",
      "\u8BA4\u53EF",
      "\u51EF\u65CB",
      "\u805A\u5149"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u82B1\u51A0\u6234\u4E0A\u5934\u9876\uFF0C\u4EBA\u7FA4\u4E3A\u4F60\u6B22\u547C\uFF0C\u628A\u52AA\u529B\u5316\u4F5C\u638C\u58F0\u3002",
    upright: {
      meaning: "\u6210\u5C31\u88AB\u770B\u89C1\uFF0C\u5F97\u5230\u516C\u5F00\u8BA4\u53EF\u3002",
      love: "\u4F17\u4EBA\u795D\u798F\u7684\u611F\u60C5\u6216\u8868\u767D\u88AB\u63A5\u53D7\u3002",
      career: "\u5347\u804C\u3001\u83B7\u5956\u3001\u62FF\u4E0B\u5173\u952E\u9879\u76EE\u3002",
      advice: "\u4EAB\u53D7\u8FD9\u4E00\u523B\uFF0C\u518D\u628A\u7ECF\u9A8C\u6253\u5305\u5E26\u8D70\u3002"
    },
    reversed: {
      meaning: "\u80DC\u5229\u53D8\u4E86\u5473\uFF0C\u6216\u529F\u52B3\u88AB\u62A2\u8D70\u3002",
      love: "\u5916\u4EBA\u770B\u7740\u5149\u9C9C\uFF0C\u79C1\u4E0B\u5173\u7CFB\u7D27\u5F20\u3002",
      career: "\u88AB\u5FFD\u89C6\u7684\u8D21\u732E\uFF0C\u6216\u865A\u5047\u7684\u5149\u73AF\u3002",
      advice: "\u771F\u6B63\u7684\u80AF\u5B9A\u6765\u81EA\u5BF9\u81EA\u5DF1\u7684\u627F\u8BFA\u3002"
    }
  },
  {
    id: "wands-7",
    number: 7,
    name: "\u6743\u6756\u4E03",
    nameEn: "Seven of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "7",
    keywords: [
      "\u9632\u5FA1",
      "\u575A\u5B88",
      "\u6311\u6218",
      "\u9AD8\u5730"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u4F60\u7AD9\u5728\u9AD8\u5904\uFF0C\u5BF9\u51C6\u6240\u6709\u8D28\u7591\u8005\u4E3E\u8D77\u6743\u6756\uFF1A\u6211\u5C31\u662F\u4E0D\u9000\u3002",
    upright: {
      meaning: "\u9762\u5BF9\u6311\u6218\uFF0C\u4F60\u7684\u7ACB\u573A\u6BD4\u4F60\u4EE5\u4E3A\u7684\u66F4\u7A33\u3002",
      love: "\u5173\u7CFB\u7ECF\u53D7\u5916\u754C\u6216\u5185\u90E8\u7684\u8003\u9A8C\uFF0C\u4F46\u4F60\u613F\u610F\u5B88\u4F4F\u3002",
      career: "\u7ADE\u4E89\u52A0\u5267\uFF0C\u4F60\u5DF2\u7ECF\u5360\u636E\u4E86\u6709\u5229\u4F4D\u7F6E\u3002",
      advice: "\u5B88\u5F97\u4F4F\uFF0C\u5C31\u662F\u80DC\u5229\u3002"
    },
    reversed: {
      meaning: "\u88AB\u8FEB\u9632\u5FA1\u5230\u7B4B\u75B2\u529B\u5C3D\uFF0C\u6216\u8FC7\u5EA6\u56FA\u6267\u3002",
      love: '\u592A\u5728\u610F"\u8C01\u5BF9\u8C01\u9519"\uFF0C\u5FD8\u4E86\u4E24\u4EBA\u5728\u4E00\u961F\u3002',
      career: "\u6015\u5931\u8D25\u800C\u62D2\u7EDD\u6240\u6709\u65B0\u65B9\u6848\u3002",
      advice: "\u4EC0\u4E48\u503C\u5F97\u5B88\uFF0C\u4EC0\u4E48\u53EF\u4EE5\u677E\u624B\uFF1F"
    }
  },
  {
    id: "wands-8",
    number: 8,
    name: "\u6743\u6756\u516B",
    nameEn: "Eight of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "8",
    keywords: [
      "\u8FC5\u901F",
      "\u6D88\u606F",
      "\u6D41\u52A8",
      "\u98DE\u77E2"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u516B\u652F\u6743\u6756\u5982\u7BAD\u7834\u7A7A\u800C\u81F3\uFF0C\u8FDF\u6765\u7684\u90FD\u4F1A\u5728\u6B64\u523B\u9F50\u53D1\u3002",
    upright: {
      meaning: "\u8282\u594F\u52A0\u5FEB\uFF0C\u4FE1\u606F\u3001\u673A\u4F1A\u3001\u8FDB\u5C55\u63A5\u8FDE\u800C\u6765\u3002",
      love: "\u60AC\u800C\u672A\u51B3\u7684\u5BF9\u8BDD\u88AB\u63A8\u8FDB\uFF0C\u89C1\u9762\u6216\u8868\u767D\u8FD1\u5728\u54AB\u5C3A\u3002",
      career: "\u9879\u76EE\u63A8\u8FDB\u63D0\u901F\uFF0C\u9700\u8981\u540C\u65F6\u5904\u7406\u591A\u7EBF\u3002",
      advice: "\u522B\u62D6\uFF0C\u987A\u52BF\u800C\u4E3A\u3002"
    },
    reversed: {
      meaning: "\u8282\u594F\u5931\u63A7\uFF0C\u6216\u6D88\u606F\u5835\u585E\u3001\u8BEF\u89E3\u4E1B\u751F\u3002",
      love: "\u6C9F\u901A\u53D8\u5F62\uFF0C\u77ED\u4FE1\u6BD4\u5FC3\u66F4\u5FEB\u3002",
      career: "\u591A\u7EBF\u5E76\u53D1\u5BFC\u81F4\u5931\u8BEF\u3002",
      advice: "\u7ED9\u51B2\u52B2\u52A0\u4E00\u70B9\u7F30\u7EF3\u3002"
    }
  },
  {
    id: "wands-9",
    number: 9,
    name: "\u6743\u6756\u4E5D",
    nameEn: "Nine of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "9",
    keywords: [
      "\u97E7\u6027",
      "\u9632\u7EBF",
      "\u4F24\u75D5",
      "\u6700\u540E\u4E00\u640F"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u4F24\u75D5\u672A\u6108\uFF0C\u4F46\u4F60\u4ECD\u63E1\u7D27\u6700\u540E\u4E00\u6839\u6743\u6756\uFF0C\u79BB\u80DC\u5229\u53EA\u5DEE\u4E00\u6B65\u3002",
    upright: {
      meaning: "\u8EAB\u5FC3\u75B2\u60EB\uFF0C\u5374\u8FD8\u6709\u4E00\u6218\u7684\u97E7\u6027\u3002",
      love: "\u7ECF\u5386\u4F24\u540E\u518D\u5C1D\u8BD5\uFF0C\u8B66\u60D5\u4F46\u613F\u610F\u3002",
      career: "\u5DEE\u6700\u540E\u4E00\u6B65\u5C31\u80FD\u6536\u5C3E\uFF0C\u522B\u653E\u5F03\u3002",
      advice: "\u4F60\u5DF2\u7ECF\u8D70\u4E86\u8FD9\u4E48\u8FDC\u3002"
    },
    reversed: {
      meaning: "\u8FC7\u5EA6\u6212\u5907\uFF0C\u6216\u628A\u75B2\u60EB\u8BEF\u8BA4\u4E3A\u8F6F\u5F31\u3002",
      love: "\u7528\u65E7\u4F24\u9632\u5FA1\u65B0\u4EBA\u3002",
      career: "\u88AB\u8FC7\u53BB\u7684\u5931\u8D25\u56F0\u4F4F\u624B\u811A\u3002",
      advice: "\u8001\u6218\u573A\u4E0D\u8BE5\u51B3\u5B9A\u65B0\u6218\u5F79\u3002"
    }
  },
  {
    id: "wands-10",
    number: 10,
    name: "\u6743\u6756\u5341",
    nameEn: "Ten of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "10",
    keywords: [
      "\u8D1F\u8377",
      "\u80A9\u62C5",
      "\u8D85\u8F7D",
      "\u653E\u4E0B"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u4F60\u628A\u5341\u652F\u6743\u6756\u4E00\u628A\u62B1\u5728\u6000\u91CC\uFF0C\u80CC\u8D1F\u8D8A\u91CD\uFF0C\u8D8A\u770B\u4E0D\u89C1\u8DEF\u3002",
    upright: {
      meaning: "\u8D23\u4EFB\u5806\u5230\u4E34\u754C\u70B9\uFF0C\u5FC5\u987B\u5B66\u4F1A\u53D6\u820D\u3002",
      love: "\u628A\u592A\u591A\u60C5\u7EEA\u72EC\u81EA\u625B\u7740\uFF0C\u4F34\u4FA3\u4E5F\u770B\u4E0D\u89C1\u3002",
      career: "\u5168\u90FD\u63A5\u4E0B\uFF0C\u53CD\u800C\u4EC0\u4E48\u90FD\u505A\u4E0D\u597D\u3002",
      advice: "\u653E\u4E0B\u4E00\u4E9B\uFF0C\u624D\u8D70\u5F97\u8FDC\u3002"
    },
    reversed: {
      meaning: "\u5F00\u59CB\u5378\u4E0B\u91CD\u62C5\uFF0C\u770B\u89C1\u5598\u606F\u7684\u53EF\u80FD\u3002",
      love: "\u613F\u610F\u5206\u62C5\u6216\u6C42\u52A9\u3002",
      career: "\u6388\u6743\u3001\u63A8\u6389\u975E\u5FC5\u8981\u7684\u4E8B\u3002",
      advice: "\u4E0D\u662F\u6240\u6709\u90FD\u8BE5\u7531\u4F60\u625B\u3002"
    }
  },
  {
    id: "wands-page",
    number: 11,
    name: "\u6743\u6756\u4F8D\u8005",
    nameEn: "Page of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "page",
    keywords: [
      "\u63A2\u9669",
      "\u597D\u5947",
      "\u65B0\u6D88\u606F",
      "\u8BD5\u9519"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u811A\u6B65\u8F7B\u5FEB\uFF0C\u76EE\u5149\u707C\u707C\uFF0C\u4F60\u8EAB\u4E0A\u4ECD\u5E26\u7740\u5B69\u5B50\u822C\u7684\u5192\u9669\u6B32\u3002",
    upright: {
      meaning: "\u597D\u5947\u5FC3\u9886\u8DEF\uFF0C\u9002\u5408\u5C1D\u8BD5\u3001\u8BD5\u6C34\u3001\u8868\u8FBE\u3002",
      love: "\u6D3B\u6CFC\u76F4\u63A5\u7684\u5438\u5F15\uFF0C\u6216\u6765\u81EA\u5E74\u8F7B\u5BF9\u8C61\u7684\u4FE1\u606F\u3002",
      career: "\u65B0\u6D88\u606F\u3001\u65B0\u9879\u76EE\u3001\u65B0\u5C1D\u8BD5\u3002",
      advice: "\u53BB\u8BD5\u5427\uFF0C\u5148\u73A9\u8D77\u6765\u3002"
    },
    reversed: {
      meaning: "\u4E09\u5206\u949F\u70ED\u5EA6\uFF0C\u6216\u51B2\u52A8\u5E26\u6765\u5C0F\u9EBB\u70E6\u3002",
      love: "\u82B1\u5FC3\u6216\u8FC7\u5EA6\u8868\u6F14\u3002",
      career: "\u8BA1\u5212\u6F66\u8349\uFF0C\u6267\u884C\u529B\u8DDF\u4E0D\u4E0A\u3002",
      advice: "\u5174\u594B\u4E4B\u540E\u4E5F\u8981\u80FD\u575A\u6301\u3002"
    }
  },
  {
    id: "wands-knight",
    number: 12,
    name: "\u6743\u6756\u9A91\u58EB",
    nameEn: "Knight of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "knight",
    keywords: [
      "\u51B2\u950B",
      "\u6FC0\u60C5",
      "\u901F\u5EA6",
      "\u8FDC\u5F81"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u70C8\u9A6C\u5636\u9E23\uFF0C\u706B\u7130\u5728\u4F60\u8EAB\u540E\u7FFB\u98DE\uFF0C\u4F60\u4E0D\u662F\u5728\u5954\u8DD1\uFF0C\u4F60\u5C31\u662F\u5954\u8DD1\u672C\u8EAB\u3002",
    upright: {
      meaning: "\u884C\u52A8\u529B\u7206\u8868\uFF0C\u6562\u95EF\u6562\u8BD5\u3002",
      love: "\u70ED\u70C8\u4E3B\u52A8\uFF0C\u4F46\u8282\u594F\u5FEB\u8FC7\u5BF9\u65B9\u3002",
      career: "\u5FEB\u901F\u63A8\u8FDB\uFF0C\u9886\u519B\u51B2\u950B\u3002",
      advice: "\u8BB0\u5F97\u56DE\u5934\u770B\u770B\u961F\u4F0D\u8FD8\u5728\u5417\u3002"
    },
    reversed: {
      meaning: "\u51B2\u52A8\u5E26\u6765\u540E\u679C\uFF0C\u6216\u884C\u52A8\u5931\u7126\u3002",
      love: "\u6765\u5F97\u731B\u8D70\u5F97\u5FEB\uFF0C\u96BE\u4EE5\u843D\u5730\u3002",
      career: "\u6539\u53D8\u592A\u9891\u7E41\uFF0C\u534A\u9014\u800C\u5E9F\u3002",
      advice: "\u628A\u6FC0\u60C5\u7ED1\u5728\u4E00\u4E2A\u76EE\u6807\u4E0A\u3002"
    }
  },
  {
    id: "wands-queen",
    number: 13,
    name: "\u6743\u6756\u7687\u540E",
    nameEn: "Queen of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "queen",
    keywords: [
      "\u81EA\u4FE1",
      "\u9B45\u529B",
      "\u9886\u5BFC",
      "\u70ED\u5EA6"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u5979\u4E00\u8FDB\u95E8\uFF0C\u5C4B\u91CC\u5C31\u4EAE\u4E86\u3002\u81EA\u4FE1\u4E0E\u6E29\u5EA6\u90FD\u4ECE\u5979\u6307\u5C16\u6D41\u51FA\u3002",
    upright: {
      meaning: "\u81EA\u4FE1\u6709\u611F\u67D3\u529B\uFF0C\u505A\u81EA\u5DF1\u7684\u5973\u738B\u3002",
      love: "\u5766\u8361\u53C8\u70ED\u60C5\uFF0C\u6E05\u695A\u5730\u77E5\u9053\u81EA\u5DF1\u8981\u4EC0\u4E48\u3002",
      career: "\u4EE5\u9B45\u529B\u548C\u884C\u52A8\u529B\u805A\u62E2\u56E2\u961F\u3002",
      advice: "\u522B\u7F29\u5C0F\u81EA\u5DF1\u3002"
    },
    reversed: {
      meaning: "\u5F3A\u52BF\u8FC7\u5934\uFF0C\u6216\u5AC9\u5992\u541E\u566C\u5149\u8292\u3002",
      love: "\u5360\u6709\u6B32\u6216\u63A7\u5236\u6B32\u663E\u73B0\u3002",
      career: "\u60C5\u7EEA\u5316\u7BA1\u7406\uFF0C\u5A01\u4FE1\u53D7\u635F\u3002",
      advice: "\u5149\u53EF\u4EE5\u7167\u4EAE\u522B\u4EBA\uFF0C\u4E0D\u5FC5\u707C\u4F24\u3002"
    }
  },
  {
    id: "wands-king",
    number: 14,
    name: "\u6743\u6756\u56FD\u738B",
    nameEn: "King of Wands",
    arcana: "minor",
    suit: "wands",
    rank: "king",
    keywords: [
      "\u613F\u666F",
      "\u9886\u8896",
      "\u51B3\u65AD",
      "\u6218\u7565"
    ],
    element: "\u706B",
    symbol: "\u{1F702}",
    summary: "\u738B\u5EA7\u4E0A\u7684\u4EBA\u4E0D\u53EA\u53D1\u53F7\u65BD\u4EE4\uFF0C\u4ED6\u628A\u7406\u60F3\u5316\u6210\u522B\u4EBA\u80FD\u62B5\u8FBE\u7684\u8DEF\u3002",
    upright: {
      meaning: "\u6709\u613F\u666F\u3001\u6709\u80C6\u8BC6\uFF0C\u6562\u4E8E\u505A\u957F\u671F\u51B3\u65AD\u3002",
      love: "\u5766\u7387\u3001\u5FE0\u8BDA\u3001\u5F15\u9886\u5173\u7CFB\u65B9\u5411\u3002",
      career: "\u6218\u7565\u6E05\u6670\uFF0C\u63A8\u52A8\u56E2\u961F\u524D\u8FDB\u3002",
      advice: "\u4F60\u5C31\u662F\u90A3\u4E2A\u8BE5\u62CD\u677F\u7684\u4EBA\u3002"
    },
    reversed: {
      meaning: "\u72EC\u65AD\u4E13\u884C\uFF0C\u6216\u7406\u60F3\u4E3B\u4E49\u8131\u79BB\u73B0\u5B9E\u3002",
      love: "\u7231\u7684\u65B9\u5F0F\u8FC7\u4E8E\u4E3B\u5BFC\u3002",
      career: "\u51B3\u7B56\u4E13\u65AD\uFF0C\u5FFD\u89C6\u56E2\u961F\u58F0\u97F3\u3002",
      advice: "\u6743\u5A01\u6765\u81EA\u503E\u542C\u3002"
    }
  },
  {
    id: "cups-ace",
    number: 1,
    name: "\u5723\u676F\u4E00",
    nameEn: "Ace of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "ace",
    keywords: [
      "\u60C5\u611F",
      "\u521D\u5FC3",
      "\u4E30\u76C8",
      "\u6E90\u5934"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4E00\u53EA\u91D1\u676F\u6EA2\u51FA\u6C34\u5149\uFF0C\u5FC3\u88AB\u6084\u6084\u6CE8\u6EE1\uFF0C\u5141\u8BB8\u81EA\u5DF1\u88AB\u611F\u52A8\u3002",
    upright: {
      meaning: "\u60C5\u611F\u95F8\u95E8\u6253\u5F00\uFF0C\u65B0\u7684\u7231\u3001\u611F\u52A8\u6216\u7075\u611F\u6CE8\u5165\u3002",
      love: "\u65B0\u604B\u60C5\u7684\u5F00\u7AEF\uFF0C\u6216\u65E7\u5173\u7CFB\u7684\u751C\u871C\u56DE\u6D41\u3002",
      career: "\u521B\u4F5C\u529B\u6D8C\u73B0\uFF0C\u548C\u4EBA\u5408\u4F5C\u683C\u5916\u987A\u3002",
      advice: "\u8BA9\u60C5\u611F\u6D41\u51FA\u6765\uFF0C\u522B\u5173\u4F4F\u5B83\u3002"
    },
    reversed: {
      meaning: "\u60C5\u611F\u5835\u4F4F\u4E86\u6E90\u5934\uFF0C\u611F\u53D7\u88AB\u538B\u6291\u3002",
      love: "\u4E0D\u6562\u6253\u5F00\u81EA\u5DF1\uFF0C\u6216\u5355\u65B9\u9762\u4ED8\u51FA\u3002",
      career: "\u7075\u611F\u67AF\u7AED\uFF0C\u5BF9\u5DE5\u4F5C\u63D0\u4E0D\u8D77\u70ED\u60C5\u3002",
      advice: "\u5148\u7ED9\u81EA\u5DF1\u5012\u4E00\u676F\u3002"
    }
  },
  {
    id: "cups-2",
    number: 2,
    name: "\u5723\u676F\u4E8C",
    nameEn: "Two of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "2",
    keywords: [
      "\u5171\u9E23",
      "\u7ED3\u76DF",
      "\u5BF9\u7B49",
      "\u4EA4\u5FC3"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4E24\u53EA\u676F\u5B50\u78B0\u5728\u4E00\u8D77\uFF0C\u5F7C\u6B64\u4E3E\u676F\uFF0C\u5C31\u662F\u4E00\u6B21\u65E0\u58F0\u7684\u627F\u8BFA\u3002",
    upright: {
      meaning: "\u5BF9\u7B49\u3001\u4E92\u76F8\u7406\u89E3\u7684\u8FDE\u7ED3\u6B63\u5728\u6210\u5F62\u3002",
      love: "\u4E92\u76F8\u5438\u5F15\uFF0C\u613F\u610F\u8FC8\u51FA\u7B2C\u4E00\u6B65\u3002",
      career: "\u5408\u4F5C\u4F19\u4F34\u6C14\u573A\u76F8\u6295\uFF0C\u4E00\u62CD\u5373\u5408\u3002",
      advice: "\u628A\u63E1\u8FD9\u4EFD\u9ED8\u5951\u3002"
    },
    reversed: {
      meaning: "\u8FDE\u7ED3\u5931\u8861\uFF0C\u4E00\u65B9\u6295\u5165\u3001\u4E00\u65B9\u758F\u79BB\u3002",
      love: "\u5435\u67B6\u3001\u51B7\u6218\u3001\u6216\u4EF7\u503C\u89C2\u66B4\u9732\u5206\u6B67\u3002",
      career: "\u5408\u4F5C\u7406\u5FF5\u4E0D\u4E00\u81F4\u3002",
      advice: "\u5148\u8BA9\u5F7C\u6B64\u628A\u8BDD\u8BF4\u5B8C\u3002"
    }
  },
  {
    id: "cups-3",
    number: 3,
    name: "\u5723\u676F\u4E09",
    nameEn: "Three of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "3",
    keywords: [
      "\u5E86\u795D",
      "\u53CB\u8C0A",
      "\u793E\u7FA4",
      "\u5171\u4EAB\u559C\u60A6"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4E09\u53EA\u676F\u5B50\u9AD8\u9AD8\u4E3E\u8D77\uFF0C\u8FD9\u4E00\u523B\u7684\u7B11\u58F0\u4F1A\u6210\u4E3A\u672A\u6765\u7684\u56DE\u5FC6\u3002",
    upright: {
      meaning: "\u8EAB\u8FB9\u4EBA\u4E92\u76F8\u652F\u6301\uFF0C\u5171\u4EAB\u597D\u6D88\u606F\u3002",
      love: "\u793E\u4EA4\u5708\u91CC\u6709\u7F18\u4EFD\u6216\u5171\u540C\u5E86\u795D\u7684\u7406\u7531\u3002",
      career: "\u56E2\u961F\u5B8C\u5DE5\u3001\u6B22\u5E86\u3001\u9879\u76EE\u5408\u4F5C\u6109\u5FEB\u3002",
      advice: "\u522B\u4E00\u4E2A\u4EBA\u625B\u559C\u60A6\u3002"
    },
    reversed: {
      meaning: "\u70ED\u95F9\u8FC7\u540E\u7A7A\u865A\uFF0C\u6216\u88AB\u5C0F\u56E2\u4F53\u6392\u65A5\u3002",
      love: "\u7B2C\u4E09\u8005\u4ECB\u5165\u6216\u793E\u4EA4\u5173\u7CFB\u6DFB\u4E71\u3002",
      career: "\u56E2\u961F\u6C1B\u56F4\u8868\u9762\u548C\u8C10\u5B9E\u5219\u5185\u8017\u3002",
      advice: "\u9009\u80FD\u771F\u6B63\u8BA9\u4F60\u653E\u677E\u7684\u670B\u53CB\u3002"
    }
  },
  {
    id: "cups-4",
    number: 4,
    name: "\u5723\u676F\u56DB",
    nameEn: "Four of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "4",
    keywords: [
      "\u51B7\u611F",
      "\u5026\u6020",
      "\u6F20\u89C6",
      "\u91CD\u65B0\u5BA1\u89C6"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4E09\u53EA\u676F\u5B50\u6446\u5728\u9762\u524D\uFF0C\u4F60\u5374\u53EA\u76EF\u7740\u7B2C\u56DB\u53EA\u770B\u4E0D\u89C1\u7684\u2014\u5B83\u5176\u5B9E\u5C31\u60AC\u5728\u534A\u7A7A\u3002",
    upright: {
      meaning: "\u611F\u5230\u6C89\u95F7\u3001\u770B\u4E0D\u89C1\u5DF2\u6709\u7684\u597D\u4E1C\u897F\u3002",
      love: "\u5BF9\u773C\u524D\u7684\u5173\u7CFB\u4EA7\u751F\u5026\u6020\u611F\u3002",
      career: "\u673A\u4F1A\u51FA\u73B0\u4E86\u4F46\u4F60\u63D0\u4E0D\u8D77\u52B2\u3002",
      advice: "\u62AC\u5934\u770B\u770B\u88AB\u4F60\u5FFD\u7565\u7684\u793C\u7269\u3002"
    },
    reversed: {
      meaning: "\u8D70\u51FA\u5026\u6020\uFF0C\u91CD\u65B0\u71C3\u8D77\u5174\u8DA3\u3002",
      love: "\u5173\u7CFB\u8FDB\u5165\u65B0\u9636\u6BB5\uFF0C\u91CD\u65B0\u770B\u89C1\u5BF9\u65B9\u3002",
      career: "\u91CD\u65B0\u63A5\u53D7\u4E00\u4E2A\u66FE\u7ECF\u62D2\u7EDD\u7684\u673A\u4F1A\u3002",
      advice: "\u73B0\u5728\u662F\u91CD\u65B0\u6253\u5F00\u5FC3\u7684\u65F6\u673A\u3002"
    }
  },
  {
    id: "cups-5",
    number: 5,
    name: "\u5723\u676F\u4E94",
    nameEn: "Five of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "5",
    keywords: [
      "\u5931\u843D",
      "\u60B2\u4F24",
      "\u54C0\u60BC",
      "\u6B8B\u7559"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4E09\u53EA\u676F\u5B50\u7FFB\u5012\uFF0C\u4F60\u4F4E\u5934\u76EF\u7740\u6EA2\u51FA\u7684\u6C34\uFF0C\u5374\u5FD8\u4E86\u8EAB\u540E\u8FD8\u6709\u4E24\u53EA\u4ECD\u6EE1\u3002",
    upright: {
      meaning: "\u5931\u53BB\u5E26\u6765\u7684\u60B2\u4F24\u5360\u6EE1\u89C6\u91CE\u3002",
      love: "\u5206\u624B\u3001\u8BEF\u4F1A\u6216\u4E00\u6BB5\u7231\u7684\u7ED3\u675F\u3002",
      career: "\u9879\u76EE\u5931\u8D25\u6216\u664B\u5347\u843D\u7A7A\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u96BE\u8FC7\uFF0C\u4E5F\u522B\u5FD8\u8BB0\u8EAB\u540E\u7684\u5149\u3002"
    },
    reversed: {
      meaning: "\u9010\u6E10\u8D70\u51FA\u4F24\u53E3\uFF0C\u613F\u610F\u62AC\u5934\u3002",
      love: "\u4FEE\u590D\u4E00\u6BB5\u8BEF\u4F1A\uFF0C\u6216\u63A5\u53D7\u5173\u7CFB\u5DF2\u7ED3\u675F\u3002",
      career: "\u4ECE\u5931\u8D25\u91CC\u770B\u89C1\u65B0\u7684\u65B9\u5411\u3002",
      advice: "\u628A\u773C\u6CEA\u7559\u7ED9\u5B83\u7684\u7406\u7531\uFF0C\u7136\u540E\u7EE7\u7EED\u3002"
    }
  },
  {
    id: "cups-6",
    number: 6,
    name: "\u5723\u676F\u516D",
    nameEn: "Six of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "6",
    keywords: [
      "\u7AE5\u5E74",
      "\u7EAF\u771F",
      "\u65E7\u8BC6",
      "\u6E29\u67D4"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u8BB0\u5FC6\u91CC\u90A3\u675F\u9633\u5149\u4ECE\u672A\u771F\u7684\u79BB\u5F00\uFF0C\u4ECA\u5929\u5B83\u53C8\u56DE\u5230\u4F60\u7684\u676F\u53E3\u3002",
    upright: {
      meaning: "\u6E29\u67D4\u56DE\u5FC6\u6D8C\u73B0\uFF0C\u6216\u65E7\u53CB\u91CD\u9022\u3002",
      love: "\u521D\u604B\u3001\u9752\u6885\u7AF9\u9A6C\u6216\u590D\u5408\u7684\u53EF\u80FD\u3002",
      career: "\u8FC7\u53BB\u7684\u7ECF\u9A8C\u6210\u4E3A\u4ECA\u5929\u7684\u8D44\u672C\u3002",
      advice: "\u7528\u7AE5\u5FC3\u770B\u770B\u773C\u524D\u3002"
    },
    reversed: {
      meaning: "\u56F0\u5728\u8FC7\u53BB\uFF0C\u9003\u907F\u73B0\u5B9E\u3002",
      love: "\u6D3B\u5728\u65E7\u611F\u60C5\u91CC\uFF0C\u65E0\u6CD5\u5411\u524D\u3002",
      career: "\u8FC7\u5EA6\u4F9D\u8D56\u8FC7\u53BB\u7684\u6210\u529F\u6A21\u677F\u3002",
      advice: "\u5E26\u7740\u56DE\u5FC6\u5F80\u524D\u8D70\uFF0C\u522B\u7559\u4E0B\u6765\u3002"
    }
  },
  {
    id: "cups-7",
    number: 7,
    name: "\u5723\u676F\u4E03",
    nameEn: "Seven of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "7",
    keywords: [
      "\u5E7B\u60F3",
      "\u9009\u9879",
      "\u8FF7\u96FE",
      "\u767D\u65E5\u68A6"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4E03\u53EA\u676F\u5B50\u5728\u4E91\u7AEF\u98D8\u6D6E\uFF0C\u6BCF\u4E00\u53EA\u90FD\u8BF1\u4EBA\uFF0C\u4F46\u53EA\u6709\u4E00\u53EA\u662F\u771F\u7684\u4F60\u60F3\u8981\u3002",
    upright: {
      meaning: "\u9009\u9879\u592A\u591A\uFF0C\u5BB9\u6613\u9677\u5165\u5E7B\u60F3\u3002",
      love: "\u5FC3\u52A8\u5BF9\u8C61\u591A\uFF0C\u4F46\u6CA1\u4EBA\u771F\u6B63\u843D\u5730\u3002",
      career: "\u65B9\u5411\u592A\u591A\uFF0C\u7CBE\u529B\u5206\u6563\u3002",
      advice: "\u6233\u7834\u5176\u4E2D\u4E00\u6735\u4E91\uFF0C\u770B\u770B\u5E95\u4E0B\u662F\u4EC0\u4E48\u3002"
    },
    reversed: {
      meaning: "\u7EC8\u4E8E\u5206\u5F97\u6E05\u5E7B\u60F3\u548C\u73B0\u5B9E\u3002",
      love: "\u770B\u6E05\u5BF9\u65B9\u7684\u672C\u6765\u6837\u5B50\u3002",
      career: "\u7CBE\u7B80\u9009\u9879\uFF0C\u9009\u5B9A\u65B9\u5411\u3002",
      advice: "\u51CF\u6389\u4E00\u534A\uFF0C\u5269\u4E0B\u7684\u66F4\u6E05\u6670\u3002"
    }
  },
  {
    id: "cups-8",
    number: 8,
    name: "\u5723\u676F\u516B",
    nameEn: "Eight of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "8",
    keywords: [
      "\u79BB\u5F00",
      "\u8F6C\u8EAB",
      "\u8FFD\u5BFB",
      "\u6210\u5168\u81EA\u5DF1"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u516B\u53EA\u676F\u5B50\u88AB\u6574\u9F50\u5730\u7559\u4E0B\uFF0C\u4F60\u80CC\u8D77\u884C\u56CA\uFF0C\u5411\u770B\u4E0D\u89C1\u7684\u5C71\u8D70\u53BB\u3002",
    upright: {
      meaning: "\u89C9\u5BDF\u5230\u73B0\u72B6\u4E0D\u591F\uFF0C\u9009\u62E9\u79BB\u5F00\u53BB\u5BFB\u627E\u3002",
      love: "\u544A\u522B\u4E00\u6BB5\u5DF2\u65E0\u6CD5\u6ECB\u517B\u4F60\u7684\u5173\u7CFB\u3002",
      career: "\u8F9E\u6389\u5B89\u7A33\u5374\u7A7A\u6D1E\u7684\u5DE5\u4F5C\u3002",
      advice: "\u6709\u4E9B\u6210\u5168\uFF0C\u662F\u7ED9\u81EA\u5DF1\u7684\u3002"
    },
    reversed: {
      meaning: "\u60F3\u8D70\u53C8\u4E0D\u6562\u8D70\uFF0C\u53CD\u590D\u62C9\u626F\u3002",
      love: "\u820D\u4E0D\u5F97\u5173\u7CFB\u91CC\u7684\u4E60\u60EF\uFF0C\u4F46\u4E5F\u4E0D\u518D\u5FEB\u4E50\u3002",
      career: "\u7559\u604B\u65E2\u6709\u8D44\u6E90\uFF0C\u9519\u8FC7\u66F4\u9002\u5408\u7684\u8DEF\u3002",
      advice: "\u8FDF\u8FDF\u672A\u8D70\uFF0C\u4E5F\u662F\u4E00\u79CD\u9009\u62E9\u3002"
    }
  },
  {
    id: "cups-9",
    number: 9,
    name: "\u5723\u676F\u4E5D",
    nameEn: "Nine of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "9",
    keywords: [
      "\u6EE1\u8DB3",
      "\u5982\u613F",
      "\u4E30\u76DB",
      "\u8BB8\u613F"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4E5D\u53EA\u676F\u5B50\u5728\u4F60\u8EAB\u540E\u95EA\u5149\uFF0C\u8FD9\u662F\u4F60\u4E3A\u81EA\u5DF1\u8BB8\u4E0B\u53C8\u5B9E\u73B0\u7684\u613F\u671B\u3002",
    upright: {
      meaning: "\u5FC3\u60F3\u4E8B\u6210\u7684\u4E30\u76DB\u611F\uFF0C\u503C\u5F97\u4E3A\u81EA\u5DF1\u5E86\u795D\u3002",
      love: "\u5173\u7CFB\u8FDB\u5165\u751C\u871C\u671F\uFF0C\u611F\u5230\u88AB\u770B\u89C1\u3002",
      career: "\u6536\u83B7\u671F\uFF0C\u85AA\u8D44\u3001\u6210\u5C31\u3001\u8BA4\u53EF\u5230\u4F4D\u3002",
      advice: "\u628A\u559C\u60A6\u5B58\u8D77\u6765\uFF0C\u5B83\u662F\u672A\u6765\u7684\u529B\u91CF\u3002"
    },
    reversed: {
      meaning: '\u7269\u8D28\u6EE1\u8DB3\u5374\u5185\u5FC3\u7A7A\u865A\uFF0C\u6216\u53EA\u5728\u4E4E\u5916\u8868\u7684"\u5706\u6EE1"\u3002',
      love: "\u5173\u7CFB\u770B\u8D77\u6765\u5F88\u597D\uFF0C\u5374\u6CA1\u6DF1\u5EA6\u3002",
      career: "\u9AD8\u85AA\u4F46\u70ED\u60C5\u5DF2\u6D88\u5931\u3002",
      advice: "\u95EE\u95EE\u81EA\u5DF1\uFF1A\u8FD9\u662F\u4E0D\u662F\u6211\u771F\u7684\u8981\u7684\uFF1F"
    }
  },
  {
    id: "cups-10",
    number: 10,
    name: "\u5723\u676F\u5341",
    nameEn: "Ten of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "10",
    keywords: [
      "\u548C\u8C10",
      "\u5BB6\u5EAD",
      "\u5706\u6EE1",
      "\u957F\u4E45"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u5929\u8FB9\u51FA\u73B0\u5341\u53EA\u5723\u676F\u7684\u5F69\u8679\uFF0C\u4F60\u7EC8\u4E8E\u62B5\u8FBE\u4E86\u60F3\u8981\u7684\u5BB6\u3002",
    upright: {
      meaning: "\u6DF1\u5C42\u7684\u60C5\u611F\u6EE1\u8DB3\u4E0E\u957F\u4E45\u7684\u5E78\u798F\u611F\u3002",
      love: "\u5173\u7CFB\u8FDB\u5165\u7A33\u5B9A\u3001\u6E29\u6696\u7684\u9636\u6BB5\u3002",
      career: "\u5DE5\u4F5C\u4E0E\u751F\u6D3B\u8FBE\u6210\u5E73\u8861\u3002",
      advice: "\u611F\u8C22\u4E00\u8DEF\u4E0A\u966A\u4F60\u8D70\u7684\u4EBA\u3002"
    },
    reversed: {
      meaning: "\u8868\u9762\u548C\u8C10\uFF0C\u5185\u91CC\u5931\u8861\u3002",
      love: '\u4E3A\u4E86"\u5408\u5BB6\u56E2\u5706"\u538B\u6291\u771F\u5B9E\u9700\u6C42\u3002',
      career: "\u4E3A\u5DE5\u4F5C\u727A\u7272\u5173\u7CFB\uFF0C\u53CD\u4E4B\u4EA6\u7136\u3002",
      advice: "\u7406\u60F3\u5BB6\u5EAD\u7684\u6A21\u677F\u4E0D\u5FC5\u7B26\u5408\u522B\u4EBA\u7684\u3002"
    }
  },
  {
    id: "cups-page",
    number: 11,
    name: "\u5723\u676F\u4F8D\u8005",
    nameEn: "Page of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "page",
    keywords: [
      "\u7AE5\u771F",
      "\u4FE1\u606F",
      "\u7075\u611F",
      "\u610F\u5916\u611F\u52A8"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u676F\u4E2D\u9C7C\u513F\u8DC3\u51FA\uFF0C\u9012\u6765\u4E00\u5C01\u6765\u81EA\u5FC3\u91CC\u7684\u4FE1\uFF0C\u53EB\u4F60\u522B\u518D\u88C5\u4F5C\u957F\u5927\u3002",
    upright: {
      meaning: "\u6E29\u67D4\u7684\u4FE1\u606F\u62B5\u8FBE\uFF0C\u53EF\u80FD\u662F\u544A\u767D\u3001\u7075\u611F\u6216\u60CA\u559C\u3002",
      love: "\u5C0F\u5C0F\u5FC3\u610F\u6216\u4E00\u89C1\u503E\u5FC3\u3002",
      career: "\u521B\u4F5C\u6216\u827A\u672F\u9879\u76EE\u7684\u65B0\u63D0\u6848\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u88AB\u6253\u52A8\u3002"
    },
    reversed: {
      meaning: "\u60C5\u7EEA\u5316\u3001\u4EFB\u6027\u3001\u6216\u865A\u60CA\u4E00\u573A\u3002",
      love: "\u8FC7\u5EA6\u654F\u611F\u6216\u5E7C\u7A1A\u53CD\u5E94\u3002",
      career: "\u8111\u6D1E\u4E0D\u843D\u5730\u3002",
      advice: "\u611F\u52A8\u8981\u5316\u4F5C\u884C\u52A8\uFF0C\u4E0D\u7136\u5C31\u6563\u4E86\u3002"
    }
  },
  {
    id: "cups-knight",
    number: 12,
    name: "\u5723\u676F\u9A91\u58EB",
    nameEn: "Knight of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "knight",
    keywords: [
      "\u6D6A\u6F2B",
      "\u9080\u8BF7",
      "\u8FFD\u968F\u5FC3\u610F",
      "\u98CE\u5EA6"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u4ED6\u4E0D\u75BE\u4E0D\u5F90\u5730\u8D70\u6765\uFF0C\u624B\u4E0A\u6258\u7740\u4E00\u676F\u6625\u6C34\uFF0C\u662F\u5411\u4E16\u754C\u53D1\u51FA\u7684\u9080\u8BF7\u51FD\u3002",
    upright: {
      meaning: "\u6D6A\u6F2B\u3001\u7406\u60F3\u4E3B\u4E49\u5730\u8FFD\u6C42\u5FC3\u4E4B\u6240\u5411\u3002",
      love: "\u4E3B\u52A8\u3001\u4F53\u8D34\u7684\u8FFD\u6C42\u8005\u3002",
      career: "\u4EE5\u60C5\u611F\u4E0E\u827A\u672F\u65B9\u5F0F\u63A8\u52A8\u4E8B\u60C5\u3002",
      advice: "\u8DDF\u4E0A\u5FC3\u7684\u8282\u594F\uFF0C\u4E5F\u522B\u5FD8\u4E86\u5730\u56FE\u3002"
    },
    reversed: {
      meaning: "\u534E\u800C\u4E0D\u5B9E\uFF0C\u6216\u88AB\u60C5\u7EEA\u4E3B\u5BFC\u800C\u884C\u52A8\u8FDF\u7F13\u3002",
      love: "\u8A00\u8BED\u6F02\u4EAE\u4F46\u7F3A\u4E4F\u5151\u73B0\u3002",
      career: "\u7406\u60F3\u8FC7\u9AD8\uFF0C\u6267\u884C\u4E0D\u8DB3\u3002",
      advice: "\u4E0B\u6B21\u63D0\u524D\u628A\u652F\u7968\u5151\u73B0\u3002"
    }
  },
  {
    id: "cups-queen",
    number: 13,
    name: "\u5723\u676F\u7687\u540E",
    nameEn: "Queen of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "queen",
    keywords: [
      "\u5171\u60C5",
      "\u76F4\u89C9",
      "\u6E29\u67D4",
      "\u6D77"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u5979\u5750\u5728\u6D77\u5CB8\u4E0A\uFF0C\u628A\u676F\u5B50\u9012\u7ED9\u6BCF\u4E00\u4E2A\u9760\u8FD1\u7684\u7075\u9B42\uFF0C\u5374\u4ECE\u4E0D\u95EE\u4E3A\u4EC0\u4E48\u3002",
    upright: {
      meaning: "\u5171\u60C5\u80FD\u529B\u5F3A\uFF0C\u60C5\u7EEA\u7A33\u5B9A\u53C8\u6709\u6E29\u5EA6\u3002",
      love: "\u7ED9\u4E88\u65E0\u6761\u4EF6\u7684\u7406\u89E3\u4E0E\u652F\u6301\u3002",
      career: "\u64C5\u957F\u4EBA\u9645\u5173\u7CFB\u3001\u8F85\u5BFC\u3001\u6CBB\u7597\u3002",
      advice: "\u4E5F\u8981\u8BB0\u5F97\u7231\u81EA\u5DF1\u3002"
    },
    reversed: {
      meaning: "\u60C5\u7EEA\u8FC7\u8F7D\uFF0C\u6216\u88AB\u4ED6\u4EBA\u4F9D\u8D56\u8017\u5C3D\u3002",
      love: "\u8FC7\u5EA6\u727A\u7272\u6216\u60C5\u7EEA\u7ED1\u67B6\u3002",
      career: "\u5171\u60C5\u5230\u9EBB\u6728\uFF0C\u754C\u9650\u6A21\u7CCA\u3002",
      advice: "\u5171\u60C5\u4E0D\u662F\u628A\u6C34\u5012\u5149\u3002"
    }
  },
  {
    id: "cups-king",
    number: 14,
    name: "\u5723\u676F\u56FD\u738B",
    nameEn: "King of Cups",
    arcana: "minor",
    suit: "cups",
    rank: "king",
    keywords: [
      "\u60C5\u5546",
      "\u4ECE\u5BB9",
      "\u6148\u60B2",
      "\u638C\u8235"
    ],
    element: "\u6C34",
    symbol: "\u{1F704}",
    summary: "\u6CE2\u6D9B\u6C79\u6D8C\u65F6\u4ED6\u4ECD\u5728\u738B\u5EA7\u4E0A\uFF0C\u6C34\u5728\u8EAB\u4E0B\u7FFB\u817E\uFF0C\u4ED6\u7A33\u5982\u4E00\u5EA7\u5C9B\u3002",
    upright: {
      meaning: "\u60C5\u7EEA\u6210\u719F\uFF0C\u7528\u667A\u6167\u548C\u6148\u60B2\u9886\u5BFC\u3002",
      love: "\u53EF\u9760\u3001\u6DF1\u60C5\u3001\u80FD\u5BB9\u7EB3\u5BF9\u65B9\u60C5\u7EEA\u3002",
      career: "\u5904\u7406\u5173\u7CFB\u548C\u5371\u673A\u7684\u9AD8\u624B\u3002",
      advice: "\u4F60\u53EF\u4EE5\u6E29\u67D4\u800C\u6709\u529B\u3002"
    },
    reversed: {
      meaning: "\u60C5\u7EEA\u538B\u6291\u6216\u64CD\u7EB5\u4ED6\u4EBA\u611F\u53D7\u3002",
      love: "\u8868\u9762\u7A33\u5B9A\u5185\u91CC\u5931\u63A7\u3002",
      career: "\u56DE\u907F\u51B2\u7A81\u6216\u6743\u8C0B\u8FC7\u591A\u3002",
      advice: "\u5148\u627F\u8BA4\u81EA\u5DF1\u7684\u60C5\u7EEA\u3002"
    }
  },
  {
    id: "swords-ace",
    number: 1,
    name: "\u5B9D\u5251\u4E00",
    nameEn: "Ace of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "ace",
    keywords: [
      "\u6D1E\u5BDF",
      "\u7A81\u7834",
      "\u771F\u76F8",
      "\u65B0\u89C6\u89D2"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u4E00\u628A\u957F\u5251\u5212\u7834\u8FF7\u96FE\uFF0C\u4F60\u770B\u6E05\u4E86\u4E00\u76F4\u60F3\u770B\u6E05\u7684\u90A3\u4EF6\u4E8B\u3002",
    upright: {
      meaning: "\u601D\u8DEF\u7A81\u7136\u660E\u6717\uFF0C\u771F\u76F8\u6D6E\u51FA\u6C34\u9762\u3002",
      love: "\u628A\u4E00\u76F4\u618B\u7740\u7684\u8BDD\u8BF4\u51FA\u53E3\u3002",
      career: "\u5173\u952E\u51B3\u7B56\u7684\u6E05\u6670\u65F6\u523B\u3002",
      advice: "\u5E72\u8106\u5229\u843D\u5730\u843D\u7B14\u3002"
    },
    reversed: {
      meaning: "\u601D\u7EEA\u6DF7\u4E71\u3001\u51B3\u5B9A\u53CD\u590D\u3002",
      love: "\u8BEF\u4F1A\u88AB\u653E\u5927\uFF0C\u6216\u786C\u7740\u5934\u76AE\u6C9F\u901A\u3002",
      career: "\u7B56\u7565\u6A21\u7CCA\uFF0C\u7ED3\u679C\u4E24\u96BE\u3002",
      advice: "\u5148\u628A\u95EE\u9898\u5199\u4E0B\u6765\uFF0C\u518D\u8C08\u7B54\u6848\u3002"
    }
  },
  {
    id: "swords-2",
    number: 2,
    name: "\u5B9D\u5251\u4E8C",
    nameEn: "Two of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "2",
    keywords: [
      "\u50F5\u5C40",
      "\u56DE\u907F",
      "\u6743\u8861",
      "\u8499\u773C"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u4E24\u628A\u5251\u4EA4\u53C9\u5728\u80F8\u524D\uFF0C\u4F60\u95ED\u4E0A\u773C\u775B\uFF0C\u4EE5\u4E3A\u4E0D\u770B\u5C31\u7B49\u4E8E\u6CA1\u53D1\u751F\u3002",
    upright: {
      meaning: "\u4E0D\u613F\u9762\u5BF9\u7684\u9009\u62E9\uFF0C\u9677\u5165\u50F5\u5C40\u3002",
      love: "\u56DE\u907F\u771F\u5B9E\u6C9F\u901A\uFF0C\u8868\u9762\u548C\u5E73\u3002",
      career: "\u4E24\u4E2A\u65B9\u6848\u5404\u6709\u4F18\u52A3\uFF0C\u8FDF\u8FDF\u4E0D\u5B9A\u3002",
      advice: "\u7741\u5F00\u773C\u775B\uFF0C\u624D\u80FD\u770B\u6E05\u8DEF\u3002"
    },
    reversed: {
      meaning: "\u7EC8\u4E8E\u505A\u51FA\u51B3\u5B9A\uFF0C\u6253\u7834\u50F5\u5C40\u3002",
      love: "\u628A\u538B\u6291\u8BF4\u51FA\u6765\uFF0C\u5173\u7CFB\u677E\u53E3\u6C14\u3002",
      career: "\u7ED3\u675F\u62C9\u952F\uFF0C\u505A\u51FA\u9009\u62E9\u3002",
      advice: "\u4E0D\u5B8C\u7F8E\u7684\u51B3\u5B9A\u4E5F\u662F\u51B3\u5B9A\u3002"
    }
  },
  {
    id: "swords-3",
    number: 3,
    name: "\u5B9D\u5251\u4E09",
    nameEn: "Three of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "3",
    keywords: [
      "\u5FC3\u788E",
      "\u4F24\u5BB3",
      "\u771F\u76F8\u7684\u523A",
      "\u54C0\u4F24"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u96E8\u4E2D\u7684\u7EA2\u5FC3\u88AB\u4E09\u628A\u5251\u7A7F\u8FC7\uFF0C\u75DB\u6765\u5F97\u8BDA\u5B9E\uFF0C\u4E5F\u8BDA\u5B9E\u5730\u53EF\u4EE5\u88AB\u611F\u53D7\u3002",
    upright: {
      meaning: "\u5FC3\u88AB\u771F\u76F8\u523A\u7A7F\uFF0C\u5141\u8BB8\u81EA\u5DF1\u60B2\u4F24\u3002",
      love: "\u5206\u624B\u3001\u80CC\u53DB\u6216\u4E00\u6B21\u6DF1\u5EA6\u4F24\u5BB3\u3002",
      career: "\u88AB\u5426\u5B9A\u3001\u88AB\u62D2\u7EDD\u7684\u75DB\u3002",
      advice: "\u628A\u6CEA\u6D41\u51FA\u6765\uFF0C\u522B\u618B\u7740\u3002"
    },
    reversed: {
      meaning: "\u6162\u6162\u4ECE\u4F24\u75DB\u91CC\u590D\u539F\uFF0C\u6216\u91CA\u653E\u65E7\u6028\u3002",
      love: "\u4F24\u53E3\u7ED3\u75C2\uFF0C\u613F\u610F\u518D\u6B21\u5F00\u653E\u3002",
      career: "\u4ECE\u5931\u8D25\u91CC\u6C72\u53D6\u7ECF\u9A8C\u3002",
      advice: "\u75BC\u8FC7\uFF0C\u624D\u66F4\u61C2\u81EA\u5DF1\u8981\u4EC0\u4E48\u3002"
    }
  },
  {
    id: "swords-4",
    number: 4,
    name: "\u5B9D\u5251\u56DB",
    nameEn: "Four of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "4",
    keywords: [
      "\u4F11\u6574",
      "\u9759\u517B",
      "\u95ED\u5173",
      "\u6C89\u601D"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u5251\u653E\u4E00\u65C1\uFF0C\u4F60\u9759\u9759\u8EBA\u4E0B\uFF0C\u8FD9\u4E00\u523B\u53EA\u5C5E\u4E8E\u4F11\u606F\u3002",
    upright: {
      meaning: "\u5F3A\u5236\u4F11\u606F\u3001\u6C89\u6DC0\u3001\u5145\u7535\u3002",
      love: "\u5173\u7CFB\u8FDB\u5165\u6682\u505C\u671F\uFF0C\u5F7C\u6B64\u5598\u606F\u3002",
      career: "\u8BF7\u5047\u3001\u95ED\u5173\u3001\u51A5\u60F3\u662F\u5FC5\u9700\u54C1\u3002",
      advice: "\u4E0D\u505A\uFF0C\u4E5F\u662F\u4E00\u79CD\u505A\u3002"
    },
    reversed: {
      meaning: "\u88AB\u8FEB\u8D77\u8EAB\uFF0C\u6216\u4F11\u606F\u4E0D\u591F\u5C31\u4E0A\u6218\u573A\u3002",
      love: "\u51B7\u6218\u592A\u4E45\u5931\u53BB\u8010\u5FC3\u3002",
      career: "\u8EAB\u4F53\u62C9\u54CD\u8B66\u62A5\u8FD8\u786C\u6491\u3002",
      advice: "\u771F\u6B63\u4F11\u591F\u518D\u52A8\u3002"
    }
  },
  {
    id: "swords-5",
    number: 5,
    name: "\u5B9D\u5251\u4E94",
    nameEn: "Five of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "5",
    keywords: [
      "\u60E8\u80DC",
      "\u51B2\u7A81",
      "\u7F9E\u8FB1",
      "\u4EE3\u4EF7"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u4F60\u62FE\u8D77\u5BF9\u624B\u6389\u843D\u7684\u5251\uFF0C\u5634\u89D2\u7684\u7B11\u5374\u5E26\u7740\u82E6\u5473\u3002",
    upright: {
      meaning: "\u8D62\u4E86\uFF0C\u4F46\u8F93\u4E86\u611F\u60C5\u6216\u539F\u5219\u3002",
      love: "\u5435\u8D62\u4E86\u5BF9\u65B9\u5374\u5931\u53BB\u4E86\u6E29\u5EA6\u3002",
      career: "\u7ADE\u4E89\u6FC0\u70C8\uFF0C\u7559\u4E0B\u4F24\u53E3\u3002",
      advice: "\u95EE\u95EE\u81EA\u5DF1\uFF1A\u8D62\u8FD9\u4EF6\u4E8B\u503C\u4E0D\u503C\u5F97\u3002"
    },
    reversed: {
      meaning: "\u653E\u4E0B\u8FC7\u53BB\u7684\u80DC\u8D1F\uFF0C\u4FEE\u590D\u5173\u7CFB\u3002",
      love: "\u613F\u610F\u4F4E\u5934\u548C\u89E3\u3002",
      career: "\u505C\u6B62\u5185\u8017\uFF0C\u4E13\u6CE8\u5171\u540C\u76EE\u6807\u3002",
      advice: "\u8D62\u4E00\u6B21\u4E0D\u5982\u548C\u4E00\u6B21\u3002"
    }
  },
  {
    id: "swords-6",
    number: 6,
    name: "\u5B9D\u5251\u516D",
    nameEn: "Six of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "6",
    keywords: [
      "\u8FC7\u6E21",
      "\u8FDC\u884C",
      "\u6E21\u6CB3",
      "\u5E73\u9759"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u5C0F\u821F\u5728\u5E73\u9759\u6CB3\u9762\u6ED1\u884C\uFF0C\u4F60\u5E26\u7740\u4F24\uFF0C\u4E5F\u5E26\u7740\u5E0C\u671B\uFF0C\u6162\u6162\u9A76\u5411\u5BF9\u5CB8\u3002",
    upright: {
      meaning: "\u4ECE\u56F0\u5883\u4E2D\u64A4\u51FA\uFF0C\u8D70\u5411\u5E73\u9759\u7684\u65B0\u9636\u6BB5\u3002",
      love: "\u79BB\u5F00\u4E0D\u5408\u9002\u7684\u5173\u7CFB\uFF0C\u91CD\u65B0\u51FA\u53D1\u3002",
      career: "\u6362\u73AF\u5883\u3001\u6362\u57CE\u5E02\u3001\u6362\u5C97\u4F4D\u3002",
      advice: "\u5E26\u4E0A\u6559\u8BAD\uFF0C\u628A\u91CD\u8D1F\u653E\u5728\u6B64\u5CB8\u3002"
    },
    reversed: {
      meaning: "\u60F3\u8D70\u5374\u88AB\u8FC7\u53BB\u7ECA\u4F4F\u3002",
      love: "\u8EAB\u5DF2\u79BB\u4EBA\u672A\u79BB\u3002",
      career: "\u8F9E\u804C\u53C8\u540E\u6094\uFF0C\u6216\u8FDF\u8FDF\u4E0D\u52A8\u3002",
      advice: "\u5148\u5728\u5FC3\u91CC\u544A\u522B\uFF0C\u624D\u80FD\u771F\u6B63\u542F\u822A\u3002"
    }
  },
  {
    id: "swords-7",
    number: 7,
    name: "\u5B9D\u5251\u4E03",
    nameEn: "Seven of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "7",
    keywords: [
      "\u7B56\u7565",
      "\u9690\u7792",
      "\u53D6\u5DE7",
      "\u5355\u72EC\u884C\u52A8"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u4ED6\u6084\u6084\u62FF\u8D70\u4E86\u5251\uFF0C\u9732\u51FA\u610F\u5473\u6DF1\u957F\u7684\u7B11\uFF0C\u4F60\u5206\u4E0D\u6E05\u4ED6\u5728\u5077\u8FD8\u662F\u5728\u6551\u3002",
    upright: {
      meaning: "\u7528\u7B56\u7565\u6216\u4F4E\u8C03\u7684\u65B9\u5F0F\u8FBE\u5230\u76EE\u7684\u3002",
      love: "\u6709\u79D8\u5BC6\u3001\u6216\u611F\u5230\u88AB\u9690\u7792\u3002",
      career: "\u5355\u72EC\u884C\u52A8\u3001\u7528\u5DE7\u52B2\u3002",
      advice: "\u95EE\u81EA\u5DF1\uFF1A\u662F\u4E0D\u662F\u5728\u56DE\u907F\u6B63\u9762\u6C9F\u901A\u3002"
    },
    reversed: {
      meaning: "\u8C0E\u8A00\u88AB\u63ED\u7A7F\uFF0C\u6216\u51B3\u5B9A\u8BF4\u51FA\u771F\u76F8\u3002",
      love: "\u5766\u767D\u6362\u6765\u677E\u53E3\u6C14\u3002",
      career: "\u505C\u6B62\u53D6\u5DE7\uFF0C\u8D70\u6B63\u9053\u3002",
      advice: "\u957F\u671F\u80DC\u5229\u9700\u8981\u900F\u660E\u3002"
    }
  },
  {
    id: "swords-8",
    number: 8,
    name: "\u5B9D\u5251\u516B",
    nameEn: "Eight of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "8",
    keywords: [
      "\u81EA\u56F0",
      "\u675F\u7F1A",
      "\u53D7\u5BB3\u611F",
      "\u89C6\u91CE\u7A84"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u516B\u628A\u5251\u56F4\u7740\u4F60\uFF0C\u4F46\u7EF3\u5B50\u5176\u5B9E\u6CA1\u90A3\u4E48\u7D27\uFF0C\u53EA\u662F\u4F60\u5FD8\u4E86\u8F6C\u8EAB\u770B\u3002",
    upright: {
      meaning: "\u88AB\u81EA\u5DF1\u7684\u60F3\u6CD5\u56F0\u4F4F\uFF0C\u89C9\u5F97\u6CA1\u6709\u51FA\u8DEF\u3002",
      love: "\u81EA\u5351\u3001\u53D7\u5BB3\u611F\u8BA9\u4F60\u4E0D\u6562\u884C\u52A8\u3002",
      career: '\u628A\u81EA\u5DF1\u56F0\u5728"\u505A\u4E0D\u5230"\u91CC\u3002',
      advice: "\u8F6C\u4E2A\u65B9\u5411\uFF0C\u4E16\u754C\u8FD8\u5728\u3002"
    },
    reversed: {
      meaning: "\u7EC8\u4E8E\u770B\u6E05\u662F\u81EA\u5DF1\u7ED9\u81EA\u5DF1\u8BBE\u9650\u3002",
      love: "\u8D70\u51FA\u81EA\u601C\uFF0C\u91CD\u65B0\u4E3B\u5BFC\u3002",
      career: "\u63A5\u53D7\u5E2E\u52A9\u3001\u8DF3\u51FA\u601D\u7EF4\u76F2\u533A\u3002",
      advice: "\u5148\u632A\u4E00\u5C0F\u6B65\uFF0C\u7EF3\u5C31\u677E\u4E86\u3002"
    }
  },
  {
    id: "swords-9",
    number: 9,
    name: "\u5B9D\u5251\u4E5D",
    nameEn: "Nine of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "9",
    keywords: [
      "\u7126\u8651",
      "\u5931\u7720",
      "\u81EA\u8D23",
      "\u5669\u68A6"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u6DF1\u591C\u5750\u8D77\uFF0C\u4E5D\u628A\u5251\u60AC\u5728\u5E8A\u5934\uFF0C\u4F46\u5927\u591A\u662F\u4F60\u81EA\u5DF1\u78E8\u51FA\u6765\u7684\u3002",
    upright: {
      meaning: "\u7126\u8651\u3001\u6127\u759A\u3001\u5931\u7720\u538B\u9876\u3002",
      love: "\u53CD\u590D replay \u4F24\u75DB\u7EC6\u8282\u3002",
      career: "\u62C5\u5FC3\u5931\u8D25\uFF0C\u628A\u4E8B\u60C5\u653E\u5927\u3002",
      advice: "\u9ED1\u591C\u6700\u5927\uFF0C\u5929\u4EAE\u5C31\u7F29\u5C0F\u4E00\u534A\u3002"
    },
    reversed: {
      meaning: "\u4ECE\u707E\u96BE\u5316\u601D\u7EF4\u91CC\u6162\u6162\u8D70\u51FA\u3002",
      love: "\u613F\u610F\u5BFB\u6C42\u5E2E\u52A9\u6216\u6C9F\u901A\u3002",
      career: "\u91CD\u65B0\u63A5\u5730\uFF0C\u56DE\u5230\u4E8B\u5B9E\u3002",
      advice: "\u5199\u4E0B\u6765\uFF0C\u6BD4\u53CD\u590D\u60F3\u66F4\u6709\u6548\u3002"
    }
  },
  {
    id: "swords-10",
    number: 10,
    name: "\u5B9D\u5251\u5341",
    nameEn: "Ten of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "10",
    keywords: [
      "\u8C37\u5E95",
      "\u7EC8\u7ED3",
      "\u6700\u540E\u4E00\u5200",
      "\u91CD\u542F"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u5341\u628A\u5251\u624E\u4E0B\u540E\uFF0C\u5DF2\u6CA1\u6709\u66F4\u574F\u7684\u53EF\u80FD\u3002\u4E1C\u65B9\u5929\u9645\uFF0C\u5149\u6B63\u8981\u4EAE\u3002",
    upright: {
      meaning: "\u4E00\u6BB5\u4E8B\u7ED3\u675F\uFF0C\u89E6\u5E95\u53CD\u5F39\u7684\u65F6\u523B\u5230\u4E86\u3002",
      love: "\u5173\u7CFB\u5F7B\u5E95\u7ED3\u675F\uFF0C\u4E0D\u8981\u633D\u56DE\u3002",
      career: "\u9879\u76EE / \u804C\u4F4D\u753B\u4E0B\u53E5\u53F7\u3002",
      advice: "\u9ED1\u591C\u6700\u6DF1\u65F6\uFF0C\u5929\u4E5F\u6700\u8FD1\u4EAE\u3002"
    },
    reversed: {
      meaning: "\u4ECE\u8C37\u5E95\u5F00\u59CB\u56DE\u5347\uFF0C\u5E26\u7740\u4F24\u7EE7\u7EED\u751F\u6D3B\u3002",
      love: "\u7ED3\u675F\u540E\u7B2C\u4E00\u6B21\u611F\u5230\u8F7B\u677E\u3002",
      career: "\u65B0\u7684\u673A\u4F1A\u63A5\u68D2\u3002",
      advice: "\u628A\u5251\u62D4\u51FA\u6765\uFF0C\u6162\u6162\u8D70\u3002"
    }
  },
  {
    id: "swords-page",
    number: 11,
    name: "\u5B9D\u5251\u4F8D\u8005",
    nameEn: "Page of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "page",
    keywords: [
      "\u597D\u5947",
      "\u7075\u654F",
      "\u8D28\u7591",
      "\u5B66\u4E60"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u5979\u98CE\u91CC\u7AD9\u7740\uFF0C\u5934\u53D1\u4E71\u98DE\uFF0C\u773C\u91CC\u5C3D\u662F\u65B0\u95EE\u9898\u3002",
    upright: {
      meaning: "\u4EE5\u8D28\u7591\u548C\u597D\u5947\u7684\u65B9\u5F0F\u63A2\u7D22\u4E16\u754C\u3002",
      love: "\u804A\u5F97\u70ED\u70C8\u4F46\u5FFD\u51B7\u5FFD\u70ED\u3002",
      career: "\u5B66\u4E60\u65B0\u6280\u80FD\u3001\u6562\u4E8E\u63D0\u95EE\u3002",
      advice: "\u95EE\u95EE\u9898\u662F\u6743\u5229\uFF0C\u4E5F\u662F\u8D23\u4EFB\u3002"
    },
    reversed: {
      meaning: "\u53E3\u65E0\u906E\u62E6\uFF0C\u6216\u7231\u516B\u5366\u3002",
      love: "\u60C5\u7EEA\u5316\u7684\u6307\u8D23\u3002",
      career: "\u8A00\u8F9E\u9510\u5229\u4F24\u4EBA\u3002",
      advice: "\u5148\u6C89\u6DC0\u518D\u53D1\u58F0\u3002"
    }
  },
  {
    id: "swords-knight",
    number: 12,
    name: "\u5B9D\u5251\u9A91\u58EB",
    nameEn: "Knight of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "knight",
    keywords: [
      "\u51B2\u950B",
      "\u901F\u5EA6",
      "\u76F4\u7EBF",
      "\u8FA9\u8BBA"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u4ED6\u9A91\u7740\u70C8\u9A6C\u76F4\u51B2\u76EE\u6807\uFF0C\u53EA\u770B\u7EC8\u70B9\uFF0C\u4E0D\u770B\u4EE3\u4EF7\u3002",
    upright: {
      meaning: "\u679C\u65AD\u3001\u9AD8\u6548\u3001\u4E00\u5F80\u65E0\u524D\u5730\u8FFD\u6C42\u76EE\u6807\u3002",
      love: "\u5766\u7387\u76F4\u63A5\uFF0C\u4F46\u4E0D\u8010\u7EC6\u817B\u3002",
      career: "\u6267\u884C\u529B\u5F3A\uFF0C\u9002\u5408\u5FEB\u8282\u594F\u6218\u5F79\u3002",
      advice: "\u522B\u4E3A\u4E86\u8D62\u800C\u5FFD\u89C6\u4E86\u540C\u4F34\u3002"
    },
    reversed: {
      meaning: "\u9C81\u83BD\u3001\u7C97\u66B4\u3001\u6025\u4E8E\u6C42\u6210\u3002",
      love: "\u51B2\u7A81\u9891\u7E41\uFF0C\u5BB9\u6613\u8BF4\u6C14\u8BDD\u3002",
      career: "\u51B3\u7B56\u8FC7\u5FEB\uFF0C\u6F0F\u6D1E\u767E\u51FA\u3002",
      advice: "\u5148\u52D2\u9A6C\uFF0C\u518D\u53D1\u4EE4\u3002"
    }
  },
  {
    id: "swords-queen",
    number: 13,
    name: "\u5B9D\u5251\u7687\u540E",
    nameEn: "Queen of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "queen",
    keywords: [
      "\u6E05\u9192",
      "\u754C\u9650",
      "\u72EC\u7ACB",
      "\u7280\u5229"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u5979\u7684\u7B11\u662F\u900F\u660E\u7684\uFF0C\u4E0D\u542B\u7CD6\uFF0C\u6BCF\u4E00\u53E5\u8BDD\u90FD\u50CF\u5251\u950B\u64E6\u51FA\u706B\u82B1\u3002",
    upright: {
      meaning: "\u6E05\u9192\u3001\u5BA2\u89C2\uFF0C\u5584\u4E8E\u8BBE\u7ACB\u754C\u9650\u3002",
      love: "\u72EC\u7ACB\u4E0D\u4F9D\u9644\uFF0C\u4F46\u4E00\u65E6\u7231\u5C31\u5FE0\u8BDA\u3002",
      career: "\u5584\u4E8E\u5206\u6790\u3001\u6C9F\u901A\u3001\u51B3\u65AD\u3002",
      advice: "\u4F60\u53EF\u4EE5\u7406\u6027\uFF0C\u4E5F\u53EF\u4EE5\u67D4\u8F6F\u3002"
    },
    reversed: {
      meaning: "\u8FC7\u4E8E\u51B7\u5CFB\u3001\u6311\u5254\u6216\u523B\u8584\u3002",
      love: "\u4F24\u53E3\u8BA9\u4F60\u5173\u95ED\u60C5\u611F\u3002",
      career: "\u7528\u7406\u6027\u4F2A\u88C5\u8106\u5F31\u3002",
      advice: "\u67D4\u8F6F\u4E0D\u662F\u5F31\u70B9\u3002"
    }
  },
  {
    id: "swords-king",
    number: 14,
    name: "\u5B9D\u5251\u56FD\u738B",
    nameEn: "King of Swords",
    arcana: "minor",
    suit: "swords",
    rank: "king",
    keywords: [
      "\u6743\u5A01",
      "\u903B\u8F91",
      "\u516C\u6B63",
      "\u667A\u8BC6"
    ],
    element: "\u98CE",
    symbol: "\u{1F701}",
    summary: "\u4ED6\u7528\u601D\u60F3\u6CBB\u56FD\uFF0C\u4E00\u5251\u4E0B\u53BB\uFF0C\u4E0D\u504F\u4E0D\u501A\uFF0C\u53EA\u770B\u771F\u76F8\u3002",
    upright: {
      meaning: "\u7406\u6027\u6743\u5A01\uFF0C\u516C\u6B63\u5224\u65AD\u3002",
      love: "\u8BDA\u5B9E\u3001\u76F4\u63A5\u3001\u9AD8\u8981\u6C42\u3002",
      career: "\u6CD5\u5F8B\u3001\u51B3\u7B56\u3001\u6218\u7565\u7684\u9886\u5BFC\u8005\u3002",
      advice: "\u806A\u660E\u8981\u914D\u6148\u60B2\u3002"
    },
    reversed: {
      meaning: "\u4E13\u65AD\u3001\u9AD8\u9AD8\u5728\u4E0A\u3001\u51B7\u6F20\u3002",
      love: "\u7528\u903B\u8F91\u5426\u5B9A\u611F\u53D7\u3002",
      career: "\u6743\u529B\u88AB\u6EE5\u7528\u6216\u56FA\u6267\u5DF1\u89C1\u3002",
      advice: "\u522B\u8BA9\u7ACB\u573A\u6321\u4F4F\u771F\u5B9E\u3002"
    }
  },
  {
    id: "pentacles-ace",
    number: 1,
    name: "\u94B1\u5E01\u4E00",
    nameEn: "Ace of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "ace",
    keywords: [
      "\u673A\u4F1A",
      "\u79CD\u5B50",
      "\u624E\u6839",
      "\u7269\u8D28\u57FA\u7840"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4E00\u679A\u91D1\u5E01\u4ECE\u4E91\u7AEF\u9012\u4E0B\uFF0C\u5B83\u662F\u4E00\u7C92\u79CD\u5B50\uFF0C\u4E5F\u662F\u4F60\u80FD\u843D\u5730\u7684\u627F\u8BFA\u3002",
    upright: {
      meaning: "\u5177\u4F53\u800C\u7A33\u7684\u65B0\u673A\u4F1A\uFF1Aoffer\u3001\u9879\u76EE\u3001\u8D44\u6E90\u3002",
      love: "\u52A1\u5B9E\u53C8\u6E29\u6696\u7684\u5173\u7CFB\u5F00\u59CB\u3002",
      career: "\u52A0\u85AA\u3001\u7B7E\u7EA6\u3001\u542F\u52A8\u957F\u671F\u5DE5\u4F5C\u3002",
      advice: "\u63A5\u4F4F\u5B83\uFF0C\u5E76\u8BA4\u771F\u624E\u6839\u3002"
    },
    reversed: {
      meaning: "\u673A\u4F1A\u6E9C\u8D70\uFF0C\u6216\u6253\u7B97\u4E0D\u5207\u5B9E\u9645\u3002",
      love: "\u7A7A\u6709\u6D6A\u6F2B\u6CA1\u6709\u627F\u8BFA\u3002",
      career: "\u8D22\u52A1\u8BA1\u5212\u843D\u7A7A\u3002",
      advice: "\u5148\u770B\u6E05\u518D\u51FA\u624B\u3002"
    }
  },
  {
    id: "pentacles-2",
    number: 2,
    name: "\u94B1\u5E01\u4E8C",
    nameEn: "Two of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "2",
    keywords: [
      "\u5E73\u8861",
      "\u591A\u4EFB\u52A1",
      "\u7075\u6D3B",
      "\u8D44\u6E90\u817E\u632A"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4E24\u679A\u94B1\u5E01\u88AB\u629B\u63A5\u5728\u624B\u5FC3\uFF0C\u4F60\u5728\u5404\u79CD\u89D2\u8272\u4E4B\u95F4\u8D70\u94A2\u4E1D\uFF0C\u5374\u672A\u5931\u7B11\u5BB9\u3002",
    upright: {
      meaning: "\u7075\u6D3B\u5468\u8F6C\uFF0C\u80FD\u540C\u65F6\u7167\u987E\u591A\u4E2A\u65B9\u5411\u3002",
      love: "\u5173\u7CFB\u4E0E\u5DE5\u4F5C\u3001\u5BB6\u4EBA\u4E4B\u95F4\u7684\u5E73\u8861\u3002",
      career: "\u591A\u9879\u76EE\u5E76\u884C\uFF0C\u9700\u8981\u8282\u594F\u611F\u3002",
      advice: "\u4FDD\u6301\u8282\u594F\uFF0C\u522B\u52A0\u592A\u591A\u7403\u3002"
    },
    reversed: {
      meaning: "\u5931\u53BB\u5E73\u8861\uFF0C\u987E\u6B64\u5931\u5F7C\u3002",
      love: "\u6CA1\u7ED9\u5173\u7CFB\u7559\u65F6\u95F4\u3002",
      career: "\u8FC7\u5EA6\u627F\u8BFA\uFF0C\u5D29\u6389\u3002",
      advice: "\u780D\u6389\u6700\u4E0D\u5FC5\u8981\u7684\u90A3\u9897\u7403\u3002"
    }
  },
  {
    id: "pentacles-3",
    number: 3,
    name: "\u94B1\u5E01\u4E09",
    nameEn: "Three of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "3",
    keywords: [
      "\u534F\u4F5C",
      "\u624B\u827A",
      "\u4E13\u4E1A",
      "\u8BA4\u53EF"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4E09\u4E2A\u4EBA\u5728\u62F1\u9876\u4E0B\u5408\u4F5C\uFF0C\u5320\u4EBA\u3001\u8BBE\u8BA1\u5E08\u3001\u8D5E\u52A9\u4EBA\u2014\u2014\u5F7C\u6B64\u4EA4\u51FA\u4E00\u5757\u6700\u597D\u7684\u624D\u80FD\u3002",
    upright: {
      meaning: "\u901A\u8FC7\u56E2\u961F\u534F\u4F5C\u6253\u78E8\u51FA\u597D\u4F5C\u54C1\u3002",
      love: "\u5171\u540C\u9879\u76EE\u8BA9\u5173\u7CFB\u5347\u6E29\u3002",
      career: "\u4E13\u4E1A\u5F97\u5230\u8BA4\u53EF\uFF0C\u5EFA\u8BAE\u6C89\u6DC0\u4F5C\u54C1\u3002",
      advice: '\u4F60\u503C\u5F97\u8BF4"\u8FD9\u662F\u6211\u505A\u7684"\u3002'
    },
    reversed: {
      meaning: "\u56E2\u961F\u8282\u594F\u9519\u4F4D\uFF0C\u6216\u4E13\u4E1A\u88AB\u4F4E\u4F30\u3002",
      love: "\u6C9F\u901A\u8131\u8282\uFF0C\u5404\u81EA\u4E3A\u653F\u3002",
      career: "\u7F3A\u4E4F\u53CD\u9988\u8BA9\u4F5C\u54C1\u9677\u5165\u95ED\u95E8\u9020\u8F66\u3002",
      advice: "\u4E3B\u52A8\u6C42\u4E00\u6B21\u771F\u5B9E\u53CD\u9988\u3002"
    }
  },
  {
    id: "pentacles-4",
    number: 4,
    name: "\u94B1\u5E01\u56DB",
    nameEn: "Four of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "4",
    keywords: [
      "\u5B88\u62A4",
      "\u56E4\u79EF",
      "\u5B89\u5168\u611F",
      "\u6536\u7D27"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4ED6\u628A\u56DB\u679A\u94B1\u5E01\u62B1\u5F97\u7D27\u7D27\u7684\uFF0C\u4EE5\u4E3A\u7A33\u4F4F\u5B83\u4EEC\u5C31\u7A33\u4F4F\u4E86\u81EA\u5DF1\u3002",
    upright: {
      meaning: "\u4FDD\u5B88\u3001\u79EF\u7D2F\u3001\u5DE9\u56FA\u8D22\u52A1\u6216\u60C5\u611F\u5B89\u5168\u3002",
      love: "\u4FDD\u62A4\u5173\u7CFB\uFF0C\u4F46\u4E5F\u53EF\u80FD\u592A\u7D27\u3002",
      career: "\u5B88\u6210\u671F\uFF0C\u8C28\u614E\u6295\u8D44\u3002",
      advice: "\u4EC0\u4E48\u8BE5\u6293\u7D27\uFF0C\u4EC0\u4E48\u8BE5\u677E\u624B\uFF1F"
    },
    reversed: {
      meaning: "\u8FC7\u5EA6\u541D\u556C\u6216\u56E4\u79EF\uFF0C\u5931\u53BB\u6D41\u52A8\u6027\u3002",
      love: "\u63A7\u5236\u6B32\u6216\u5BB3\u6015\u5206\u4EAB\u3002",
      career: "\u8D44\u91D1\u7D27\u5F20\u3001\u6216\u9519\u8FC7\u6269\u5F20\u7A97\u53E3\u3002",
      advice: "\u653E\u4E00\u70B9\uFF0C\u624D\u6D41\u52A8\u3002"
    }
  },
  {
    id: "pentacles-5",
    number: 5,
    name: "\u94B1\u5E01\u4E94",
    nameEn: "Five of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "5",
    keywords: [
      "\u56F0\u5883",
      "\u532E\u4E4F",
      "\u88AB\u6392\u65A5",
      "\u98CE\u96EA\u4E2D"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u96EA\u591C\u91CC\u4F60\u548C\u53E6\u4E00\u4E2A\u4EBA\u5728\u6559\u5802\u7A97\u5916\u8D70\u8FC7\uFF0C\u5FD8\u4E86\u73BB\u7483\u5185\u5176\u5B9E\u5F00\u7740\u706F\u3002",
    upright: {
      meaning: "\u611F\u5230\u532E\u4E4F\u3001\u88AB\u6392\u9664\u6216\u53D7\u56F0\u3002",
      love: "\u5173\u7CFB\u91CC\u6CA1\u6709\u5F52\u5C5E\u611F\u3002",
      career: "\u8D22\u52A1\u6216\u804C\u4E1A\u56F0\u5883\u3002",
      advice: "\u62AC\u5934\u770B\u770B\u88AB\u5FFD\u7565\u7684\u8D44\u6E90\u3002"
    },
    reversed: {
      meaning: "\u8D70\u51FA\u56F0\u5883\uFF0C\u6216\u91CD\u65B0\u63A5\u53D7\u5E2E\u52A9\u3002",
      love: "\u5173\u7CFB\u91CD\u71C3\u6E29\u5EA6\u3002",
      career: "\u8D22\u52A1\u597D\u8F6C\u3001\u627E\u5230\u652F\u63F4\u3002",
      advice: "\u5F00\u53E3\u6C42\u52A9\u4E0D\u4E22\u8138\u3002"
    }
  },
  {
    id: "pentacles-6",
    number: 6,
    name: "\u94B1\u5E01\u516D",
    nameEn: "Six of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "6",
    keywords: [
      "\u7ED9\u4E88",
      "\u6177\u6168",
      "\u4E92\u60E0",
      "\u5929\u5E73"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4E00\u624B\u91D1\u5E01\u6D41\u51FA\uFF0C\u4E00\u624B\u91D1\u5E01\u6536\u56DE\uFF0C\u7ED9\u51FA\u548C\u62FF\u5230\u539F\u662F\u4E00\u4EF6\u4E8B\u3002",
    upright: {
      meaning: "\u6177\u6168\u5206\u4EAB\uFF0C\u6216\u63A5\u53D7\u4ED6\u4EBA\u7684\u597D\u610F\u3002",
      love: "\u4ED8\u51FA\u4E0E\u88AB\u7231\u7684\u52A8\u6001\u5E73\u8861\u3002",
      career: "\u7ED9\u4E0E\u88AB\u7ED9\u8BA9\u4E8B\u4E1A\u6D41\u52A8\u8D77\u6765\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u63A5\u53D7\uFF0C\u4E5F\u662F\u4E00\u79CD\u6210\u719F\u3002"
    },
    reversed: {
      meaning: "\u4ED8\u51FA\u4E0D\u5BF9\u7B49\uFF0C\u6216\u5F3A\u52A0\u5F0F\u7684\u5E2E\u52A9\u3002",
      love: "\u4E00\u65B9\u8FC7\u5EA6\u727A\u7272\u3002",
      career: "\u5408\u4F5C\u5229\u76CA\u4E0D\u5747\u3002",
      advice: "\u628A\u516C\u5E73\u5E26\u56DE\u8C08\u5224\u684C\u3002"
    }
  },
  {
    id: "pentacles-7",
    number: 7,
    name: "\u94B1\u5E01\u4E03",
    nameEn: "Seven of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "7",
    keywords: [
      "\u7B49\u5F85",
      "\u56DE\u671B",
      "\u590D\u76D8",
      "\u8010\u5FC3"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4ED6\u9760\u7740\u9504\u5934\u770B\u81EA\u5DF1\u79CD\u4E0B\u7684\u679C\u5B9E\uFF0C\u4E0D\u6025\u4E0D\u607C\uFF0C\u53EA\u662F\u770B\uFF0C\u7136\u540E\u7B11\u3002",
    upright: {
      meaning: "\u505C\u4E0B\u6765\u590D\u76D8\uFF0C\u8BC4\u4F30\u6295\u5165\u4E0E\u56DE\u62A5\u3002",
      love: "\u68C0\u89C6\u5173\u7CFB\u662F\u5426\u503C\u5F97\u7EE7\u7EED\u6295\u5165\u3002",
      career: "\u8BC4\u4F30\u9879\u76EE\u662F\u5426\u5982\u671F\u56DE\u62A5\u3002",
      advice: "\u6709\u4E9B\u4E8B\u60C5\u9700\u8981\u4E00\u4E2A\u5B63\u8282\u3002"
    },
    reversed: {
      meaning: "\u6295\u5165\u770B\u4E0D\u5230\u56DE\u62A5\uFF0C\u7591\u8651\u4E1B\u751F\u3002",
      love: "\u6000\u7591\u5173\u7CFB\u662F\u5426\u503C\u5F97\u3002",
      career: "\u9879\u76EE ROI \u4E0D\u4F73\uFF0C\u8003\u8651\u6B62\u635F\u3002",
      advice: "\u6CA1\u6709\u4EBA\u80FD\u6C38\u8FDC\u7B49\u4E0B\u53BB\u3002"
    }
  },
  {
    id: "pentacles-8",
    number: 8,
    name: "\u94B1\u5E01\u516B",
    nameEn: "Eight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "8",
    keywords: [
      "\u7CBE\u8FDB",
      "\u4E13\u6CE8",
      "\u624B\u827A",
      "\u91CD\u590D"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4ED6\u4E00\u5757\u4E00\u5757\u5730\u96D5\u7422\u94B1\u5E01\uFF0C\u628A\u91CD\u590D\u505A\u6210\u4E86\u827A\u672F\u3002",
    upright: {
      meaning: "\u4E13\u6CE8\u6253\u78E8\u624B\u827A\uFF0C\u79EF\u7D2F\u8D28\u53D8\u3002",
      love: "\u613F\u610F\u4E3A\u5173\u7CFB\u4E0B\u529F\u592B\u7684\u8010\u5FC3\u3002",
      career: "\u94BB\u7814\u6280\u80FD\uFF0C\u6C34\u5230\u6E20\u6210\u3002",
      advice: "\u91CD\u590D\u662F\u901A\u5F80\u5353\u8D8A\u7684\u552F\u4E00\u8DEF\u3002"
    },
    reversed: {
      meaning: "\u673A\u68B0\u52B3\u4F5C\uFF0C\u6216\u5BF9\u7EC6\u8282\u5931\u53BB\u70ED\u60C5\u3002",
      love: "\u5173\u7CFB\u6CA6\u4E3A\u60EF\u6027\u3002",
      career: "\u5B8C\u7F8E\u4E3B\u4E49\u5361\u4F4F\u8FDB\u5EA6\u3002",
      advice: "\u627E\u56DE\u8FD9\u4EF6\u4E8B\u6700\u521D\u8BA9\u4F60\u7740\u8FF7\u7684\u90E8\u5206\u3002"
    }
  },
  {
    id: "pentacles-9",
    number: 9,
    name: "\u94B1\u5E01\u4E5D",
    nameEn: "Nine of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "9",
    keywords: [
      "\u72EC\u7ACB",
      "\u4E30\u76DB",
      "\u4F18\u96C5",
      "\u81EA\u7ED9\u81EA\u8DB3"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u5979\u72EC\u81EA\u7AD9\u5728\u679C\u56ED\u91CC\uFF0C\u624B\u81C2\u4E0A\u505C\u7740\u4E00\u53EA\u96BC\uFF0C\u4E00\u5207\u90FD\u662F\u5979\u81EA\u5DF1\u8D62\u56DE\u6765\u7684\u3002",
    upright: {
      meaning: "\u901A\u8FC7\u52AA\u529B\u8FBE\u5230\u7684\u72EC\u7ACB\u4E0E\u4E30\u76DB\u3002",
      love: "\u4E0D\u4F9D\u9644\uFF0C\u4E5F\u56E0\u6B64\u66F4\u61C2\u5F97\u7231\u3002",
      career: "\u8D22\u52A1\u81EA\u7531\u3001\u4E8B\u4E1A\u6709\u6210\u3002",
      advice: "\u5141\u8BB8\u81EA\u5DF1\u4EAB\u53D7\u6210\u679C\u3002"
    },
    reversed: {
      meaning: "\u4F9D\u8D56\u4ED6\u4EBA\u83B7\u5F97\u8868\u9762\u4E30\u76DB\uFF0C\u6216\u8FC7\u5EA6\u5DE5\u4F5C\u3002",
      love: "\u5916\u8868\u72EC\u7ACB\uFF0C\u5185\u91CC\u5B64\u72EC\u3002",
      career: "\u9760\u5173\u7CFB\u800C\u975E\u80FD\u529B\uFF0C\u6839\u57FA\u4E0D\u7A33\u3002",
      advice: "\u68C0\u89C6\u4F60\u662F\u5426\u771F\u7684\u81EA\u7ED9\u81EA\u8DB3\u3002"
    }
  },
  {
    id: "pentacles-10",
    number: 10,
    name: "\u94B1\u5E01\u5341",
    nameEn: "Ten of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "10",
    keywords: [
      "\u5BB6\u4E1A",
      "\u4F20\u627F",
      "\u7A33\u56FA",
      "\u4E16\u4EE3"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4E09\u4EE3\u540C\u5802\u7684\u5EAD\u9662\u91CC\uFF0C\u91D1\u5E01\u50CF\u9633\u5149\u6563\u843D\uFF0C\u7A33\u5230\u80FD\u4F20\u7ED9\u4E0B\u4E00\u4EE3\u3002",
    upright: {
      meaning: "\u957F\u671F\u79EF\u7D2F\u4E0B\u7684\u7A33\u56FA\u4E0E\u4F20\u627F\u3002",
      love: "\u5173\u7CFB\u8D70\u5411\u5BB6\u5EAD\u3001\u672A\u6765\u51E0\u5341\u5E74\u3002",
      career: "\u4E8B\u4E1A\u8FDB\u5165\u53EF\u6301\u7EED\u9636\u6BB5\u3002",
      advice: "\u628A\u7ECF\u9A8C\u6574\u7406\u597D\uFF0C\u7559\u7ED9\u81EA\u5DF1\u548C\u4ED6\u4EBA\u3002"
    },
    reversed: {
      meaning: "\u5BB6\u5EAD\u8D44\u4EA7\u7EA0\u7EB7\uFF0C\u6216\u4F9D\u8D56\u7ED3\u6784\u677E\u52A8\u3002",
      love: "\u5BB6\u5EAD\u538B\u529B\u5F71\u54CD\u5173\u7CFB\u3002",
      career: "\u8001\u5E73\u53F0\u5F00\u59CB\u8D70\u4E0B\u5761\u3002",
      advice: "\u518D\u7A33\u7684\u623F\u5B50\u4E5F\u8981\u5B9A\u671F\u68C0\u4FEE\u3002"
    }
  },
  {
    id: "pentacles-page",
    number: 11,
    name: "\u94B1\u5E01\u4F8D\u8005",
    nameEn: "Page of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "page",
    keywords: [
      "\u5B66\u4E60",
      "\u52A1\u5B9E",
      "\u65B0\u8BA1\u5212",
      "\u811A\u8E0F\u5B9E\u5730"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4ED6\u6367\u7740\u91D1\u5E01\u8BA4\u771F\u7AEF\u8BE6\uFF0C\u5B66\u4F1A\u628A\u68A6\u60F3\u5207\u6210\u6BCF\u5929\u80FD\u505A\u7684\u90A3\u4E00\u5C0F\u6B65\u3002",
    upright: {
      meaning: "\u8E0F\u5B9E\u5B66\u4E60\u3001\u5EFA\u7ACB\u65B0\u4E60\u60EF\u3002",
      love: "\u6162\u70ED\u4F46\u771F\u5FC3\u7684\u5BF9\u8C61\u3002",
      career: "\u65B0\u5C97\u4F4D\u3001\u65B0\u6280\u80FD\u3001\u5B66\u5F92\u671F\u3002",
      advice: "\u4ECE\u5C0F\u4E8B\u5F00\u59CB\u3002"
    },
    reversed: {
      meaning: "\u4E09\u5206\u949F\u70ED\u5EA6\u3001\u4E0D\u591F\u811A\u8E0F\u5B9E\u5730\u3002",
      love: "\u8BF4\u5F97\u591A\u505A\u5F97\u5C11\u3002",
      career: "\u8BA1\u5212\u505C\u7559\u5728\u7EB8\u9762\u3002",
      advice: "\u628A\u884C\u52A8\u5199\u8FDB\u65E5\u5386\u3002"
    }
  },
  {
    id: "pentacles-knight",
    number: 12,
    name: "\u94B1\u5E01\u9A91\u58EB",
    nameEn: "Knight of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "knight",
    keywords: [
      "\u7A33\u6B65",
      "\u53EF\u9760",
      "\u6162",
      "\u6301\u4E45"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4ED6\u9A91\u7740\u4E0D\u4F1A\u5954\u8DD1\u7684\u9A6C\uFF0C\u6162\u4F46\u4ECE\u4E0D\u8FF7\u8DEF\uFF0C\u7EC8\u70B9\u5FC5\u5B9A\u62B5\u8FBE\u3002",
    upright: {
      meaning: "\u53EF\u9760\u3001\u7A33\u6B65\u63A8\u8FDB\u3001\u957F\u671F\u4E3B\u4E49\u3002",
      love: "\u8001\u5B9E\u53EF\u9760\u7684\u5BF9\u8C61\u3002",
      career: "\u6309\u8BA1\u5212\u7A33\u624E\u7A33\u6253\u3002",
      advice: "\u4E0D\u8981\u5C0F\u770B\u6162\u3002"
    },
    reversed: {
      meaning: "\u8FC7\u4E8E\u4FDD\u5B88\uFF0C\u6216\u56E0\u5FAA\u5B88\u65E7\u3002",
      love: "\u7F3A\u4E4F\u6FC0\u60C5\uFF0C\u53D8\u6210\u4E60\u60EF\u3002",
      career: "\u58A8\u5B88\u6210\u89C4\uFF0C\u9519\u8FC7\u673A\u4F1A\u3002",
      advice: "\u7A33\u4E5F\u8981\u6562\u8BD5\u3002"
    }
  },
  {
    id: "pentacles-queen",
    number: 13,
    name: "\u94B1\u5E01\u7687\u540E",
    nameEn: "Queen of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "queen",
    keywords: [
      "\u6ECB\u517B",
      "\u4E30\u76DB",
      "\u52A1\u5B9E",
      "\u5927\u5730\u6BCD\u4EB2"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u5979\u628A\u738B\u5EA7\u6446\u5728\u82B1\u56ED\u91CC\uFF0C\u61C2\u5F97\u7528\u91D1\u5E01\u7167\u987E\u5BB6\u4EBA\uFF0C\u4E5F\u7167\u987E\u81EA\u5DF1\u3002",
    upright: {
      meaning: "\u61C2\u5F97\u7167\u987E\u8EAB\u4F53\u3001\u5BB6\u4EBA\u3001\u91D1\u94B1\u3002",
      love: "\u7A33\u5B9A\u3001\u6177\u6168\u3001\u8D34\u5FC3\u7684\u4F34\u4FA3\u3002",
      career: "\u628A\u4E8B\u4E1A\u548C\u751F\u6D3B\u7ECF\u8425\u5F97\u6709\u6761\u4E0D\u7D0A\u3002",
      advice: "\u81EA\u6211\u7167\u987E\u662F\u4E00\u79CD\u529B\u91CF\u3002"
    },
    reversed: {
      meaning: '\u8FC7\u5EA6\u4ED8\u51FA\uFF0C\u6216\u9677\u5165"\u641E\u5B9A\u4E00\u5207"\u7684\u75B2\u60EB\u3002',
      love: "\u628A\u7231\u7B49\u4E8E\u64CD\u5FC3\u3002",
      career: "\u4E8B\u4E8B\u8FC7\u95EE\u5BFC\u81F4\u56E2\u961F\u65E0\u529B\u3002",
      advice: "\u5141\u8BB8\u522B\u4EBA\u4E5F\u6709\u80FD\u529B\u3002"
    }
  },
  {
    id: "pentacles-king",
    number: 14,
    name: "\u94B1\u5E01\u56FD\u738B",
    nameEn: "King of Pentacles",
    arcana: "minor",
    suit: "pentacles",
    rank: "king",
    keywords: [
      "\u6210\u5C31",
      "\u7A33\u5065",
      "\u8D22\u5BCC",
      "\u539A\u91CD"
    ],
    element: "\u571F",
    symbol: "\u{1F703}",
    summary: "\u4ED6\u5750\u5728\u8461\u8404\u85E4\u4E0B\uFF0C\u8EAB\u540E\u662F\u4ED6\u4EB2\u624B\u7B51\u8D77\u7684\u5E84\u56ED\uFF0C\u8D22\u5BCC\u662F\u679C\u5B9E\uFF0C\u4E5F\u662F\u56DE\u9988\u3002",
    upright: {
      meaning: "\u6210\u5C31\u7A33\u56FA\uFF0C\u8D44\u6E90\u4E30\u539A\uFF0C\u53EF\u4F9D\u9760\u3002",
      love: "\u6210\u719F\u3001\u6177\u6168\u3001\u8D1F\u8D23\u4EFB\u3002",
      career: "\u4E8B\u4E1A\u6709\u6210\uFF0C\u9002\u5408\u6295\u8D44\u6216\u6269\u5F20\u3002",
      advice: "\u8D22\u5BCC\u662F\u5DE5\u5177\uFF0C\u4E0D\u662F\u76EE\u7684\u3002"
    },
    reversed: {
      meaning: "\u8D2A\u5A6A\u3001\u56FA\u6267\u3001\u7269\u8D28\u4E3B\u4E49\u3002",
      love: "\u7528\u91D1\u94B1\u8861\u91CF\u611F\u60C5\u3002",
      career: "\u505C\u6EDE\u5728\u8001\u6A21\u5F0F\uFF0C\u4E0D\u613F\u521B\u65B0\u3002",
      advice: "\u8D22\u5BCC\u6709\u9650\uFF0C\u610F\u4E49\u65E0\u9650\u3002"
    }
  }
];

// src/client/face/art-of.ts
var INDEX = new Map(
  cards_default.map((card) => [
    card.id,
    {
      symbol: card.symbol,
      arcana: card.arcana,
      number: card.number,
      suit: card.suit,
      rank: card.rank
    }
  ])
);
function artOf(cardId) {
  if (!cardId) return void 0;
  return INDEX.get(cardId);
}

// src/client/history/HistoryThumb.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
function HistoryThumb(props) {
  const { card, locale, tx, config } = props;
  const art = artOf(card.cardId);
  const name2 = cardName(card, locale) || card.cardId;
  const pos = positionLabel(card, locale);
  const ori = card.reversed ? tx("reversed") : tx("upright");
  const photo = config.cardArtTheme === "rws" || config.cardArtTheme === "aquatic";
  const picture = /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    CardArt,
    {
      symbol: card.symbol || art?.symbol || "",
      reversed: card.reversed,
      arcana: card.arcana || art?.arcana,
      suit: card.suit ?? art?.suit,
      rank: card.rank ?? art?.rank,
      minorStyle: config.minorStyle,
      cardId: card.cardId,
      artTheme: config.cardArtTheme
    }
  );
  if (photo) {
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        className: "dsh-lumina-hcard is-photo",
        style: { borderRadius: props.radius },
        title: `${pos} \xB7 ${name2} \xB7 ${ori}`,
        children: [
          picture,
          card.reversed ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dsh-lumina-hcard-rev", children: tx("historyRevBadge") }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "dsh-lumina-hcard-caption", children: name2 })
        ]
      }
    );
  }
  const corner = cornerLabel(card.arcana || art?.arcana, card.number ?? art?.number, card.rank ?? art?.rank);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      className: "dsh-lumina-face",
      style: { borderRadius: props.radius },
      title: `${pos} \xB7 ${name2} \xB7 ${ori}`,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "meta row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: pos }),
          corner ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: corner }) : null
        ] }),
        picture,
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "nm", children: name2 }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "meta", children: ori })
      ]
    }
  );
}

// src/client/history/HistoryItem.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
function toggleKey(event, toggle) {
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  toggle();
}
function HistoryItem(props) {
  const { item, locale, tx, config } = props;
  const [open, setOpen] = (0, import_react3.useState)(false);
  const period = periodKey(item.createdAt);
  const radius = Math.max(4, radiusFor(config.theme));
  const toggle = () => setOpen((value) => !value);
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
    "div",
    {
      className: `dsh-lumina-history-item${open ? " is-open" : ""}`,
      role: "button",
      tabIndex: 0,
      "aria-expanded": open,
      onClick: toggle,
      onKeyDown: (event) => toggleKey(event, toggle),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "dsh-lumina-history-meta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: `${formatWhen(item.createdAt, locale)} \xB7 ${spreadLabel(locale, item.spreadId)}` }),
          period ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "dsh-lumina-history-period", children: tx(period) }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { className: "dsh-lumina-history-q", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "aria-hidden": "true", children: "\u300C" }),
          item.question || tx("historyUnnamed"),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { "aria-hidden": "true", children: "\u300D" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "dsh-lumina-history-sum", children: summarize(item, locale, tx) }),
        item.cards.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "dsh-lumina-history-thumbs", children: item.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          HistoryThumb,
          {
            card,
            locale,
            tx,
            config,
            radius
          },
          `${card.positionIndex}-${card.cardId}`
        )) }) : null,
        open ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "dsh-lumina-history-detail", children: item.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("p", { children: [
          `${positionLabel(card, locale)} \xB7 ${cardName(card, locale)}${card.reversed ? tx("reversedShort") : ""}`,
          card.keywords?.length ? ` \xB7 ${card.keywords.slice(0, 3).join(" \xB7 ")}` : "",
          card.meaning ? `\uFF1A${card.meaning}` : ""
        ] }, `${card.positionIndex}-${card.cardId}-d`)) }) : null
      ]
    }
  ) });
}

// src/client/history/HistoryList.tsx
var import_jsx_runtime9 = require("react/jsx-runtime");
var PAGE = 8;
function HistoryList(props) {
  const { items, locale, tx, config, scrollerRef } = props;
  const [shown, setShown] = (0, import_react4.useState)(PAGE);
  const sentinelRef = (0, import_react4.useRef)(null);
  (0, import_react4.useEffect)(() => {
    setShown(PAGE);
  }, [items]);
  (0, import_react4.useEffect)(() => {
    const target = sentinelRef.current;
    const root = scrollerRef.current;
    if (!target || !root || shown >= items.length) return;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setShown((count) => Math.min(count + PAGE, items.length));
    }, { root, rootMargin: "160px" });
    io.observe(target);
    return () => io.disconnect();
  }, [items.length, scrollerRef, shown]);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("ul", { className: "dsh-lumina-history-list", children: [
    items.slice(0, shown).map((item) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(HistoryItem, { item, locale, tx, config }, item.id)),
    shown < items.length ? /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("li", { ref: sentinelRef, className: "dsh-lumina-history-more", "aria-hidden": "true" }) : null
  ] });
}

// src/client/history/HistoryDialog.tsx
var import_jsx_runtime10 = require("react/jsx-runtime");
function HistoryDialog(props) {
  const { tx, locale, load, onClose, config } = props;
  const scrollerRef = (0, import_react5.useRef)(null);
  const [items, setItems] = (0, import_react5.useState)([]);
  const [status, setStatus] = (0, import_react5.useState)("loading");
  const [errorText, setErrorText] = (0, import_react5.useState)("");
  (0, import_react5.useEffect)(() => {
    let alive = true;
    const refresh = async () => {
      setStatus("loading");
      setErrorText("");
      try {
        const next = await load();
        if (!alive) return;
        setItems(next);
        setStatus("ready");
      } catch (error) {
        if (!alive) return;
        const text = error instanceof Error ? error.message : String(error);
        setErrorText(text);
        setStatus("error");
      }
    };
    void refresh();
    const onCleared = () => {
      setItems([]);
      setStatus("ready");
      setErrorText("");
    };
    window.addEventListener(LUMINA_HISTORY_CLEARED, onCleared);
    return () => {
      alive = false;
      window.removeEventListener(LUMINA_HISTORY_CLEARED, onCleared);
    };
  }, [load]);
  let body;
  if (status === "loading") {
    body = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dsh-lumina-history-status", children: tx("historyLoading") });
  } else if (status === "error") {
    body = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dsh-lumina-history-status is-error", children: errorText === "need-session" ? tx("historyNeedSession") : errorText });
  } else if (items.length === 0) {
    body = /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-lumina-history-empty", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "dsh-lumina-history-empty-mark", "aria-hidden": "true", children: "\u25CC" }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dsh-lumina-history-empty-title", children: tx("historyEmptyTitle") }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dsh-lumina-history-status", children: tx("historyKeepHint") })
    ] });
  } else {
    body = /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      HistoryList,
      {
        items,
        locale,
        tx,
        config,
        scrollerRef
      }
    );
  }
  const countText = status === "ready" && items.length > 0 ? tx("historyCountMonthly").replace("{n}", String(items.length)).replace("{m}", String(monthlyCount(items))) : tx("historyKeepHint");
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
    "div",
    {
      className: "dsh-lumina-ask-modal",
      onClick: (event) => {
        if (event.target === event.currentTarget) onClose();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "dsh-lumina-scrim", style: scrimFill(props.opacity) }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ModalDust, { level: props.animationLevel }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
          "section",
          {
            className: "dsh-lumina-history",
            onPointerDown: (event) => event.stopPropagation(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "dsh-lumina-history-head", children: [
                /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("h2", { className: "dsh-lumina-history-title", children: tx("historyTitle") }),
                  /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "dsh-lumina-history-count", children: countText })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "dsh-lumina-iconbtn",
                    "aria-label": tx("close"),
                    title: tx("close"),
                    onClick: onClose,
                    children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(import_dsh_client_ui_primitives.IconCloseOutline16, { size: 16 })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { ref: scrollerRef, className: "dsh-lumina-history-body", children: body })
            ]
          }
        )
      ]
    }
  );
}

// src/client/overlay/session-source.ts
function commandWithQuestion(base, asked) {
  const question = asked.trim().replace(/\s+/g, " ");
  return question ? `${base} ${question}` : base;
}
var mirroredSessionId;
var pendingEnsure;
function mirrorSession(id) {
  mirroredSessionId = id;
}
function mirroredSession() {
  return mirroredSessionId;
}
function bindSessionActions(ctx) {
  return {
    connectWorkspace: (workspaceId) => {
      const fn = ctx.workspaces?.connectWorkspace;
      if (typeof fn !== "function") throw new Error("need-session");
      return fn.call(ctx.workspaces, workspaceId);
    },
    openSession: (id) => {
      const fn = ctx.sessions?.open;
      if (typeof fn !== "function") throw new Error("need-session");
      fn.call(ctx.sessions, id);
    },
    createSession: (opts) => {
      const fn = ctx.sessions?.create;
      if (typeof fn !== "function") throw new Error("need-session");
      return fn.call(ctx.sessions, opts);
    },
    listedCurrent: () => {
      try {
        return ctx.sessions?.list?.getSnapshot?.()?.current;
      } catch {
        return void 0;
      }
    }
  };
}
function readSessionId(props) {
  try {
    if (typeof props.useCurrentSessionId === "function") {
      return props.useCurrentSessionId((id) => id);
    }
  } catch {
  }
  try {
    if (typeof props.useSessions === "function") {
      return props.useSessions((s) => s?.current);
    }
  } catch {
  }
  return void 0;
}
function readRecentWorkspaceId(props) {
  try {
    if (typeof props.useWorkspaces === "function") {
      return props.useWorkspaces((s) => s?.recentWorkspaceId ?? s?.items?.[0]?.workspaceId);
    }
  } catch {
    return void 0;
  }
}
var SETTLE_MS = 280;
function settle() {
  return new Promise((resolve) => setTimeout(resolve, SETTLE_MS));
}
async function openNewSession(recentWorkspaceId, actions) {
  let id;
  if (recentWorkspaceId) {
    id = await actions.connectWorkspace(recentWorkspaceId);
  } else if (typeof actions.createSession === "function") {
    id = await actions.createSession({});
  }
  if (!id) throw new Error("need-session");
  actions.openSession(id);
  mirrorSession(id);
  await settle();
  return id;
}
async function ensureSession(current2, recentWorkspaceId, actions) {
  if (current2) {
    mirrorSession(current2);
    return current2;
  }
  const listed = actions.listedCurrent?.();
  if (listed) {
    mirrorSession(listed);
    return listed;
  }
  const remembered = mirroredSession();
  if (remembered) return remembered;
  if (!pendingEnsure) {
    pendingEnsure = openNewSession(recentWorkspaceId, actions).finally(() => {
      pendingEnsure = void 0;
    });
  }
  return pendingEnsure;
}
async function promptSession(sessions, id, text) {
  let prompt = sessions?.binding?.(id)?.session?.prompt;
  if (typeof prompt !== "function") {
    await settle();
    prompt = sessions?.binding?.(id)?.session?.prompt;
  }
  const session = sessions?.binding?.(id)?.session;
  if (typeof prompt !== "function" || !session) throw new Error("need-session");
  const result = await prompt.call(session, [{ type: "text", text }], "queue");
  if (result && result.ok === false) {
    throw new Error(result.error?.message || result.error?.code || "\u672A\u80FD\u628A\u89E3\u8BFB\u53D1\u5230\u4F1A\u8BDD");
  }
}

// src/client/settings/data.tsx
var import_jsx_runtime11 = require("react/jsx-runtime");
async function runLine(remote, line) {
  const execute = remote?.commands?.execute;
  const sessionId = mirroredSession();
  if (typeof execute !== "function") throw new Error("\u5F53\u524D\u73AF\u5883\u6CA1\u6709\u547D\u4EE4\u901A\u9053");
  if (!sessionId) throw new Error("need-session");
  const result = unwrapCommandResult(await execute(sessionId, line, []));
  if (result.kind === "error") throw new Error(result.text || "\u547D\u4EE4\u5931\u8D25");
  return result.text ?? "";
}
function downloadJson(text) {
  const blob = new Blob([text], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `lumina-tarot-export-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
function DataBlock(props) {
  const [historyOpen, setHistoryOpen] = (0, import_react6.useState)(false);
  const loadHistory = (0, import_react6.useCallback)(
    () => runLine(props.remote, "/lumina history").then(parseHistory),
    [props.remote]
  );
  const busyLabel = (error) => {
    const text = error instanceof Error ? error.message : String(error);
    return text === "need-session" ? props.tx("dataNeedSession") : text;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "lumina-set-block", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "lumina-set-title", children: props.tx("data") }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "lumina-set-desc", children: props.tx("dataDesc") }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "lumina-set-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(import_dsh_client_ui_primitives2.Button, { type: "button", variant: "outline", size: "sm", onClick: () => setHistoryOpen(true), children: props.tx("viewHistory") }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_dsh_client_ui_primitives2.Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: async () => {
            try {
              const text = await runLine(props.remote, "/lumina export");
              const pretty = JSON.stringify(JSON.parse(text), null, 2);
              downloadJson(pretty);
              props.setNote(props.tx("exportDone"));
            } catch (error) {
              props.setNote(busyLabel(error));
            }
          },
          children: props.tx("exportJSON")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        import_dsh_client_ui_primitives2.Button,
        {
          type: "button",
          variant: "destructive",
          size: "sm",
          onClick: async () => {
            if (typeof window !== "undefined" && !window.confirm(props.tx("clearConfirm"))) return;
            try {
              const text = await runLine(props.remote, "/lumina clear");
              if (typeof window !== "undefined") {
                window.dispatchEvent(new Event(LUMINA_HISTORY_CLEARED));
              }
              props.setNote(text || props.tx("clearAll"));
            } catch (error) {
              props.setNote(busyLabel(error));
            }
          },
          children: props.tx("clearAll")
        }
      )
    ] }),
    props.note ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "lumina-set-desc", children: props.note }) : null,
    historyOpen ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-lumina", "data-theme": props.theme, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      HistoryDialog,
      {
        tx: props.tx,
        locale: props.locale,
        opacity: props.opacity,
        animationLevel: props.animationLevel,
        config: props.config,
        load: loadHistory,
        onClose: () => setHistoryOpen(false)
      }
    ) }) : null
  ] });
}

// src/client/settings/logo.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
function BrandLogo() {
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("svg", { className: "lumina-set-logo", viewBox: "0 0 64 64", "aria-hidden": "true", focusable: "false", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("rect", { width: 64, height: 64, rx: 12, fill: "#0b0d1a" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("circle", { cx: 32, cy: 32, r: 22, fill: "none", stroke: "#c9a961", strokeWidth: 1, opacity: 0.35 }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("circle", { cx: 32, cy: 32, r: 14, fill: "none", stroke: "#c9a961", strokeWidth: 1, opacity: 0.55 }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M32 14 L33.6 30.4 L50 32 L33.6 33.6 L32 50 L30.4 33.6 L14 32 L30.4 30.4 Z", fill: "#e9c978" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("circle", { cx: 32, cy: 32, r: 2, fill: "#0b0d1a" })
  ] });
}

// src/client/settings/rows.tsx
var import_dsh_client_ui_primitives3 = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime13 = require("react/jsx-runtime");
function SelectRow(props) {
  const currentLabel = props.options.find((opt) => opt.id === props.current)?.label ?? props.current;
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "lumina-set-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "lumina-set-row-text", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "lumina-set-title", children: props.title }),
      props.desc ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "lumina-set-desc", children: props.desc }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      import_dsh_client_ui_primitives3.Menu,
      {
        open: props.openId === props.id,
        onClose: () => props.setOpenId(null),
        items: props.options.map((opt) => ({ id: opt.id, label: opt.label })),
        selectedId: props.current,
        onSelect: (picked) => {
          props.onPick(picked);
          props.setOpenId(null);
        },
        align: "end",
        portal: true,
        anchor: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
          "button",
          {
            type: "button",
            className: "lumina-set-selector",
            "aria-haspopup": "menu",
            "aria-expanded": props.openId === props.id,
            onClick: () => props.setOpenId(props.openId === props.id ? null : props.id),
            children: [
              currentLabel,
              /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_dsh_client_ui_primitives3.IconChevronDownOutline14, { className: "lumina-set-chevron" })
            ]
          }
        )
      }
    )
  ] });
}
function SliderRow(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "lumina-set-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "lumina-set-row-text", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "lumina-set-title", children: props.title }),
      props.desc ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "lumina-set-desc", children: props.desc }) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("label", { className: "lumina-set-range", children: props.control })
  ] });
}
function SwitchRow(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "lumina-set-row", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "lumina-set-row-text", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "lumina-set-title", children: props.title }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "lumina-set-desc", children: props.desc })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "button",
      {
        type: "button",
        role: "switch",
        "aria-checked": props.on,
        "aria-label": props.title,
        className: props.on ? "lumina-set-switch is-on" : "lumina-set-switch",
        onClick: props.onToggle,
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "lumina-set-switch-knob" })
      }
    )
  ] });
}

// src/client/settings/styles.ts
var SETTINGS_STYLE_ID = "dsh-lumina-tarot-settings-css";
var SETTINGS_FONT_ID = "dsh-lumina-tarot-font";
function ensureBrandFont() {
  if (typeof document === "undefined" || !document.head) return;
  if (document.getElementById(SETTINGS_FONT_ID)) return;
  const pre = document.createElement("link");
  pre.rel = "preconnect";
  pre.href = "https://fonts.googleapis.com";
  document.head.appendChild(pre);
  const link = document.createElement("link");
  link.id = SETTINGS_FONT_ID;
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&display=swap";
  document.head.appendChild(link);
}
function ensureSettingsStyles() {
  if (typeof document === "undefined" || !document.head) return;
  ensureBrandFont();
  let style = document.getElementById(SETTINGS_STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = SETTINGS_STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `
.lumina-set {
  font: inherit;
  color: var(--dsw-alias-label-primary);
  max-width: 560px;
  padding: 4px 0 28px;
}
.lumina-set-hero {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0 16px;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-logo {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: block;
  margin-top: 2px;
  border-radius: 8px;
}
.lumina-set-hero-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.lumina-set-head {
  margin: 0;
  font-family: 'Cinzel', 'Cormorant Garamond', 'Noto Serif SC', 'PingFang SC', 'Songti SC', serif;
  font-size: 22px;
  font-weight: 500;
  line-height: 30px;
  letter-spacing: 0.12em;
  color: var(--dsw-alias-label-primary);
}
.lumina-set-sub {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}
.lumina-set-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-row-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 4px;
  min-width: 0;
  padding-right: 48px;
}
.lumina-set-title {
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: var(--dsw-alias-label-primary);
}
.lumina-set-desc {
  margin: 0;
  font-size: 13px;
  line-height: 20px;
  color: var(--dsw-alias-label-tertiary);
}
.lumina-set-selector {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  height: 36px;
  padding: 0 14px;
  border: none;
  border-radius: 18px;
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
  flex-shrink: 0;
}
.lumina-set-selector:hover {
  background: var(--dsw-alias-interactive-bg-hover);
}
.lumina-set-chevron {
  flex: none;
}
.lumina-set-range {
  flex: 0 0 120px;
  min-width: 72px;
  max-width: 120px;
}
.lumina-set-range input[type='range'] {
  width: 100%;
  accent-color: var(--dsw-alias-brand-primary);
}
.lumina-set-switch {
  box-sizing: border-box;
  position: relative;
  width: 36px;
  height: 20px;
  padding: 0;
  border: none;
  border-radius: 99px;
  background: var(--dsw-alias-label-dimmed);
  cursor: pointer;
  flex-shrink: 0;
  transition: background .15s ease;
}
.lumina-set-switch.is-on {
  background: var(--dsw-alias-label-primary);
}
.lumina-set-switch:focus-visible {
  outline: 1px solid var(--dsw-alias-label-primary);
  outline-offset: 2px;
}
.lumina-set-switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  border-radius: 99px;
  background: #fff;
  transition: left .15s ease, background .15s ease;
}
.lumina-set-switch.is-on .lumina-set-switch-knob {
  left: 18px;
  background: var(--dsw-alias-bg-base);
}
.lumina-set-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}
.lumina-set-about {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
}
.lumina-set-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}
.lumina-set-card {
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px 8px 12px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 12px;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}
.lumina-set-card:hover:not(.is-on):not(.is-off) {
  background: var(--dsw-alias-interactive-bg-hover);
}
.lumina-set-card.is-on {
  background: var(--dsw-alias-bg-module-platform);
  border-color: var(--dsw-static-neutral-bluish-400, var(--dsw-alias-brand-primary));
}
.lumina-set-card.is-off {
  opacity: 0.58;
}
.lumina-set-card-preview {
  box-sizing: border-box;
  width: 68px;
  aspect-ratio: 5 / 8.6;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 6px;
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}
.lumina-set-card-preview img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.lumina-set-card-preview svg {
  width: 100%;
  height: 100%;
  display: block;
}
.lumina-set-card-mark {
  font-size: 22px;
  line-height: 1;
}
.lumina-set-card-name {
  font-size: 13px;
  line-height: 18px;
  color: var(--dsw-alias-label-primary);
  text-align: center;
}
.lumina-set-card-check,
.lumina-set-card-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  border-radius: 999px;
  font-size: 10px;
  line-height: 16px;
  padding: 0 6px;
}
.lumina-set-card-check {
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-on-brand, #fff);
}
.lumina-set-card-badge {
  background: var(--dsw-alias-bg-module-platform);
  color: var(--dsw-alias-label-tertiary);
  border: 1px solid var(--dsw-alias-border-l2);
}
.lumina-set-card-preview.is-rws img {
  transform: scale(1.14);
}
.lumina-set-card-preview.is-minimal {
  background: transparent;
  border: none;
}
.lumina-set-card-preview.is-back {
  background: hsl(var(--lumina-card, 229 35% 12%));
  color: hsl(var(--lumina-ink, 38 47% 58%));
}
`;
}

// src/client/settings/Section.tsx
var import_jsx_runtime14 = require("react/jsx-runtime");
function createSettingsSection(scope, localeApi, remote) {
  return function LuminaSettings() {
    ensureSettingsStyles();
    const [config, setConfig] = (0, import_react7.useState)(() => luminaConfig());
    const [openId, setOpenId] = (0, import_react7.useState)(null);
    const [dshLocale, setDshLocale] = (0, import_react7.useState)(() => localeApi?.getSnapshot?.()?.active ?? "zh");
    const [dataNote, setDataNote] = (0, import_react7.useState)("");
    const snap = scope?.getSnapshot?.();
    const writable = snap?.writable !== false && snap?.status !== "unavailable";
    const locale = resolveUiLocale(config, dshLocale);
    const tx = (key) => t(locale, key);
    (0, import_react7.useEffect)(() => watchLuminaConfig(() => setConfig({ ...luminaConfig() })), []);
    (0, import_react7.useEffect)(() => localeApi?.subscribe?.(() => setDshLocale(localeApi.getSnapshot?.()?.active ?? "zh")) ?? (() => void 0), []);
    const persist = (field, value) => {
      void persistLuminaField(scope, field, value);
    };
    const rowState = { openId, setOpenId };
    const pickArt = (id) => {
      persist("cardArtTheme", id);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lumina-set", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("header", { className: "lumina-set-hero", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(BrandLogo, {}),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lumina-set-hero-text", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "lumina-set-head", children: tx("pageTitle") }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "lumina-set-sub", children: `${tx("pageVersion")} \xB7 ${tx("pageSub")}` })
        ] })
      ] }),
      writable ? null : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "lumina-set-desc", children: tx("readonly") }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SelectRow,
        {
          id: "theme",
          title: tx("theme"),
          options: THEME_OPTIONS.map((opt) => ({ id: opt.id, label: tx(`theme_${opt.id}`) })),
          current: config.theme,
          onPick: (id) => persist("theme", id),
          desc: tx("themeDesc"),
          ...rowState
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SelectRow,
        {
          id: "language",
          title: tx("language"),
          options: [{ id: "follow", label: tx("langFollow") }, { id: "zh-CN", label: tx("langZh") }, { id: "en-US", label: tx("langEn") }],
          current: config.followDshLocale ? "follow" : config.locale,
          onPick: (id) => {
            if (id === "follow") {
              void persistLuminaPatch(scope, { followDshLocale: true });
              return;
            }
            void persistLuminaPatch(scope, {
              followDshLocale: false,
              locale: id
            });
          },
          desc: tx("languageDesc"),
          ...rowState
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SwitchRow,
        {
          title: tx("floatCard"),
          desc: tx("floatCardDesc"),
          on: config.showFloatCard,
          onToggle: () => persist("showFloatCard", !config.showFloatCard)
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lumina-set-block", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-title", children: tx("cardArt") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "lumina-set-desc", children: tx("cardArtDesc") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-cards", children: ART_OPTIONS.map((opt) => {
          const selected = config.cardArtTheme === opt.id;
          return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "button",
            {
              type: "button",
              className: `lumina-set-card${selected ? " is-on" : ""}`,
              "aria-pressed": selected,
              onClick: () => pickArt(opt.id),
              children: [
                selected ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "lumina-set-card-check", children: "\u2713" }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: `lumina-set-card-preview is-${opt.id}`, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ArtPreview, { id: opt.id }) }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-card-name", children: tx(`art_${opt.id}`) })
              ]
            },
            opt.id
          );
        }) }),
        config.cardArtTheme === "aquatic" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "lumina-set-desc", children: tx("artAquaticWarning") }) : null
      ] }),
      config.cardArtTheme === "minimal" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lumina-set-block", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-title", children: tx("cardBack") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "lumina-set-desc", children: tx("cardBackDesc") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-cards", children: BACK_OPTIONS.map((opt) => {
          const selected = config.cardBack === opt.id;
          return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "button",
            {
              type: "button",
              className: `lumina-set-card${selected ? " is-on" : ""}`,
              "aria-pressed": selected,
              onClick: () => persist("cardBack", opt.id),
              children: [
                selected ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "lumina-set-card-check", children: "\u2713" }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-card-preview is-back dsh-lumina", "data-theme": config.theme, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(CardBackSvg, { variant: opt.id }) }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-card-name", children: tx(`back_${opt.id}`) })
              ]
            },
            opt.id
          );
        }) })
      ] }) : null,
      config.cardArtTheme === "minimal" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SelectRow,
        {
          id: "minor",
          title: tx("minor"),
          options: MINOR_OPTIONS.map((opt) => ({ id: opt.id, label: tx(`minor_${opt.id}`) })),
          current: config.minorStyle,
          onPick: (id) => persist("minorStyle", id),
          desc: tx("minorDesc"),
          ...rowState
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SelectRow,
        {
          id: "animation",
          title: tx("animation"),
          options: ANIMATION_OPTIONS.map((opt) => ({ id: opt.id, label: tx(`anim_${opt.id}`) })),
          current: config.animationLevel,
          onPick: (id) => persist("animationLevel", id),
          desc: tx("animationDesc"),
          ...rowState
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SelectRow,
        {
          id: "spread",
          title: tx("defaultSpread"),
          options: SPREAD_OPTIONS.map((opt) => ({ id: opt.id, label: spreadLabel(locale, opt.id) })),
          current: config.defaultSpread,
          onPick: (id) => persist("defaultSpread", id),
          desc: tx("drawDefaultsDesc"),
          ...rowState
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SliderRow,
        {
          title: `${tx("reversedRate")} ${Math.round(config.reversedRate * 100)}%`,
          control: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "input",
            {
              type: "range",
              min: 0,
              max: 1,
              step: 0.05,
              value: config.reversedRate,
              onChange: (event) => persist("reversedRate", Number(event.target.value))
            }
          ),
          desc: tx("reversedRateDesc")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        SliderRow,
        {
          title: `${tx("panelOpacity")} ${Math.round(config.panelOpacity * 100)}%`,
          control: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            "input",
            {
              type: "range",
              min: 0.2,
              max: 0.8,
              step: 0.05,
              value: config.panelOpacity,
              onChange: (event) => persist("panelOpacity", Number(event.target.value))
            }
          )
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lumina-set-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-row-text", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-title", children: tx("resetFloat") }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          import_dsh_client_ui_primitives4.Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            onClick: async () => {
              patchLuminaConfig({ floatX: 0.92, floatY: 0.82 });
              await unsetLuminaField(scope, "floatX");
              await unsetLuminaField(scope, "floatY");
            },
            children: tx("resetAction")
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        DataBlock,
        {
          tx,
          locale,
          theme: config.theme,
          opacity: config.panelOpacity,
          animationLevel: config.animationLevel,
          config,
          remote,
          note: dataNote,
          setNote: setDataNote
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lumina-set-about", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "lumina-set-title", children: tx("about") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "lumina-set-desc", children: tx("aboutLine1") }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("p", { className: "lumina-set-desc", children: tx("aboutLine2") })
      ] })
    ] });
  };
}

// src/client/css/ask.ts
var ASK_CSS = `
.dsh-lumina-ask {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: min(560px, 100%);
  padding: 24px 24px 20px;
  text-align: left;
  color: hsl(var(--lumina-fg));
  background: hsl(var(--lumina-card));
  border: 1px solid hsl(var(--lumina-border));
  border-radius: 24px;
  box-shadow: 0 18px 44px rgba(0,0,0,0.42);
}
.dsh-lumina-ask-title {
  margin: 0;
  font-family: 'Noto Serif SC', 'Songti SC', 'PingFang SC', ui-serif, Georgia, serif;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.4;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-ask-sub {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: hsl(var(--lumina-fg) / 0.88);
}
.dsh-lumina-ask-spread {
  margin: 16px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: hsl(var(--lumina-fg) / 0.88);
}
.dsh-lumina-ask-spread b {
  color: hsl(var(--lumina-fg));
  font-weight: 600;
}
.dsh-lumina-ask-label {
  display: block;
  margin: 16px 0 8px;
  font-size: 14px;
  font-weight: 500;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-ask-input {
  display: block;
  width: 100%;
  box-sizing: border-box;
  min-height: 120px;
  padding: 12px 14px;
  resize: vertical;
  appearance: none;
  border: 1px solid hsl(var(--lumina-border));
  border-radius: 8px;
  background: hsl(var(--lumina-bg));
  color: hsl(var(--lumina-fg));
  font: inherit;
  font-size: 15px;
  line-height: 1.6;
}
.dsh-lumina-ask-input::placeholder {
  color: hsl(var(--lumina-fg) / 0.62);
  opacity: 1;
}
.dsh-lumina-ask-input:focus {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 1px;
}
.dsh-lumina-ask-meta {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 8px;
  font-size: 13px;
  color: hsl(var(--lumina-fg) / 0.72);
}
.dsh-lumina-ask .dsh-lumina-actions {
  justify-content: flex-end;
}
.dsh-lumina-ask .dsh-lumina-cta { margin-right: 0; padding: 0 16px; }
.dsh-lumina-ask .dsh-lumina-cta:disabled { opacity: 0.55; }
.dsh-lumina-ask .dsh-lumina-cta.is-ghost {
  background: transparent;
  color: hsl(var(--lumina-ink));
  box-shadow: none;
}
.dsh-lumina-ask .dsh-lumina-cta.is-ghost:hover:not(:disabled) {
  filter: none;
  background: hsl(var(--lumina-ink) / 0.08);
}
`;

// src/client/css/dock.ts
var DOCK_CSS = `
.dsh-lumina {
  font-family: ui-serif, Georgia, 'Times New Roman', serif;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-dock { pointer-events: none; }
.dsh-lumina-dismiss {
  position: fixed;
  inset: 0;
  z-index: 2147482999;
  pointer-events: auto;
}
.dsh-lumina[data-theme='mystic'] {
  --lumina-bg: 230 30% 7%;
  --lumina-fg: 43 60% 90%;
  --lumina-card: 229 35% 12%;
  --lumina-ink: 38 47% 58%;
  --lumina-muted: 43 25% 65%;
  --lumina-border: 38 47% 25%;
  --lumina-panel: 229 35% 12%;
}
.dsh-lumina[data-theme='minimal'] {
  --lumina-bg: 42 35% 97%;
  --lumina-fg: 0 0% 15%;
  --lumina-card: 0 0% 100%;
  --lumina-ink: 0 0% 12%;
  --lumina-muted: 0 0% 45%;
  --lumina-border: 40 18% 88%;
  --lumina-panel: 0 0% 100%;
}
.dsh-lumina[data-theme='nature'] {
  --lumina-bg: 37 67% 93%;
  --lumina-fg: 18 25% 23%;
  --lumina-card: 38 48% 89%;
  --lumina-ink: 18 42% 45%;
  --lumina-muted: 18 15% 40%;
  --lumina-border: 30 30% 75%;
  --lumina-panel: 38 48% 89%;
}
.dsh-lumina-float {
  position: fixed;
  z-index: 2147483000;
  width: 48px;
  height: 83px;
  pointer-events: auto;
  touch-action: none;
  cursor: grab;
  user-select: none;
}
.dsh-lumina-float:active { cursor: grabbing; }
.dsh-lumina-cardback {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-ink));
  border: 1px solid hsl(var(--lumina-border));
  box-shadow: 0 6px 16px rgba(0,0,0,0.32);
}
.dsh-lumina-cardback svg,
.dsh-lumina-cardback img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.dsh-lumina-cardback img {
  object-fit: cover;
}
.dsh-lumina-cardback[data-anim='full'] {
  animation: dsh-lumina-breathe 3.6s ease-in-out infinite;
}
@keyframes dsh-lumina-breathe {
  0%, 100% { box-shadow: 0 10px 28px rgba(0,0,0,0.32); }
  50% { box-shadow: 0 14px 36px rgba(0,0,0,0.45); }
}
.dsh-lumina-spreads {
  position: fixed;
  z-index: 2147483001;
  width: 0;
  height: 0;
  pointer-events: none;
}
.dsh-lumina-spread {
  pointer-events: auto;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  appearance: none;
  border: none;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
  transform-origin: 50% 50%;
  transform: rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px)));
  animation: dsh-lumina-fan-out 240ms ease-out both;
  animation-delay: calc(var(--i, 0) * 40ms);
}
.dsh-lumina-spread-face {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 4px 3px;
  border: 1px solid hsl(var(--lumina-border));
  border-radius: inherit;
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-fg));
  font: inherit;
  font-size: 10px;
  line-height: 1.2;
  text-align: center;
  word-break: break-word;
  box-shadow: 0 6px 12px rgba(0,0,0,0.24);
  transform: translateY(0) scale(1);
  transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 180ms ease;
}
.dsh-lumina-spread[data-on='1'] .dsh-lumina-spread-face {
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
}
.dsh-lumina-spread:hover:not(:disabled) {
  z-index: 8;
}
.dsh-lumina-spread:hover:not(:disabled) .dsh-lumina-spread-face {
  transform: translateY(-12px) scale(1.06);
  box-shadow: 0 14px 28px rgba(0,0,0,0.4);
}
.dsh-lumina-spread:focus-visible {
  outline: none;
}
.dsh-lumina-spread:focus-visible .dsh-lumina-spread-face {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 2px;
}
.dsh-lumina-spread:disabled { opacity: 0.45; cursor: not-allowed; }
.dsh-lumina-spread.is-action {
  width: max-content;
  height: auto;
  overflow: visible;
  transform: translate(-50%, -50%) rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px))) rotate(calc(-1 * var(--a, 0deg)));
  animation-name: dsh-lumina-action-fan;
}
.dsh-lumina-spread.is-action .dsh-lumina-spread-face {
  display: inline-flex;
  width: auto;
  height: auto;
  min-height: 20px;
  padding: 2px 8px;
  border-radius: 999px;
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.02em;
  line-height: 1.2;
  white-space: nowrap;
  word-break: keep-all;
  box-shadow: 0 4px 10px rgba(0,0,0,0.22);
  transform: none;
}
.dsh-lumina-spread.is-action:hover:not(:disabled) .dsh-lumina-spread-face {
  transform: scale(1.04);
  filter: brightness(1.08);
  box-shadow: 0 8px 16px rgba(0,0,0,0.32);
}
.dsh-lumina-spread.is-action:focus-visible .dsh-lumina-spread-face {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 3px;
}
@keyframes dsh-lumina-fan-out {
  from { opacity: 0; transform: rotate(var(--a, 0deg)) translateY(-24px); }
  to { opacity: 1; transform: rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px))); }
}
@keyframes dsh-lumina-action-fan {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--a, 0deg)) translateY(-24px) rotate(calc(-1 * var(--a, 0deg)));
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--a, 0deg)) translateY(calc(-1 * var(--r, 96px))) rotate(calc(-1 * var(--a, 0deg)));
  }
}
`;

// src/client/css/fx.ts
var FX_CSS = `
.dsh-lumina-mask,
.dsh-lumina-ask-modal {
  position: fixed;
  inset: 0;
  z-index: 2147483002;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}
.dsh-lumina-ask-modal { padding: 16px; }
.dsh-lumina-scrim {
  position: absolute;
  inset: 0;
  pointer-events: none;
  backdrop-filter: blur(14px) saturate(0.85);
  -webkit-backdrop-filter: blur(14px) saturate(0.85);
}
.dsh-lumina-fx {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}
.dsh-lumina-fx canvas {
  display: block;
  width: 100%;
  height: 100%;
}
`;

// src/client/css/history.ts
var HISTORY_CSS = `
.dsh-lumina-history {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: min(640px, 100%);
  max-height: min(82vh, 740px);
  padding: 20px 20px 16px;
  text-align: left;
  color: hsl(var(--lumina-fg));
  background: hsl(var(--lumina-card));
  border: 1px solid hsl(var(--lumina-border));
  overflow: hidden;
  border-radius: 24px;
  box-shadow: 0 18px 44px rgba(0,0,0,0.42);
}
.dsh-lumina-history-head {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.dsh-lumina-history-title {
  margin: 0;
  font-family: 'Noto Serif SC', 'Songti SC', 'PingFang SC', ui-serif, Georgia, serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0.04em;
  line-height: 1.4;
}
.dsh-lumina-history-count {
  margin: 6px 0 0;
  font-size: 13px;
  color: hsl(var(--lumina-fg) / 0.72);
}
.dsh-lumina-history-body {
  flex: 1 1 auto;
  min-height: 0;
  margin-top: 16px;
  overflow: auto;
  overscroll-behavior: contain;
}
.dsh-lumina-history-status {
  margin: 8px 0 0;
  font-size: 14px;
  line-height: 1.6;
  color: hsl(var(--lumina-fg) / 0.88);
}
.dsh-lumina-history-status.is-error {
  color: #c45b5b;
}
.dsh-lumina-history-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28px 12px 20px;
  text-align: center;
}
.dsh-lumina-history-empty-mark {
  font-size: 36px;
  line-height: 1;
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-history-empty-title {
  margin: 12px 0 0;
  font-size: 15px;
  line-height: 1.5;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-history-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.dsh-lumina-history-more {
  height: 1px;
  margin: 0;
  padding: 0;
  list-style: none;
  pointer-events: none;
}
.dsh-lumina-history-item {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 14px 14px 12px;
  border: 1px solid hsl(var(--lumina-border));
  border-radius: 14px;
  background: hsl(var(--lumina-bg) / 0.45);
  color: hsl(var(--lumina-fg));
  text-align: left;
  cursor: pointer;
}
.dsh-lumina-history-item:hover {
  border-color: hsl(var(--lumina-ink) / 0.45);
}
.dsh-lumina-history-item:focus-visible {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 2px;
}
.dsh-lumina-history-item.is-open {
  background: hsl(var(--lumina-bg) / 0.62);
}
.dsh-lumina-history-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
  color: hsl(var(--lumina-fg) / 0.72);
}
.dsh-lumina-history-period {
  flex-shrink: 0;
  padding: 2px 8px;
  border-radius: 999px;
  background: hsl(var(--lumina-ink) / 0.12);
  color: hsl(var(--lumina-fg) / 0.82);
  font-size: 11px;
}
.dsh-lumina-history-q {
  margin: 8px 0 0;
  font-family: 'Noto Serif SC', 'Songti SC', 'PingFang SC', ui-serif, Georgia, serif;
  font-size: 16px;
  line-height: 1.45;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-history-q span {
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-history-sum {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.55;
  color: hsl(var(--lumina-fg) / 0.82);
}
.dsh-lumina-history-thumbs {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 8px;
  margin: 12px 0 0;
}
.dsh-lumina-history-thumbs .dsh-lumina-face {
  width: 88px;
  min-height: 158px;
  padding: 7px 6px 8px;
  flex: 0 0 auto;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .nm {
  font-size: 11px;
  line-height: 1.25;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .meta {
  font-size: 10px;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .art {
  min-height: 72px;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .art svg {
  max-height: 64px;
}
.dsh-lumina-history-thumbs .dsh-lumina-face .sym {
  font-size: 22px;
}
.dsh-lumina-hcard.is-photo {
  position: relative;
  width: 88px;
  height: 151px;
  flex: 0 0 auto;
  overflow: hidden;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-hcard.is-photo .art {
  position: absolute;
  inset: 0;
  width: 88px;
  height: 151px;
  display: block;
  min-height: 0;
  overflow: hidden;
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-hcard.is-photo .art img {
  width: 88px;
  height: 151px;
  object-fit: cover;
  display: block;
}
.dsh-lumina-hcard.is-photo .art img.is-rws {
  transform: scale(1.14);
  transform-origin: center;
}
.dsh-lumina-hcard.is-photo .art.is-reversed img {
  transform: rotate(180deg);
}
.dsh-lumina-hcard.is-photo .art.is-reversed img.is-rws {
  transform: rotate(180deg) scale(1.14);
}
.dsh-lumina-hcard.is-photo .art svg {
  width: 70%;
  height: auto;
  max-height: 70%;
  margin: 16% auto 0;
  display: block;
  pointer-events: none;
}
.dsh-lumina-hcard.is-photo .sym {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}
.dsh-lumina-hcard-rev {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 1;
  padding: 2px 4px;
  border-radius: 3px;
  background: #c45b5b;
  color: #f6ecec;
  font-size: 9px;
  font-weight: 600;
  line-height: 1.2;
}
.dsh-lumina-hcard-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  padding: 18px 4px 5px;
  background: linear-gradient(transparent, rgba(18, 16, 12, 0.78));
  color: #f3ece0;
  font-size: 10px;
  line-height: 1.2;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dsh-lumina-history-detail {
  margin: 12px 0 0;
  padding-top: 10px;
  border-top: 1px solid hsl(var(--lumina-border));
  font-size: 13px;
  line-height: 1.55;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-history-detail p {
  margin: 0 0 8px;
}
.dsh-lumina-history-detail p:last-child {
  margin-bottom: 0;
}
.dsh-lumina-history .dsh-lumina-iconbtn {
  color: hsl(var(--lumina-fg));
}
`;

// src/client/css/panel.ts
var PANEL_CSS = `
.dsh-lumina-chip, .dsh-lumina-btn {
  appearance: none;
  border: 1px solid hsl(var(--lumina-border));
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  padding: 5px 8px;
  border-radius: 8px;
  cursor: pointer;
}
.dsh-lumina-chip[data-on='1'] {
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
}
.dsh-lumina-btn { width: 100%; text-align: left; margin-top: 4px; }
.dsh-lumina-chip:disabled,
.dsh-lumina-btn:disabled { opacity: 0.45; cursor: not-allowed; }
.dsh-lumina-stage {
  --lumina-overlay-fg: 43 28% 94%;
  --lumina-overlay-muted: 43 16% 78%;
  --lumina-overlay-halo: 0 1px 2px rgba(8, 10, 16, 0.78), 0 0 14px rgba(8, 10, 16, 0.42);
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min(720px, calc(100vw - 32px));
  max-height: min(86vh, 760px);
  overflow: auto;
  padding: 24px 16px;
  background: none;
  border: none;
  box-shadow: none;
}
.dsh-lumina-shuffle {
  position: relative;
  width: 180px;
  height: 210px;
  margin: 24px auto 8px;
}
.dsh-lumina-shuffle-card {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 72px;
  height: 124px;
  transform-origin: 50% 50%;
  transform: translate(-50%, -50%) rotate(calc((var(--i) - 3) * 5deg)) translateY(calc((var(--i) - 3) * -3px));
}
.dsh-lumina-shuffle-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.dsh-lumina-shuffle-card.is-dancing {
  animation: dsh-lumina-shuffle-dance 1.8s ease-in-out infinite;
  animation-delay: calc(var(--i) * 80ms);
}
.dsh-lumina-shuffle[data-level='lite'] .dsh-lumina-shuffle-card.is-dancing {
  animation-duration: 1.1s;
}
@keyframes dsh-lumina-shuffle-dance {
  0% { transform: translate(-50%, -50%) rotate(calc((var(--i) - 3) * 5deg)) translateY(calc((var(--i) - 3) * -3px)); }
  25% { transform: translate(calc(-50% + 38px), -60%) rotate(calc((var(--i) - 3) * 16deg)) translateY(-14px); }
  50% { transform: translate(calc(-50% - 40px), -40%) rotate(calc((var(--i) - 3) * -14deg)) translateY(-4px); }
  75% { transform: translate(calc(-50% + 18px), -52%) rotate(calc((var(--i) - 3) * 8deg)) translateY(-10px); }
  100% { transform: translate(-50%, -50%) rotate(calc((var(--i) - 3) * 5deg)) translateY(calc((var(--i) - 3) * -3px)); }
}
.dsh-lumina-caption {
  text-align: center;
  font-size: 15px;
  margin: 0 0 8px;
  color: hsl(var(--lumina-overlay-fg));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-error {
  color: hsl(0 52% 72%);
  text-align: center;
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin: 12px 0 16px;
  perspective: 640px;
}
.dsh-lumina-face {
  width: 108px;
  min-height: 186px;
  padding: 10px 8px;
  border-radius: 8px;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-card));
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.dsh-lumina-face.is-reveal {
  animation: dsh-lumina-flip-in 320ms ease both;
  animation-delay: calc(var(--i, 0) * 70ms);
}
.dsh-lumina-grid[data-level='off'] .dsh-lumina-face.is-reveal {
  animation: none;
}
@keyframes dsh-lumina-flip-in {
  from { opacity: 0; transform: rotateY(-70deg) translateY(8px); }
  to { opacity: 1; transform: none; }
}
.dsh-lumina-face .sym { font-size: 28px; text-align: center; line-height: 1; }
.dsh-lumina-face .nm { font-size: 13px; text-align: center; }
.dsh-lumina-face .meta { font-size: 11px; color: hsl(var(--lumina-muted)); text-align: center; }
.dsh-lumina-face .meta.row {
  display: flex;
  justify-content: space-between;
  gap: 6px;
}
.dsh-lumina-face .art,
.dsh-lumina-tool-face .art {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 64px;
  overflow: hidden;
  color: hsl(var(--lumina-ink));
}
.dsh-lumina-face .art img,
.dsh-lumina-tool-face .art img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.dsh-lumina-face .art img.is-rws,
.dsh-lumina-tool-face .art img.is-rws {
  transform: scale(1.14);
  transform-origin: center;
}
.dsh-lumina-face .art svg,
.dsh-lumina-tool-face .art svg {
  width: 78%;
  height: auto;
  max-height: 92px;
  pointer-events: none;
}
.dsh-lumina-tool-face .art svg { max-height: 92px; }
.dsh-lumina-face .art.is-reversed svg,
.dsh-lumina-tool-face .art.is-reversed svg,
.dsh-lumina-face .art.is-reversed .sym,
.dsh-lumina-tool-face .art.is-reversed .sym,
.dsh-lumina-face .art.is-reversed img,
.dsh-lumina-tool-face .art.is-reversed img {
  transform: rotate(180deg);
}
.dsh-lumina-face .art.is-reversed img.is-rws,
.dsh-lumina-tool-face .art.is-reversed img.is-rws {
  transform: rotate(180deg) scale(1.14);
}
.dsh-lumina-readings {
  width: 100%;
  max-width: 480px;
  margin: 4px 0 0;
  text-align: left;
  color: hsl(var(--lumina-overlay-fg));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-reading { margin: 0 0 12px; }
.dsh-lumina-reading .hd,
.dsh-lumina-fields .hd {
  font-size: 11px;
  letter-spacing: 0.04em;
  color: hsl(var(--lumina-overlay-muted));
}
.dsh-lumina-reading p { margin: 2px 0 0; font-size: 13px; line-height: 1.5; }
.dsh-lumina-extra {
  margin: 4px 0 0;
  padding: 8px 10px;
  border: 1px solid hsl(var(--lumina-overlay-fg) / 0.18);
  border-radius: 8px;
  background: rgba(8, 10, 16, 0.42);
}
.dsh-lumina-extra summary {
  cursor: pointer;
  font-size: 12px;
  color: hsl(var(--lumina-overlay-muted));
}
.dsh-lumina-extra summary:focus-visible {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 2px;
}
.dsh-lumina-fields { margin: 8px 0 0; }
.dsh-lumina-fields p { margin: 4px 0 0; font-size: 12px; line-height: 1.5; }
.dsh-lumina-note {
  margin: 12px 0 0;
  font-size: 12px;
  color: hsl(var(--lumina-overlay-muted));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}
.dsh-lumina-actions .dsh-lumina-btn {
  width: auto;
  margin-top: 0;
  text-align: center;
}
.dsh-lumina-cta {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  margin-right: 8px;
  padding: 0 16px 0 14px;
  appearance: none;
  border: 1px solid hsl(var(--lumina-ink));
  border-radius: 20px;
  background: hsl(var(--lumina-ink));
  color: hsl(var(--lumina-card));
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 0 0 1px hsl(var(--lumina-card) / 0.28), 0 10px 24px rgba(0,0,0,0.38);
}
.dsh-lumina-cta svg { flex-shrink: 0; }
.dsh-lumina-cta:hover:not(:disabled) {
  filter: brightness(1.08);
}
.dsh-lumina-cta:focus-visible {
  outline: 1px solid hsl(var(--lumina-ink));
  outline-offset: 3px;
}
.dsh-lumina-cta:disabled {
  cursor: not-allowed;
  opacity: 0.78;
}
.dsh-lumina-iconbtn {
  box-sizing: border-box;
  width: 36px;
  height: 36px;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.dsh-lumina-stage .dsh-lumina-iconbtn {
  color: hsl(var(--lumina-overlay-fg));
  filter: drop-shadow(0 1px 2px rgba(8, 10, 16, 0.72));
}
.dsh-lumina-iconbtn:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(38, 49, 72, 0.06));
}
.dsh-lumina-stage .dsh-lumina-iconbtn:hover:not(:disabled) {
  background: hsl(var(--lumina-overlay-fg) / 0.1);
}
.dsh-lumina-iconbtn:focus-visible {
  outline: 1px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
.dsh-lumina-iconbtn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.dsh-lumina-question {
  margin: 0 0 12px;
  max-width: 560px;
  font-size: 14px;
  line-height: 1.5;
  color: hsl(var(--lumina-overlay-muted));
  text-shadow: var(--lumina-overlay-halo);
}
.dsh-lumina-stage .dsh-lumina-btn {
  color: hsl(var(--lumina-overlay-fg));
  border-color: hsl(var(--lumina-overlay-fg) / 0.28);
  text-shadow: var(--lumina-overlay-halo);
}
`;

// src/client/css/tool.ts
var TOOL_CSS = `
.dsh-lumina-tool {
  padding: 10px 12px 12px;
  border-radius: 10px;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-card));
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-tool.is-running .dsh-lumina-tool-cap {
  opacity: 0.7;
}
.dsh-lumina-tool.is-error .dsh-lumina-tool-cap {
  color: #c45b5b;
}
.dsh-lumina-tool-cap {
  margin: 0 0 8px;
  font-size: 13px;
}
.dsh-lumina-tool-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.dsh-lumina-tool-face {
  width: 108px;
  min-height: 186px;
  padding: 10px 8px;
  border-radius: 8px;
  border: 1px solid hsl(var(--lumina-border));
  background: hsl(var(--lumina-bg));
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
}
.dsh-lumina-tool-face .sym { font-size: 28px; line-height: 1; }
.dsh-lumina-tool-face .nm { font-size: 13px; }
.dsh-lumina-tool-face .pos,
.dsh-lumina-tool-face .ori { font-size: 11px; color: hsl(var(--lumina-muted)); }
.dsh-lumina-tool-face .keys { font-size: 11px; color: hsl(var(--lumina-muted)); line-height: 1.3; }
.dsh-lumina-tool-q {
  margin: 0 0 8px;
  font-size: 12px;
  line-height: 1.45;
  color: hsl(var(--lumina-muted));
}
.dsh-lumina-tool-detail {
  margin: 10px 0 0;
  color: hsl(var(--lumina-fg));
}
.dsh-lumina-tool-detail > div { margin: 0 0 8px; }
.dsh-lumina-tool-detail > div:last-child { margin-bottom: 0; }
.dsh-lumina-tool-detail .hd {
  font-size: 11px;
  letter-spacing: 0.04em;
  color: hsl(var(--lumina-muted));
}
.dsh-lumina-tool-detail p {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 1.5;
}
`;

// src/client/styles.ts
var STYLE_ID = "dsh-lumina-tarot-css";
var FONT_ID = "dsh-lumina-tarot-font";
function ensureBrandFont2() {
  if (typeof document === "undefined" || !document.head) return;
  if (document.getElementById(FONT_ID)) return;
  const link = document.createElement("link");
  link.id = FONT_ID;
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600&display=swap";
  document.head.appendChild(link);
}
function ensureStyles() {
  if (typeof document === "undefined" || !document.head) return;
  ensureBrandFont2();
  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement("style");
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `${DOCK_CSS}${FX_CSS}${PANEL_CSS}${ASK_CSS}${HISTORY_CSS}${TOOL_CSS}`;
  if (!style.parentNode) document.head.appendChild(style);
}

// src/client/nav-icon.ts
var NS = "http://www.w3.org/2000/svg";
function roundedRect(x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  return [
    `M${x + rr} ${y}`,
    `H${x + w - rr}`,
    `A${rr} ${rr} 0 0 1 ${x + w} ${y + rr}`,
    `V${y + h - rr}`,
    `A${rr} ${rr} 0 0 1 ${x + w - rr} ${y + h}`,
    `H${x + rr}`,
    `A${rr} ${rr} 0 0 1 ${x} ${y + h - rr}`,
    `V${y + rr}`,
    `A${rr} ${rr} 0 0 1 ${x + rr} ${y}`,
    "Z"
  ].join(" ");
}
function ring(x, y, w, h, r, t2) {
  return `${roundedRect(x, y, w, h, r)} ${roundedRect(x + t2, y + t2, w - t2 * 2, h - t2 * 2, Math.max(0.25, r - t2))}`;
}
function createCardSvg() {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("fill", "none");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("data-lumina-card", "2");
  const face = document.createElementNS(NS, "path");
  face.setAttribute("d", ring(3, 1, 10, 14, 2, 1.5));
  face.setAttribute("fill", "currentColor");
  face.setAttribute("fill-rule", "evenodd");
  const diamond = document.createElementNS(NS, "path");
  diamond.setAttribute("d", [
    "M8 4.75 L11 8 L8 11.25 L5 8 Z",
    "M8 6.35 L9.4 8 L8 9.65 L6.6 8 Z"
  ].join(" "));
  diamond.setAttribute("fill", "currentColor");
  diamond.setAttribute("fill-rule", "evenodd");
  svg.append(face, diamond);
  return svg;
}
function isLuminaNavButton(button) {
  if (button.getAttribute("data-lumina-nav") === "1") return true;
  const label = button.querySelector("span")?.textContent?.trim();
  return label === "Lumina \u5854\u7F57" || label === "Lumina Tarot";
}
function syncNav(getLabel) {
  const label = getLabel();
  for (const button of document.querySelectorAll("button")) {
    if (!isLuminaNavButton(button)) continue;
    button.setAttribute("data-lumina-nav", "1");
    const span = button.querySelector("span");
    if (span && span.textContent !== label) span.textContent = label;
    const svg = button.querySelector("svg");
    if (!svg || svg.getAttribute("data-lumina-card") === "2") continue;
    const next = createCardSvg();
    const cls = svg.getAttribute("class");
    if (cls) next.setAttribute("class", cls);
    next.setAttribute("width", svg.getAttribute("width") ?? "16");
    next.setAttribute("height", svg.getAttribute("height") ?? "16");
    svg.replaceWith(next);
  }
}
function installLuminaNavIcon(getLabel, locale) {
  if (typeof document === "undefined" || !document.body) return () => void 0;
  const sync = () => syncNav(getLabel);
  const observer = new MutationObserver(sync);
  observer.observe(document.body, { childList: true, subtree: true });
  const offConfig = watchLuminaConfig(sync);
  const offLocale = locale?.subscribe?.(sync) ?? (() => void 0);
  sync();
  return () => {
    observer.disconnect();
    offConfig();
    offLocale();
  };
}

// src/client/toolview.tsx
var import_react8 = require("react");

// src/client/reading/ReadingChatCard.tsx
var import_jsx_runtime15 = require("react/jsx-runtime");
function ReadingChatCard(props) {
  const config = luminaConfig();
  const locale = resolveUiLocale(config);
  const tx = (key) => t(locale, key);
  if (props.running) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dsh-lumina dsh-lumina-tool is-running", "data-theme": config.theme, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "dsh-lumina-tool-cap", children: tx("drawing") }) });
  }
  if (props.error) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dsh-lumina dsh-lumina-tool is-error", "data-theme": config.theme, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "dsh-lumina-tool-cap", children: props.error }) });
  }
  if (!props.reading) {
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dsh-lumina dsh-lumina-tool", "data-theme": config.theme, children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "dsh-lumina-tool-cap", children: props.note || "\u62BD\u724C\u5931\u8D25" }) });
  }
  const reading = props.reading;
  const title = reading.kind === "today" ? tx("today") : locale === "en-US" ? spreadLabel(locale, reading.spreadId) : reading.spreadName;
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dsh-lumina dsh-lumina-tool", "data-theme": config.theme, children: [
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "dsh-lumina-tool-cap", children: title }),
    reading.question ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "dsh-lumina-tool-q", children: `\u300C${reading.question}\u300D` }) : null,
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dsh-lumina-tool-grid", children: reading.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "dsh-lumina-tool-face", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "pos", children: locale === "en-US" ? card.positionRole : card.positionName }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
        CardArt,
        {
          symbol: card.symbol,
          reversed: card.reversed,
          arcana: card.arcana,
          suit: card.suit,
          rank: card.rank,
          minorStyle: config.minorStyle,
          cardId: card.cardId,
          artTheme: config.cardArtTheme
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "nm", children: locale === "en-US" ? card.nameEn : card.name }),
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "ori", children: card.reversed ? tx("reversed") : tx("upright") }),
      card.keywords.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "keys", children: card.keywords.slice(0, 3).join(" \xB7 ") }) : null
    ] }, `${card.positionIndex}-${card.cardId}`)) }),
    /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "dsh-lumina-tool-detail", children: reading.cards.map((card) => {
      const pos = locale === "en-US" ? card.positionRole : card.positionName;
      const name2 = locale === "en-US" ? card.nameEn : card.name;
      const mark = card.reversed ? tx("reversedShort") : "";
      return /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "hd", children: `${pos} \xB7 ${name2}${mark}` }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { children: card.meaning })
      ] }, `${card.positionIndex}-${card.cardId}`);
    }) })
  ] });
}

// src/domain/tool-reading.ts
var SPREADS = ["single", "three-card", "cross", "celtic-lite"];
function readingFromToolView(value) {
  return {
    id: value.id,
    createdAt: value.createdAt,
    spreadId: value.spreadId,
    spreadName: value.spreadName,
    kind: value.kind,
    question: value.question,
    cards: value.cards.map((card) => ({
      ...card,
      summary: "",
      love: "",
      career: "",
      advice: ""
    }))
  };
}
function asString(value) {
  return typeof value === "string" ? value : void 0;
}
function asNumber(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function asBoolean(value) {
  return typeof value === "boolean" ? value : void 0;
}
function asStringArray(value) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string");
}
var SUITS = ["wands", "cups", "swords", "pentacles"];
var RANKS = [
  "ace",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "page",
  "knight",
  "queen",
  "king"
];
function asSuit(value) {
  return typeof value === "string" && SUITS.includes(value) ? value : void 0;
}
function asRank(value) {
  return typeof value === "string" && RANKS.includes(value) ? value : void 0;
}
function parseCard(value) {
  if (!value || typeof value !== "object") return null;
  const rec = value;
  const cardId = asString(rec.cardId);
  const name2 = asString(rec.name);
  const reversed = asBoolean(rec.reversed);
  const positionIndex = asNumber(rec.positionIndex);
  if (!cardId || !name2 || reversed === void 0 || positionIndex === void 0) return null;
  return {
    cardId,
    name: name2,
    nameEn: asString(rec.nameEn) ?? "",
    symbol: asString(rec.symbol) ?? "",
    number: asNumber(rec.number) ?? 0,
    arcana: rec.arcana === "minor" ? "minor" : "major",
    suit: asSuit(rec.suit),
    rank: asRank(rec.rank),
    reversed,
    positionIndex,
    positionName: asString(rec.positionName) ?? `\u4F4D ${positionIndex + 1}`,
    positionRole: asString(rec.positionRole) ?? "",
    keywords: asStringArray(rec.keywords),
    meaning: asString(rec.meaning) ?? ""
  };
}
function parseToolReading(value) {
  if (!value || typeof value !== "object") return null;
  const rec = value;
  const id = asString(rec.id);
  const spreadId = asString(rec.spreadId);
  const kind = rec.kind === "today" ? "today" : rec.kind === "draw" ? "draw" : void 0;
  if (!id || !spreadId || !kind || !SPREADS.includes(spreadId) || !Array.isArray(rec.cards)) return null;
  const cards = rec.cards.map(parseCard);
  if (cards.some((card) => !card)) return null;
  return {
    id,
    createdAt: asNumber(rec.createdAt) ?? 0,
    spreadId,
    spreadName: asString(rec.spreadName) ?? spreadId,
    kind,
    question: asString(rec.question),
    cards
  };
}
function parseReadingText(text) {
  if (!text) return null;
  try {
    return parseToolReading(JSON.parse(text));
  } catch {
    return null;
  }
}
var LUMINA_READING_EVENT = "dsh-lumina-reading";

// src/client/toolview.tsx
var import_jsx_runtime16 = require("react/jsx-runtime");
var announced = /* @__PURE__ */ new Set();
function firstText(content) {
  if (!Array.isArray(content)) return "";
  for (const block of content) {
    if (block?.type === "text" && typeof block.text === "string") return block.text;
  }
  return "";
}
function readingFromBlock(block) {
  if (!block || block.kind !== "tool-result" || block.isError) return null;
  return parseToolReading(block.meta) ?? parseReadingText(firstText(block.content));
}
function announce(reading) {
  if (announced.has(reading.id)) return;
  announced.add(reading.id);
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LUMINA_READING_EVENT, { detail: reading }));
}
function LuminaDrawView(props) {
  const block = props.block;
  const running = !block || block.kind !== "tool-result";
  const failed = block?.kind === "tool-result" && Boolean(block.isError);
  const reading = readingFromBlock(block);
  (0, import_react8.useEffect)(() => {
    if (reading) announce(reading);
  }, [reading?.id]);
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    ReadingChatCard,
    {
      running,
      reading,
      error: failed ? firstText(block?.content) || "\u62BD\u724C\u5931\u8D25" : void 0
    }
  );
}

// src/client/commandview.tsx
var import_jsx_runtime17 = require("react/jsx-runtime");
function commandOf(input) {
  if (!input) return void 0;
  if (input.outcome !== void 0) return input;
  return commandOf(input.data) ?? commandOf(input.node);
}
function LuminaCommandView(props) {
  const node = commandOf(props.node);
  const outcome = node?.outcome;
  if (!outcome) return null;
  if (outcome.kind === "error") return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ReadingChatCard, { error: outcome.text || "\u547D\u4EE4\u5931\u8D25" });
  const reading = parseReadingText(outcome.text);
  if (!reading) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ReadingChatCard, { reading });
}

// src/client/overlay/LuminaOverlay.tsx
var import_react13 = require("react");

// src/client/dock/geometry.ts
function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}
function posToPx(floatX, floatY) {
  const maxX = Math.max(0, window.innerWidth - CARD_W);
  const maxY = Math.max(0, window.innerHeight - CARD_H);
  return { left: clamp01(floatX) * maxX, top: clamp01(floatY) * maxY };
}
function pxToPos(left, top) {
  const maxX = Math.max(1, window.innerWidth - CARD_W);
  const maxY = Math.max(1, window.innerHeight - CARD_H);
  return { floatX: clamp01(left / maxX), floatY: clamp01(top / maxY) };
}

// src/client/dock/pointer.ts
function createFloatPointer(opts) {
  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    const node = opts.cardRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    opts.dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origLeft: rect.left,
      origTop: rect.top,
      moved: false,
      left: rect.left,
      top: rect.top
    };
    try {
      node.setPointerCapture(event.pointerId);
    } catch {
    }
  };
  const onPointerMove = (event) => {
    const drag = opts.dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    if (Math.abs(dx) + Math.abs(dy) >= DRAG_THRESHOLD) drag.moved = true;
    if (!drag.moved) return;
    const maxX = Math.max(0, window.innerWidth - CARD_W);
    const maxY = Math.max(0, window.innerHeight - CARD_H);
    drag.left = Math.min(maxX, Math.max(0, drag.origLeft + dx));
    drag.top = Math.min(maxY, Math.max(0, drag.origTop + dy));
    patchLuminaConfig(pxToPos(drag.left, drag.top));
  };
  const onPointerUp = (event) => {
    const drag = opts.dragRef.current;
    if (!drag) return;
    const node = opts.cardRef.current;
    if (drag.pointerId === event.pointerId) {
      try {
        node?.releasePointerCapture(event.pointerId);
      } catch {
      }
    }
    const wasDrag = drag.moved;
    const next = pxToPos(drag.left, drag.top);
    opts.dragRef.current = null;
    if (wasDrag) {
      patchLuminaConfig(next);
      void persistLuminaField(opts.scope, "floatX", next.floatX).then(() => persistLuminaField(opts.scope, "floatY", next.floatY));
      return;
    }
    if (opts.drawingRef.current || opts.getAsk()) return;
    if (opts.getMenu()) opts.setMenu(false);
    opts.setPendingSpread(opts.getDefaultSpread());
    opts.onAsk();
  };
  const onContextMenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (opts.dragRef.current?.moved) return;
    opts.setPendingSpread(opts.getDefaultSpread());
    opts.setMenu(true);
  };
  return { onPointerDown, onPointerMove, onPointerUp, onContextMenu };
}

// src/client/overlay/live-reading.ts
function listenToolReading(opts) {
  const onReading = (event) => {
    const parsed = parseToolReading(event.detail);
    if (!parsed) return;
    if (opts.phaseRef.current === "idle") return;
    if (opts.drawingRef.current) return;
    opts.drawingRef.current = true;
    opts.setBusy(true);
    opts.setMenu(false);
    opts.setAsk(false);
    opts.setHistoryOpen?.(false);
    opts.setPhase("loading");
    opts.setErrorText("");
    const waitMs = minShuffleMs(opts.animationLevel === "off" ? "off" : "lite");
    window.setTimeout(() => {
      opts.setReading(readingFromToolView(parsed));
      opts.setPhase("result");
      opts.drawingRef.current = false;
      opts.setBusy(false);
    }, waitMs);
  };
  window.addEventListener(LUMINA_READING_EVENT, onReading);
  return () => window.removeEventListener(LUMINA_READING_EVENT, onReading);
}

// src/domain/interpret-prompt.ts
function buildInterpretPrompt(reading) {
  const question = reading.question ? `\u8BF7\u89E3\u8BFB\u300C${reading.question}\u300D` : `\u8BF7\u89E3\u8BFB\u521A\u624D\u7684${reading.spreadName}`;
  const faces = reading.cards.map((card) => `${card.positionName} ${card.name}${card.reversed ? "\uFF08\u9006\uFF09" : ""}`).join(" \xB7 ");
  return `${question}\u3002\u9075\u5B88 lumina-interpret skill\uFF0C\u7981\u6B62\u6539\u724C\u6216\u91CD\u62BD\u3002
${faces}`;
}

// src/client/overlay/interpret-send.ts
function liveSessionId(current2, sessions, listedCurrent) {
  const id = current2 || listedCurrent?.();
  if (!id) return void 0;
  if (sessions?.list?.getSnapshot?.()?.byId?.[id]?.blank === true) return void 0;
  return id;
}
async function runInterpret(opts) {
  if (liveSessionId(opts.current, opts.sessions, opts.actions.listedCurrent)) {
    await opts.executeInterpret();
    return;
  }
  const id = await ensureSession(opts.current, opts.recentWorkspaceId, opts.actions);
  opts.actions.openSession(id);
  await settle();
  await promptSession(opts.sessions, id, buildInterpretPrompt(opts.reading));
}

// src/client/overlay/dismiss.ts
var import_react9 = require("react");
function useOverlayDismiss(opts) {
  const { active, modal, menuRef, cardRef, onDismiss } = opts;
  (0, import_react9.useEffect)(() => {
    if (!active) return;
    const onPointerDown = (event) => {
      if (modal) return;
      const node = event.target;
      if (node instanceof Element && node.closest(".dsh-lumina-spread, .dsh-lumina-float, .dsh-lumina-spreads, .dsh-lumina-dismiss")) return;
      if (menuRef.current?.contains(node)) return;
      if (cardRef.current?.contains?.(node)) return;
      onDismiss();
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") onDismiss();
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, modal, menuRef, cardRef, onDismiss]);
}

// src/client/overlay/history-layer.ts
var import_react10 = require("react");
function useHistoryLayer(executeLine) {
  const [open, setOpen] = (0, import_react10.useState)(false);
  const load = (0, import_react10.useCallback)(async () => {
    return parseHistory((await executeLine("/lumina history")).text);
  }, [executeLine]);
  return { open, setOpen, load };
}

// src/client/dock/FloatCard.tsx
var import_jsx_runtime18 = require("react/jsx-runtime");
function FloatCard(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
    "div",
    {
      ref: props.cardRef,
      className: "dsh-lumina-float",
      title: props.title,
      style: { left: props.left, top: props.top },
      onPointerDown: props.onPointerDown,
      onPointerMove: props.onPointerMove,
      onPointerUp: props.onPointerUp,
      onPointerCancel: props.onPointerUp,
      onContextMenu: props.onContextMenu,
      children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(
        "div",
        {
          className: "dsh-lumina-cardback",
          "data-anim": props.animationLevel,
          style: { borderRadius: props.radius },
          children: /* @__PURE__ */ (0, import_jsx_runtime18.jsx)(CardBack, { variant: props.cardBack, art: props.cardArtTheme })
        }
      )
    }
  );
}

// src/client/panel/ResultPanel.tsx
var import_dsh_client_ui_primitives5 = require("@deepseek-ai/dsh-client-ui-primitives");

// src/client/shuffle/ShuffleStack.tsx
var import_jsx_runtime19 = require("react/jsx-runtime");
function ShuffleStack(config) {
  const level = config.animationLevel;
  const count = level === "lite" ? 4 : 6;
  const dance = level !== "off";
  return /* @__PURE__ */ (0, import_jsx_runtime19.jsx)("div", { className: "dsh-lumina-shuffle", "data-level": level, children: Array.from({ length: count }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(
    "div",
    {
      className: `dsh-lumina-shuffle-card${dance ? " is-dancing" : ""}`,
      style: {
        ["--i"]: String(i),
        borderRadius: radiusFor(config.theme),
        overflow: "hidden",
        background: "hsl(var(--lumina-card))",
        color: "hsl(var(--lumina-ink))",
        border: "1px solid hsl(var(--lumina-border))"
      },
      children: /* @__PURE__ */ (0, import_jsx_runtime19.jsx)(CardBack, { variant: config.cardBack, art: config.cardArtTheme })
    },
    i
  )) });
}

// src/client/panel/ResultPanel.tsx
var import_jsx_runtime20 = require("react/jsx-runtime");
function posLabel(card, locale) {
  return locale === "en-US" ? card.positionRole : card.positionName;
}
function cardLabel(card, locale, tx) {
  const name2 = locale === "en-US" ? card.nameEn : card.name;
  return `${posLabel(card, locale)} \xB7 ${name2}${card.reversed ? tx("reversedShort") : ""}`;
}
function CardFace(props) {
  const { card, locale, tx } = props;
  const corner = cornerLabel(card.arcana, card.number, card.rank);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "div",
    {
      className: props.reveal ? "dsh-lumina-face is-reveal" : "dsh-lumina-face",
      style: { borderRadius: props.radius, ["--i"]: String(props.index) },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "meta row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { children: posLabel(card, locale) }),
          corner ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("span", { children: corner }) : null
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          CardArt,
          {
            symbol: card.symbol,
            reversed: card.reversed,
            arcana: card.arcana,
            suit: card.suit,
            rank: card.rank,
            minorStyle: props.minorStyle,
            cardId: card.cardId,
            artTheme: props.artTheme
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "nm", children: locale === "en-US" ? card.nameEn : card.name }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "meta", children: card.reversed ? tx("reversed") : tx("upright") }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "meta", children: (card.keywords ?? []).slice(0, 3).join(" \xB7 ") })
      ]
    }
  );
}
function CardReadings(props) {
  const { cards, locale, tx } = props;
  const extras = cards.filter((card) => card.love || card.career || card.advice);
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "dsh-lumina-readings", children: [
    cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "dsh-lumina-reading", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "hd", children: cardLabel(card, locale, tx) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { children: card.meaning })
    ] }, `${card.positionIndex}-${card.cardId}`)),
    extras.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("details", { className: "dsh-lumina-extra", children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("summary", { children: tx("moreFields") }),
      extras.map((card) => /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "dsh-lumina-fields", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "hd", children: posLabel(card, locale) }),
        card.love ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { children: `${tx("love")}\uFF1A${card.love}` }) : null,
        card.career ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { children: `${tx("career")}\uFF1A${card.career}` }) : null,
        card.advice ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { children: `${tx("advice")}\uFF1A${card.advice}` }) : null
      ] }, `${card.positionIndex}-${card.cardId}-x`))
    ] }) : null
  ] });
}
function ResultPanel(props) {
  const {
    phase,
    config,
    back,
    radius,
    locale,
    tx,
    errorText,
    reading,
    busy,
    pendingSpread,
    question,
    canInterpret,
    interpretNote,
    startDraw,
    startInterpret,
    setPhase
  } = props;
  const reveal = config.animationLevel !== "off";
  let body;
  if (phase === "loading") {
    body = /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_jsx_runtime20.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(ShuffleStack, { ...config, cardBack: back }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "dsh-lumina-caption", children: config.animationLevel === "off" ? tx("drawing") : tx("shuffling") })
    ] });
  } else if (phase === "error") {
    body = /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_jsx_runtime20.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "dsh-lumina-error", children: errorText }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "dsh-lumina-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("button", { className: "dsh-lumina-btn", onClick: () => startDraw(`/lumina draw ${pendingSpread}`, question.trim()), children: tx("retry") }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("button", { className: "dsh-lumina-btn", onClick: () => setPhase("idle"), children: tx("close") })
      ] })
    ] });
  } else {
    body = /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(import_jsx_runtime20.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "dsh-lumina-caption", children: reading?.kind === "today" ? tx("today") : reading ? spreadLabel(locale, reading.spreadId) : null }),
      reading?.question ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "dsh-lumina-question", children: `\u300C${reading.question}\u300D` }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "dsh-lumina-grid", "data-level": config.animationLevel, children: (reading?.cards ?? []).map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
        CardFace,
        {
          card,
          index,
          radius,
          locale,
          tx,
          reveal,
          minorStyle: config.minorStyle,
          artTheme: config.cardArtTheme
        },
        `${card.positionIndex}-${card.cardId}`
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(CardReadings, { cards: reading?.cards ?? [], locale, tx }),
      interpretNote ? /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("p", { className: "dsh-lumina-note", children: interpretNote }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)("div", { className: "dsh-lumina-actions", children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
          "button",
          {
            type: "button",
            className: "dsh-lumina-cta",
            "aria-label": tx("interpret"),
            title: tx("interpret"),
            disabled: !canInterpret,
            onClick: () => startInterpret(),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_dsh_client_ui_primitives5.IconThinkOutline16, { size: 16 }),
              tx("interpret")
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "button",
          {
            type: "button",
            className: "dsh-lumina-iconbtn",
            "aria-label": tx("shuffleAgain"),
            title: tx("shuffleAgain"),
            disabled: busy,
            onClick: () => startDraw(reading?.kind === "today" ? "/lumina today" : `/lumina draw ${reading?.spreadId ?? pendingSpread}`, reading?.question ?? question.trim()),
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_dsh_client_ui_primitives5.IconRefreshOutline16, { size: 16 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(
          "button",
          {
            type: "button",
            className: "dsh-lumina-iconbtn",
            "aria-label": tx("close"),
            title: tx("close"),
            onClick: () => setPhase("idle"),
            children: /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(import_dsh_client_ui_primitives5.IconCloseOutline16, { size: 16 })
          }
        )
      ] })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime20.jsxs)(
    "div",
    {
      className: "dsh-lumina-mask",
      onClick: (event) => {
        if (event.target === event.currentTarget && phase !== "loading") setPhase("idle");
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "dsh-lumina-scrim", style: scrimFill(config.panelOpacity) }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)(ModalDust, { level: config.animationLevel }),
        /* @__PURE__ */ (0, import_jsx_runtime20.jsx)("div", { className: "dsh-lumina-stage", children: body })
      ]
    }
  );
}

// src/client/panel/AskForm.tsx
var import_react11 = require("react");
var import_jsx_runtime21 = require("react/jsx-runtime");
function AskForm(props) {
  const areaRef = (0, import_react11.useRef)(null);
  const canAsk = props.question.trim().length > 0;
  (0, import_react11.useEffect)(() => {
    areaRef.current?.focus();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)(
    "div",
    {
      className: "dsh-lumina-ask",
      onPointerDown: (event) => event.stopPropagation(),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("h2", { className: "dsh-lumina-ask-title", children: props.tx("askTitle") }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("p", { className: "dsh-lumina-ask-sub", children: props.tx("askSub") }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("p", { className: "dsh-lumina-ask-spread", children: [
          props.tx("askSpread"),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("b", { children: spreadLabel(props.locale, props.pendingSpread) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("label", { className: "dsh-lumina-ask-label", htmlFor: "dsh-lumina-ask-q", children: props.tx("askLabel") }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
          "textarea",
          {
            ref: areaRef,
            id: "dsh-lumina-ask-q",
            className: "dsh-lumina-ask-input",
            rows: 5,
            maxLength: 280,
            placeholder: props.tx("askPlaceholder"),
            value: props.question,
            onChange: (event) => props.onQuestion(event.target.value.slice(0, 280))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "dsh-lumina-ask-meta", children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { children: props.tx("askHint") }),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)("span", { children: `${props.question.length} / 280` })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime21.jsxs)("div", { className: "dsh-lumina-actions", children: [
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "button",
            {
              type: "button",
              className: "dsh-lumina-cta is-ghost",
              onClick: props.onClose,
              children: props.tx("close")
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime21.jsx)(
            "button",
            {
              type: "button",
              className: "dsh-lumina-cta",
              disabled: !canAsk || props.busy,
              onClick: () => {
                if (!canAsk || props.busy) return;
                props.onSubmit();
              },
              children: props.tx("askNext")
            }
          )
        ] })
      ]
    }
  );
}

// src/client/overlay/AskDialog.tsx
var import_jsx_runtime22 = require("react/jsx-runtime");
function AskDialog(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime22.jsxs)(
    "div",
    {
      className: "dsh-lumina-ask-modal",
      onClick: (event) => {
        if (event.target === event.currentTarget) props.onClose();
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)("div", { className: "dsh-lumina-scrim", style: scrimFill(props.opacity) }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(ModalDust, { level: props.animationLevel }),
        /* @__PURE__ */ (0, import_jsx_runtime22.jsx)(
          AskForm,
          {
            tx: props.tx,
            locale: props.locale,
            pendingSpread: props.pendingSpread,
            question: props.question,
            busy: props.busy,
            onQuestion: props.onQuestion,
            onSubmit: props.onSubmit,
            onClose: props.onClose
          }
        )
      ]
    }
  );
}

// src/client/overlay/OverlayGuard.tsx
var import_react12 = require("react");
var OverlayGuard = class extends import_react12.Component {
  constructor() {
    super(...arguments);
    this.state = { failed: false };
  }
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error) {
    console.error("[lumina-tarot] overlay panel failed", error);
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
};

// src/client/overlay/SpreadMenu.tsx
var import_jsx_runtime23 = require("react/jsx-runtime");
var ITEM_W = 36;
var ITEM_H = Math.round(ITEM_W * 8.6 / 5);
function fanLayout(left, top) {
  const cx = left + CARD_W / 2;
  const cy = top + CARD_H / 2;
  const bottom = cy >= window.innerHeight / 2;
  const right = cx >= window.innerWidth / 2;
  const start = bottom ? 0 : 180;
  const end = bottom ? right ? -90 : 90 : right ? 270 : 90;
  const radius = Math.round(Math.hypot(CARD_W / 2, CARD_H / 2) + ITEM_H / 2 + 8);
  return { cx, cy, start, end, radius };
}
function SpreadMenu(props) {
  const { cx, cy, start, end, radius } = fanLayout(props.left, props.top);
  const n = SPREAD_OPTIONS.length + 1;
  const step = n > 1 ? (end - start) / (n - 1) : 0;
  const items = [
    ...SPREAD_OPTIONS.map((opt, i) => ({
      key: opt.id,
      label: spreadLabel(props.locale, opt.id),
      kind: "card",
      on: props.pendingSpread === opt.id,
      angle: start + step * i,
      index: i,
      onClick: () => props.onPick(opt.id)
    })),
    {
      key: "last",
      label: props.lastLabel,
      kind: "action",
      on: false,
      angle: start + step * SPREAD_OPTIONS.length,
      index: SPREAD_OPTIONS.length,
      onClick: () => props.onOpenLast()
    },
    {
      key: "history",
      label: props.historyLabel,
      kind: "action",
      on: false,
      angle: start + step * SPREAD_OPTIONS.length + step * 0.78,
      index: SPREAD_OPTIONS.length + 1,
      onClick: () => props.onOpenHistory()
    }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
    "div",
    {
      ref: props.menuRef,
      className: "dsh-lumina-spreads",
      style: {
        left: cx,
        top: cy,
        ["--r"]: `${radius}px`
      },
      children: items.map((item) => {
        const action = item.kind === "action";
        return /* @__PURE__ */ (0, import_jsx_runtime23.jsx)(
          "button",
          {
            type: "button",
            className: action ? "dsh-lumina-spread is-action" : "dsh-lumina-spread",
            "data-on": item.on ? "1" : "0",
            disabled: props.busy,
            style: {
              ["--a"]: `${item.angle}deg`,
              ["--i"]: String(item.index),
              ...action ? { zIndex: items.length - item.index } : {
                width: ITEM_W,
                height: ITEM_H,
                marginLeft: -ITEM_W / 2,
                marginTop: -ITEM_H / 2,
                borderRadius: radiusFor(props.theme),
                zIndex: items.length - item.index
              }
            },
            onPointerDown: (event) => {
              if (event.button !== 0) return;
              event.preventDefault();
              event.stopPropagation();
              item.onClick();
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime23.jsx)("span", { className: "dsh-lumina-spread-face", children: item.label })
          },
          item.key
        );
      })
    }
  );
}

// src/client/overlay/OverlayView.tsx
var import_jsx_runtime24 = require("react/jsx-runtime");
function OverlayView(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime24.jsxs)("div", { className: "dsh-lumina dsh-lumina-dock", "data-theme": props.theme, children: [
    props.menu ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)("div", { className: "dsh-lumina-dismiss", onPointerDown: props.onCloseMenu }) : null,
    props.showFloat ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      FloatCard,
      {
        cardRef: props.cardRef,
        title: props.title,
        left: props.left,
        top: props.top,
        radius: props.radius,
        animationLevel: props.animationLevel,
        cardBack: props.cardBack,
        cardArtTheme: props.cardArtTheme,
        ...props.pointer
      }
    ) : null,
    props.menu ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      SpreadMenu,
      {
        menuRef: props.menuRef,
        left: props.left,
        top: props.top,
        pendingSpread: props.pendingSpread,
        busy: props.busy,
        theme: props.theme,
        locale: props.locale,
        lastLabel: props.lastLabel,
        historyLabel: props.historyLabel,
        onPick: props.onPickSpread,
        onOpenLast: props.onOpenLast,
        onOpenHistory: props.onOpenHistory
      }
    ) : null,
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(OverlayGuard, { children: props.ask ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      AskDialog,
      {
        tx: props.tx,
        locale: props.locale,
        pendingSpread: props.pendingSpread,
        question: props.question,
        busy: props.busy,
        opacity: props.opacity,
        animationLevel: props.animationLevel,
        onQuestion: props.onQuestion,
        onSubmit: props.onAskSubmit,
        onClose: props.onAskClose
      }
    ) : null }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(OverlayGuard, { children: props.historyOpen ? /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      HistoryDialog,
      {
        tx: props.tx,
        locale: props.locale,
        opacity: props.opacity,
        animationLevel: props.animationLevel,
        config: props.config,
        load: props.loadHistory,
        onClose: props.onHistoryClose
      }
    ) : null }),
    /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(OverlayGuard, { children: props.phase === "idle" ? null : /* @__PURE__ */ (0, import_jsx_runtime24.jsx)(
      ResultPanel,
      {
        phase: props.phase,
        config: props.config,
        back: props.cardBack,
        radius: props.radius,
        locale: props.locale,
        tx: props.tx,
        errorText: props.errorText,
        reading: props.reading,
        busy: props.panelBusy,
        pendingSpread: props.pendingSpread,
        question: props.question,
        canInterpret: props.canInterpret,
        interpretNote: props.interpretNote,
        startDraw: props.startDraw,
        startInterpret: props.startInterpret,
        setPhase: props.setPhase
      }
    ) })
  ] });
}

// src/client/overlay/LuminaOverlay.tsx
var import_jsx_runtime25 = require("react/jsx-runtime");
function failText(error, fallback) {
  const text = error instanceof Error ? error.message : String(error);
  return text === "need-session" ? fallback : text;
}
var interpretLock = false;
function createLuminaOverlay(ctx, scope) {
  const fallbackActions = bindSessionActions(ctx);
  return function LuminaOverlay(props) {
    const [config, setConfig] = (0, import_react13.useState)(() => luminaConfig());
    const [menu, setMenu] = (0, import_react13.useState)(false);
    const [ask, setAsk] = (0, import_react13.useState)(false);
    const [pendingSpread, setPendingSpread] = (0, import_react13.useState)(() => luminaConfig().defaultSpread);
    const [question, setQuestion] = (0, import_react13.useState)("");
    const [phase, setPhase] = (0, import_react13.useState)("idle");
    const [errorText, setErrorText] = (0, import_react13.useState)("");
    const [reading, setReading] = (0, import_react13.useState)(null);
    const [busy, setBusy] = (0, import_react13.useState)(false);
    const [interpreting, setInterpreting] = (0, import_react13.useState)(false);
    const [interpretNote, setInterpretNote] = (0, import_react13.useState)("");
    const [dshLocale, setDshLocale] = (0, import_react13.useState)(() => ctx.locale?.getSnapshot?.()?.active ?? "zh");
    const dragRef = (0, import_react13.useRef)(null);
    const cardRef = (0, import_react13.useRef)(null);
    const menuRef = (0, import_react13.useRef)(null);
    const drawingRef = (0, import_react13.useRef)(false);
    const interpretingRef = (0, import_react13.useRef)(false);
    const phaseRef = (0, import_react13.useRef)(phase);
    phaseRef.current = phase;
    (0, import_react13.useEffect)(() => watchLuminaConfig(() => setConfig({ ...luminaConfig() })), []);
    (0, import_react13.useEffect)(() => ctx.locale?.subscribe?.(() => setDshLocale(ctx.locale?.getSnapshot?.()?.active ?? "zh")) ?? (() => void 0), []);
    (0, import_react13.useEffect)(() => {
      const onCleared = () => {
        setReading(null);
        setQuestion("");
        setPhase("idle");
        setErrorText("");
        setInterpretNote("");
      };
      window.addEventListener(LUMINA_HISTORY_CLEARED, onCleared);
      return () => window.removeEventListener(LUMINA_HISTORY_CLEARED, onCleared);
    }, []);
    const locale = resolveUiLocale(config, dshLocale);
    const tx = (key) => t(locale, key);
    const persist = (0, import_react13.useCallback)((field, value) => {
      void persistLuminaField(scope, field, value);
    }, []);
    const sessionId = readSessionId(props);
    if (sessionId) mirrorSession(sessionId);
    const recentWorkspaceId = readRecentWorkspaceId(props);
    const sessionIdRef = (0, import_react13.useRef)(sessionId);
    const recentRef = (0, import_react13.useRef)(recentWorkspaceId);
    sessionIdRef.current = sessionId;
    recentRef.current = recentWorkspaceId;
    const sessionActions = {
      connectWorkspace: props.connectWorkspace ?? fallbackActions.connectWorkspace,
      openSession: props.openSession ?? fallbackActions.openSession,
      createSession: props.createSession ?? fallbackActions.createSession,
      listedCurrent: props.listedCurrent ?? fallbackActions.listedCurrent
    };
    const executeLine = (0, import_react13.useCallback)(async (line) => {
      const execute = ctx.remote?.commands?.execute;
      if (typeof execute !== "function") throw new Error("\u5F53\u524D\u73AF\u5883\u6CA1\u6709\u547D\u4EE4\u901A\u9053");
      const id = await ensureSession(sessionIdRef.current, recentRef.current, sessionActions);
      const result = unwrapCommandResult(await execute(id, line, []));
      if (result.kind === "error") throw new Error(result.text || "\u547D\u4EE4\u5931\u8D25");
      return result;
    }, [props.connectWorkspace, props.openSession, props.createSession, props.listedCurrent]);
    const history = useHistoryLayer(executeLine);
    const closeLayers = (0, import_react13.useCallback)(() => {
      setMenu(false);
      setAsk(false);
      history.setOpen(false);
    }, [history.setOpen]);
    useOverlayDismiss({
      active: menu || ask || history.open,
      modal: ask || history.open,
      menuRef,
      cardRef,
      onDismiss: closeLayers
    });
    const runCommand = (0, import_react13.useCallback)(async (line) => {
      return parseReading((await executeLine(line)).text);
    }, [executeLine]);
    const startDraw = (0, import_react13.useCallback)(async (line, asked = "") => {
      if (drawingRef.current) return;
      drawingRef.current = true;
      setBusy(true);
      closeLayers();
      setPhase("loading");
      setErrorText("");
      setInterpretNote("");
      const wait = new Promise((resolve) => setTimeout(resolve, minShuffleMs(config.animationLevel)));
      try {
        const [payload] = await Promise.all([runCommand(commandWithQuestion(line, asked)), wait]);
        setReading({ ...payload, question: payload.question || asked.trim() || void 0 });
        setPhase("result");
      } catch (error) {
        await wait.catch(() => void 0);
        setReading(null);
        setErrorText(failText(error, "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u518D\u62BD\u724C"));
        setPhase("error");
      } finally {
        drawingRef.current = false;
        setBusy(false);
      }
    }, [closeLayers, config.animationLevel, runCommand]);
    const startInterpret = (0, import_react13.useCallback)(async () => {
      if (drawingRef.current || interpretingRef.current || interpretLock || !reading) return;
      interpretLock = true;
      interpretingRef.current = true;
      setInterpreting(true);
      setInterpretNote("");
      try {
        await runInterpret({
          reading,
          current: sessionIdRef.current,
          recentWorkspaceId: recentRef.current,
          actions: sessionActions,
          sessions: ctx.sessions,
          executeInterpret: () => executeLine("/lumina interpret")
        });
        setPhase("idle");
      } catch (error) {
        setInterpretNote(failText(error, tx("interpretNeedSession")));
        setPhase("result");
      } finally {
        interpretLock = false;
        interpretingRef.current = false;
        setInterpreting(false);
      }
    }, [executeLine, reading, tx]);
    const openLast = (0, import_react13.useCallback)(async () => {
      if (drawingRef.current) return;
      closeLayers();
      setBusy(true);
      setErrorText("");
      try {
        const payload = await runCommand("/lumina last");
        setReading(payload);
        setQuestion(payload.question ?? "");
        setPhase("result");
      } catch (error) {
        setReading(null);
        setErrorText(failText(error, "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u518D\u62BD\u724C"));
        setPhase("error");
      } finally {
        setBusy(false);
      }
    }, [closeLayers, runCommand]);
    (0, import_react13.useEffect)(() => listenToolReading({
      drawingRef,
      phaseRef,
      animationLevel: config.animationLevel,
      setBusy,
      setMenu,
      setAsk,
      setHistoryOpen: history.setOpen,
      setPhase,
      setErrorText,
      setReading
    }), [config.animationLevel, history.setOpen]);
    const pointer = createFloatPointer({
      dragRef,
      cardRef,
      drawingRef,
      scope,
      getAsk: () => ask,
      getMenu: () => menu,
      getDefaultSpread: () => config.defaultSpread,
      onAsk: () => setAsk(true),
      setMenu,
      setPendingSpread
    });
    if (!config.showFloatCard && phase === "idle" && !menu && !ask && !history.open) return null;
    const px = posToPx(config.floatX, config.floatY);
    return /* @__PURE__ */ (0, import_jsx_runtime25.jsx)(
      OverlayView,
      {
        theme: config.theme,
        showFloat: config.showFloatCard,
        menu,
        ask,
        historyOpen: history.open,
        phase,
        cardRef,
        menuRef,
        title: tx("floatTitle"),
        left: px.left,
        top: px.top,
        radius: radiusFor(config.theme),
        animationLevel: config.animationLevel,
        cardBack: effectiveCardBack(config),
        cardArtTheme: config.cardArtTheme,
        pointer,
        pendingSpread,
        busy,
        locale,
        tx,
        lastLabel: tx("openLast"),
        historyLabel: tx("viewHistory"),
        onPickSpread: (id) => {
          setPendingSpread(id);
          persist("defaultSpread", id);
          setMenu(false);
          setAsk(true);
        },
        onOpenLast: () => void openLast(),
        onOpenHistory: () => {
          setMenu(false);
          history.setOpen(true);
        },
        onCloseMenu: () => setMenu(false),
        question,
        opacity: config.panelOpacity,
        onQuestion: setQuestion,
        onAskSubmit: () => void startDraw(`/lumina draw ${pendingSpread}`, question.trim()),
        onAskClose: () => setAsk(false),
        loadHistory: history.load,
        onHistoryClose: () => history.setOpen(false),
        config,
        errorText,
        reading,
        panelBusy: busy || interpreting,
        canInterpret: Boolean(reading && !busy && !interpreting),
        interpretNote,
        startDraw,
        startInterpret: () => void startInterpret(),
        setPhase
      }
    );
  };
}

// src/client/index.ts
var name = "dsh-lumina-tarot";
var inject = ["slots", "remote", "remote.commands", "settingsScope", "locale", "sessions", "workspaces"];
function apply(ctx) {
  ensureStyles();
  console.log("[lumina-tarot] client loaded");
  const scope = ctx.settingsScope?.bind?.({ namespace: "lumina-tarot" });
  bindLuminaScope(scope);
  const sectionLabel = () => t(resolveUiLocale(luminaConfig(), ctx.locale?.getSnapshot?.()?.active), "pageTitle");
  if (typeof ctx.effect === "function") {
    ctx.effect(() => installLuminaNavIcon(sectionLabel, ctx.locale));
  } else {
    installLuminaNavIcon(sectionLabel, ctx.locale);
  }
  const sessionActions = bindSessionActions(ctx);
  ctx.slots.inject("shell.overlay", () => ctx.slots.register({
    name: "shell.overlay",
    id: "dsh-lumina-tarot",
    order: 1e3,
    registrant: "dsh-lumina-tarot",
    inject: () => sessionActions
  }, createLuminaOverlay(ctx, scope)));
  ctx.slots.inject("tool.call.toolview", () => {
    ctx.slots.register({
      name: "tool.call.toolview",
      key: "lumina_draw",
      registrant: "dsh-lumina-tarot"
    }, LuminaDrawView);
    return ctx.slots.register({
      name: "tool.call.toolview",
      key: "lumina_today",
      registrant: "dsh-lumina-tarot"
    }, LuminaDrawView);
  });
  ctx.slots.inject("conversation.chat.commandview", () => ctx.slots.register({
    name: "conversation.chat.commandview",
    key: "lumina",
    registrant: "dsh-lumina-tarot"
  }, LuminaCommandView));
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "lumina-tarot",
    order: 70,
    label: () => sectionLabel(),
    registrant: "dsh-lumina-tarot"
  }, createSettingsSection(scope, ctx.locale, ctx.remote)));
}

    return module.exports;
  },
});
