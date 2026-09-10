"use client";

import { useCallback, useState } from "react";
import { Play } from "lucide-react";
import VideoModal, { type ModalVideo } from "./VideoModal";

const projects = [
  {
    number: "01",
    title: "Villa Tania",
    category: "Hospitality film",
    role: "Direction · Camera · Edit",
    year: "2026",
    image:
      "https://i.vimeocdn.com/video/2185113255-6e55f7d3bd0a99c90e1b2c1d990a369a522fe763b6bf17e469072f09a85b3734-d_1280x720?region=us",
    embed: "https://player.vimeo.com/video/1214241491?autoplay=1&title=0&byline=0&portrait=0",
    size: "project--hero",
  },
  {
    number: "02",
    title: "Cesaro Mac Import",
    category: "Corporate film",
    role: "Direction · Camera · Edit",
    year: "2025",
    image: "/project-02-cesaro-cover.webp",
    embed: "https://www.youtube-nocookie.com/embed/L0iOfGwfcU8?autoplay=1&rel=0",
    youtubeId: "L0iOfGwfcU8",
    startAt: 37,
    size: "project--landscape",
  },
  {
    number: "03",
    title: "Alium Restaurant",
    category: "Hospitality film",
    role: "Direction · Camera · Edit",
    year: "2025",
    image:
      "https://i.vimeocdn.com/video/1974099067-7e9b7a36b074039d30112fea2e9c269618c6b1fc453ddc1138ab20b9f828b5ba-d_1280x720?region=us",
    embed: "https://player.vimeo.com/video/1049705710?autoplay=1&title=0&byline=0&portrait=0",
    size: "project--landscape",
  },
  {
    number: "04",
    title: "Matteo & Melody",
    category: "Wedding film",
    role: "Direction · Camera · Edit",
    year: "2024",
    image: "https://i.ytimg.com/vi/ahg4CTJGpq0/maxresdefault.jpg",
    embed: "https://www.youtube-nocookie.com/embed/ahg4CTJGpq0?autoplay=1&rel=0",
    size: "project--hero project--panorama",
  },
];

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState<ModalVideo | null>(null);
  const closeProject = useCallback(() => setActiveProject(null), []);

  return (
    <>
      <div className="project-grid">
        {projects.map((project) => (
          <article className={`project ${project.size}`} key={project.number}>
            <button
              type="button"
              className="project-image"
              onClick={() => setActiveProject(project)}
              aria-label={`Guarda ${project.title}`}
            >
              <img src={project.image} alt={`Frame dal progetto ${project.title}`} loading="lazy" decoding="async" />
              <span className="project-index">{project.number}</span>
              <span className="project-view">Guarda il film</span>
              <span className="project-play-icon" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
            </button>
            <div className="project-meta">
              <div>
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
              <div>
                <p>{project.role}</p>
                <p>{project.year}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <VideoModal video={activeProject} total="04" onClose={closeProject} />
    </>
  );
}
