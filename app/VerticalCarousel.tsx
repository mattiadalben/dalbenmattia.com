"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import VideoModal, { type ModalVideo } from "./VideoModal";

const verticalStories = [
  {
    number: "01",
    title: "Golden Goose × Venice Airport",
    category: "Fashion / Short form",
    image: "https://i.ytimg.com/vi/RxlHN1hBqpA/maxresdefault.jpg",
    embed: "https://www.youtube-nocookie.com/embed/RxlHN1hBqpA?autoplay=1&rel=0",
    format: "portrait" as const,
  },
  {
    number: "02",
    title: "De'Longhi Rivelia",
    category: "Commercial / Product",
    image: "/vertical-reel-02.jpg",
    embed: "https://www.instagram.com/reel/DODk2RqjRc1/embed/",
    videoSrc: "/vertical-reel-02.mp4",
    poster: "/vertical-reel-02.jpg",
    format: "portrait" as const,
  },
  {
    number: "03",
    title: "EYEWEAR by DAVID BECKHAM",
    category: "Commercial / Detail",
    image: "/vertical-reel-03.jpg",
    embed: "https://www.instagram.com/reel/DalCQpqjEsc/embed/",
    videoSrc: "/vertical-reel-03.mp4",
    poster: "/vertical-reel-03.jpg",
    format: "portrait" as const,
  },
  {
    number: "04",
    title: "Club Session",
    category: "Event / Social",
    image: "/vertical-reel-04-cover.webp",
    embed: "https://www.instagram.com/reel/DKO9ny5od5J/embed/",
    videoSrc: "/vertical-reel-04.mp4",
    poster: "/vertical-reel-04-cover.webp",
    format: "portrait" as const,
  },
  {
    number: "05",
    title: "ELLE",
    category: "Fashion / Social",
    image: "/vertical-reel-05.jpg",
    embed: "https://www.instagram.com/reel/DJzGxA0zLWt/embed/",
    videoSrc: "/vertical-reel-05.mp4",
    poster: "/vertical-reel-05.jpg",
    format: "portrait" as const,
  },
  {
    number: "06",
    title: "Gym Session",
    category: "Fitness / Social",
    image: "/vertical-reel-06.jpg",
    embed: "https://www.instagram.com/reel/DOvbg5IjdJH/embed/",
    videoSrc: "/vertical-reel-06.mp4",
    poster: "/vertical-reel-06.jpg",
    format: "portrait" as const,
  },
];

export default function VerticalCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStory, setActiveStory] = useState<ModalVideo | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [position, setPosition] = useState({ start: true, end: false, first: 1 });
  const closeStory = useCallback(() => setActiveStory(null), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const item = track.firstElementChild as HTMLElement | null;
      const itemWidth = (item?.offsetWidth ?? 280) + 20;
      setPosition({
        start: track.scrollLeft < 4,
        end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
        first: Math.min(verticalStories.length, Math.round(track.scrollLeft / itemWidth) + 1),
      });
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => { track.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);

  function move(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const item = track.firstElementChild as HTMLElement | null;
    track.scrollBy({
      left: direction * ((item?.offsetWidth ?? 280) + 20),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <section className="vertical-stories" aria-labelledby="vertical-title">
      <div className="vertical-heading">
        <div><p className="kicker">Vertical stories / 9:16</p><h2 id="vertical-title">Piccolo formato.<br /><em>Grande visione.</em></h2></div>
        <div className="vertical-controls">
          <button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Contenuto precedente" title="Contenuto precedente"><ArrowLeft size={20} /></button>
          <button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Contenuto successivo" title="Contenuto successivo"><ArrowRight size={20} /></button>
        </div>
      </div>
      <div className="vertical-track" ref={trackRef} aria-label="Video verticali">
        {verticalStories.map((story) => (
          <article className="vertical-card" key={story.number}>
            <button type="button" className="vertical-image"
              onClick={() => { setPreview(null); setActiveStory(story); }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse" && story.videoSrc && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPreview(story.number);
              }}
              onPointerLeave={() => setPreview(null)}
              aria-label={`Guarda ${story.title}`}>
              <img src={story.image} alt={`Frame da ${story.title}`} loading="lazy" decoding="async" />
              {preview === story.number && story.videoSrc && <video src={story.videoSrc} poster={story.image} autoPlay muted loop playsInline preload="none" aria-hidden="true" />}
              <span className="vertical-number">{story.number} / 06</span>
              <span className="vertical-play-icon" aria-hidden="true"><Play size={16} fill="currentColor" /></span>
            </button>
            <div className="vertical-meta"><h3>{story.title}</h3><p>{story.category}</p></div>
          </article>
        ))}
      </div>
      <div className="vertical-footer"><span>Fashion · Product · Social</span><span>{String(position.first).padStart(2, "0")} / 06</span></div>
      <VideoModal video={activeStory} total="06" onClose={closeStory} />
    </section>
  );
}
