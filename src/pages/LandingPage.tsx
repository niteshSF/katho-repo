import { Link, useNavigate } from "react-router-dom"
import landingPageImage from "../assets/LandingPage.png"
import EnterButton from "../assets/EnterButton.png"
import leftLogo1 from "../assets/MeitY.png"
import leftLogo2 from "../assets/University_of_Hyderabad.png"
import NameImg from "../assets/bg-text.png"
import { IoHome } from "react-icons/io5"
import sf from "../assets/sf-logo-new.png"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* Background Image */}
      <img
        src={landingPageImage}
        alt="Landing Page"
        style={{
          margin: "0px",
          padding: "0px",
          width: "100%",
          height: "100vh",
        }}
      />

      {/* Top-left logos */}
      <div
        style={{
          position: "absolute",
          top: "3vh",
          left: "2vw",
          display: "flex",
          gap: "2vw",
        }}
      >
        <a
          href="https://www.meity.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={leftLogo1}
            alt="MeitY"
            style={{ height: "11vh", cursor: "pointer" }}
          />
        </a>
        <a
          href="https://sanskrit.uohyd.ac.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={leftLogo2}
            alt="University of Hyderabad"
            style={{ height: "11vh", cursor: "pointer" }}
          />
        </a>
      </div>

      {/* Top-right logo + home icon */}
      <div
        style={{
          position: "absolute",
          top: "3vh",
          right: "2vw",
          display: "flex",
          alignItems: "center",
          gap: "4vw",
        }}
      >
        {/* Home icon (to navigate at the 3 upanishads landing page)  */}
        <Link to="https://test1.samskritifoundation.org/home/" style={{ color: "#fff" }}>     {/* change this to navigate on the landing page */}
          <IoHome
            style={{
            height: "5vh",
            width: "auto",
            cursor: "pointer",
            transition: "transform 0.2s ease-in-out",
          }}
        />

        </Link>
        <a
          href="https://samskritifoundation.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={sf}
            alt="Samskriti Foundation"
            style={{ height: "15vh", cursor: "pointer" }}
          />
        </a>
      </div>

      {/* Project Name Image in Center (slightly to right) */}
      <img
        src={NameImg}
        alt="Project Name"
        style={{
          position: "absolute",
          top: "33%",
          right: "8%",
          textAlign: "center",
          width: "52vw",
          height: "auto",
        }}
      />

      {/* Enter Button */}
      <img
        src={EnterButton}
        alt="Enter"
        style={{
          position: "absolute",
          bottom: "5vh",
          right: "8vw",
          cursor: "pointer",
          width: "17vw",
          height: "auto",
        }}
        onClick={() => navigate("/introduction")}
      />
    </div>
  )
}

export default LandingPage
