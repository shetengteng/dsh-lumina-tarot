export function createReport() {
  const results = []

  function rec(id, name, status, checks = [], notes = '') {
    results.push({ id, name, status, checks, notes })
    const mark = status === 'pass' ? 'PASS' : status === 'fail' ? 'FAIL' : status.toUpperCase()
    console.log(`\n[${mark}] ${id} ${name}`)
    for (const check of checks) {
      console.log(`  ${check.ok ? 'ok' : 'NO'} ${check.name}${check.detail ? ` — ${check.detail}` : ''}`)
    }
    if (notes) console.log(`  note: ${notes}`)
  }

  function wanted(only, id) {
    return !only?.length || only.includes(id)
  }

  function summary() {
    console.log('\n==== SUMMARY ====')
    for (const row of results) {
      console.log(`${row.status.padEnd(8)} ${row.id}  ${row.name}`)
    }
    const failed = results.filter((row) => row.status === 'fail').length
    const blocked = results.filter((row) => row.status === 'blocked').length
    console.log(`\nfail=${failed} blocked=${blocked} total=${results.length}`)
    return failed
  }

  return { rec, results, wanted, summary }
}
