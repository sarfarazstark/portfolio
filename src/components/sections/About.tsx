import { motion } from 'framer-motion'

const About = ({ content }: { content: string }) => {
    return (
        <section id="about" className="space-y-4">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-xl font-semibold tracking-tight"
            >
                About
            </motion.h2>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed"
            >
                {content}
            </motion.p>
        </section>
    )
}

export default About
