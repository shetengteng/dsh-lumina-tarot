import { useEffect, useState } from 'react'
import { Button } from '@deepseek-ai/dsh-client-ui-primitives'
import {
  ANIMATION_OPTIONS,
  ART_OPTIONS,
  BACK_OPTIONS,
  MINOR_OPTIONS,
  SPREAD_OPTIONS,
  THEME_OPTIONS,
  type LuminaConfig,
} from '../defaults.ts'
import { CardBackSvg } from '../card-back.tsx'
import { resolveUiLocale, spreadLabel, t, type LocaleHandle } from '../i18n.ts'
import { luminaConfig, persistLuminaField, persistLuminaPatch, unsetLuminaField, patchLuminaConfig, watchLuminaConfig, type SettingsHandle } from '../store.ts'
import { ArtPreview } from './art-previews.tsx'
import { DataBlock } from './data.tsx'
import { BrandLogo } from './logo.tsx'
import { SelectRow, SliderRow, SwitchRow } from './rows.tsx'
import { ensureSettingsStyles } from './styles.ts'

export function createSettingsSection(
  scope: SettingsHandle | undefined,
  localeApi?: LocaleHandle,
  remote?: {
    commands?: { execute: (sessionId: string, line: string, images: readonly unknown[], signal?: AbortSignal) => Promise<unknown> }
  },
) {
  return function LuminaSettings() {
    ensureSettingsStyles()
    const [config, setConfig] = useState(() => luminaConfig())
    const [openId, setOpenId] = useState(null as string | null)
    const [dshLocale, setDshLocale] = useState(() => localeApi?.getSnapshot?.()?.active ?? 'zh')
    const [dataNote, setDataNote] = useState('')
    const snap = scope?.getSnapshot?.()
    const writable = snap?.writable !== false && snap?.status !== 'unavailable'
    const locale = resolveUiLocale(config, dshLocale)
    const tx = (key: Parameters<typeof t>[1]) => t(locale, key)

    useEffect(() => watchLuminaConfig(() => setConfig({ ...luminaConfig() })), [])
    useEffect(() => localeApi?.subscribe?.(() => setDshLocale(localeApi.getSnapshot?.()?.active ?? 'zh')) ?? (() => undefined), [])

    const persist = (field: keyof LuminaConfig, value: LuminaConfig[keyof LuminaConfig]) => {
      void persistLuminaField(scope, field, value)
    }
    const rowState = { openId, setOpenId }

    const pickArt = (id: LuminaConfig['cardArtTheme']) => {
      persist('cardArtTheme', id)
    }

    return (
      <div className="lumina-set">
        <header className="lumina-set-hero">
          <BrandLogo />
          <div className="lumina-set-hero-text">
            <h2 className="lumina-set-head">{tx('pageTitle')}</h2>
            <p className="lumina-set-sub">{`${tx('pageVersion')} · ${tx('pageSub')}`}</p>
          </div>
        </header>
        {writable ? null : <p className="lumina-set-desc">{tx('readonly')}</p>}
        <SelectRow
          id="theme"
          title={tx('theme')}
          options={THEME_OPTIONS.map((opt) => ({ id: opt.id, label: tx(`theme_${opt.id}` as Parameters<typeof t>[1]) }))}
          current={config.theme}
          onPick={(id) => persist('theme', id as LuminaConfig['theme'])}
          desc={tx('themeDesc')}
          {...rowState}
        />
        <SelectRow
          id="language"
          title={tx('language')}
          options={[{ id: 'follow', label: tx('langFollow') }, { id: 'zh-CN', label: tx('langZh') }, { id: 'en-US', label: tx('langEn') }]}
          current={config.followDshLocale ? 'follow' : config.locale}
          onPick={(id) => {
            if (id === 'follow') {
              void persistLuminaPatch(scope, { followDshLocale: true })
              return
            }
            void persistLuminaPatch(scope, {
              followDshLocale: false,
              locale: id as LuminaConfig['locale'],
            })
          }}
          desc={tx('languageDesc')}
          {...rowState}
        />
        <SwitchRow
          title={tx('floatCard')}
          desc={tx('floatCardDesc')}
          on={config.showFloatCard}
          onToggle={() => persist('showFloatCard', !config.showFloatCard)}
        />
        <div className="lumina-set-block">
          <div className="lumina-set-title">{tx('cardArt')}</div>
          <p className="lumina-set-desc">{tx('cardArtDesc')}</p>
          <div className="lumina-set-cards">
            {ART_OPTIONS.map((opt) => {
              const selected = config.cardArtTheme === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`lumina-set-card${selected ? ' is-on' : ''}`}
                  aria-pressed={selected}
                  onClick={() => pickArt(opt.id)}
                >
                  {selected ? <span className="lumina-set-card-check">✓</span> : null}
                  <div className={`lumina-set-card-preview is-${opt.id}`}>
                    <ArtPreview id={opt.id} />
                  </div>
                  <div className="lumina-set-card-name">{tx(`art_${opt.id}` as Parameters<typeof t>[1])}</div>
                </button>
              )
            })}
          </div>
        </div>
        {config.cardArtTheme === 'minimal'
          ? (
            <div className="lumina-set-block">
              <div className="lumina-set-title">{tx('cardBack')}</div>
              <p className="lumina-set-desc">{tx('cardBackDesc')}</p>
              <div className="lumina-set-cards">
                {BACK_OPTIONS.map((opt) => {
                  const selected = config.cardBack === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`lumina-set-card${selected ? ' is-on' : ''}`}
                      aria-pressed={selected}
                      onClick={() => persist('cardBack', opt.id)}
                    >
                      {selected ? <span className="lumina-set-card-check">✓</span> : null}
                      <div className="lumina-set-card-preview is-back dsh-lumina" data-theme={config.theme}>
                        <CardBackSvg variant={opt.id} />
                      </div>
                      <div className="lumina-set-card-name">{tx(`back_${opt.id}` as Parameters<typeof t>[1])}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          )
          : null}
        {config.cardArtTheme === 'minimal'
          ? (
            <SelectRow
              id="minor"
              title={tx('minor')}
              options={MINOR_OPTIONS.map((opt) => ({ id: opt.id, label: tx(`minor_${opt.id}` as Parameters<typeof t>[1]) }))}
              current={config.minorStyle}
              onPick={(id) => persist('minorStyle', id as LuminaConfig['minorStyle'])}
              desc={tx('minorDesc')}
              {...rowState}
            />
          )
          : null}
        <SelectRow
          id="animation"
          title={tx('animation')}
          options={ANIMATION_OPTIONS.map((opt) => ({ id: opt.id, label: tx(`anim_${opt.id}` as Parameters<typeof t>[1]) }))}
          current={config.animationLevel}
          onPick={(id) => persist('animationLevel', id as LuminaConfig['animationLevel'])}
          desc={tx('animationDesc')}
          {...rowState}
        />
        <SelectRow
          id="spread"
          title={tx('defaultSpread')}
          options={SPREAD_OPTIONS.map((opt) => ({ id: opt.id, label: spreadLabel(locale, opt.id) }))}
          current={config.defaultSpread}
          onPick={(id) => persist('defaultSpread', id as LuminaConfig['defaultSpread'])}
          desc={tx('drawDefaultsDesc')}
          {...rowState}
        />
        <SliderRow
          title={`${tx('reversedRate')} ${Math.round(config.reversedRate * 100)}%`}
          control={
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={config.reversedRate}
              onChange={(event: { target: { value: string } }) => persist('reversedRate', Number(event.target.value))}
            />
          }
          desc={tx('reversedRateDesc')}
        />
        <SliderRow
          title={`${tx('panelOpacity')} ${Math.round(config.panelOpacity * 100)}%`}
          control={
            <input
              type="range"
              min={0.2}
              max={0.8}
              step={0.05}
              value={config.panelOpacity}
              onChange={(event: { target: { value: string } }) => persist('panelOpacity', Number(event.target.value))}
            />
          }
        />
        <div className="lumina-set-row">
          <div className="lumina-set-row-text">
            <div className="lumina-set-title">{tx('resetFloat')}</div>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              patchLuminaConfig({ floatX: 0.92, floatY: 0.82 })
              await unsetLuminaField(scope, 'floatX')
              await unsetLuminaField(scope, 'floatY')
            }}
          >
            {tx('resetAction')}
          </Button>
        </div>
        <DataBlock
          tx={tx}
          locale={locale}
          theme={config.theme}
          opacity={config.panelOpacity}
          animationLevel={config.animationLevel}
          config={config}
          remote={remote}
          note={dataNote}
          setNote={setDataNote}
        />
        <div className="lumina-set-about">
          <div className="lumina-set-title">{tx('about')}</div>
          <p className="lumina-set-desc">{tx('aboutLine1')}</p>
          <p className="lumina-set-desc">{tx('aboutLine2')}</p>
        </div>
      </div>
    )
  }
}
