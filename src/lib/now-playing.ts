"use client";

export type NowPlayingResponse = {
  isPlaying: boolean;
  isRecent?: boolean;
  song?: string;
  artist?: string;
  album?: string | null;
  albumImage?: string | null;
  accentColor?: string | null;
  songUrl?: string | null;
  explicit?: boolean;
  deviceName?: string | null;
  deviceType?: string | null;
  progressMs?: number | null;
  durationMs?: number | null;
  playedAt?: string | null;
};

export const nowPlayingFetcher = async (
  url: string,
): Promise<NowPlayingResponse> => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch now playing data");
  }

  return response.json();
};
