import { useEffect } from 'react'

/**
 * Per-route head tags. The app is a client-rendered SPA, so these are applied
 * after hydration; index.html carries the home page defaults for crawlers that
 * fetch without executing script. No react-helmet: four tags does not warrant
 * a dependency.
 */
export function useSeo({
    title,
    description,
    path,
}: {
    title: string
    description: string
    path: string
}) {
    useEffect(() => {
        const url = `https://sarfaraz.fyi${path}`
        document.title = title

        const set = (selector: string, attr: string, value: string) => {
            let el = document.head.querySelector<
                HTMLMetaElement | HTMLLinkElement
            >(selector)
            if (!el) {
                const tag = selector.startsWith('link') ? 'link' : 'meta'
                el = document.createElement(tag) as HTMLMetaElement
                const [, key, val] = selector.match(/\[(\w+)="([^"]+)"\]/) ?? []
                if (key) el.setAttribute(key, val)
                document.head.appendChild(el)
            }
            el.setAttribute(attr, value)
        }

        set('meta[name="description"]', 'content', description)
        set('link[rel="canonical"]', 'href', url)
        set('meta[property="og:url"]', 'content', url)
        set('meta[property="og:title"]', 'content', title)
        set('meta[property="og:description"]', 'content', description)
        set('meta[name="twitter:title"]', 'content', title)
        set('meta[name="twitter:description"]', 'content', description)
    }, [title, description, path])
}
