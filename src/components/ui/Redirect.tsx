import { useEffect } from 'react'

interface RedirectProps {
    url: string
    newTab?: boolean
}

export const Redirect = ({ url, newTab = false }: RedirectProps) => {
    useEffect(() => {
        if (!url || url === '#') return

        // Check if it's an email address
        if (
            url.includes('@') &&
            !url.startsWith('mailto:') &&
            !url.startsWith('http')
        ) {
            window.location.href = `mailto:${url}`
            return
        }

        if (newTab) {
            window.open(url, '_blank', 'noopener,noreferrer')
        } else {
            window.location.href = url
        }
    }, [url, newTab])

    return null
}

export default Redirect
