'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Story {
  id: number
  dso: string
  name: string
  patientStory: string
  mrThoughts: string
}

export default function StoryPage() {
  const params = useParams()
  const id = parseInt(params.id as string)
  const [stories, setStories] = useState<Story[]>([])
  const [story, setStory] = useState<Story | null>(null)

  useEffect(() => {
    fetch('/stories.json')
      .then(r => r.json())
      .then(data => {
        setStories(data)
        setStory(data.find((s: Story) => s.id === id))
      })
      .catch(console.error)
  }, [id])

  if (!story) {
    return (
      <main className="min-h-screen bg-white">
        <header className="lilly-header text-white py-4 px-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-700 font-bold">人</div>
            <h1 className="text-2xl font-bold">마운자로그인</h1>
          </Link>
        </header>
        <div className="max-w-4xl mx-auto py-20 text-center">
          <p className="text-lg text-gray-600">로딩 중...</p>
        </div>
      </main>
    )
  }

  const idx = stories.findIndex(s => s.id === id)
  const prev = idx > 0 ? stories[idx - 1] : null
  const next = idx < stories.length - 1 ? stories[idx + 1] : null

  return (
    <main className="min-h-screen bg-white">
      <header className="lilly-header text-white py-4 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-700 font-bold">人</div>
            <h1 className="text-2xl font-bold">마운자로그인</h1>
          </Link>
          <Link href="/stories" className="text-purple-200">목록</Link>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-8">
          <p className="text-sm font-semibold text-purple-700 mb-2">{story.dso}</p>
          <h1 className="text-4xl font-bold mb-4">{story.name}</h1>
        </div>

        <div className="border-t-2 border-purple-200 my-8" />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">환자 이야기</h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {story.patientStory}
          </div>
        </section>

        {story.mrThoughts && (
          <section className="mb-12 bg-purple-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">MR의 느낀점</h2>
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {story.mrThoughts}
            </div>
          </section>
        )}

        <div className="border-t-2 border-purple-200 pt-8 flex justify-between">
          {prev ? (
            <Link href={`/stories/${prev.id}`}>
              <button className="text-purple-700 font-semibold">← 이전</button>
            </Link>
          ) : <div />}

          <Link href="/stories">
            <button className="btn-secondary">목록</button>
          </Link>

          {next ? (
            <Link href={`/stories/${next.id}`}>
              <button className="text-purple-700 font-semibold">다음 →</button>
            </Link>
          ) : <div />}
        </div>
      </article>
    </main>
  )
}
