import { useEffect } from 'react'
import portfolioData from '@/data/portfolio.json'
import type { PortfolioData } from '@/types/portfolio'
import { useTheme } from '@/hooks/useTheme'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Education from '@/components/sections/Education'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects/ProjectGrid'
import Footer from '@/components/sections/Footer'
import Dock from '@/components/dock/Dock'

const data = portfolioData as PortfolioData

function App() {
    const theme = useTheme((state) => state.theme)

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative overflow-x-hidden">
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
						linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
						linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)
					`,
                    backgroundSize: '20px 20px',
                    WebkitMaskImage:
                        'linear-gradient(to bottom, #000 0%, transparent 300px)',
                    maskImage:
                        'linear-gradient(to bottom, #000 0%, transparent 300px)',
                }}
            />

            <main className="relative z-10 max-w-xl lg:max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-24 space-y-16 sm:space-y-20 lg:space-y-24">
                <Hero profile={data.profile} />
                <About content={data.about} />
                <Experience experiences={data.experience} />
                <Education education={data.education} />
                <Skills skills={data.skills} />
                <Projects projects={data.projects} />
                <Footer footer={data.footer} />
            </main>
            <Dock />
        </div>
    )
}

export default App
