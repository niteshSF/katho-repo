import { useNavigate, useLocation } from "react-router-dom";
import Header_bg from "../../assets/header_bg_all.png";
import TitleImage from "../../assets/Title.png";
import logo from "@/assets/header_img.png";

import TexturedButton from "@/components/shared/TexturedButton";
import HelpDropdown from "@/components/app/HelpDropdown";    // ⬅️ new import

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /** Top‑level buttons that are simple links */
  const navItems = [
    { label: "Home", path: "/chant" },
    { label: "About", path: "/about" },
    { label: "Credits", path: "/credits" },
    { label: "Disclaimer", path: "/disclaimer" },
  ];

  return (
    <header
      className="w-screen h-[105px] flex justify-between items-center px-2 py-0 drop-shadow-lg bg-no-repeat"
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
        <img src={TitleImage} alt="Title Logo" className="h-[65px] w-auto" />
      </div>

      {/* Centered Title */}
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

        {/* Help dropdown lives here */}
        <HelpDropdown />
      </nav>
    </header>
  );
};

export default Header;
