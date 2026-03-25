"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import useSWR from "swr";
import { nowPlayingFetcher } from "@/lib/now-playing";

type SpotifyAccentBackgroundProps = {
  className?: string;
};

export default function SpotifyAccentBackground({
  className = "",
}: SpotifyAccentBackgroundProps) {
  const [lastAccent, setLastAccent] = useState<string | null>(null);

  const { data } = useSWR("/api/now-playing", nowPlayingFetcher, {
    refreshInterval: (latestData) => (latestData?.isPlaying ? 5000 : 15000),
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    keepPreviousData: true,
    onSuccess: (data) => {
      if (data.song && data.accentColor) {
        setLastAccent((current) =>
          current === data.accentColor ? current : data.accentColor,
        );
      }
    },
  });

  const accent = data?.song && data.accentColor ? data.accentColor : lastAccent;

  return (
    <div
      aria-hidden="true"
      data-active={accent ? "true" : "false"}
      className={`spotify-accent-background pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
      style={
        accent
          ? ({ ["--spotify-accent" as string]: accent } as CSSProperties)
          : undefined
      }
    />
  );
}
