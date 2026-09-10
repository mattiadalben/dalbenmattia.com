"use client";
import { useCallback, useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import VideoModal, { type ModalVideo } from "./VideoModal";

const scenes = [
  { number: "01", title: "Villa Tania", image: "https://i.vimeocdn.com/video/2185113255-6e55f7d3bd0a99c90e1b2c1d990a369a522fe763b6bf17e469072f09a85b3734-d_1280x720?region=us", embed: "https://player.vimeo.com/video/1214241491?autoplay=1&title=0&byline=0&portrait=0" },
  { number: "02", title: "Cesaro Mac Import", image: "/project-02-cesaro-cover.webp", embed: "https://www.youtube-nocookie.com/embed/L0iOfGwfcU8?autoplay=1&rel=0", startAt: 37 },
  { number: "03", title: "Matteo & Melody", image: "https://i.ytimg.com/vi/ahg4CTJGpq0/maxresdefault.jpg", embed: "https://www.youtube-nocookie.com/embed/ahg4CTJGpq0?autoplay=1&rel=0" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [active, setActive] = useState<ModalVideo | null>(null);
  const close = useCallback(() => setActive(null), []);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || reducedMotion || active) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setIndex((current) => (current + 1) % scenes.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reducedMotion, active]);
  const scene = scenes[index];
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-frames" aria-hidden="true">{scenes.map((item, i) => <img key={item.number} className={index === i ? "hero-image is-active" : "hero-image"} src={item.image} alt="" fetchPriority={i === 0 ? "high" : "low"} />)}</div>
        <div className="hero-topline"><p className="kicker">Regia. Riprese. Post-produzione.</p><span className="frame-label">IN FRAME <span>{scene.number} / 03</span></span></div>
        <div className="hero-copy"><p className="hero-profession"><span className="status-dot" /> Videomaker indipendente</p><h1 id="hero-title">MATTIA<br /><span>DAL BEN</span><span className="hero-period">.</span></h1><div className="hero-description"><p>Storie che prendono forma.<br />Immagini che restano.</p><a href="#work" className="hero-explore" aria-label="Esplora i lavori"><ArrowDown size={24} /></a></div></div>
        <div className="hero-bottom"><button className="hero-film" onClick={() => setActive(scene)}><span className="play-disc"><Play size={18} fill="currentColor" /></span><span><span className="hero-film-label">Guarda il film</span><strong>{scene.title}</strong></span><ArrowUpRight size={20} /></button><div className="scene-controls" aria-label="Immagine in copertina">{scenes.map((item, i) => <button key={item.number} className={i === index ? "scene-button is-active" : "scene-button"} aria-label={`Copertina ${item.title}`} aria-pressed={i === index} onClick={() => { setIndex(i); setPaused(true); }}><span>{item.number}</span><span className="scene-line" /></button>)}<button className="icon-button" onClick={() => setPaused((value) => !value)} disabled={reducedMotion} aria-label={paused ? "Riprendi le copertine" : "Pausa copertine"} title={reducedMotion ? "Animazioni ridotte" : paused ? "Riprendi le copertine" : "Pausa copertine"}>{paused || reducedMotion ? <Play size={16} /> : <Pause size={16} />}</button></div></div>
      </section>
      <VideoModal video={active} total="03" onClose={close} />
    </>
  );
}
