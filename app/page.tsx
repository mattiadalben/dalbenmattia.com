import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import ProjectShowcase from "./ProjectShowcase";
import VerticalCarousel from "./VerticalCarousel";
import Hero from "./Hero";
import MobileMenu from "./MobileMenu";

const expertise = [
  ["01", "L'idea.", "Pre-produzione", "Ascoltare, immaginare, mettere a fuoco. Concept, sopralluoghi e pianificazione: la direzione si trova prima di accendere la camera."],
  ["02", "Lo sguardo.", "Regia e riprese", "La luce giusta. Un movimento preciso. Il momento che conta. Regia e riprese, con una crew dedicata quando il progetto lo richiede."],
  ["03", "Il ritmo.", "Post-produzione", "Dare forma alla storia, un fotogramma alla volta. Montaggio, sound design e color grading, fino al master finale."],
  ["04", "L'incontro.", "Consegna", "Ogni film trova il suo pubblico. Master e adattamenti per schermi, piattaforme e formati diversi."],
];

function Brand() {
  return <><img src="/logo-mattia-dal-ben.png" width="48" height="48" alt="" /><span>DAL BEN MATTIA<span className="brand-sub">VIDEOMAKER</span></span></>;
}

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#work">Vai ai lavori</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Dal Ben Mattia, home"><Brand /></a>
        <nav aria-label="Navigazione principale"><a href="#work">Lavori <sup>04</sup></a><a href="#profile">Profilo</a><a href="#expertise">Approccio</a></nav>
        <a className="header-cta" href="#contact">Parliamone <ArrowUpRight size={18} /></a>
        <MobileMenu />
      </header>
      <Hero />
      <section className="work" id="work" aria-labelledby="work-title">
        <div className="section-top"><p className="kicker"><span className="status-dot" /> Selected work</p><p className="kicker">01 — 04 <ArrowDown size={16} /></p></div>
        <div className="section-heading"><h2 id="work-title">Storie da<br /><span className="muted">guardare.</span></h2><p>Brand, luoghi, persone.<br />Film con un punto di vista,<br />dall'idea all'ultimo frame.</p></div>
        <ProjectShowcase />
      </section>
      <VerticalCarousel />
      <section className="profile" id="profile" aria-labelledby="profile-title">
        <div className="profile-label"><p className="kicker">Dietro la camera</p><p>Dal Ben Mattia<br /><span className="muted">Videomaker indipendente</span></p><span className="profile-symbol" aria-hidden="true"><Plus strokeWidth={0.6} /></span></div>
        <div className="profile-copy"><h2 id="profile-title">La tecnica serve.<br />Lo <em>sguardo</em><br />fa la differenza.</h2><div className="profile-detail"><p>Mi occupo di regia, riprese e post-produzione. Cerco il linguaggio giusto per ogni progetto e lo accompagno dall'intuizione iniziale alla consegna.</p><p>Lavoro con brand, agenzie, eventi e privati, in Italia e all'estero. Un unico interlocutore, una crew dedicata quando serve.</p></div><a className="text-link" href="mailto:creative@dalbenmattia.com">Raccontami la tua idea <ArrowUpRight size={20} /></a></div>
      </section>
      <section className="expertise" id="expertise" aria-labelledby="expertise-title">
        <div className="expertise-header"><p className="kicker">L'approccio / dall'inizio alla fine</p><h2 id="expertise-title">Un film.<br />Tutto il percorso.</h2></div>
        <div className="expertise-list">{expertise.map(([number, title, label, copy]) => <details key={number} open={number === "01"}><summary><span className="step-number">{number}</span><h3>{title}</h3><span className="step-label">{label}</span><Plus size={24} /></summary><p>{copy}</p></details>)}</div>
      </section>
      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="contact-top"><p className="kicker">Il prossimo film inizia qui</p><ArrowUpRight size={36} strokeWidth={1.5} /></div>
        <a className="contact-title-link" href="mailto:creative@dalbenmattia.com?subject=Nuovo%20progetto"><h2 id="contact-title">Hai una<br /><em>storia?</em></h2><span className="contact-arrow"><ArrowUpRight strokeWidth={1} /></span></a>
        <div className="contact-bottom"><a href="mailto:creative@dalbenmattia.com">creative@dalbenmattia.com <ArrowUpRight size={22} /></a><a href="tel:+393420727868">+39 342 072 7868</a></div>
      </section>
      <footer><a className="brand footer-brand" href="#top"><Brand /></a><div className="socials" aria-label="Social"><a href="https://www.instagram.com/mattia.dalben/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14} /></a><a href="https://vimeo.com/dalbenmattia" target="_blank" rel="noreferrer">Vimeo <ArrowUpRight size={14} /></a><a href="https://www.youtube.com/@dalbenmattia" target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={14} /></a><a href="https://www.linkedin.com/in/mattia-dal-ben-6a33241b0/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14} /></a></div><p>© {new Date().getFullYear()} Dal Ben Mattia</p></footer>
    </main>
  );
}
