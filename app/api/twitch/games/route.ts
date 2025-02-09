import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://api.twitch.tv/helix/games/top?first=10", {
    headers: {
      "Client-ID": process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!,
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TWITCH_ACCESS_TOKEN!}`,
    },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
