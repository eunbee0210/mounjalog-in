'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'

interface Story {
  id: number
  dso: string
  name: string
  patientStory: string
  mrThoughts: string
}

export default function StoriesPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [search, setSearch] = useState('')
  const [dso, setDso] = useState('all')

  useEffect(() => {
    fetch('/stories.json')
      .then(r => r.json())
      .then(setStories)
      .catch(console.error)
  }, [])

  const dsos = useMemo(() => Array.from(new Set(stories.map(s => s.dso))), [stories])

  const filtered = useMemo(() => {
    return stories.filter(s => {
      const matchDso = dso === 'all' || s.dso === dso
      const matchSearch = !search || s.name.includes(search) || s.patientStory.includes(search)
      return matchDso && matchSearch
    })
  }, [stories, search, dso])

  return (
    <main className="min-h-screen bg-white">
      <header className="lilly-header text-white py-4 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-purple-700 font-bold">人</div>
            <h1 className="text-2xl font-bold">마운자로그인</h1>
          </Link>
        </div>
      </header>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">이야기 보기</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <input
              type="text"
              placeholder="검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-6"
            />

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDso('all')}
                className={`px-4 py-2 rounded-lg font-medium ${dso === 'all' ? 'bg-purple-700 text-white' : 'bg-gray-100'}`}
              >
                전체
              </button>
              {dsos.map((d) => (
                <button
                  key={d}
                  onClick={() => setDso(d)}
                  className={`px-4 py-2 rounded-lg font-medium ${dso === d ? 'bg-purple-700 text-white' : 'bg-gray-100'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map((story) => (
              <Link key={story.id} href={`/stories/${story.id}`}>
                <div className="card p-6 cursor-pointer h-full">
                  <p className="text-sm font-semibold text-purple-700 mb-1">{story.dso}</p>
                  <h3 className="text-lg font-bold mb-3">{story.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-4">{story.patientStory}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
