"use client";

import { useState, useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoId: string;
  title: string;
}

// Type definitions for the YouTube Iframe Player API
interface YTPlayerEvent {
  data: number;
  target: YTPlayer;
}

interface YTPlayer {
  destroy: () => void;
  pauseVideo: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        element: HTMLIFrameElement,
        options: {
          events: {
            onStateChange: (event: YTPlayerEvent) => void;
          };
        },
      ) => YTPlayer;
    };
  }
}

export default function VideoPlayer({ videoId, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    // 1. Inject the native YouTube API tracking script if missing globally
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // 2. Initialize tracking bindings directly on the raw HTML Iframe element
    const initPlayer = () => {
      if (iframeRef.current && window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onStateChange: (event: YTPlayerEvent) => {
              // 1 = Video is actively PLAYING (Dim the screen)
              if (event.data === 1) {
                setIsPlaying(true);
              }
              // 2 = PAUSED, 0 = ENDED (Bring back the lights)
              else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
          },
        });
      }
    };

    // If the API script is already available, bind immediately
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Otherwise, queue up behind any existing hooks
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }
    };
  }, [videoId]);

  return (
    <>
      {/* LIGHTHOUSE DIMMER BACKDROP */}
      <div
        className={`fixed inset-0 bg-black/85 transition-opacity duration-500 pointer-events-none ${
          isPlaying
            ? "opacity-100 pointer-events-auto z-45 backdrop-blur-xs"
            : "opacity-0"
        }`}
        onClick={() => {
          if (playerRef.current && playerRef.current.pauseVideo) {
            playerRef.current.pauseVideo();
          }
          setIsPlaying(false);
        }}
      />

      {/* DIRECT INLINE YOUTUBE IFRAME */}
      <div
        className={`relative w-full aspect-video rounded-xl overflow-hidden border border-(--color-border) bg-black transition-all duration-500 ${
          isPlaying
            ? "z-50 shadow-2xl ring-4 ring-(--color-brand-mustard)"
            : "z-10"
        }`}
      >
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </>
  );
}
