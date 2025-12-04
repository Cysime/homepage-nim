'use server'

import Parser from 'rss-parser'
import { RSS_URL } from './data'

type FeedItem = {
    title: string
    link: string
    pubDate: string
}

export async function getRSSFeed(): Promise<FeedItem[]> {
    const parser = new Parser()
    try {
        const feed = await parser.parseURL(RSS_URL)
        return feed.items.slice(0, 5).map((item) => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate || '',
        }))
    } catch (error) {
        console.error('Error fetching RSS feed:', error)
        return []
    }
}
