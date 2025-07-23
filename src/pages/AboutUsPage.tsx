import Header from "@/components/shared/Header";
import aboutImg from "@/assets/about-the-project.png";

export default function AboutUsPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Scrollable Content */}
      <div className="mt-[75px] h-[calc(100vh-2px)] overflow-auto">
        <img
          src={aboutImg}
          alt="About Us"
          className="w-full h-full object-fill block"
        />
      </div>
    </div>
  );
}
