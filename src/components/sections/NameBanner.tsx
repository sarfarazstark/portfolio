import { motion } from 'framer-motion'
import { Banner } from 'ascii.rest/react'

/**
 * The name in block letters, its own section between the CTA and the credit.
 * This font advances 0.6em and its block glyph inks 1.4em tall, so 15px/21px
 * makes every cell a whole pixel; fractional sizes smear hairlines between rows.
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
                    fontSize: '15px',
                    lineHeight: '21px',
                }}
            />
        </motion.div>
    </section>
)

export default NameBanner
