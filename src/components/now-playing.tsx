"use client";

import {
  CircleAlert,
  ExternalLink,
  Monitor,
  Music2,
  Speaker,
  Smartphone,
  WifiOff,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { nowPlayingFetcher } from "@/lib/now-playing";

function formatMs(value: number) {
  const totalSec = Math.floor(value / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

function formatRelativeTime(value: string) {
  const target = new Date(value).getTime();
  const now = Date.now();
  const diffMinutes = Math.round((target - now) / (1000 * 60));

  const rtf = new Intl.RelativeTimeFormat("tr", { numeric: "auto" });
  const absMinutes = Math.abs(diffMinutes);

  if (absMinutes < 60) return rtf.format(diffMinutes, "minute");

  const diffHours = Math.round(diffMinutes / 60);
  const absHours = Math.abs(diffHours);

  if (absHours < 24) return rtf.format(diffHours, "hour");

  const diffDays = Math.round(diffHours / 24);
  return rtf.format(diffDays, "day");
}

function DeviceTypeIcon({ type }: { type?: string | null }) {
  const normalized = type?.toLowerCase() ?? "";

  if (normalized.includes("phone") || normalized.includes("smartphone")) {
    return <Smartphone size={14} aria-hidden="true" />;
  }

  if (normalized.includes("speaker") || normalized.includes("cast")) {
    return <Speaker size={14} aria-hidden="true" />;
  }

  return <Monitor size={14} aria-hidden="true" />;
}

function LoadingCard() {
  return (
    <>
      {/* mobile skeleton */}
      <div className="sm:hidden flex items-center gap-2 rounded-full border border-border/70 bg-background/85 px-3 py-1.5 shadow-lg backdrop-blur-sm max-w-[180px]">
        <div className="h-4 w-4 animate-pulse rounded-full bg-foreground/15" />
        <div className="h-2 w-20 animate-pulse rounded bg-foreground/15" />
      </div>

      {/* desktop skeleton */}
      <div className="hidden sm:block w-60 rounded-xl border border-border/70 bg-background/85 p-2 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 animate-pulse rounded-md bg-foreground/10" />
          <div className="flex-1 space-y-2">
            <div className="h-2 w-20 animate-pulse rounded bg-foreground/10" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-foreground/10" />
          </div>
        </div>
        <div className="mt-2 h-1.5 w-full animate-pulse rounded-full bg-foreground/10" />
      </div>
    </>
  );
}

function FloatingWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="opacity-90 hover:opacity-100 transition-opacity">
      {children}
    </div>
  );
}

export default function NowPlaying() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const syncOnline = () => setIsOnline(window.navigator.onLine);
    syncOnline();

    window.addEventListener("online", syncOnline);
    window.addEventListener("offline", syncOnline);

    return () => {
      window.removeEventListener("online", syncOnline);
      window.removeEventListener("offline", syncOnline);
    };
  }, []);

  const { data, error, isLoading } = useSWR(
    "/api/now-playing",
    nowPlayingFetcher,
    {
      refreshInterval: (latestData) => (latestData?.isPlaying ? 5000 : 15000),
      refreshWhenHidden: false,
      refreshWhenOffline: false,
      keepPreviousData: true,
    },
  );

  const progressPercent = useMemo(() => {
    if (!data?.isPlaying || !data.durationMs || data.progressMs == null)
      return 0;
    return Math.min(
      100,
      Math.max(0, (data.progressMs / data.durationMs) * 100),
    );
  }, [data]);

  if (isLoading && !data)
    return (
      <FloatingWrap>
        <LoadingCard />
      </FloatingWrap>
    );

  if (!isOnline && !data) {
    return (
      <FloatingWrap>
        <div className="w-60 rounded-xl border border-border/70 bg-background/85 p-2.5 shadow-lg backdrop-blur-sm">
          <p className="flex items-center gap-2 text-xs text-muted">
            <WifiOff size={14} />
            Internet yok.
          </p>
        </div>
      </FloatingWrap>
    );
  }

  if (error && !data) {
    return (
      <FloatingWrap>
        <div className="w-60 rounded-xl border border-border/70 bg-background/85 p-2.5 shadow-lg backdrop-blur-sm">
          <p className="flex items-center gap-2 text-xs text-muted">
            <CircleAlert size={14} />
            Spotify alinamadi.
          </p>
        </div>
      </FloatingWrap>
    );
  }

  if (!data?.song) {
    return (
      <FloatingWrap>
        <div className="w-60 rounded-xl border border-border/70 bg-background/85 p-2.5 shadow-lg backdrop-blur-sm">
          <p className="text-xs text-muted">Su an muzik calmiyor.</p>
        </div>
      </FloatingWrap>
    );
  }

  const playedAgo = data.playedAt ? formatRelativeTime(data.playedAt) : null;

  const accent = data.accentColor ?? "var(--color-accent)";
  return (
    <FloatingWrap>
      <div className="sm:hidden flex items-center gap-1.5 rounded-full border border-border/70 bg-background/85 px-3 py-1.5 text-xs shadow-lg backdrop-blur-sm max-w-[200px]">
        <Music2 size={12} className="shrink-0" />
        <span className="truncate">{data.song}</span>
      </div>
      <div className="hidden sm:block">
        <article
          aria-live="polite"
          style={{
            ["--np-accent" as string]: accent,
            boxShadow: `0 0 20px ${accent}20`,
          }}
          className="group relative hidden sm:block w-60 overflow-hidden rounded-xl border border-border/70 bg-background/85 p-2.5 shadow-lg backdrop-blur-sm"
        >
          <div
            className="pointer-events-none absolute -right-14 -top-14 h-24 w-24 rounded-full blur-3xl"
            style={{
              backgroundColor: `color-mix(in oklch, ${accent} 100%, transparent)`,
            }}
          />

          <div className="relative flex items-center gap-2">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border/60">
              {data.albumImage ? (
                <Image
                  src={data.albumImage}
                  alt={`${data.song} album cover`}
                  fill
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-foreground/5">
                  <Music2 size={16} className="text-muted" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-1 text-[6px] uppercase tracking-[0.08em] text-muted">
                {data.explicit ? (
                  <span className="rounded-full border border-border/60 px-1 py-0.5">
                    Explicit
                  </span>
                ) : null}
                {data.isPlaying && data.deviceType ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-border/60 px-1 py-0.5">
                    <DeviceTypeIcon type={data.deviceType} />
                    {data.deviceName ?? "Device"}
                  </span>
                ) : null}
              </div>

              <h2 className="truncate text-xs font-semibold">
                {data.songUrl ? (
                  <a
                    href={data.songUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex max-w-full items-center gap-1 truncate underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <span className="truncate">{data.song}</span>
                    <ExternalLink size={10} className="shrink-0" />
                  </a>
                ) : (
                  data.song
                )}
              </h2>

              <p className="truncate text-[11px] text-muted">{data.artist}</p>
            </div>
          </div>

          {data.isPlaying && data.durationMs && data.progressMs != null ? (
            <div className="relative mt-2">
              <div className="mb-1 flex items-center gap-1.5 text-[10px] text-muted">
                <div className="eq-bars" aria-hidden="true">
                  <span className="eq-bar" />
                  <span className="eq-bar" />
                  <span className="eq-bar" />
                </div>
                <span>Caliyor</span>
              </div>

              <div className="h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPercent}%`,
                    backgroundColor: accent,
                  }}
                />
              </div>

              <div className="mt-1 flex items-center justify-between text-[10px] text-muted">
                <span>{formatMs(data.progressMs)}</span>
                <span>{formatMs(data.durationMs)}</span>
              </div>
            </div>
          ) : (
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
              <span>
                {playedAgo ? `${playedAgo} dinlendi` : "Son dinlenen parca"}
              </span>
              {data.durationMs ? (
                <span>{formatMs(data.durationMs)}</span>
              ) : null}
            </div>
          )}
        </article>
      </div>
    </FloatingWrap>
  );
}
