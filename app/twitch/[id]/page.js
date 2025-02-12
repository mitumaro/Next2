"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react"

export default function GameClips() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playingClip, setPlayingClip] = useState(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const res = await fetch("/api/twitch/games");
        if (!res.ok) throw new Error("Failed to fetch games");

        const data = await res.json();
        setGames(data.data || []);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  const handleGameSelect = async (gameId) => {
    setSelectedGame(gameId);
    setClips([]);

    try {
      const res = await fetch(`/api/twitch/clips?game_id=${gameId}`);
      if (!res.ok) throw new Error("Failed to fetch clips");

      const data = await res.json();
      setClips(data.data || []);
    } catch (error) {
      console.error("Error fetching clips:", error);
    }
  };

  const handlePlayClip = (clipId) => {
    setPlayingClip(clipId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1>Select a Game to View Top Clips</h1>
      {/* ゲーム選択ドロップダウン */}
      <select onChange={(e) => handleGameSelect(e.target.value)} defaultValue="">
        <option value="" disabled>Select a Game</option>
        {games.map((game) => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {/* ゲーム選択後のクリップ表示 */}
      {selectedGame && clips.length === 0 ? (
        <p>No clips available for this game</p>
      ) : (
        clips.map((clip) => (
          <div key={clip.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px" }}>
            <h3>{clip.title}</h3>
            <p><strong>Created by:</strong> {clip.broadcaster_name}</p>
            <p><strong>Viewers:</strong> {clip.view_count}</p>

            <button onClick={() => handlePlayClip(clip.id)}>Play Clip</button>

            {/* クリップが選ばれたときだけ埋め込む */}
            <div className="relative pt-[56.25%]">
              <iframe
                src={`https://clips.twitch.tv/embed?clip=${clip.id}&parent=localhost&autoplay=${playingClip === clip.id ? "true" : "false"}`}
                className="absolute top-0 left-0 w-full h-full"
                allowFullScreen
                title="Twitch Clip"
              ></iframe>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}