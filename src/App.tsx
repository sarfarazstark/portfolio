import { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
} from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import Dock from '@/components/dock/Dock'
import HomePage from '@/pages/HomePage'
import ProjectsPage from '@/pages/ProjectsPage'
import Redirect from '@/components/ui/Redirect'

// Scroll to top on route change
function ScrollToTop() {
    const { pathname } = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])
    return null
}

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
        <Router>
            <ScrollToTop />
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

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route
                        path="/frontendmentor"
                        element={
                            <Redirect url="https://sarfaraz-fm.netlify.app" />
                        }
                    />
                </Routes>

                <Dock />
            </div>
        </Router>
    )
}

export default App
