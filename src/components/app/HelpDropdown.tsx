import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TexturedButton from "@/components/shared/TexturedButton";
import dropdownImg from "@/assets/light_bar.png"; 

export default function HelpDropdown() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // List of sub‑items that appear in the dropdown:
  const subItems = [
    { label: "Scheme Of Diacritical Marks", path: "/help/SchemeOfDiacriticalMarks" },
    { label: "Contact Us", path: "/help/ContactUS" },
  ];

  // Check if current route matches any dropdown item exactly or starts with it
  const isSelected = subItems.some((sub) => location.pathname.startsWith(sub.path));

  /* ───────── Close on outside click ───────── */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <TexturedButton
        onClick={() => setOpen(prev => !prev)}
        aria-haspopup="menu"
        selected={isSelected}
      >
        Help ▾
      </TexturedButton>

      {open && (
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
          {subItems.map((sub, idx) => (
            <React.Fragment key={sub.path}>
              <button
                onClick={() => {
                  navigate(sub.path);
                  setOpen(false);
                }}
                className="px-4 py-2 text-left text-sm text-darkbrown hover:bg-white font-bold w-full"
              >
                {sub.label}
              </button>
              {idx < subItems.length - 1 && (
                <div className="border-t border-gray-300 mx-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
