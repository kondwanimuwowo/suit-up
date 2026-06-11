import Image from "next/image";

export default function LoadingScreen() {
  return (
    <div className="su-loading">
      <div className="su-loading-inner">
        <Image
          src="/suit-up-logo.png"
          alt="Suit Up"
          width={120}
          height={54}
          priority
          className="su-loading-logo"
        />
        <div className="su-loading-bar">
          <div className="su-loading-bar-fill" />
        </div>
      </div>
    </div>
  );
}
