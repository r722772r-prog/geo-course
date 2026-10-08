"use client";

import { useEffect } from "react";

/** Convenience deterrent only: public media remains accessible over the network. */
export default function MediaProtection() {
  useEffect(() => {
    const blockMediaAction = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const media = target.closest("img, video");
      if (media && !media.closest("[data-allow-media-save]")) event.preventDefault();
    };
    document.addEventListener("contextmenu", blockMediaAction, true);
    document.addEventListener("dragstart", blockMediaAction, true);
    return () => {
      document.removeEventListener("contextmenu", blockMediaAction, true);
      document.removeEventListener("dragstart", blockMediaAction, true);
    };
  }, []);
  return null;
}
