import BaseLayout from "@/layouts/BaseLayout"
import LeftScroll from "@/components/app/LeftScroll"
import RightScroll from "@/components/app/RightScroll"
import SutraView from "@/components/app/SutraView"
import MeaningView from "@/components/app/MeaningView"
import ButtonsPanel from "@/components/app/ButtonsPanel"
import TexturedButton from "@/components/shared/TexturedButton"
import HelpDropdown from "@/components/app/HelpDropdown"

import { useNavigate, useLocation } from "react-router-dom"

import Header_bg from "../assets/header_bg_all.png"
import TitleImage from "../assets/Title.png"
import logo from "@/assets/header_img.png"

export default function TeachMePage() {
  const navigate = useNavigate()
  const location = useLocation()

  /** All top‑level nav buttons EXCEPT Help (that one lives in <HelpDropdown/>) */
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Credits", path: "/credits" },
    { label: "Disclaimer", path: "/disclaimer" },
  ]

  return (
    <BaseLayout>
      {/* ===== Wrapper to prevent horizontal scroll ===== */}
      <div className="w-full h-full overflow-x-hidden">
        {/* ===== Header ===== */}
        <header
          className="w-full h-[105px] flex justify-between items-center px-2 py-0 drop-shadow-lg bg-no-repeat"
          style={{
            backgroundImage: `url(${Header_bg})`,
            backgroundPosition: "-20px center",
            backgroundSize: "103% 110%",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Left – Logo + Title */}
          <div className="cursor-pointer pl-1 flex items-center gap-6 pb-2">
            <img src={logo} alt="Left Icon" className="h-[88px] w-auto" />
            <img
              src={TitleImage}
              alt="Title Logo"
              className="h-[65px] w-auto"
            />
          </div>

          {/* Center Title */}
          <div style={{ textAlign: "center", flex: "1", whiteSpace: "nowrap" }}>
            <h3
              style={{
                color: "#4B2E2E",
                fontWeight: "bolder",
                fontSize: "1.45rem",
                marginTop: "2px",
              }}
            >
              Sanskrit Knowledge Accessor
            </h3>
            <h1
              style={{
                color: "#eb4706",
                fontWeight: "bold",
                fontSize: "1.89rem",
                marginTop: "-8px",
              }}
            >
              Upanishad Reader
            </h1>
          </div>

          {/* Right – Navigation */}
          <nav className="flex gap-1 pr-4">
            {navItems.map(({ label, path }) => (
              <TexturedButton
                key={path}
                selected={location.pathname === path}
                onClick={() => navigate(path)}
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </TexturedButton>
            ))}

            {/* The Help dropdown now lives in its own file */}
            <HelpDropdown />
          </nav>
        </header>

        {/* ===== Main Content ===== */}
        <div className="flex flex-col md:flex-row justify-center gap-1 mt-5 overflow-x-hidden">
          {/* Left scroll (hidden on small screens) */}
          <div className="hidden md:block">
            <LeftScroll />
          </div>

          {/* Center panel */}
          <div className="flex-grow pt-1 max-w-6xl px-4 md:px-0">
            <SutraView />
            <MeaningView />
            <ButtonsPanel />
          </div>

          {/* Right scroll (hidden on small screens) */}
          <div className="hidden md:block">
            <RightScroll isCommentary={false} />
          </div>
        </div>

        {/* Mobile layout: show scroll areas under content */}
        <div className="flex md:hidden justify-between mt-4 overflow-x-hidden">
          <LeftScroll />
          <RightScroll isCommentary={false} />
        </div>
      </div>
    </BaseLayout>
  )
}
