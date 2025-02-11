"use client"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

function TwitchStreams() {
  const [streams, setStreams] = useState([])
  const [japaneseStreams, setJapaneseStreams] = useState([])
  const [loading, setLoading] = useState(true)

  const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN
  const PARENT = process.env.NEXT_PUBLIC_TWITCH_PARENT || "localhost"

  useEffect(() => {
    async function fetchStreams() {
      try {
        const res = await fetch("https://api.twitch.tv/helix/streams?first=20", {
          headers: {
            "Client-ID": CLIENT_ID,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        })

        if (!res.ok) throw new Error("Failed to fetch streams")

        const data = await res.json()
        const streamsData = data.data || []

        // Fetch clips for each stream
        const streamsWithClips = await Promise.all(
          streamsData.map(async (stream) => {
            const clipRes = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${stream.user_id}&first=1`, {
              headers: {
                "Client-ID": CLIENT_ID,
                Authorization: `Bearer ${ACCESS_TOKEN}`,
              },
            })

            if (clipRes.ok) {
              const clipData = await clipRes.json()
              return { ...stream, clip: clipData.data[0] }
            }

            return stream
          }),
        )

        // Separate Japanese streams from others and sort by viewer count
        const japaneseStreamers = streamsWithClips.filter((stream) => stream.language === "ja")
        const otherStreamers = streamsWithClips.filter((stream) => stream.language !== "ja")
        japaneseStreamers.sort((a, b) => b.viewer_count - a.viewer_count)

        setStreams(otherStreamers)
        setJapaneseStreams(japaneseStreamers)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching streams:", error)
        setLoading(false)
      }
    }

    fetchStreams()
  }, [CLIENT_ID, ACCESS_TOKEN])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Top Twitch Streams</h1>

      <StreamSection title="Top Japanese Streams" streams={japaneseStreams} parent={PARENT} />
      <StreamSection title="English and Other Streams" streams={streams} parent={PARENT} />
    </div>
  )
}

function StreamSection({ title, streams, parent }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {streams.length === 0 ? (
        <p className="text-gray-500">No streams available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {streams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} parent={parent} />
          ))}
        </div>
      )}
    </section>
  )
}

function StreamCard({ stream }) {
  console.log("Clip data:", stream.clip); 
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <a
        href={`https://www.twitch.tv/${stream.user_login}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <img
          src={stream.thumbnail_url.replace("{width}x{height}", "320x180")}
          alt={stream.title}
          className="w-full h-auto"
        />
      </a>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-[#9146FF]">{stream.user_name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{stream.title}</p>
        <p className="text-sm text-gray-500 mb-4">
          {stream.game_name} • {stream.viewer_count.toLocaleString()} viewers
        </p>
        {stream.clip && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-[#9146FF]">Latest Clip</h4>
            <div className="relative pt-[56.25%]">
              <iframe
                src={`https://clips.twitch.tv/embed?clip=${stream.clip.id}&parent=localhost`}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TwitchStreams

