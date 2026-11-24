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
