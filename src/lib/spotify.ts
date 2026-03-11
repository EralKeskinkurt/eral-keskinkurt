const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

function getBasicToken() {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
    throw new Error("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET");
  }

  return Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
    "base64",
  );
}

export async function getAccessToken() {
  if (!SPOTIFY_REFRESH_TOKEN) {
    throw new Error("Missing SPOTIFY_REFRESH_TOKEN");
  }

  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${getBasicToken()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Spotify token refresh failed");
  return res.json() as Promise<{ access_token: string }>;
}

export async function getNowPlaying() {
  const { access_token } = await getAccessToken();

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });

  if (res.status === 204) return null; // şu an çalmıyor
  if (!res.ok) throw new Error("Spotify now playing request failed");

  return res.json();
}

export async function getRecentlyPlayed() {
  const { access_token } = await getAccessToken();

  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${access_token}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Spotify recently played request failed");

  return res.json() as Promise<{
    items?: Array<{
      played_at: string;
      track: {
        name: string;
        explicit?: boolean;
        duration_ms?: number;
        artists?: Array<{ name: string }>;
        album?: { name?: string; images?: Array<{ url: string }> };
        external_urls?: { spotify?: string };
      };
    }>;
  }>;
}
