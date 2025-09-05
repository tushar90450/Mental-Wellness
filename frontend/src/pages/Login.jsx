"use client"

import { useState } from "react"

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #000000 0%, #1a0033 50%, #330066 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  fontFamily: "'Poppins', sans-serif",
  position: "relative",
  overflow: "hidden",
}

const particleStyle = {
  position: "absolute",
  width: "3px",
  height: "3px",
  background: "rgba(255, 255, 255, 0.5)",
  borderRadius: "50%",
  animation: "float 6s ease-in-out infinite",
}

const loginCardStyle = {
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "20px",
  padding: "32px 28px",
  width: "100%",
  maxWidth: "360px",
  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)",
  position: "relative",
  zIndex: 2,
}

const titleStyle = {
  fontSize: "2rem",
  fontWeight: 700,
  color: "#fff",
  textAlign: "center",
  marginBottom: "6px",
  background: "linear-gradient(135deg, #fff 0%, #e0e0ff 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
}

const subtitleStyle = {
  fontSize: "0.9rem",
  color: "rgba(255, 255, 255, 0.7)",
  textAlign: "center",
  marginBottom: "24px",
  lineHeight: "1.4",
}

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
}

const inputGroupStyle = {
  position: "relative",
}

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "rgba(255, 255, 255, 0.8)",
  marginBottom: "6px",
  letterSpacing: "0.5px",
}

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  fontSize: "0.95rem",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "10px",
  color: "#fff",
  outline: "none",
  transition: "all 0.3s ease",
  backdropFilter: "blur(10px)",
  boxSizing: "border-box",
}

const inputFocusStyle = {
  border: "1px solid rgba(255, 255, 255, 0.5)",
  background: "rgba(255, 255, 255, 0.15)",
  boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
}

const buttonStyle = {
  width: "100%",
  padding: "12px",
  fontSize: "1rem",
  fontWeight: 600,
  background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
  color: "#000",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  transition: "all 0.3s ease",
  marginTop: "6px",
  fontFamily: "'Poppins', sans-serif",
}

const buttonHoverStyle = {
  transform: "translateY(-2px)",
  boxShadow: "0 8px 30px rgba(255, 255, 255, 0.3)",
}

const linkStyle = {
  textAlign: "center",
  marginTop: "18px",
  fontSize: "0.85rem",
  color: "rgba(255, 255, 255, 0.7)",
}

const linkAnchorStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 500,
  transition: "color 0.3s ease",
}

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [focused, setFocused] = useState(null)
  const [buttonHovered, setButtonHovered] = useState(false)

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
    // Add your login logic here
  }

  const particles = Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      style={{
        ...particleStyle,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 6}s`,
        animationDuration: `${4 + Math.random() * 4}s`,
      }}
    />
  ))

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
            50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
          }
          
          input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
        `}
      </style>

      {particles}

      <div style={loginCardStyle}>
        <h1 style={titleStyle}>Welcome Back</h1>
        <p style={subtitleStyle}>Continue your journey to mental wellness and inner peace</p>

        <form style={formStyle} onSubmit={handleSubmit}>
          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              style={focused === "email" ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
              required
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={focused === "password" ? { ...inputStyle, ...inputFocusStyle } : inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            style={buttonHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            Sign In
          </button>
        </form>

        <div style={linkStyle}>
          Don't have an account?{" "}
          <a href="/signup" style={linkAnchorStyle}>
            Create one here
          </a>
        </div>
      </div>
    </div>
  )
}
