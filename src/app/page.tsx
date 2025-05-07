'use client'

import { useState } from 'react'

export default function Home() {
  const [url, setUrl] = useState('')
  const [transcript, setTranscript] = useState<string[] | null>(null)
  const [loading, setLoading] = useState(false)

  const extractVideoId = (youtubeUrl: string) => {
    const match = youtubeUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  }

  const fetchTranscript = async () => {
    const id = extractVideoId(url)
    if (!id) {
      alert('Invalid link')
      return
    }
    setLoading(true)
    const res = await fetch(`/api/transcript?videoId=${id}`)
    const data = await res.json()
    setTranscript(data.transcript || ['Translation not found.'])
    setLoading(false)
  }

  const copyTranscript = () => {
    if (!transcript) return
    const text = transcript.join('\n')
    navigator.clipboard.writeText(text)
    alert('Translation copied.✅')
  }
  
return (

   <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded-3xl shadow-xl border border-white">
     <h1 className="text-3xl font-extrabold text-center text-purple-400 mb-6"> 📺 YouTube Transcript Extractor</h1>
      <input
        type="text"
        placeholder="Paste YouTube video link here"
        className="w-full p-3 text-lg rounded-xl border-2 border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-200 mb-6 transition-all duration-300"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
    
    <div className="flex gap-4 mt-4 justify-center">
      <button
        onClick={fetchTranscript}
        className="bg-gradient-to-r from-pink-400 to-blue-400  hover:from-pink-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2">
        {loading ? '  Loading...⏳' : '🎬 View Transcript'}
      </button>

      <button
        onClick={copyTranscript}
        className="bg-purple-400 hover:bg-purple-500 text-white px-6 py-3 rounded-xl text-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
      >
        📋 Copy Transcript
      </button>
    </div>


      {transcript && (
        <div className="mt-8 bg-purple-50 p-6 rounded-xl shadow-inner border border-purple-200 space-y-3 max-h-[400px] overflow-y-auto">
          {transcript.map((line, index) => (
            <p key={index} className="text-gray-700 text-lg leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
     )

  
}
