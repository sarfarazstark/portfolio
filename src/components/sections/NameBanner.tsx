import { motion } from 'framer-motion'
import { Banner } from 'ascii.rest/react'

/**
 * The name in block letters, its own section between the CTA and the credit.
 * "SARFARAZ" is 79 columns at 0.6em advance, so the size has to follow the
 * viewport or the row runs past the edge on phones: 1.8vw leaves a little
 * slack under 79 cells, and 15px covers every width from 833px. Whole-pixel cells
 * would avoid the hairline smear, but a fixed size cannot fit both.
 */
const NameBanner = () => (
    <section id="name" className="hl px-4 py-5 sm:px-6.5">
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
            <Banner
                text="SARFARAZ"
                font="block"
                shadow="double"
                effect="glint"
                className="mx-auto block w-full text-center"
                style={{
                    fontFamily: '"ascii.rest mono", ui-monospace, monospace',
                    fontSize: 'clamp(6px, 1.8vw, 15px)',
                    lineHeight: 1.4,
                }}
            />
        </motion.div>
    </section>
)

export default NameBanner
