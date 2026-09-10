"use client";

import { useEffect, useId, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";

export type ModalVideo = {
  number: string;
  title: string;
  embed: string;
  format?: "landscape" | "portrait";
  videoSrc?: string;
  poster?: string;
  startAt?: number;
  youtubeId?: string;
};

type VideoModalProps = {
  video: ModalVideo | null;
  total: string;
  onClose: () => void;
};

export default function VideoModal({ video, total, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!video) return;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    };
  }, [video]);

  if (!video) return null;
  const embedUrl = new URL(video.embed);
  if (video.startAt !== undefined && embedUrl.hostname.includes("youtube")) {
    embedUrl.searchParams.set("start", String(video.startAt));
  }
  const externalUrl = embedUrl.hostname.includes("youtube")
    ? `https://www.youtube.com/watch?v=${embedUrl.pathname.split("/").pop()}`
    : embedUrl.hostname === "player.vimeo.com"
      ? `https://vimeo.com/${embedUrl.pathname.split("/").pop()}`
      : video.embed.replace(/embed\/$/, "");

  return (
    <dialog ref={dialogRef} className="video-modal" aria-labelledby={titleId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="video-modal-top">
        <div><span>{video.number} / {total}</span><p id={titleId}>{video.title}</p></div>
        <button type="button" className="icon-button" onClick={onClose} aria-label="Chiudi il video" title="Chiudi il video" autoFocus><X size={22} /></button>
      </div>
      <div className={`video-player video-player--${video.format ?? "landscape"}`}>
        {video.videoSrc ? <video src={video.videoSrc} poster={video.poster} controls autoPlay playsInline preload="metadata"
          onLoadedMetadata={(event) => { if (video.startAt !== undefined) event.currentTarget.currentTime = video.startAt; }} />
          : <iframe src={embedUrl.href} title={video.title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}
      </div>
      <a className="video-external" href={externalUrl} target="_blank" rel="noreferrer">Apri il video su {embedUrl.hostname.includes("youtube") ? "YouTube" : embedUrl.hostname.includes("vimeo") ? "Vimeo" : "Instagram"} <ArrowUpRight size={14} /></a>
    </dialog>
  );
}
