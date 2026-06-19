import Image from "next/image";

export const metadata = {
  title: "Suit Up Zambia — Demo",
  description: "This demo build is currently paused. Get in touch with Kondwani Muwowo for web development work.",
};

export default function SplashPage() {
  return (
    <div className="su-splash">
      <div className="su-splash-bg-wrap">
        <Image
          src="/images/suits/suit-1b.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover" }}
          className="su-splash-bg"
        />
      </div>
      <div className="su-splash-veil" />

      <div className="su-splash-shell">
        <main className="su-splash-main">
          <div className="su-splash-card">
            <h1 className="su-splash-h1 su-splash-in su-splash-in--1">
              This was just<br /><em>a fitting.</em>
            </h1>
            <p className="su-splash-p su-splash-in su-splash-in--2">
              This site was built on spec, never an official launch. If you liked
              the craft behind it, I&apos;d love to build something real for you.
            </p>

            <div className="su-splash-contacts su-splash-in su-splash-in--3">
              <a href="https://kondwanimuwowo.com" target="_blank" rel="noopener" className="su-splash-pill su-splash-pill--main">
                <span>kondwanimuwowo.com</span>
                <span className="su-splash-pill-ic">→</span>
              </a>
              <a href="mailto:hi@kondwanimuwowo.com" className="su-splash-pill">
                <span>hi@kondwanimuwowo.com</span>
                <span className="su-splash-pill-ic">✉</span>
              </a>
              <a href="tel:+260976999510" className="su-splash-pill">
                <span>+260 976 999 510</span>
                <span className="su-splash-pill-ic">☎</span>
              </a>
            </div>
          </div>
        </main>

        <footer className="su-splash-foot su-splash-in su-splash-in--4">
          <span>Designed &amp; built by Kondwani Muwowo</span>
        </footer>
      </div>
    </div>
  );
}
