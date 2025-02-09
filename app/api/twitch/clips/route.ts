import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameId = searchParams.get("game_id");

  if (!gameId) {
    return NextResponse.json({ error: "Missing game_id" }, { status: 400 });
  }

  const res = await fetch(`https://api.twitch.tv/helix/clips?game_id=${gameId}&first=5`, {
    headers: {
      "Client-ID": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN!}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch clips" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}