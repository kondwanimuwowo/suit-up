import Header from "@/components/storefront/Header";
import Footer from "@/components/storefront/Footer";
import ScrollToTop from "@/components/storefront/ScrollToTop";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="su-root">
      {/* Marquee */}
      <div className="su-marquee">
        <div className="su-marquee-track">
          <span>Complimentary nationwide delivery</span><span>·</span>
          <span>Alterations for life, in our Lusaka workshop</span><span>·</span>
          <span>Book a fitting in Lusaka, Ndola or Livingstone</span><span>·</span>
          <span>Complimentary nationwide delivery</span><span>·</span>
          <span>Alterations for life, in our Lusaka workshop</span><span>·</span>
          <span>Book a fitting in Lusaka, Ndola or Livingstone</span><span>·</span>
        </div>
      </div>
      <Header />
      <ScrollToTop />
      <div className="su-scroll">
        {children}
        <Footer />
      </div>
    </div>
  );
}
