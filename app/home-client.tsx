'use client'
import { motion } from 'motion/react'
import { Spotlight } from '@/components/ui/spotlight'
import { Magnetic } from '@/components/ui/magnetic'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/ui/animated-background'
import { PROJECTS, EMAIL, SOCIAL_LINKS } from './data'
import { useEffect, useState, useRef } from 'react'

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

const TRANSITION_SECTION = {
  duration: 0.3,
}

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3"
    >
      <path
        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

function MagneticSocialLink({
  children,
  link,
}: {
  children: React.ReactNode
  link: string
}) {
  return (
    <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
      <a
        href={link}
        className="group relative inline-flex shrink-0 items-center gap-[1px] rounded-full bg-zinc-100 px-2.5 py-1 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
      >
        {children}
        <ArrowIcon />
      </a>
    </Magnetic>
  )
}

function FeedItem({
  item,
}: {
  item: { title: string; link: string; pubDate: string }
}) {
  const date = new Date(item.pubDate)
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full items-center justify-between rounded-xl p-2 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
    >
      <div className="flex w-full items-center gap-3 overflow-hidden">
        <span className="shrink-0 font-mono text-sm whitespace-nowrap text-zinc-500 dark:text-zinc-400">
          {formattedDate}
        </span>
        <span className="truncate text-zinc-900 decoration-zinc-400 underline-offset-4 group-hover:underline dark:text-zinc-100">
          {item.title}
        </span>
      </div>
    </a>
  )
}

function Feed() {
  const [feed, setFeed] = useState<
    { title: string; link: string; pubDate: string }[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeed() {
      try {
        const response = await fetch('/api/rss')
        const data = await response.json()
        setFeed(data)
      } catch (error) {
        console.error('Error fetching feed:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeed()
  }, [])

  if (loading) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        正在获取文章列表...
      </p>
    )
  }

  if (feed.length === 0) return null

  return (
    <div className="flex flex-col space-y-1">
      {feed.map((item) => (
        <FeedItem key={item.link} item={item} />
      ))}
    </div>
  )
}

export default function Personal() {
  return (
    <motion.main
      className="space-y-16"
      variants={VARIANTS_CONTAINER}
      initial="hidden"
      animate="visible"
    >
      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <div className="flex-1">
          <p className="text-zinc-600 dark:text-zinc-400">
            我是 <strong>Cysime</strong>，也可以叫我{' '}
            <strong>Yukiakari / 雪明</strong>{' '}
            ，是个喜欢Hi-fi和流行乐、摄影、摆弄电子产品、玩电子游戏以及出门瞎转悠的普通上班族。{' '}
            <br />
            曾经在非洲做土木工程，现在在广州从事医药行业的工作。 <br />
            你可以访问我的{' '}
            <a
              href="https://blog.cysi.me"
              target="_blank"
              className="inline-flex items-center gap-0.5 font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              📝博客
              <ArrowIcon />
            </a>{' '}
            以及{' '}
            <a
              href="https://gallery.furry.pt"
              target="_blank"
              className="inline-flex items-center gap-0.5 font-medium text-zinc-900 hover:underline dark:text-zinc-100"
            >
              📷摄影相册
              <ArrowIcon />
            </a>
            ，或是在下面的社交平台上找到我。
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">我的站点</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {PROJECTS.map((project) => (
            <div key={project.name} className="space-y-2">
              <div className="relative rounded-2xl bg-zinc-50/40 p-1 ring-1 ring-zinc-200/50 ring-inset dark:bg-zinc-950/40 dark:ring-zinc-800/50">
                <img
                  src={project.image}
                  alt={project.name}
                  className="aspect-video w-full rounded-xl object-cover"
                />
              </div>
              <div className="px-1">
                <a
                  className="font-base group relative inline-block font-[450] text-zinc-900 dark:text-zinc-50"
                  href={project.link}
                  target="_blank"
                >
                  {project.name}
                  <span className="absolute bottom-0.5 left-0 block h-[1px] w-full max-w-0 bg-zinc-900 transition-all duration-200 group-hover:max-w-full dark:bg-zinc-50"></span>
                </a>
                <p className="text-base text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">近期文章</h3>
        <div className="flex flex-col space-y-2">
          <Feed />
          <a
            href="https://blog.cysi.me"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 px-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            访问博客
            <ArrowIcon />
          </a>
        </div>
      </motion.section>

      <motion.section
        variants={VARIANTS_SECTION}
        transition={TRANSITION_SECTION}
      >
        <h3 className="mb-5 text-lg font-medium">取得联系</h3>
        <p className="mb-5 text-zinc-600 dark:text-zinc-400">
          欢迎使用电子邮件与我联系{' '}
          <a className="underline dark:text-zinc-300" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </p>
        <div className="flex items-center justify-start space-x-3">
          {SOCIAL_LINKS.map((link) => (
            <MagneticSocialLink key={link.label} link={link.link}>
              {link.label}
            </MagneticSocialLink>
          ))}
        </div>
      </motion.section>
    </motion.main>
  )
}
