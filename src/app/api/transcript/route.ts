import { NextRequest, NextResponse } from 'next/server'
import { YoutubeTranscript } from 'youtube-transcript'

interface TranscriptItem {
  text: string;
  duration: number;
  offset: number;
}

export async function GET(req: NextRequest) {
  const videoId = req.nextUrl.searchParams.get('videoId')

  if (!videoId) {
    return NextResponse.json({ error: 'Missing video ID' }, { status: 400 })
  }

  try {
    const result = await YoutubeTranscript.fetchTranscript(videoId)
    const transcriptLines = result.map((item: TranscriptItem) => item.text)
    return NextResponse.json({ transcript: transcriptLines })
  } catch {
    return NextResponse.json({ error: 'Failed to extract transcript' }, { status: 500 })
  }
}
