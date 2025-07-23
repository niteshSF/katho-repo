/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react"
import BaseLayout from "@/layouts/BaseLayout"
import LeftScroll from "@/components/app/LeftScroll"
import RightScroll from "@/components/app/RightScroll"
import SutraView from "@/components/app/SutraView"
import MeaningView from "@/components/app/MeaningView"
import ButtonsPanel from "@/components/app/ButtonsPanel"
import { useNavigate, useLocation } from "react-router-dom"

import Header_bg from "../assets/header_bg_all.png"
import TitleImage from "../assets/Title.png"
import logo from "@/assets/header_img.png"
import TexturedButton from "@/components/shared/TexturedButton"
import dropdownImg from "@/assets/light_bar.png"

import useSutraStore from "@/store/sutraStore"
import useLanguageStore from "@/store/languageStore"

export default function ChantPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { valliNo, sutraNo, lang } = location.state || {}

  const { setSutraNo, setValliNo } = useSutraStore()
  const { setLanguage } = useLanguageStore()

  // Update store from navigation state
  useEffect(() => {
    if (valliNo && sutraNo) {
      setValliNo(valliNo)
      setSutraNo(sutraNo)
    }
    if (lang) {
      setLanguage(lang)
    }
  }, [valliNo, sutraNo, lang])

  const [openDropdown, setOpenDropdown] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Credits", path: "/credits" },
    { label: "Disclaimer", path: "/disclaimer" },
    {
      label: "Help",
      subItems: [
        {
          label: "Scheme Of Diacritical Marks",
          path: "/help/SchemeOfDiacriticalMarks",
        },
        { label: "Contact Us", path: "/help/ContactUS" },
      ],
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <BaseLayout>
      <div className="w-full h-full overflow-x-hidden">
        {/* ================= Header ================= */}
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
          <nav className="flex gap-1 pr-4 relative" ref={dropdownRef}>
            {navItems.map((item) => {
              if (!item.subItems) {
                return (
                  <TexturedButton
                    key={item.path}
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    {item.label}
                  </TexturedButton>
                )
              }

              return (
                <div key={item.label} className="relative">
                  <TexturedButton
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === item.label ? "" : item.label
                      )
                    }
                    aria-haspopup="menu"
                  >
                    {item.label} ▾
                  </TexturedButton>

                  {openDropdown === item.label && (
                    <div
                      role="menu"
                      className="absolute right-0 -mt-1.5 z-10 rounded-md shadow-lg border-gray-300"
                      style={{
                        minWidth: "230px",
                        backgroundImage: `url(${dropdownImg})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    >
                      {item.subItems.map((sub, idx) => (
                        <React.Fragment key={sub.path}>
                          <button
                            onClick={() => {
                              navigate(sub.path)
                              setOpenDropdown("")
                            }}
                            className="px-4 py-2 text-left text-sm text-black hover:bg-white font-bold w-full"
                          >
                            {sub.label}
                          </button>
                          {idx < item.subItems.length - 1 && (
                            <div className="border-t border-gray-300 mx-2" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </header>

        {/* ================= Main Content ================= */}
        <main className="flex flex-col md:flex-row justify-center overflow-x-hidden gap-1 mt-5">
          <div className="hidden md:block">
            <LeftScroll />
          </div>

          <div className="flex-grow pt-1 max-w-6xl px-4 md:px-0">
            {/* <SearchBar /> */}
            <SutraView />
            <MeaningView />
            <ButtonsPanel />
          </div>

          <div className="hidden md:block">
            <RightScroll isCommentary={false} />
          </div>
        </main>

        {/* Mobile Scroll Sections */}
        <div className="flex md:hidden justify-between mt-4 overflow-x-hidden">
          <LeftScroll />
          <RightScroll isCommentary={false} />
        </div>
      </div>
    </BaseLayout>
  )
}