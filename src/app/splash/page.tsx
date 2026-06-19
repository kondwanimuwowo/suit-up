import Image from "next/image";

export const metadata = {
  title: "Suit Up Zambia — Demo taken down",
  description: "This demo build is no longer active. Contact Kondwani Muwowo for web development work.",
};

export default function SplashPage() {
  return (
    <main className="su-splash">
      <Image
        src="/images/suits/suit-1b.jpg"
        alt=""
        fill
        priority
        style={{ objectFit: "cover" }}
        className="su-splash-bg"
      />
      <div className="su-splash-veil" />

      <div className="su-splash-card">
        <div className="su-splash-eyebrow">Suit Up Zambia — Demo</div>
        <h1 className="su-splash-h1">
          This fitting room<br /><em>is closed.</em>
        </h1>
        <p className="su-splash-p">
          This was a demo build for a potential client who&apos;s gone quiet on us 🤐.
          The suits were never real — but the work was. If you liked what you saw here,
          the person who built it is very much open for business.
        </p>

        <a href="https://kondwanimuwowo.com" target="_blank" rel="noopener" className="su-splash-cta">
          Hire Kondwani →
        </a>

        <div className="su-splash-contacts">
          <a href="mailto:hi@kondwanimuwowo.com">hi@kondwanimuwowo.com</a>
          <span>·</span>
          <a href="tel:+260976999510">+260 976 999 510</a>
        </div>
      </div>
    </main>
  );
}
