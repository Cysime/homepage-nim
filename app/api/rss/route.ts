import { NextResponse } from 'next/server'
import { XMLParser } from 'fast-xml-parser'
import { RSS_URL } from '../../data'

export const runtime = 'edge'

export async function GET() {
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
    })

    try {
        const response = await fetch(RSS_URL)
        const xmlData = await response.text()
        const feed = parser.parse(xmlData)

        const items = feed.rss?.channel?.item || feed.feed?.entry || []

        // Ensure items is an array
        const itemsArray = Array.isArray(items) ? items : [items]

        const parsedItems = itemsArray.slice(0, 5).map((item: any) => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate || item.published || '',
        }))

        return NextResponse.json(parsedItems)
    } catch (error) {
        console.error('Error fetching RSS feed:', error)
        return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 })
    }
}
