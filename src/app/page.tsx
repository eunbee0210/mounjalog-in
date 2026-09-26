'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Story {
  id: number
  dso: string
  name: string
  patientStory: string
  mrThoughts: string
}

export default function Home() {
  const [stories, setStories] = useState<Story[]>([])

  useEffect(() => {
    fetch('/stories.json')
      .then(r => r.json())
      .then(setStories)
      .catch(console.error)
  }, [])

  const totalStories = stories.length
  const uniqueDSOs = new Set(stories.map(s => s.dso)).size

  return (
    <main className="min-h-screen bg-white">
      <header className="lilly-header text-white py-4 px-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-purple-700">人</div>
            <h1 className="text-2xl font-bold">마운자로그인</h1>
          </div>
          <Link href="/stories" className="hover:text-purple-200">이야기 보기</Link>
        </div>
      </header>

      <section className="lilly-header text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">{totalStories}개의 이야기<span className="block text-purple-200">하나의 릴리</span></h2>
          <Link href="/stories"><button className="btn-primary">이야기 탐색하기</button></Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-700">{totalStories}</div>
            <p className="text-gray-600">환자 이야기</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-700">{uniqueDSOs}</div>
            <p className="text-gray-600">CMH 팀</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-700">∞</div>
            <p className="text-gray-600">임팩트</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center">최신 이야기</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.slice(0, 3).map((story) => (
              <Link key={story.id} href={`/stories/${story.id}`}>
                <div className="card p-6 h-full cursor-pointer">
                  <p className="text-sm font-semibold text-purple-700 mb-1">{story.dso}</p>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">{story.name}</h4>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {story.patientStory.substring(0, 150)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="text-center">
          <p className="font-semibold">마운자로그인</p>
        </div>
      </footer>
    </main>
  )
}
