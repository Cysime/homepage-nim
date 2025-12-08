'use server'

import { XMLParser } from 'fast-xml-parser'
import { RSS_URL } from './data'





type FeedItem = {
  title: string
  link: string
  pubDate: string
}

export async function getRSSFeed(): Promise<FeedItem[]> {
<<<<<<< HEAD
    const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
    })

    try {
        const response = await fetch(RSS_URL)
        const xmlData = await response.text()
        const feed = parser.parse(xmlData)

        const items = feed.rss?.channel?.item || feed.feed?.entry || []

        // Ensure items is an array
        const itemsArray = Array.isArray(items) ? items : [items]

        return itemsArray.slice(0, 5).map((item: any) => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate || item.published || '',
        }))
    } catch (error) {
        console.error('Error fetching RSS feed:', error)
        return []
    }
=======
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
>>>>>>> 6a4f6322e94ded9cbc3d61476e6eb5b63452bfee
}
