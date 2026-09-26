import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '마운자로그인 | 마운자로 환자 이야기',
  description: 'Eli Lilly Korea CMH 팀의 마운자로 환자 이야기 플랫폼',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  )
}
