import ArrowUpRight from "../ArrowUpRight";

export default function MobilePreviewPage() {
  return (
    <main className="mobile-preview-page">
      <div className="mobile-preview-toolbar">
        <div>
          <strong>Anteprima mobile</strong>
          <span>390 × 844 px</span>
        </div>
        <a href="/?mobile-preview=17#top">
          Apri il sito <ArrowUpRight />
        </a>
      </div>

      <div className="mobile-preview-device">
        <iframe
          src="/?mobile-preview=17#top"
          title="Anteprima mobile del portfolio di Dal Ben Mattia"
        />
      </div>
    </main>
  );
}
