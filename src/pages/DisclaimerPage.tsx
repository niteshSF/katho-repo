import Header from "@/components/shared/Header"
import disclaimerImg from "@/assets/disclaimer.png"

export default function DisclaimerPage() {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Fixed header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Scrollable area below the header */}
      <div className="mt-[68px] h-[calc(100vh-10px)] overflow-auto">
        <img
          src={disclaimerImg}
          alt="Disclaimer Page"
          className="w-full h-full object-fill block"
        />
      </div>
    </div>
  )
}
