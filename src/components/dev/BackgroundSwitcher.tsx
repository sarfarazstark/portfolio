import { useEffect, useState } from 'react'
import { PATTERNS } from '@/data/background-patterns'

/*
 * TEMPORARY preview tool for picking a background pattern. It writes straight
 * onto document.body, which wins over the stylesheet, and puts the original
 * value back when removed. Delete this file and src/data/background-patterns.ts
 * once a pattern is chosen.
 */

const CURRENT = '__current__'

const svgUrl = (svg: string, ink: string) =>
    `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        svg.replaceAll('__INK__', ink),
    )}")`

const DEFAULT_BG =
    'radial-gradient(#e6e6e6 1px, transparent 1px), repeating-linear-gradient(135deg, #ededed 0 1px, transparent 1px 8px)'

const BackgroundSwitcher = () => {
    const [choice, setChoice] = useState(CURRENT)
    const [dots, setDots] = useState(false)
    const [open, setOpen] = useState(true)

    useEffect(() => {
        const body = document.body
        const before = {
            image: body.style.backgroundImage,
            size: body.style.backgroundSize,
        }
        const apply = () => {
            if (choice === CURRENT) {
                body.style.backgroundImage = ''
                body.style.backgroundSize = ''
                return
            }
            const svg = PATTERNS.find(([name]) => name === choice)?.[1]
            if (!svg) return
            // Resolve the token now, so dark mode gets its own ink.
            const ink = getComputedStyle(body)
                .getPropertyValue('--background-pattern')
                .trim()
            if (dots) {
                const dot = getComputedStyle(body)
                    .getPropertyValue('--background-dot')
                    .trim()
                body.style.backgroundImage = `${svgUrl(svg, ink)}, ${DEFAULT_BG.replace('#e6e6e6', dot)}`
                body.style.backgroundSize = 'auto, 18px 18px, auto'
            } else {
                body.style.backgroundImage = svgUrl(svg, ink)
                body.style.backgroundSize = 'auto'
            }
        }
        apply()
        // The theme toggles a class on <html>, which changes the ink.
        const mo = new MutationObserver(apply)
        mo.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class'],
        })
        return () => {
            mo.disconnect()
            body.style.backgroundImage = before.image
            body.style.backgroundSize = before.size
        }
    }, [choice, dots])

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-20 right-4 z-50 rounded-lg bg-foreground px-3 py-2 text-xs font-medium text-background shadow-lg"
            >
                Pattern
            </button>
        )
    }

    const index = PATTERNS.findIndex(([name]) => name === choice)

    return (
        <div className="fixed bottom-20 right-4 z-50 flex w-64 flex-col gap-2 rounded-xl border border-border bg-background/95 p-3 text-xs shadow-xl backdrop-blur">
            <div className="flex items-center justify-between">
                <span className="font-medium">Background pattern</span>
                <button
                    onClick={() => setOpen(false)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Hide switcher"
                >
                    ✕
                </button>
            </div>
            <select
                value={choice}
                onChange={(e) => setChoice(e.target.value)}
                className="w-full rounded-md border border-border bg-background px-2 py-1.5"
            >
                <option value={CURRENT}>CURRENT — dot + diagonal</option>
                {PATTERNS.map(([name]) => (
                    <option key={name} value={name}>
                        {name}
                    </option>
                ))}
            </select>
            <div className="flex items-center gap-1">
                <button
                    onClick={() =>
                        setChoice(
                            index <= 0
                                ? PATTERNS[PATTERNS.length - 1][0]
                                : PATTERNS[index - 1][0],
                        )
                    }
                    className="flex-1 rounded-md border border-border py-1 hover:bg-muted"
                >
                    ←
                </button>
                <span className="min-w-8 text-center tabular-nums text-muted-foreground">
                    {index < 0 ? '—' : `${index + 1}/${PATTERNS.length}`}
                </span>
                <button
                    onClick={() =>
                        setChoice(
                            index < 0 || index >= PATTERNS.length - 1
                                ? PATTERNS[0][0]
                                : PATTERNS[index + 1][0],
                        )
                    }
                    className="flex-1 rounded-md border border-border py-1 hover:bg-muted"
                >
                    →
                </button>
            </div>
            <label className="flex items-center gap-2 text-muted-foreground">
                <input
                    type="checkbox"
                    checked={dots}
                    onChange={(e) => setDots(e.target.checked)}
                />
                Layer over the dot grid
            </label>
        </div>
    )
}

export default BackgroundSwitcher
