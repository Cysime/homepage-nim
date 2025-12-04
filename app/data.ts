type Project = {
  name: string
  description: string
  link: string
  image: string
  id: string
}

type SocialLink = {
  label: string
  link: string
}

export const PROJECTS: Project[] = [
  {
    name: '摄影集',
    description:
      '真材实料拍出来的摄影相册',
    link: 'https://gallery.furry.pt/',
    image: '/gallery.jpg',
    id: 'project1',
  },
  {
    name: '画稿册',
    description: 'OC的约稿或是赠图',
    link: 'https://blog.cysi.me/gallery/',
    image: '/yukiakari-page.jpg',
    id: 'project2',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Blog',
    link: 'https://blog.cysi.me',
  },
  {
    label: 'Telegram',
    link: 'https://t.me/Cysime',
  },
  {
    label: 'Weibo',
    link: 'https://weibo.com/541647229',
  },
  {
    label: 'X',
    link: 'https://x.com/Cysime',
  },
]

export const EMAIL = 'i@cysi.me'

export const RSS_URL = 'https://blog.cysi.me/index.xml'
