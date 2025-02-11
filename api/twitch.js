export default async function handler(req, res) {
    const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
    const ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN;
  
    // Twitch APIにリクエストを送る
    try {
      const response = await fetch("https://api.twitch.tv/helix/streams?first=20", {
        headers: {
          "Client-ID": CLIENT_ID,
          "Authorization": `Bearer ${ACCESS_TOKEN}`,
        },
      });
  
      if (!response.ok) {
        return res.status(500).json({ error: "Failed to fetch streams" });
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data from Twitch API:", error);
      res.status(500).json({ error: "Error fetching data from Twitch API" });
    }
  }