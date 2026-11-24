import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { bannerSvg } from 'ascii.rest/svg'

/**
 * The name in block letters, between the CTA and the credit.
 *
 * Three edits to ascii.rest's SVG, each fixing something that shows up as
 * breakage rather than as taste:
 *
 * - `letter-spacing` −0.8 at a matching font size. A cell's advance is 0.6em
 *   but its ink is 0.62em wide, so neighbouring cells overlap by only a third
 *   of a pixel: less than the anti-aliasing ramp, which leaves a hairline seam
 *   down every column of a solid letter. Trading em for tracking widens the
 *   overlap to a full pixel while the 10-unit cell pitch stays put.
 * - Drop `textLength`: it stretches every row to one width, but rows differ in
 *   width (75–79 cells), so shorter rows get skewed off the grid.
 * - Keep the solid palette: dark mode swaps the block for a textured glyph, so
 *   every cell would show a dither pattern instead of solid ink.
 *
 * Colours become the theme's CSS variables, so it follows light and dark
 * without regenerating. No `color`/`background`: this is a section, not a
 * share card.
 */
const CELL = 10 // SVG units per character; also the cell width `scale` uses
const TRACK = -0.8
const FONT = (CELL - TRACK) / 0.6 // keeps advance + tracking at exactly CELL

const build = () =>
    bannerSvg('SARFARAZ', {
        font: 'block',
        shadow: 'double',
        effect: 'still',
        scale: CELL,
    })
        .replace('fill:#1f2328', 'fill:var(--foreground)')
        .replace('fill:#59636e', 'fill:var(--muted-4)')
        .replace(/\s+textLength="[^"]*"/g, '')
        .replace('font:16.67px', `font:${FONT.toFixed(3)}px`)
        .replace(
            'white-space:pre;',
            `white-space:pre;letter-spacing:${TRACK}px;`,
        )

const NameBanner = () => {
    const svg = useMemo(() => build(), [])
    const host = useRef<HTMLDivElement>(null)

    /*
     * The viewBox is sized for 79 cells of 10 units, but the drawn ink stops
     * short of it: the rows are indented with spaces, a space has no glyph in
     * `ascii.rest mono`, and the fallback space advances less than a cell. The
     * letters therefore sit left of centre with dead space on the right.
     *
     * Shifting the group by half the leftover width centres the ink without
     * changing the box, so the banner keeps the size it already had. Measured
     * after the font loads, since its metrics are what make the ink short.
     */
    useEffect(() => {
        let live = true
        const centre = () => {
            const el = host.current?.querySelector<SVGGElement>('svg > g')
            const viewBox = el?.ownerSVGElement?.viewBox.baseVal
            if (!live || !el || !viewBox) return
            const ink = el.getBBox()
            const x = (viewBox.width - ink.width) / 2 - ink.x
            el.setAttribute('transform', `translate(${x.toFixed(2)},0)`)

            /*
             * Centring leaves the letters `slack` of empty box either side,
             * on top of the section's own horizontal padding, while their
             * rows already touch the top and bottom of the box. Matching the
             * vertical padding to that total is what makes the margin round
             * the name even on all four sides.
             */
            const section = host.current?.parentElement
            const box = el.ownerSVGElement?.getBoundingClientRect()
            const set = el.getBoundingClientRect()
            if (section && box) {
                const side =
                    parseFloat(getComputedStyle(section).paddingLeft) +
                    (box.width - set.width) / 2
                // The ink does not begin exactly at the box edge, so measure
                // the gap it actually leaves and take that off each side. Both
                // offsets come from the SVG box, which does not move with the
                // padding being set (the section's rect does).
                section.style.paddingTop = `${(side - (set.top - box.top)).toFixed(1)}px`
                section.style.paddingBottom = `${(side - (box.bottom - set.bottom)).toFixed(1)}px`
            }
        }
        centre()
        document.fonts?.ready.then(centre)
        return () => {
            live = false
        }
    }, [svg])

    return (
        <section id="name" className="hl px-4 sm:px-6.5">
            <motion.div
                ref={host}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto block w-full [&>svg]:h-auto [&>svg]:w-full"
                dangerouslySetInnerHTML={{ __html: svg }}
            />
        </section>
    )
}

export default NameBanner
