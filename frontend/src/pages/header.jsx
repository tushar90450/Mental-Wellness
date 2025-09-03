"use client"

import React from "react"

const headerStyle = {
  width: "100%",
  background: "transparent",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "24px 40px 0 40px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  position: "relative",
  zIndex: 10,
}

const logoStyle = {
  display: "flex",
  alignItems: "center",
  fontWeight: 400,
  fontSize: "2.2rem",
  color: "#fff",
  letterSpacing: "2px",
  fontFamily: "'Ballet', cursive, sans-serif",
  fontStyle: "normal"
}

const navLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "28px",
  margin: "0 auto",
  flex: 1,
  justifyContent: "center",
  fontFamily: "'Poppins', 'Inter', 'Arial', sans-serif"
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "0.95rem",
  fontWeight: 100,
  transition: "color 0.2s, background 0.2s, border-radius 0.2s, backdrop-filter 0.2s, box-shadow 0.2s",
  letterSpacing: "0.5px",
  padding: "4px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontFamily: "'Poppins', 'Inter', 'Arial', sans-serif"
}

const linkHoverStyle = {
  color: "#fff",
  background: "rgba(255,255,255,0.12)",
  backdropFilter: "blur(8px)",
  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  borderRadius: "60px"
}

const loginBtnStyle = {
  background: "#fff",
  color: "#000",
  border: "none",
  borderRadius: "999px",
  padding: "8px 24px",
  fontSize: "1rem",
  fontWeight: 500,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
}

export default function Header() {
  const [hovered, setHovered] = React.useState(null);
  return (
    <nav style={headerStyle}>
      <div style={logoStyle}>Aaina</div>
      <div style={navLinksStyle}>
        {['Features', 'Pricing', 'Docs'].map((text) => (
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
      <button style={loginBtnStyle}>Login</button>
    </nav>
  )
}
