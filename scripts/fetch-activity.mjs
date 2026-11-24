/**
 * Writes src/data/activity.json from public contribution data.
 *
 * Runs at build time, not in the browser: github.com/users/<u>/contributions
 * sends no CORS header, so the page could never read it. Nothing secret is
 * involved — every endpoint here is public and unauthenticated.
 *
 * A failed fetch leaves the committed JSON in place so an offline build or a
 * rate limit cannot break a deploy.
 */
import { writeFile, readFile } from 'node:fs/promises'

const GH_USER = process.env.GH_USER || 'sarfarazstark'
/** GitLab's calendar is public; its merge list is not (see gitlabMerges). */
const GL_HOST = process.env.GL_HOST || 'https://gitlab.com'
const GL_USER = process.env.GL_USER || 'sarfarazalam.aof'
const OUT = 'src/data/activity.json'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

async function get(url) {
    const res = await fetch(url, {
        headers: { 'user-agent': 'portfolio-build', accept: '*/*' },
        signal: AbortSignal.timeout(20000),
    })
    if (!res.ok) throw new Error(`${res.status} ${url}`)
    return res
}

/** Exact per-day counts live in the <tool-tip> elements, not the cells. */
function parseGitHub(html) {
    const counts = new Map()
    for (const m of html.matchAll(
        /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g,
    )) {
        const n = /^(\d[\d,]*)\s+contribution/.exec(m[2].trim())
        if (n) counts.set(m[1], Number(n[1].replace(/,/g, '')))
    }
    // Attribute order is not stable, so read each one off the tag separately.
    const days = []
    for (const m of html.matchAll(/<td[^>]*ContributionCalendar-day[^>]*>/g)) {
        const tag = m[0]
        const date = /data-date="(\d{4}-\d{2}-\d{2})"/.exec(tag)
        const level = /data-level="(\d)"/.exec(tag)
        const id = /id="([^"]+)"/.exec(tag)
        if (!date || !level || !id) continue
        days.push({ d: date[1], l: Number(level[1]), c: counts.get(id[1]) ?? 0 })
    }
    if (!days.length) throw new Error('no contribution cells parsed')
    days.sort((a, b) => a.d.localeCompare(b.d))
    return days
}

/** 0-4 shade, roughly GitHub's scale, applied to summed counts. */
const bucket = (n) => (n === 0 ? 0 : n < 4 ? 1 : n < 10 ? 2 : n < 20 ? 3 : 4)

/** Consecutive days with activity. Today still counts if it has any yet. */
function streaks(days) {
    const active = days.filter((x) => x.c > 0).map((x) => x.d)
    const set = new Set(active)
    let longest = 0
    let run = 0
    let prev = null
    for (const d of active) {
        run = prev && nextDay(prev) === d ? run + 1 : 1
        if (run > longest) longest = run
        prev = d
    }
    // Walk back from today; a quiet today does not break a live streak.
    const today = days[days.length - 1].d
    let cursor = set.has(today) ? today : prevDay(today)
    let current = 0
    while (set.has(cursor)) {
        current++
        cursor = prevDay(cursor)
    }
    return { current, longest }
}

const iso = (d) => d.toISOString().slice(0, 10)
const prevDay = (d) => iso(new Date(Date.parse(d + 'T00:00:00Z') - 864e5))
const nextDay = (d) => iso(new Date(Date.parse(d + 'T00:00:00Z') + 864e5))

async function mergedPRs() {
    const res = await get(
        `https://api.github.com/search/issues?q=author:${GH_USER}+type:pr+is:merged&per_page=1`,
    )
    return (await res.json()).total_count ?? 0
}

/**
 * GitLab's per-day calendar is public and includes private contributions.
 * Merged MR counts are not: /merge_requests and GraphQL both return 401
 * unauthenticated, and the events feed only lists public projects. So this
 * contributes a total only, never a merge count.
 */
async function gitlabCalendar() {
    if (!GL_HOST || !GL_USER) return null
    const host = GL_HOST.replace(/\/$/, '')
    const raw = await (await get(`${host}/users/${GL_USER}/calendar.json`)).json()
    const days = Object.entries(raw)
        .map(([d, c]) => ({ d, c }))
        .sort((a, b) => a.d.localeCompare(b.d))
    if (!days.length) throw new Error('gitlab calendar empty')
    return {
        host: GL_HOST,
        user: GL_USER,
        total: days.reduce((s, x) => s + x.c, 0),
        days,
    }
}

async function main() {
    let previous = null
    try {
        previous = JSON.parse(await readFile(OUT, 'utf8'))
    } catch {}

    const ghDays = parseGitHub(
        await (await get(`https://github.com/users/${GH_USER}/contributions`)).text(),
    )
    const gitlab = await gitlabCalendar().catch((e) => {
        console.warn('gitlab skipped:', e.message)
        return null
    })

    // Both calendars are public, so the graph shows one merged year. GitHub's
    // own 0-4 level means nothing once counts are summed, hence the rebucket.
    const byDate = new Map(ghDays.map((x) => [x.d, x.c]))
    for (const g of gitlab?.days ?? []) {
        byDate.set(g.d, (byDate.get(g.d) ?? 0) + g.c)
    }
    const days = [...byDate.entries()]
        .map(([d, c]) => ({ d, c, l: bucket(c) }))
        .sort((a, b) => a.d.localeCompare(b.d))

    const { current, longest } = streaks(days)
    const best = days.reduce((a, b) => (b.c > a.c ? b : a), days[0])

    const github = {
        user: GH_USER,
        total: ghDays.reduce((s, x) => s + x.c, 0),
        merged: await mergedPRs(),
        currentStreak: current,
        longestStreak: longest,
        bestDay: { date: best.d, count: best.c },
        days,
    }
    const payload =
        JSON.stringify(
            { generated: new Date().toISOString(), github, gitlab },
            null,
            1,
        ) + '\n'
    // The scheduled job commits this file, so a run that found nothing new
    // must not touch it: only the timestamp would differ, and that would add
    // a commit a day of pure noise. Compare the payload without it.
    const body = (s) => s.replace(/"generated": "[^"]*",\n/, '')
    if (!previous || body(JSON.stringify(previous, null, 1) + '\n') !== body(payload)) {
        await writeFile(OUT, payload)
    }
    console.log(
        `activity: ${github.total} contributions, ${github.merged} merged PRs, ` +
            `streak ${current}/${longest}, ${days.length} days` +
            (gitlab ? `, gitlab ${gitlab.total} contributions` : ''),
    )
    return previous
}

main().catch(async (e) => {
    console.error('activity fetch failed, keeping existing data:', e.message)
    process.exit(0)
})
