'use client'
import { TextEffect } from '@/components/ui/text-effect'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <Link
          href="/"
          className="text-2xl font-bold text-black dark:text-white"
        >
          Cysime Moflu
        </Link>
        <TextEffect
          as="p"
          preset="fade"
          per="char"
          className="text-lg text-zinc-600 dark:text-zinc-500"
          delay={0.5}
        >
          aka. Yukiakari
        </TextEffect>
      </div>
      <img src="/avatar.png" alt="Avatar" className="h-12 w-12 rounded-full" />
    </header>
  )
}
