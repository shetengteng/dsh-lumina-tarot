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
var CARD_H = Math.round(48 * (8.6 / 5));

// src/host-resolve.ts
import { existsSync, readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
function existingFile(...parts) {
  const path = join(...parts);
  return existsSync(path) ? path : void 0;
}
function dshModuleRoots() {
  const roots = [];
  const home = process.env.DSH_HOME || join(homedir(), ".dsh");
  roots.push(join(home, "profiles", "node_modules"));
  roots.push(join(home, "node_modules"));
  const launcher = join(
    homedir(),
    "Library/Application Support/io.deepseek.DeepSeek.deepseek-harness-launcher/dsh"
  );
  if (existsSync(launcher)) {
    try {
      for (const name2 of readdirSync(launcher)) {
        roots.push(join(launcher, name2, "node_modules"));
      }
    } catch {
    }
  }
  return roots;
}
function resolveDshPackage(pkg, file) {
  for (const root of dshModuleRoots()) {
    const path = existingFile(root, pkg, file);
    if (path) return pathToFileURL(path).href;
  }
  return void 0;
}
async function importDsh(pkg, file) {
  const href = resolveDshPackage(pkg, file);
  if (!href) return void 0;
  return await import(href);
}

// src/settings-schema.ts
var LUMINA_NS = "lumina-tarot";
async function installLuminaSettings(ctx, live) {
  const settings = await importDsh("@deepseek-ai/dsh-settings", "lib/index.js");
  const schemastery = await importDsh(
    "@deepseek-ai/schemastery",
    "lib/index.mjs"
  );
  const z = schemastery?.default;
  if (!settings?.installSettingsSection || !settings.settingsNamespace || !z) {
    console.warn("[lumina-tarot] settings packages not found; using composition defaults");
    return false;
  }
  const Config = z.object({
    theme: z.union(["mystic", "minimal", "nature"]).default("mystic"),
    followDshLocale: z.boolean().default(true),
    locale: z.union(["zh-CN", "en-US"]).default("zh-CN"),
    cardArtTheme: z.union(["minimal", "rws", "aquatic"]).default("minimal"),
    cardBack: z.union(["classic", "celestial", "sacred", "floral", "eye"]).default("classic"),
    minorStyle: z.union(["symbol", "geometric"]).default("symbol"),
    animationLevel: z.union(["off", "lite", "full"]).default("full"),
    showFloatCard: z.boolean().default(true),
    floatX: z.number().min(0).max(1).default(0.92),
    floatY: z.number().min(0).max(1).default(0.82),
    panelOpacity: z.number().min(0.2).max(0.8).default(0.8),
    defaultSpread: z.union(["single", "three-card", "cross", "celtic-lite"]).default("three-card"),
    reversedRate: z.number().min(0).max(1).default(0.35),
    historyLimit: z.number().step(1).min(1).max(500).default(100)
  });
  let source = () => live.current;
  settings.installSettingsSection(ctx, settings.settingsNamespace(LUMINA_NS), Config, DEFAULT_CONFIG, {
    setSource: (current) => {
      source = current;
    },
    onChange: () => {
      live.current = { ...DEFAULT_CONFIG, ...source() };
    }
  });
  return true;
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

// src/domain/cards.ts
var ALL_CARDS = cards_default;
function getCardById(id) {
  return ALL_CARDS.find((card) => card.id === id);
}
function findCard(query) {
  const q = query.trim().toLowerCase();
  if (!q) return void 0;
  return ALL_CARDS.find((card) => card.id.toLowerCase() === q || card.name.toLowerCase() === q || card.nameEn.toLowerCase() === q);
}

// src/domain/spreads.json
var spreads_default = [
  {
    id: "single",
    name: "\u5355\u5F20\u6307\u5F15",
    subtitle: "\u4E00\u5361\u7B54\u7591",
    description: "\u6700\u9002\u5408\u65E5\u5E38\u3001\u60C5\u7EEA\u5FEB\u7167\u3001\u5F53\u4E0B\u80FD\u91CF\u3002\u62BD\u4E00\u5F20\uFF0C\u76F4\u6307\u6838\u5FC3\u3002",
    count: 1,
    positions: [
      {
        index: 0,
        name: "\u5F53\u4E0B\u6307\u5F15",
        role: "Now"
      }
    ]
  },
  {
    id: "three-card",
    name: "\u4E09\u724C\u65F6\u95F4\u7EBF",
    subtitle: "Past \xB7 Present \xB7 Future",
    description: "\u6700\u7ECF\u5178\u7684\u4E09\u724C\u9635\uFF0C\u9002\u5408\u7406\u6E05\u60C5\u5883\u53D1\u5C55\u8109\u7EDC\u4E0E\u8D8B\u52BF\u3002",
    count: 3,
    positions: [
      {
        index: 0,
        name: "\u8FC7\u53BB",
        role: "Past"
      },
      {
        index: 1,
        name: "\u73B0\u5728",
        role: "Present"
      },
      {
        index: 2,
        name: "\u672A\u6765",
        role: "Future"
      }
    ]
  },
  {
    id: "cross",
    name: "\u5341\u5B57\u724C\u9635",
    subtitle: "\u60C5\u5883 \xB7 \u963B\u788D \xB7 \u5EFA\u8BAE",
    description: "\u5FEB\u901F\u5256\u6790\u95EE\u9898\u7ED3\u6784\uFF0C\u9002\u5408\u5DE5\u4F5C\u3001\u4EBA\u9645\u4E0E\u9009\u62E9\u56F0\u5883\u3002",
    count: 5,
    positions: [
      {
        index: 0,
        name: "\u60C5\u5883\u6838\u5FC3",
        role: "Situation"
      },
      {
        index: 1,
        name: "\u5F53\u524D\u6311\u6218",
        role: "Challenge"
      },
      {
        index: 2,
        name: "\u6F5C\u610F\u8BC6",
        role: "Subconscious"
      },
      {
        index: 3,
        name: "\u663E\u610F\u8BC6",
        role: "Conscious"
      },
      {
        index: 4,
        name: "\u5EFA\u8BAE\u65B9\u5411",
        role: "Advice"
      }
    ]
  },
  {
    id: "celtic-lite",
    name: "\u51EF\u5C14\u7279\u7CBE\u7B80",
    subtitle: "6 \u5361\u6DF1\u5EA6",
    description: "\u4EE5\u7ECF\u5178\u51EF\u5C14\u7279\u5341\u5B57\u4E3A\u9AA8\u67B6\u7684\u7CBE\u7B80\u7248\uFF0C\u9002\u5408\u8F83\u590D\u6742\u7684\u8BFE\u9898\u3002",
    count: 6,
    positions: [
      {
        index: 0,
        name: "\u73B0\u72B6",
        role: "Present"
      },
      {
        index: 1,
        name: "\u6311\u6218",
        role: "Challenge"
      },
      {
        index: 2,
        name: "\u6839\u57FA",
        role: "Root"
      },
      {
        index: 3,
        name: "\u8FC7\u53BB",
        role: "Past"
      },
      {
        index: 4,
        name: "\u53EF\u80FD",
        role: "Potential"
      },
      {
        index: 5,
        name: "\u7ED3\u679C",
        role: "Outcome"
      }
    ]
  }
];

// src/domain/spreads.ts
var SPREADS = spreads_default;
function getSpreadById(id) {
  return SPREADS.find((spread) => spread.id === id);
}
function requireSpreadId(raw) {
  const token = (raw ?? "").trim();
  const found = getSpreadById(token);
  if (!found) throw new Error(`unknown spread: ${token || "(empty)"}`);
  return found.id;
}

// src/domain/draw.ts
function randomUnit() {
  const cryptoObj = globalThis.crypto;
  if (cryptoObj && typeof cryptoObj.getRandomValues === "function") {
    const buf = new Uint32Array(1);
    cryptoObj.getRandomValues(buf);
    return buf[0] / 4294967295;
  }
  return Math.random();
}
function shuffle(arr, rand = randomUnit) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}
function isReversed(reversedRate, rand = randomUnit) {
  return rand() < reversedRate;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function dateSeed(date = /* @__PURE__ */ new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  return y * 1e4 + m * 100 + d;
}
function randFromSeed(seed) {
  if (seed === void 0 || seed === null || seed === "") return randomUnit;
  if (typeof seed === "number" && Number.isFinite(seed)) return mulberry32(seed >>> 0);
  const text2 = String(seed);
  let h = 2166136261;
  for (let i = 0; i < text2.length; i++) {
    h ^= text2.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return mulberry32(h >>> 0);
}
function drawCards(spreadId, reversedRate = 0.35, rand = randomUnit) {
  const spread = getSpreadById(spreadId);
  if (!spread) throw new Error(`unknown spread: ${spreadId}`);
  const pool = shuffle(ALL_CARDS.map((card) => card.id), rand);
  return pool.slice(0, spread.count).map((cardId, index) => ({
    cardId,
    reversed: isReversed(reversedRate, rand),
    positionIndex: index
  }));
}
function toReading(spreadId, drawn, kind = "draw") {
  const spread = getSpreadById(spreadId);
  if (!spread) throw new Error(`unknown spread: ${spreadId}`);
  const cards = drawn.map((item) => {
    const def = getCardById(item.cardId);
    if (!def) throw new Error(`unknown card: ${item.cardId}`);
    const pos = spread.positions[item.positionIndex];
    const face = item.reversed ? def.reversed : def.upright;
    return {
      ...item,
      positionName: pos?.name ?? `\u4F4D ${item.positionIndex + 1}`,
      positionRole: pos?.role ?? "",
      name: def.name,
      nameEn: def.nameEn,
      symbol: def.symbol,
      number: def.number,
      arcana: def.arcana,
      suit: def.suit,
      rank: def.rank,
      keywords: def.keywords,
      summary: def.summary,
      meaning: face.meaning,
      love: face.love,
      career: face.career,
      advice: face.advice
    };
  });
  return {
    id: `${Date.now().toString(36)}-${Math.floor(randomUnit() * 1e6).toString(36)}`,
    createdAt: Date.now(),
    spreadId,
    spreadName: spread.name,
    kind,
    cards
  };
}
function drawReading(spreadId, reversedRate = 0.35, rand = randomUnit) {
  return toReading(spreadId, drawCards(spreadId, reversedRate, rand), "draw");
}
function todayReading(reversedRate = 0.35, date = /* @__PURE__ */ new Date()) {
  const rand = mulberry32(dateSeed(date));
  return toReading("single", drawCards("single", reversedRate, rand), "today");
}

// src/history.ts
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { homedir as homedir2 } from "node:os";
import { dirname, join as join2 } from "node:path";
function defaultHistoryFile() {
  if (process.env.LUMINA_HISTORY_FILE) return process.env.LUMINA_HISTORY_FILE;
  const home = process.env.DSH_HOME || join2(homedir2(), ".dsh");
  return join2(home, "data", "lumina-tarot", "history.jsonl");
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
function parseCard(value) {
  if (!value || typeof value !== "object") return null;
  const rec = value;
  const cardId = asString(rec.cardId);
  const reversed = asBoolean(rec.reversed);
  const positionIndex = asNumber(rec.positionIndex);
  if (!cardId || reversed === void 0 || positionIndex === void 0) return null;
  return { cardId, reversed, positionIndex };
}
function parseRecord(value) {
  if (!value || typeof value !== "object") return null;
  const rec = value;
  const id = asString(rec.id);
  const createdAt = asNumber(rec.createdAt);
  const spreadId = asString(rec.spreadId);
  if (!id || createdAt === void 0 || !spreadId || !Array.isArray(rec.cards)) return null;
  const cards = rec.cards.map(parseCard);
  if (cards.some((card) => !card)) return null;
  return {
    id,
    createdAt,
    spreadId,
    question: asString(rec.question),
    mood: asString(rec.mood),
    cards,
    note: asString(rec.note)
  };
}
function recordFromPayload(reading) {
  return {
    id: reading.id,
    createdAt: reading.createdAt,
    spreadId: reading.spreadId,
    question: reading.question,
    cards: reading.cards.map((card) => ({
      cardId: card.cardId,
      reversed: card.reversed,
      positionIndex: card.positionIndex
    }))
  };
}
function payloadFromRecord(record) {
  const spread = getSpreadById(record.spreadId);
  if (!spread) throw new Error(`unknown spread: ${record.spreadId}`);
  const payload = toReading(spread.id, record.cards, "draw");
  return {
    ...payload,
    id: record.id,
    createdAt: record.createdAt,
    question: record.question
  };
}
function listItemFromRecord(record) {
  try {
    const payload = payloadFromRecord(record);
    return {
      id: record.id,
      createdAt: record.createdAt,
      spreadId: record.spreadId,
      spreadName: payload.spreadName,
      question: record.question,
      cards: payload.cards.map((card) => ({
        cardId: card.cardId,
        name: card.name,
        nameEn: card.nameEn,
        reversed: card.reversed,
        positionIndex: card.positionIndex,
        positionName: card.positionName,
        positionRole: card.positionRole,
        symbol: card.symbol,
        number: card.number,
        arcana: card.arcana,
        suit: card.suit,
        rank: card.rank,
        keywords: card.keywords,
        summary: card.summary,
        meaning: card.meaning
      }))
    };
  } catch {
    return null;
  }
}
function recordsToHistoryItems(records) {
  const items = [];
  for (let i = records.length - 1; i >= 0; i--) {
    const item = listItemFromRecord(records[i]);
    if (item) items.push(item);
  }
  return items;
}
async function readLines(file) {
  let raw = "";
  try {
    raw = await readFile(file, "utf8");
  } catch (error) {
    const code = error.code;
    if (code === "ENOENT") return [];
    throw error;
  }
  const out = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const parsed = parseRecord(JSON.parse(trimmed));
      if (parsed) out.push(parsed);
    } catch {
    }
  }
  return out;
}
async function writeLines(file, records) {
  await mkdir(dirname(file), { recursive: true });
  const body = records.map((record) => JSON.stringify(record)).join("\n");
  await writeFile(file, body ? `${body}
` : "", "utf8");
}
function createHistory(file = defaultHistoryFile()) {
  let queue = Promise.resolve();
  const run = (op) => {
    const next = queue.then(op, op);
    queue = next.then(() => void 0, () => void 0);
    return next;
  };
  const list = () => run(() => readLines(file));
  return {
    file,
    list,
    append: (record, limit) => run(async () => {
      const cap = Math.max(1, Math.min(500, Math.floor(limit) || 100));
      const current = await readLines(file);
      const next = [...current.filter((item) => item.id !== record.id), record];
      await writeLines(file, next.length > cap ? next.slice(next.length - cap) : next);
    }),
    latest: async () => {
      const records = await list();
      return records[records.length - 1];
    },
    clear: () => run(() => writeLines(file, [])),
    exportBundle: async (theme) => {
      const records = await list();
      return {
        exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
        theme,
        history: [...records].reverse()
      };
    }
  };
}
async function persistReading(state, reading) {
  state.lastReading = reading;
  try {
    await state.history.append(recordFromPayload(reading), state.current.historyLimit);
  } catch (error) {
    console.warn("[lumina-tarot] history not saved", error);
  }
}

// src/domain/interpret-prompt.ts
function buildInterpretPrompt(reading) {
  const question = reading.question ? `\u8BF7\u89E3\u8BFB\u300C${reading.question}\u300D` : `\u8BF7\u89E3\u8BFB\u521A\u624D\u7684${reading.spreadName}`;
  const faces = reading.cards.map((card) => `${card.positionName} ${card.name}${card.reversed ? "\uFF08\u9006\uFF09" : ""}`).join(" \xB7 ");
  return `${question}\u3002\u9075\u5B88 lumina-interpret skill\uFF0C\u7981\u6B62\u6539\u724C\u6216\u91CD\u62BD\u3002
${faces}`;
}

// src/interpret.ts
async function buildFollowupMessage(text2, source) {
  try {
    const mod = await import("@deepseek-ai/dsh-llm");
    if (typeof mod.createUserMessage === "function") {
      return mod.createUserMessage({
        content: [{ type: "text", text: text2 }],
        source
      });
    }
  } catch {
  }
  return {
    id: crypto.randomUUID(),
    role: "user",
    content: [{ type: "text", text: text2 }],
    source
  };
}
async function followupInterpret(agent, reading) {
  const text2 = buildInterpretPrompt(reading);
  const summary = reading.question ? `\u8BF7\u89E3\u8BFB\u300C${reading.question}\u300D` : `\u8BF7\u89E3\u8BFB\u521A\u624D\u7684${reading.spreadName}`;
  const source = {
    kind: "plugin",
    plugin: "dsh-lumina-tarot",
    form: "notice",
    summary: summary.slice(0, 120)
  };
  agent.followup(await buildFollowupMessage(text2, source));
}

// src/commands.ts
function attachQuestion(reading, question) {
  if (!question) return reading;
  return { ...reading, question };
}
function parseDrawArgs(rest, fallback) {
  const token = rest[0];
  const known = token ? getSpreadById(token)?.id : void 0;
  if (known) {
    const question2 = rest.slice(1).join(" ").trim();
    return { spreadId: known, question: question2 || void 0 };
  }
  const question = rest.join(" ").trim();
  return { spreadId: fallback, question: question || void 0 };
}
async function resolveLast(state) {
  if (state.lastReading) return state.lastReading;
  const record = await state.history.latest();
  if (!record) throw new Error("\u8FD8\u6CA1\u6709\u62BD\u724C\u7ED3\u679C\u3002");
  const reading = payloadFromRecord(record);
  state.lastReading = reading;
  return reading;
}
function registerLuminaCommands(ctx, state) {
  ctx.commands.register({
    name: "lumina",
    description: "Lumina \u5854\u7F57\uFF1Adraw / today / last / history / interpret / export / clear",
    input: { hint: "draw [spreadId] [question] | today | last | history | interpret | export | clear" },
    recordInput: false,
    handler: async ({ rawInput, agent, signal }) => {
      signal?.throwIfAborted?.();
      const parts = rawInput.trim().split(/\s+/).filter(Boolean);
      const sub = (parts[0] ?? "draw").toLowerCase();
      try {
        if (sub === "today") {
          const question = parts.slice(1).join(" ").trim() || void 0;
          await persistReading(state, attachQuestion(todayReading(state.current.reversedRate), question));
          return { kind: "success", text: JSON.stringify(state.lastReading) };
        }
        if (sub === "last") {
          return { kind: "success", text: JSON.stringify(await resolveLast(state)) };
        }
        if (sub === "history") {
          return { kind: "success", text: JSON.stringify(recordsToHistoryItems(await state.history.list())) };
        }
        if (sub === "export") {
          return { kind: "success", text: JSON.stringify(await state.history.exportBundle(state.current.theme)) };
        }
        if (sub === "clear") {
          await state.history.clear();
          state.lastReading = null;
          return { kind: "success", text: "\u5DF2\u6E05\u7A7A\u5168\u90E8\u5386\u53F2\u3002" };
        }
        if (sub === "interpret") {
          const reading = await resolveLast(state);
          if (!agent?.followup) return { kind: "error", text: "\u5F53\u524D\u4F1A\u8BDD\u65E0\u6CD5\u53D1\u8D77\u89E3\u8BFB\u3002" };
          await followupInterpret(agent, reading);
          return { kind: "success" };
        }
        if (sub === "draw" || sub === "") {
          const parsed = parseDrawArgs(parts.slice(sub === "draw" ? 1 : 0), state.current.defaultSpread);
          await persistReading(state, attachQuestion(
            drawReading(parsed.spreadId, state.current.reversedRate),
            parsed.question
          ));
          return { kind: "success", text: JSON.stringify(state.lastReading) };
        }
        return { kind: "error", text: "\u7528\u6CD5\uFF1A/lumina draw [spreadId] \xB7 /lumina today \xB7 /lumina interpret \xB7 /lumina last \xB7 /lumina history \xB7 /lumina export \xB7 /lumina clear" };
      } catch (error) {
        return {
          kind: "error",
          text: error instanceof Error ? error.message : String(error)
        };
      }
    }
  });
}

// src/host/deck-static.ts
import { existsSync as existsSync2 } from "node:fs";
import { readFile as readFile2 } from "node:fs/promises";
import { dirname as dirname2, join as join3, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// src/client/decks/url.ts
var DECK_PUBLIC_PREFIX = "/lumina-tarot/decks";

// src/host/deck-static.ts
var THEME = /^(rws|aquatic)$/;
var CARD_ID = /^[a-z0-9_-]+$/;
var PREFIX = `${DECK_PUBLIC_PREFIX}/`;
function deckRoot() {
  const here = dirname2(fileURLToPath(import.meta.url));
  const built = join3(here, "decks");
  if (existsSync2(built)) return built;
  return join3(here, "../src/client/decks");
}
async function handle(req, res) {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405);
    res.end();
    return;
  }
  const pathname = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  if (!pathname.startsWith(PREFIX) || !pathname.endsWith(".webp")) {
    res.writeHead(404);
    res.end();
    return;
  }
  const rest = pathname.slice(PREFIX.length, -5);
  const slash = rest.indexOf("/");
  const theme = slash === -1 ? "" : rest.slice(0, slash);
  const id = slash === -1 ? rest : rest.slice(slash + 1);
  if (!THEME.test(theme) || !CARD_ID.test(id) || id.includes("/")) {
    res.writeHead(404);
    res.end();
    return;
  }
  const root = resolve(deckRoot());
  const file = resolve(root, theme, `${id}.webp`);
  if (file !== root && !file.startsWith(`${root}/`)) {
    res.writeHead(404);
    res.end();
    return;
  }
  try {
    const body = await readFile2(file);
    res.writeHead(200, {
      "content-type": "image/webp",
      "cache-control": "public, max-age=86400"
    });
    res.end(req.method === "HEAD" ? void 0 : body);
  } catch {
    res.writeHead(404);
    res.end();
  }
}
function installDeckStatic(ctx) {
  const start = () => ctx.webServer.register({
    kind: "prefix",
    path: DECK_PUBLIC_PREFIX,
    handler: handle
  });
  if (typeof ctx.effect === "function") ctx.effect(start);
  else start();
}

// src/skill.ts
var SKILL_NAME = "lumina-interpret";
var SKILL_BODY = [
  "# Lumina \u89E3\u8BFB",
  "",
  "\u4F60\u662F Lumina \u5854\u7F57\u7684\u966A\u4F34\u5F0F\u89E3\u8BFB\u8005\uFF0C\u4E0D\u662F\u7B97\u547D\u5148\u751F\uFF0C\u4E5F\u4E0D\u662F\u51B3\u7B56\u4EE3\u7406\u4EBA\u3002",
  "",
  "## \u4F55\u65F6\u4F7F\u7528",
  "\u4EC5\u5728\u5DF2\u7ECF\u6709\u62BD\u724C\u7ED3\u679C\u65F6\u89E3\u8BFB\u3002\u7ED3\u679C\u5FC5\u987B\u6765\u81EA `lumina_draw`\u3001`lumina_today`\u3001`/lumina draw`\u3001`/lumina today`\uFF0C\u6216\u7528\u6237\u9762\u677F\u4E0A\u5DF2\u7ECF\u5C55\u5F00\u7684\u724C\u9762\u3002",
  "\u6CA1\u6709\u7ED3\u679C\u65F6\uFF1A\u5148\u62BD\u724C\u3002\u7981\u6B62\u7F16\u9020\u724C id\uFF0C\u7981\u6B62\u81EA\u5DF1\u70B9\u540D 78 \u5F20\u91CC\u7684\u67D0\u4E00\u5F20\u5145\u5F53\u7ED3\u679C\u3002",
  "",
  "## \u8BED\u6C14",
  "\u514B\u5236\u3001\u966A\u4F34\u3001\u4E0D\u5BBF\u547D\u8BBA\u3002\u7528\u300C\u53EF\u80FD\u300D\u300C\u503E\u5411\u300D\u300C\u53EF\u4EE5\u7559\u610F\u300D\uFF0C\u4E0D\u8981\u7528\u300C\u4E00\u5B9A\u4F1A\u300D\u300C\u6CE8\u5B9A\u300D\u3002\u4E0D\u66FF\u7528\u6237\u505A\u4EBA\u751F\u51B3\u5B9A\u3002",
  "",
  "## \u7ED3\u6784\uFF08\u6309\u6B64\u987A\u5E8F\uFF0C\u4E0D\u8981\u6253\u4E71\uFF09",
  "1. \u603B\u89C8\uFF1A\u7528\u4E24\u4E09\u53E5\u70B9\u51FA\u8FD9\u526F\u724C\u6B64\u523B\u7684\u4E3B\u8C03\u3002",
  "2. \u6309\u724C\u4F4D\uFF1A\u9010\u5F20\u8BF4\u660E\u724C\u540D\u3001\u6B63\u9006\u3001\u8BE5\u4F4D\u804C\u8D23\uFF0C\u4EE5\u53CA\u5B83\u5728\u8FD9\u4E2A\u95EE\u9898\u91CC\u53EF\u80FD\u610F\u5473\u7740\u4EC0\u4E48\u3002",
  "3. \u7EFC\u5408\uFF1A\u628A\u5404\u5F20\u724C\u7684\u5173\u7CFB\u6536\u675F\u6210\u4E00\u6761\u8FDE\u8D2F\u9605\u8BFB\uFF0C\u4E0D\u8981\u628A\u6BCF\u5F20\u724C\u5F53\u6210\u4E92\u4E0D\u76F8\u5173\u7684\u7B7E\u3002",
  "4. \u53EF\u6267\u884C\u5EFA\u8BAE\uFF1A\u7ED9\u51FA\u5C0F\u800C\u5177\u4F53\u3001\u7528\u6237\u4ECA\u5929\u5C31\u80FD\u505A\u7684\u4E00\u6B65\uFF1B\u4E0D\u627F\u8BFA\u7ED3\u679C\u3002",
  "",
  "## \u7981\u6B62",
  "- \u6539\u724C\u3001\u91CD\u62BD\u3001\u518D\u8C03\u7528\u62BD\u724C\u5DE5\u5177\u6362\u4E00\u5957\u724C\u3002",
  "- \u533B\u7597\u8BCA\u65AD\u3001\u7528\u836F\u3001\u9884\u540E\u3002",
  "- \u6CD5\u5F8B\u610F\u89C1\u6216\u8BC9\u8BBC\u9884\u6D4B\u3002",
  "- \u627F\u8BFA\u5177\u4F53\u4E8B\u4EF6\u4F1A\u53D1\u751F\uFF08\u4E2D\u5956\u3001\u590D\u5408\u65E5\u671F\u3001\u75BE\u75C5\u7ED3\u679C\u3001\u8003\u8BD5\u540D\u6B21\uFF09\u3002"
].join("\n");
var LUMINA_SKILL = {
  name: SKILL_NAME,
  description: "\u89E3\u8BFB\u4E00\u4EFD\u5DF2\u7ECF\u62BD\u597D\u7684 Lumina \u5854\u7F57\u7ED3\u679C\u3002\u6CA1\u6709\u62BD\u724C\u7ED3\u679C\u65F6\u4E0D\u8981\u4F7F\u7528\uFF1B\u7981\u6B62\u7F16\u9020\u724C id \u6216\u91CD\u62BD\u3002",
  whenToUse: "\u7528\u6237\u8981\u6C42\u89E3\u8BFB\u5F53\u524D\u724C\u9762\uFF0C\u4E14\u4F1A\u8BDD\u91CC\u5DF2\u6709 lumina_draw / lumina_today / /lumina \u7684\u65E2\u5B9A\u7ED3\u679C\u3002",
  source: "runtime",
  content: SKILL_BODY
};
var LUMINA_PROMPT_SECTION = {
  name: "lumina-tarot:identity",
  order: 180,
  text: [
    "Lumina \u5854\u7F57\uFF1A\u62BD\u724C\u5FC5\u987B\u4F7F\u7528 lumina_draw / lumina_today\uFF08\u6216\u7528\u6237\u5DF2\u7ECF\u62BD\u597D\u7684\u724C\u9762\uFF09\u3002",
    "\u7981\u6B62\u7F16\u9020\u724C id\u3002\u89E3\u8BFB\u65F6\u9075\u5B88 lumina-interpret skill\uFF1A\u5148\u6709\u7ED3\u679C\u518D\u89E3\uFF1B",
    "\u7ED3\u6784\u4E3A\u603B\u89C8 \u2192 \u6309\u724C\u4F4D \u2192 \u7EFC\u5408 \u2192 \u53EF\u6267\u884C\u5EFA\u8BAE\uFF1B\u514B\u5236\u966A\u4F34\u3001\u4E0D\u5BBF\u547D\u8BBA\uFF1B",
    "\u4E0D\u63D0\u4F9B\u533B\u7597\u6216\u6CD5\u5F8B\u5EFA\u8BAE\uFF0C\u4E0D\u627F\u8BFA\u5177\u4F53\u4E8B\u4EF6\u3002"
  ].join("")
};
function registerLuminaSkill(ctx) {
  ctx.skills?.register(LUMINA_SKILL);
}
function registerLuminaPrompt(ctx) {
  ctx.systemPrompt?.section(LUMINA_PROMPT_SECTION);
}

// src/domain/tool-reading.ts
var SPREADS2 = ["single", "three-card", "cross", "celtic-lite"];
function omitUndefined(value) {
  if (Array.isArray(value)) return value.map(omitUndefined);
  if (value && typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value)) {
      if (item === void 0) continue;
      out[key] = omitUndefined(item);
    }
    return out;
  }
  return value;
}
function toToolReading(reading) {
  return omitUndefined({
    id: reading.id,
    createdAt: reading.createdAt,
    spreadId: reading.spreadId,
    spreadName: reading.spreadName,
    kind: reading.kind,
    question: reading.question,
    cards: reading.cards.map((card) => ({
      cardId: card.cardId,
      name: card.name,
      nameEn: card.nameEn,
      symbol: card.symbol,
      number: card.number,
      arcana: card.arcana,
      suit: card.suit,
      rank: card.rank,
      reversed: card.reversed,
      positionIndex: card.positionIndex,
      positionName: card.positionName,
      positionRole: card.positionRole,
      keywords: card.keywords,
      meaning: card.meaning
    }))
  });
}
function summarizeReading(value) {
  const faces = value.cards.map((card) => `${card.name}${card.reversed ? "\uFF08\u9006\uFF09" : ""}`).join(" \xB7 ");
  return `${value.spreadName} \xB7 ${faces}`;
}
function asString2(value) {
  return typeof value === "string" ? value : void 0;
}
function asNumber2(value) {
  return typeof value === "number" && Number.isFinite(value) ? value : void 0;
}
function asBoolean2(value) {
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
function parseCard2(value) {
  if (!value || typeof value !== "object") return null;
  const rec = value;
  const cardId = asString2(rec.cardId);
  const name2 = asString2(rec.name);
  const reversed = asBoolean2(rec.reversed);
  const positionIndex = asNumber2(rec.positionIndex);
  if (!cardId || !name2 || reversed === void 0 || positionIndex === void 0) return null;
  return {
    cardId,
    name: name2,
    nameEn: asString2(rec.nameEn) ?? "",
    symbol: asString2(rec.symbol) ?? "",
    number: asNumber2(rec.number) ?? 0,
    arcana: rec.arcana === "minor" ? "minor" : "major",
    suit: asSuit(rec.suit),
    rank: asRank(rec.rank),
    reversed,
    positionIndex,
    positionName: asString2(rec.positionName) ?? `\u4F4D ${positionIndex + 1}`,
    positionRole: asString2(rec.positionRole) ?? "",
    keywords: asStringArray(rec.keywords),
    meaning: asString2(rec.meaning) ?? ""
  };
}
function parseToolReading(value) {
  if (!value || typeof value !== "object") return null;
  const rec = value;
  const id = asString2(rec.id);
  const spreadId = asString2(rec.spreadId);
  const kind = rec.kind === "today" ? "today" : rec.kind === "draw" ? "draw" : void 0;
  if (!id || !spreadId || !kind || !SPREADS2.includes(spreadId) || !Array.isArray(rec.cards)) return null;
  const cards = rec.cards.map(parseCard2);
  if (cards.some((card) => !card)) return null;
  return {
    id,
    createdAt: asNumber2(rec.createdAt) ?? 0,
    spreadId,
    spreadName: asString2(rec.spreadName) ?? spreadId,
    kind,
    question: asString2(rec.question),
    cards
  };
}

// src/tools.ts
function asRecord(args) {
  return args && typeof args === "object" && !Array.isArray(args) ? args : {};
}
function spreadFromArgs(args, fallback) {
  const raw = asRecord(args).spreadId;
  if (raw === void 0 || raw === "") return fallback;
  if (typeof raw !== "string") throw new Error("spreadId must be a string");
  return requireSpreadId(raw);
}
var DRAW_OUTPUT = {
  type: "object",
  properties: {
    id: { type: "string" },
    createdAt: { type: "number" },
    spreadId: { type: "string" },
    spreadName: { type: "string" },
    kind: { type: "string" },
    cards: { type: "array" }
  }
};
function text(value) {
  return [{ type: "text", text: value }];
}
function registerLuminaTools(ctx, state) {
  ctx.tools.register({
    name: "lumina_list_spreads",
    description: "\u5217\u51FA Lumina \u5854\u7F57\u53EF\u7528\u7684\u56DB\u79CD\u724C\u9635\uFF08id\u3001\u540D\u79F0\u3001\u5F20\u6570\uFF09\u3002\u62BD\u724C\u524D\u5148\u8C03\u7528\u672C\u5DE5\u5177\u786E\u8BA4 spreadId\u3002",
    parameters: { type: "object" },
    output: {
      schema: { type: "object", properties: { spreads: { type: "array" } } },
      render: (_args, value) => {
        const spreads = value?.spreads ?? [];
        return text(spreads.map((item) => `${item.id} (${item.count})`).join(" \xB7 ") || "no spreads");
      }
    },
    isConcurrencySafe: () => true,
    execute: async () => ({
      spreads: SPREADS.map((spread) => ({
        id: spread.id,
        name: spread.name,
        subtitle: spread.subtitle,
        count: spread.count
      }))
    })
  });
  ctx.tools.register({
    name: "lumina_draw",
    description: "\u6309\u6307\u5B9A\u724C\u9635\u62BD\u724C\uFF0C\u8FD4\u56DE\u724C\u4F4D\u3001\u6B63\u9006\u3001\u5173\u952E\u8BCD\u4E0E\u6B63\u9006\u4F4D\u542B\u4E49\u3002\u7981\u6B62\u7F16\u9020\u724C id\uFF1B\u89E3\u8BFB\u7559\u7ED9\u540E\u7EED\u5BF9\u8BDD\uFF0C\u4E0D\u8981\u628A\u5360\u535C\u53D9\u4E8B\u5199\u8FDB\u672C\u5DE5\u5177\u3002",
    parameters: {
      type: "object",
      properties: {
        spreadId: {
          type: "string",
          description: "\u724C\u9635 id\uFF1Asingle | three-card | cross | celtic-lite\u3002\u7701\u7565\u5219\u7528\u8BBE\u7F6E\u91CC\u7684\u9ED8\u8BA4\u724C\u9635\u3002"
        },
        seed: {
          type: "string",
          description: "\u53EF\u9009\u3002\u76F8\u540C seed \u53EF\u590D\u73B0\u540C\u4E00\u62BD\u724C\u3002"
        }
      }
    },
    output: {
      schema: DRAW_OUTPUT,
      render: (_args, value) => {
        const parsed = parseToolReading(value);
        return text(parsed ? summarizeReading(parsed) : "draw complete");
      },
      presentationMeta: (_args, value) => value
    },
    presentCall: () => ({ card: "generic", title: "Lumina \u62BD\u724C" }),
    presentResult: (_args, result) => result.isError ? { card: "generic", title: "\u62BD\u724C\u5931\u8D25" } : { card: "generic", title: "Lumina \u62BD\u724C" },
    execute: async (args) => {
      const spreadId = spreadFromArgs(args, state.current.defaultSpread);
      const seed = asRecord(args).seed;
      const reading = drawReading(spreadId, state.current.reversedRate, randFromSeed(seed));
      await persistReading(state, reading);
      return toToolReading(reading);
    }
  });
  ctx.tools.register({
    name: "lumina_lookup_card",
    description: "\u6309\u724C id\u3001\u4E2D\u6587\u540D\u6216\u82F1\u6587\u540D\u67E5\u8BE2\u4E00\u5F20\u5854\u7F57\u724C\u7684\u7ED3\u6784\u5316\u5B57\u6BB5\uFF0C\u4E0D\u662F\u66FF\u7528\u6237\u89E3\u8BFB\u3002",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "\u4F8B\u5982 fool\u3001\u611A\u8005\u3001The Fool"
        }
      },
      required: ["query"]
    },
    output: {
      schema: { type: "object" },
      render: (_args, value) => {
        const card = value;
        const keys = Array.isArray(card.keywords) ? card.keywords.slice(0, 4).join("\u3001") : "";
        return text([card.name, card.nameEn, keys].filter(Boolean).join(" \xB7 ") || "not found");
      }
    },
    isConcurrencySafe: () => true,
    execute: async (args) => {
      const query = asRecord(args).query;
      if (typeof query !== "string" || !query.trim()) throw new Error("query is required");
      const card = findCard(query);
      if (!card) throw new Error(`unknown card: ${query.trim()}`);
      return omitUndefined({
        id: card.id,
        number: card.number,
        name: card.name,
        nameEn: card.nameEn,
        arcana: card.arcana,
        suit: card.suit,
        rank: card.rank,
        keywords: card.keywords,
        symbol: card.symbol,
        summary: card.summary,
        upright: card.upright,
        reversed: card.reversed
      });
    }
  });
  ctx.tools.register({
    name: "lumina_today",
    description: "\u62BD\u53D6\u4ECA\u65E5\u4E00\u724C\u3002\u540C\u4E00\u81EA\u7136\u65E5\u7ED3\u679C\u7A33\u5B9A\u3002\u8FD4\u56DE\u724C\u4F4D\u3001\u6B63\u9006\u3001\u5173\u952E\u8BCD\u4E0E\u6B63\u9006\u4F4D\u542B\u4E49\uFF0C\u4E0D\u542B\u89E3\u8BFB\u6563\u6587\u3002",
    parameters: { type: "object" },
    output: {
      schema: DRAW_OUTPUT,
      render: (_args, value) => {
        const parsed = parseToolReading(value);
        return text(parsed ? summarizeReading(parsed) : "draw complete");
      },
      presentationMeta: (_args, value) => value
    },
    presentCall: () => ({ card: "generic", title: "Lumina \u4ECA\u65E5\u4E00\u724C" }),
    presentResult: (_args, result) => result.isError ? { card: "generic", title: "\u4ECA\u65E5\u4E00\u724C\u5931\u8D25" } : { card: "generic", title: "Lumina \u4ECA\u65E5\u4E00\u724C" },
    execute: async () => {
      const reading = todayReading(state.current.reversedRate);
      await persistReading(state, reading);
      return toToolReading(reading);
    }
  });
}

// src/index.ts
var name = "dsh-lumina-tarot";
function apply(ctx) {
  const state = {
    current: { ...DEFAULT_CONFIG },
    lastReading: null,
    history: createHistory()
  };
  console.log("[lumina-tarot] host loaded");
  ctx.logger?.info("[lumina-tarot] host loaded");
  void installLuminaSettings(ctx, state).catch((error) => {
    console.warn("[lumina-tarot] settings not mounted", error);
  });
  ctx.inject(["commands"], (scoped) => {
    registerLuminaCommands(scoped, state);
  });
  ctx.inject(["tools"], (scoped) => {
    registerLuminaTools(scoped, state);
  });
  ctx.inject(["skills"], (scoped) => {
    registerLuminaSkill(scoped);
  });
  ctx.inject(["systemPrompt"], (scoped) => {
    registerLuminaPrompt(scoped);
  });
  ctx.inject(["webServer"], (scoped) => {
    installDeckStatic(scoped);
  });
}
export {
  apply,
  name
};
