"use client"

import React from "react"

const headerStyle = {
  width: "100%",
  background: "transparent",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "32px 48px 0 48px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  position: "relative",
  zIndex: 10,
}

const logoStyle = {
  display: "flex",
  alignItems: "center",
  fontWeight: 600,
  fontSize: "2.5rem",
  color: "#fff",
  letterSpacing: "1px",
  fontFamily: "'Ballet', cursive, sans-serif",
  fontStyle: "normal",
  textShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
}

const navLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "32px",
  margin: "0 auto",
  flex: 1,
  justifyContent: "center",
  fontFamily: "'Poppins', 'Inter', 'Arial', sans-serif",
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: 400,
  transition: "all 0.3s ease",
  letterSpacing: "0.5px",
  padding: "8px 16px",
  borderRadius: "12px",
  cursor: "pointer",
  fontFamily: "'Poppins', 'Inter', 'Arial', sans-serif",
  border: "1px solid transparent",
}

const linkHoverStyle = {
  color: "#fff",
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 32px rgba(255,255,255,0.1)",
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.2)",
  transform: "translateY(-2px)",
}

const loginBtnStyle = {
  background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
  color: "#000",
  border: "none",
  borderRadius: "999px",
  padding: "12px 28px",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 4px 20px rgba(255,255,255,0.2)",
  transition: "all 0.3s ease",
  fontFamily: "'Poppins', sans-serif",
}

const loginBtnHoverStyle = {
  transform: "translateY(-2px)",
  boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
}

export default function Header() {
  const [hovered, setHovered] = React.useState(null)
  const [loginHovered, setLoginHovered] = React.useState(false)

  const handleLoginClick = () => {
    window.location.href = "/login"
  }

  return (
    <nav style={headerStyle}>
      <div style={logoStyle}>Aaina</div>
      <div style={navLinksStyle}>
        {["Features", "Pricing", "Docs"].map((text) => (
          <a
            key={text}
            href={`#${text.toLowerCase()}`}
            style={hovered === text ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
            onMouseEnter={() => setHovered(text)}
            onMouseLeave={() => setHovered(null)}
          >
            {text}
          </a>
        ))}
      </div>
      <button
        style={loginHovered ? { ...loginBtnStyle, ...loginBtnHoverStyle } : loginBtnStyle}
        onMouseEnter={() => setLoginHovered(true)}
        onMouseLeave={() => setLoginHovered(false)}
        onClick={handleLoginClick}
      >
        Login
      </button>
    </nav>
  )
}
