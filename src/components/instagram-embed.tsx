"use client";

import { useEffect, useRef } from "react";

interface InstagramEmbedProps {
  postUrl: string;
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Instagram embed script
    if (typeof window !== "undefined" && !window.instgrm) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    // Add title to iframe for accessibility
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLIFrameElement && node.classList.contains("instagram-media")) {
            node.title = "Instagram 投稿";
          }
        });
      });
    });

    if (containerRef.current) {
      observer.observe(containerRef.current, { childList: true, subtree: true });
      // Also check for existing iframes
      const existingIframes = containerRef.current.querySelectorAll<HTMLIFrameElement>("iframe.instagram-media");
      existingIframes.forEach((iframe) => {
        if (!iframe.title) {
          iframe.title = "Instagram 投稿";
        }
      });
    }

    return () => observer.disconnect();
  }, [postUrl]);

  return (
    <div ref={containerRef}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={postUrl}
        data-instgrm-version="14"
        style={{
          background: "#000",
          border: 0,
          borderRadius: "3px",
          margin: "0 auto",
          maxWidth: "350px",
          minWidth: "280px",
          width: "100%",
        }}
      />
    </div>
  );
}

// Add type declaration for Instagram embed script
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}
