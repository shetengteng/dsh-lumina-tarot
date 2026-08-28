import { execSync } from 'node:child_process'

export async function run(ctx) {
  const { report } = ctx

  if (report.wanted(ctx.only, 'S21')) {
    let dump = ''
    try {
      dump = execSync('dsh --profile web --dump-config', { encoding: 'utf8', timeout: 15000 })
    } catch (error) {
      dump = String(error.stdout || error.message || error)
    }
    const hasLayer = dump.includes('# == dsh-lumina-tarot')
    report.rec('S21', '安装核对', hasLayer ? 'pass' : 'fail', [
      { name: 'dump-config 出现本包层', ok: hasLayer, detail: hasLayer ? '# == dsh-lumina-tarot' : dump.slice(0, 200) },
    ], '不自动重启 dsh web；悬浮牌是否仍在以本轮页面为准')
  }

  if (report.wanted(ctx.only, 'S22')) {
    if (!ctx.flags.headless) {
      report.rec('S22', 'Headless / 非 web', 'skip', [{ name: '默认跳过', ok: true, detail: '本机通常只有 web profile；加 --headless 才抽检' }])
    } else {
      report.rec('S22', 'Headless / 非 web', 'blocked', [{ name: '需指定 headless profile', ok: false, detail: '脚本不自动创建 profile' }])
    }
  }

  if (report.wanted(ctx.only, 'S23')) {
    if (!ctx.flags.uninstall) {
      report.rec('S23', '卸载', 'skip', [{ name: '默认跳过', ok: true, detail: '加 --uninstall 才会 dsh plugin remove' }])
      return
    }
    try {
      execSync('dsh plugin --profile web remove dsh-lumina-tarot', { encoding: 'utf8', timeout: 20000 })
      report.rec('S23', '卸载', 'pass', [
        { name: 'remove 命令成功', ok: true, detail: '请自行刷新/重启 dsh web 确认牌背和设置消失' },
      ])
    } catch (error) {
      report.rec('S23', '卸载', 'fail', [{ name: 'remove', ok: false, detail: String(error.message || error).slice(0, 400) }])
    }
  }
}
