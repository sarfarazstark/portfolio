import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Connect from '@/components/sections/Connect'
import Activity from '@/components/sections/Activity'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects/ProjectGrid'
import Footer from '@/components/sections/Footer'
import { useSeo } from '@/hooks/useSeo'
import type { Activity as ActivityData, PortfolioData } from '@/types/portfolio'
import portfolioData from '@/data/portfolio.json'
import activityData from '@/data/activity.json'

const data = portfolioData as PortfolioData
const activity = activityData as ActivityData

export default function HomePage() {
    useSeo({
        title: 'Sarfaraz — Full Stack Developer in Kolkata, India',
        description:
            'Sarfaraz is a full stack developer in Kolkata building fast, modern web apps with Next.js, React and Laravel. See his projects, experience and open source work.',
        path: '/',
    })

    return (
        <main className="relative z-10 mx-auto max-w-215 px-3 pt-7 pb-32">
            <div className="sheet-frame bg-background">
                {/* Decorative band above the hero: no text of its own, so it
                    reads as a scene change rather than a block. Sized to the
                    hero's own height at each breakpoint (856:132, 366:211).
                    The video is opaque, so the sheet-frame's ring cannot show
                    through it and is redrawn here, as the contact band does. */}
                <section
                    id="train"
                    aria-hidden="true"
                    className="relative isolate aspect-[366/211] overflow-hidden sm:aspect-[836/132]"
                >
                    <video
                        src="/viaduct-steam-train.mp4"
                        poster="/viaduct-steam-train-poster.webp"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        className="size-full object-cover object-center"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]"
                    />
                </section>
                <section id="home">
                    <Hero profile={data.profile} />
                </section>
                <About about={data.about} />
                <Connect
                    socials={data.footer.socials}
                    resume={data.profile.resume}
                />
                <Experience experiences={data.experience} />
                <Projects projects={data.projects} />
                <Skills skills={data.skills} />
                <Education education={data.education} />
                <Activity activity={activity} />
                <Footer footer={data.footer} />
            </div>
        </main>
    )
}
