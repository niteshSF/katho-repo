import Header from "@/components/shared/Header";
import creditImg from "@/assets/credit.png";

export default function CreditPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* ── Fixed header ── */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* ── Scrollable area below the header ── */}
      <div className="mt-[80px] h-[calc(100vh-64px)] overflow-auto">
        <img
          src={creditImg}
          alt="Credit Page"
          className="w-full h-full object-fill block"
        />
      </div>
    </div>
  );
}
