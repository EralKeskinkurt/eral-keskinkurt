import { NextResponse } from "next/server";
import { getAverageImageColor } from "@/lib/image-color";
import { getNowPlaying, getRecentlyPlayed } from "@/lib/spotify";

type Artist = { name: string };
type TrackItem = {
  name?: string;
  explicit?: boolean;
  duration_ms?: number;
  artists?: Artist[];
  album?: {
    name?: string;
    images?: Array<{ url?: string }>;
  };
  external_urls?: { spotify?: string };
};

export async function GET() {
  try {
    const data = (await getNowPlaying()) as {
      is_playing?: boolean;
      progress_ms?: number;
      item?: TrackItem;
      device?: { name?: string; type?: string };
    } | null;

    if (data?.item) {
      const albumImage = data.item.album?.images?.[0]?.url ?? null;
      const accentColor = await getAverageImageColor(albumImage);

      return NextResponse.json({
        isPlaying: data.is_playing,
        isRecent: false,
        song: data.item.name,
        artist: data.item.artists?.map((a: Artist) => a.name).join(", "),
        album: data.item.album?.name ?? null,
        albumImage,
        accentColor,
        songUrl: data.item.external_urls?.spotify ?? null,
        explicit: data.item.explicit ?? false,
        deviceName: data.device?.name ?? null,
        deviceType: data.device?.type ?? null,
        progressMs: data.progress_ms ?? null,
        durationMs: data.item.duration_ms ?? null,
        playedAt: null,
      });
    }

    const recent = await getRecentlyPlayed();
    const recentItem = recent.items?.[0];

    if (!recentItem?.track) {
      return NextResponse.json({ isPlaying: false, isRecent: false });
    }

    const albumImage = recentItem.track.album?.images?.[0]?.url ?? null;
    const accentColor = await getAverageImageColor(albumImage);

    return NextResponse.json({
      isPlaying: false,
      isRecent: true,
      song: recentItem.track.name,
      artist: recentItem.track.artists?.map((a: Artist) => a.name).join(", "),
      album: recentItem.track.album?.name ?? null,
      albumImage,
      accentColor,
      songUrl: recentItem.track.external_urls?.spotify ?? null,
      explicit: recentItem.track.explicit ?? false,
      deviceName: null,
      deviceType: null,
      progressMs: null,
      durationMs: recentItem.track.duration_ms ?? null,
      playedAt: recentItem.played_at ?? null,
    });
  } catch {
    return NextResponse.json(
      { isPlaying: false, isRecent: false },
      { status: 200 },
    );
  }
}
