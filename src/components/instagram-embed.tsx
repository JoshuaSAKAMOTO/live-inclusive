"use client";

import { useEffect } from "react";

interface InstagramEmbedProps {
  postUrl: string;
}

export function InstagramEmbed({ postUrl }: InstagramEmbedProps) {
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
  }, [postUrl]);

  return (
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
