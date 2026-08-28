import type { LocaleId, SpreadId } from '../../domain/types.ts'

export type GuideSpread = {
  id: SpreadId
  count: number
  when: string
  positions: Array<{ name: string; hint: string }>
}

export type GuideCopy = {
  title: string
  hint: string
  chatTitle: string
  chatLead: string
  examples: string[]
  chatHint: string
  floatTitle: string
  floatItems: string[]
  spreadsTitle: string
  spreadsLead: string
  cardsUnit: string
  todayTitle: string
  todayBody: string
  afterTitle: string
  afterBody: string
  spreads: GuideSpread[]
}

const ZH: GuideCopy = {
  title: '使用说明',
  hint: '对话怎么唤起，以及四种牌阵分别适合什么。',
  chatTitle: '用自然语言唤起',
  chatLead: '在当前会话里直接说出你的问题，不必记命令或工具名。助手会替你抽牌，对话里出现牌阵卡。',
  examples: [
    '帮我占卜一下',
    '帮我看看最近的事业运',
    '抽一张今日指引',
    '用三牌阵看看这段关系',
  ],
  chatHint: '想指定牌阵时，把「单张 / 三牌 / 十字 / 凯尔特」说进句子即可；不说则用上面的默认牌阵。',
  floatTitle: '悬浮牌怎么用',
  floatItems: [
    '单击：写下问题，按默认牌阵抽牌。',
    '右击：换牌阵、看上次结果或历史。',
    '拖动：只移动位置，不会抽牌。',
  ],
  spreadsTitle: '四种牌阵',
  spreadsLead: '牌越多，看得越细。日常快问用单张；想来龙去脉用三牌；卡住了用十字；课题比较缠用凯尔特精简。',
  cardsUnit: '张',
  todayTitle: '今日一牌',
  todayBody: '看今天的基调。在对话里提「今日」即可；同一天再问，仍是同一张。',
  afterTitle: '抽完之后',
  afterBody: '点「让 AI 解读」，当前会话会按已经展开的牌面写解读。它不会改牌，也不会重抽。',
  spreads: [
    {
      id: 'single',
      count: 1,
      when: '一句话的问题、今日心情，或只想要一个锚点。抽一张，直指核心。',
      positions: [{ name: '当下指引', hint: '此刻最该看见的一件事' }],
    },
    {
      id: 'three-card',
      count: 3,
      when: '最经典的三牌阵。适合理清事情怎么走到现在、接下来可能往哪走。',
      positions: [
        { name: '过去', hint: '铺垫与来路' },
        { name: '现在', hint: '当下的重心' },
        { name: '未来', hint: '可能的走向' },
      ],
    },
    {
      id: 'cross',
      count: 5,
      when: '快速拆开问题结构。适合工作、人际，或卡在选择里。',
      positions: [
        { name: '情境核心', hint: '眼前这件事本身' },
        { name: '当前挑战', hint: '挡住你的那一层' },
        { name: '潜意识', hint: '还没说出口的部分' },
        { name: '显意识', hint: '你已经意识到的' },
        { name: '建议方向', hint: '可以迈出的一步' },
      ],
    },
    {
      id: 'celtic-lite',
      count: 6,
      when: '以凯尔特十字为骨架的精简版。适合头绪多、比较缠的课题。',
      positions: [
        { name: '现状', hint: '此刻站在哪里' },
        { name: '挑战', hint: '对冲的力量' },
        { name: '根基', hint: '底下真正在起作用的' },
        { name: '过去', hint: '仍在影响现在的' },
        { name: '可能', hint: '若照此走下去' },
        { name: '结果', hint: '倾向的落点' },
      ],
    },
  ],
}

const EN: GuideCopy = {
  title: 'How to use',
  hint: 'How to ask in chat, and what each spread is for.',
  chatTitle: 'Ask in plain language',
  chatLead: 'Just say your question in this conversation. You do not need commands or tool names. The assistant draws for you, and a spread card appears in the thread.',
  examples: [
    'Draw a tarot reading for me',
    'How is my career looking lately?',
    'Give me today\'s card',
    'Use the three-card spread for this relationship',
  ],
  chatHint: 'To pick a spread, mention “single”, “three-card”, “cross”, or “Celtic” in the sentence. Otherwise the default spread above is used.',
  floatTitle: 'Floating card',
  floatItems: [
    'Click: write a question, then draw with the default spread.',
    'Right-click: change spread, reopen the last result, or view history.',
    'Drag: moves the card only — it does not draw.',
  ],
  spreadsTitle: 'The four spreads',
  spreadsLead: 'More cards, more structure. Single for a quick ask; three-card for a timeline; cross when you are stuck; Celtic Lite for layered questions.',
  cardsUnit: 'cards',
  todayTitle: 'Card of the day',
  todayBody: 'A daily tone-check. Ask for “today” in chat; the same day always returns the same card.',
  afterTitle: 'After the draw',
  afterBody: 'Tap “Ask AI to interpret” to send the revealed cards to this conversation. It will not change or redraw the cards.',
  spreads: [
    {
      id: 'single',
      count: 1,
      when: 'One question, one card. Best for a mood snapshot or a single focal point.',
      positions: [{ name: 'Now', hint: 'What wants your attention' }],
    },
    {
      id: 'three-card',
      count: 3,
      when: 'The classic timeline. How the situation unfolded, where it sits, and where it may go.',
      positions: [
        { name: 'Past', hint: 'What led here' },
        { name: 'Present', hint: 'The current centre' },
        { name: 'Future', hint: 'A likely direction' },
      ],
    },
    {
      id: 'cross',
      count: 5,
      when: 'A quick map of a stuck situation — work, people, or a choice.',
      positions: [
        { name: 'Situation', hint: 'The matter itself' },
        { name: 'Challenge', hint: 'What is in the way' },
        { name: 'Subconscious', hint: 'What has not been said' },
        { name: 'Conscious', hint: 'What you already see' },
        { name: 'Advice', hint: 'A step you can take' },
      ],
    },
    {
      id: 'celtic-lite',
      count: 6,
      when: 'A six-card sketch of the Celtic Cross. For messier, layered questions.',
      positions: [
        { name: 'Present', hint: 'Where you stand' },
        { name: 'Challenge', hint: 'The opposing force' },
        { name: 'Root', hint: 'What sits underneath' },
        { name: 'Past', hint: 'What still colours now' },
        { name: 'Potential', hint: 'If this path continues' },
        { name: 'Outcome', hint: 'The likely landing' },
      ],
    },
  ],
}

export function guideCopy(locale: LocaleId): GuideCopy {
  return locale === 'en-US' ? EN : ZH
}
