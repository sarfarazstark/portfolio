import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'
import Dock from '@/components/dock/Dock'
import HomePage from '@/pages/HomePage'
import ProjectsPage from '@/pages/ProjectsPage'
import Redirect from '@/components/ui/Redirect'

function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
                <Routes location={location}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route
                        path="/frontendmentor"
                        element={<Redirect url="https://sarfaraz-fm.netlify.app" />}
                    />
                </Routes>
            </motion.div>
        </AnimatePresence>
    )
}

function App() {
    const theme = useTheme((state) => state.theme)
    const { pathname } = useLocation()

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
    }, [theme])

    return (
        <div className="min-h-screen text-foreground selection:bg-primary/20">
            <AnimatedRoutes />
            {pathname === '/' && <Dock />}
        </div>
    )
}

function AppShell() {
    return (
        <Router>
            <ScrollToTop />
            <App />
        </Router>
    )
}

export default AppShell
