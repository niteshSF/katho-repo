import Header from "@/components/shared/Header"
import sdm from "@/assets/sdm.png"

export default function SchemeOfDiacriticalMarks() {
  return (
    <div className="w-full h-screen overflow-hidden">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      {/* Scrollable content area below header */}
      <div className="mt-[68px] h-[calc(100vh-44px)] overflow-auto">
        <img
          src={sdm}
          alt="Scheme Of Diacritical Marks"
          className="w-full h-full object-fill block"
        />
      </div>
    </div>
  )
}
