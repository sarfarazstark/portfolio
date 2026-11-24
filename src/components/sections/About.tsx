import { motion } from 'framer-motion'
import { SectionHeader } from '@/components/ui/sheet'

/**
 * Prose block above Connect: the long-form intro that data always had.
 * This paragraph is the mobile LCP element, so it rises without fading in:
 * an opacity animation defers LCP until it settles.
 */
const About = ({ about }: { about: string }) => (
    <section id="about">
        <SectionHeader>About</SectionHeader>
        <motion.div
            initial={{ y: 12 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="hl px-4 py-5 sm:px-6.5"
        >
            <p className="prose-body max-w-[68ch] text-sm text-muted-2">
                {about}
            </p>
        </motion.div>
    </section>
)

export default About
