"use client"

import Header from "./header"
import Spline from "@splinetool/react-spline"
import React from "react"

export default function HeroContent() {
  return (
    <React.Fragment>
      {/* Hero Section - Already black */}
      <div
        style={{
          background: "black",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Header />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
          }}
        >
          <Spline scene="https://prod.spline.design/AHBbST0OnmHGqf8l/scene.splinecode" />
        </div>

        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "10%",
            width: "4px",
            height: "4px",
            background: "rgba(255, 255, 255, 0.6)",
            borderRadius: "50%",
            animation: "twinkle 3s ease-in-out infinite",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "15%",
            width: "3px",
            height: "3px",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "50%",
            animation: "twinkle 4s ease-in-out infinite 1s",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: "80%",
            width: "2px",
            height: "2px",
            background: "rgba(255, 255, 255, 0.5)",
            borderRadius: "50%",
            animation: "twinkle 2.5s ease-in-out infinite 0.5s",
            zIndex: 1,
          }}
        />

        <style>
          {`
            @keyframes twinkle {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.5); }
            }
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-30px) rotate(180deg); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.1); }
            }
          `}
        </style>

        <main
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "80vh",
            textAlign: "center",
            padding: "0 24px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "900px" }}>
            <div
              className="inline-flex items-center px-4 py-2 rounded-full mb-6 relative"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
              <span
                className="text-white/95 text-sm font-medium relative z-10"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: "0.5px",
                }}
              >
                ✨ Transform your inner self
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2rem, 6vw, 4rem)",
                lineHeight: "1.1",
                fontWeight: 300,
                color: "#fff",
                marginBottom: "2rem",
                fontFamily: "'Inter', sans-serif",
                letterSpacing: "-2px",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              }}
            >
              <span
                style={{
                  fontWeight: 600,
                  fontStyle: "italic",
                  background: "linear-gradient(135deg, #fff 0%, #e0e0e0 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Beautiful
              </span>{" "}
              Life
              <br />
              <span style={{ fontWeight: 200, opacity: 0.95 }}>Experiences</span>
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                fontWeight: 300,
                color: "rgba(255, 255, 255, 0.85)",
                marginBottom: "3rem",
                lineHeight: "1.6",
                fontFamily: "'Inter', sans-serif",
                maxWidth: "700px",
                margin: "0 auto 3rem auto",
                letterSpacing: "0.3px",
              }}
            >
              This space is designed to be a mirror for your soul, helping you to look within, understand your feelings,
              and find the immense strength and peace you already possess.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                style={{
                  padding: "14px 32px",
                  borderRadius: "999px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#fff",
                  fontSize: "1rem",
                  fontWeight: 500,
                  fontFamily: "'Poppins', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.15)"
                  e.target.style.border = "1px solid rgba(255, 255, 255, 0.3)"
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.3)"
                }}
                onMouseOut={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)"
                  e.target.style.border = "1px solid rgba(255, 255, 255, 0.2)"
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)"
                }}
              >
                Discover More
              </button>
              <button
                style={{
                  padding: "14px 32px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #fff 0%, #f0f0f0 100%)",
                  border: "none",
                  color: "#000",
                  fontSize: "1rem",
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-2px)"
                  e.target.style.boxShadow = "0 8px 30px rgba(255, 255, 255, 0.3)"
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)"
                  e.target.style.boxShadow = "0 4px 20px rgba(255, 255, 255, 0.2)"
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </main>
      </div>

      <div
        style={{
          minHeight: "100vh",
          background: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "48px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: "120px",
            height: "120px",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "60%",
            right: "10%",
            width: "180px",
            height: "180px",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "30%",
            left: "70%",
            width: "80px",
            height: "80px",
            background: "rgba(255, 255, 255, 0.04)",
            borderRadius: "50%",
            filter: "blur(30px)",
            animation: "float 6s ease-in-out infinite 2s",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "20%",
            width: "100px",
            height: "100px",
            background: "rgba(255, 255, 255, 0.025)",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "float 9s ease-in-out infinite 1s",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        />

        <h2
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "3rem",
            color: "#fff",
            marginBottom: "1rem",
            letterSpacing: "-1px",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          WHAT IS IT?
        </h2>

        <p
          style={{
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: "1.2rem",
            textAlign: "center",
            marginBottom: "3rem",
            fontFamily: "Poppins, Arial, sans-serif",
            maxWidth: "600px",
            lineHeight: "1.6",
          }}
        >
          A simple 3-step journey to transform your mental wellness and discover inner peace
        </p>

        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
            textAlign: "center",
            fontFamily: "Poppins, Arial, sans-serif",
            color: "#fff",
            padding: "0 1rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(45deg, #6e00ff, #9d4edd)",
                color: "#fff",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                boxShadow: "0 8px 32px rgba(110, 0, 255, 0.5)",
                zIndex: 10,
              }}
            >
              1
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "2.5rem 1.5rem 2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "translateY(-5px)")}
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              <span style={{ fontSize: "2.8rem", marginBottom: "1.7rem" }}>👇</span>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.7rem",
                  letterSpacing: "-0.5px",
                  textTransform: "uppercase",
                  fontFamily: "Poppins, Arial, sans-serif",
                }}
              >
                SHARE YOUR CONCERN
              </h3>
              <p
                style={{
                  color: "#e0e0e0",
                  fontSize: "1rem",
                  fontFamily: "Poppins, Arial, sans-serif",
                  lineHeight: "1.5",
                }}
              >
                Select the feeling or situation that resonates with you from our curated collection of life experiences.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(45deg, #6e00ff, #9d4edd)",
                color: "#fff",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                boxShadow: "0 8px 32px rgba(110, 0, 255, 0.5)",
                zIndex: 10,
              }}
            >
              2
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "2.5rem 1.5rem 2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "translateY(-5px)")}
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              <span style={{ fontSize: "2.8rem", marginBottom: "1.7rem" }}>📖</span>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.7rem",
                  letterSpacing: "-0.5px",
                  textTransform: "uppercase",
                  fontFamily: "Poppins, Arial, sans-serif",
                }}
              >
                READ THE REFLECTION
              </h3>
              <p
                style={{
                  color: "#e0e0e0",
                  fontSize: "1rem",
                  fontFamily: "Poppins, Arial, sans-serif",
                  lineHeight: "1.5",
                }}
              >
                Take a quiet moment to read the personalized story or wisdom. Let the words sink in without judgment.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "linear-gradient(45deg, #6e00ff, #9d4edd)",
                color: "#fff",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                fontWeight: "bold",
                boxShadow: "0 8px 32px rgba(110, 0, 255, 0.5)",
                zIndex: 10,
              }}
            >
              3
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "2.5rem 1.5rem 2rem",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) => (e.target.style.transform = "translateY(-5px)")}
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              <span style={{ fontSize: "2.8rem", marginBottom: "1.7rem" }}>🧘</span>
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "0.7rem",
                  letterSpacing: "-0.5px",
                  textTransform: "uppercase",
                  fontFamily: "Poppins, Arial, sans-serif",
                }}
              >
                FIND YOUR CALM
              </h3>
              <p
                style={{
                  color: "#e0e0e0",
                  fontSize: "1rem",
                  fontFamily: "Poppins, Arial, sans-serif",
                  lineHeight: "1.5",
                }}
              >
                Allow the message to offer a new perspective and bring lasting peace to your heart and mind.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "4rem",
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            padding: "2rem 3rem",
            maxWidth: "600px",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontSize: "1.5rem",
              marginBottom: "1rem",
              fontFamily: "Poppins, Arial, sans-serif",
              fontWeight: 600,
            }}
          >
            Ready to Begin Your Journey?
          </h3>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "1rem",
              marginBottom: "1.5rem",
              fontFamily: "Poppins, Arial, sans-serif",
              lineHeight: "1.6",
            }}
          >
            Join thousands who have found peace, clarity, and strength through mindful reflection
          </p>
          <button
            style={{
              background: "linear-gradient(45deg, #fff 0%, #f0f0f0 100%)",
              color: "#000",
              border: "none",
              padding: "14px 32px",
              borderRadius: "999px",
              fontSize: "1rem",
              fontWeight: 600,
              fontFamily: "Poppins, Arial, sans-serif",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 20px rgba(255, 255, 255, 0.2)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)"
              e.target.style.boxShadow = "0 8px 30px rgba(255, 255, 255, 0.3)"
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)"
              e.target.style.boxShadow = "0 4px 20px rgba(255, 255, 255, 0.2)"
            }}
          >
            Start Your Reflection
          </button>
        </div>
      </div>

      <div
        style={{
          minHeight: "100vh",
          background: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "15%",
            left: "8%",
            width: "200px",
            height: "200px",
            background: "rgba(255, 255, 255, 0.02)",
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: "pulse 12s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "12%",
            width: "150px",
            height: "150px",
            background: "rgba(255, 255, 255, 0.025)",
            borderRadius: "50%",
            filter: "blur(60px)",
            animation: "pulse 15s ease-in-out infinite 3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "85%",
            width: "100px",
            height: "100px",
            background: "rgba(255, 255, 255, 0.03)",
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "pulse 8s ease-in-out infinite 1.5s",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.01) 0%, transparent 70%)",
          }}
        />

        <h2
          style={{
            fontFamily: "Oswald, sans-serif",
            fontWeight: 700,
            fontSize: "3rem",
            color: "#fff",
            marginBottom: "1rem",
            letterSpacing: "-1px",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          TRUSTED BY THOUSANDS
        </h2>
        <p
          style={{
            color: "#e0e0e0",
            fontSize: "1.2rem",
            textAlign: "center",
            marginBottom: "4rem",
            fontFamily: "Poppins, Arial, sans-serif",
            maxWidth: "600px",
          }}
        >
          Real stories from people who found peace and clarity through their inner journey
        </p>

        <div
          style={{
            maxWidth: "1200px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem",
          }}
        >
          {/* Testimonial 1 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "2rem",
              textAlign: "left",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⭐⭐⭐⭐⭐</div>
            <p
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
                fontFamily: "Poppins, Arial, sans-serif",
                fontStyle: "italic",
              }}
            >
              "This platform helped me understand my emotions in ways I never thought possible. The reflections are
              deeply meaningful and have brought genuine peace to my daily life."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #ff6b6b, #ffd93d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#fff",
                }}
              >
                S
              </div>
              <div>
                <h4 style={{ color: "#fff", margin: 0, fontFamily: "Poppins, Arial, sans-serif", fontWeight: 600 }}>
                  Sarah Chen
                </h4>
                <p
                  style={{ color: "#e0e0e0", margin: 0, fontSize: "0.9rem", fontFamily: "Poppins, Arial, sans-serif" }}
                >
                  Mindfulness Practitioner
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "2rem",
              textAlign: "left",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⭐⭐⭐⭐⭐</div>
            <p
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
                fontFamily: "Poppins, Arial, sans-serif",
                fontStyle: "italic",
              }}
            >
              "The voice sessions feature is incredible. Being able to express my thoughts and receive personalized
              wisdom has been transformative for my mental health journey."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #4ecdc4, #44a08d)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#fff",
                }}
              >
                M
              </div>
              <div>
                <h4 style={{ color: "#fff", margin: 0, fontFamily: "Poppins, Arial, sans-serif", fontWeight: 600 }}>
                  Michael Rodriguez
                </h4>
                <p
                  style={{ color: "#e0e0e0", margin: 0, fontSize: "0.9rem", fontFamily: "Poppins, Arial, sans-serif" }}
                >
                  Wellness Coach
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "16px",
              padding: "2rem",
              textAlign: "left",
              position: "relative",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⭐⭐⭐⭐⭐</div>
            <p
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginBottom: "1.5rem",
                fontFamily: "Poppins, Arial, sans-serif",
                fontStyle: "italic",
              }}
            >
              "As a therapist, I recommend this platform to my clients. The combination of self-reflection tools and
              wisdom sharing creates a safe space for genuine healing."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "linear-gradient(45deg, #a8edea, #fed6e3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  color: "#333",
                }}
              >
                A
              </div>
              <div>
                <h4 style={{ color: "#fff", margin: 0, fontFamily: "Poppins, Arial, sans-serif", fontWeight: 600 }}>
                  Dr. Aisha Patel
                </h4>
                <p
                  style={{ color: "#e0e0e0", margin: 0, fontSize: "0.9rem", fontFamily: "Poppins, Arial, sans-serif" }}
                >
                  Licensed Therapist
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
            flexWrap: "wrap",
            marginTop: "2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3
              style={{ color: "#fff", fontSize: "2rem", margin: 0, fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
            >
              10K+
            </h3>
            <p style={{ color: "#e0e0e0", margin: 0, fontSize: "0.9rem", fontFamily: "Poppins, Arial, sans-serif" }}>
              Active Users
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{ color: "#fff", fontSize: "2rem", margin: 0, fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
            >
              50K+
            </h3>
            <p style={{ color: "#e0e0e0", margin: 0, fontSize: "0.9rem", fontFamily: "Poppins, Arial, sans-serif" }}>
              Reflections Shared
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <h3
              style={{ color: "#fff", fontSize: "2rem", margin: 0, fontFamily: "Oswald, sans-serif", fontWeight: 700 }}
            >
              4.9★
            </h3>
            <p style={{ color: "#e0e0e0", margin: 0, fontSize: "0.9rem", fontFamily: "Poppins, Arial, sans-serif" }}>
              User Rating
            </p>
          </div>
        </div>
      </div>

      <footer
        style={{
          background: "black",
          padding: "3rem 2rem 2rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.005) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.005) 0%, transparent 50%)
            `,
          }}
        />

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Brand Section */}
          <div>
            <h3
              style={{
                color: "#fff",
                fontSize: "1.5rem",
                marginBottom: "1rem",
                fontFamily: "Oswald, sans-serif",
                fontWeight: 700,
              }}
            >
              Beautiful Life
            </h3>
            <p
              style={{
                color: "#e0e0e0",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                fontFamily: "Poppins, Arial, sans-serif",
                marginBottom: "1rem",
              }}
            >
              Your trusted companion for inner peace, self-reflection, and mental wellness. Transform your life one
              reflection at a time.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              <span style={{ color: "#6e00ff", fontSize: "1.2rem" }}>🔒</span>
              <span style={{ color: "#e0e0e0", fontSize: "0.8rem", fontFamily: "Poppins, Arial, sans-serif" }}>
                Your privacy is our priority
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 600,
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["About Us", "How It Works", "Privacy Policy", "Terms of Service", "Contact Support"].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: "#e0e0e0",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontFamily: "Poppins, Arial, sans-serif",
                    transition: "color 0.2s",
                  }}
                  onMouseOver={(e) => (e.target.style.color = "#6e00ff")}
                  onMouseOut={(e) => (e.target.style.color = "#e0e0e0")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 600,
              }}
            >
              Features
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {["Voice Sessions", "Daily Reflections", "Wisdom Library", "Progress Tracking", "Community Support"].map(
                (feature) => (
                  <span
                    key={feature}
                    style={{
                      color: "#e0e0e0",
                      fontSize: "0.9rem",
                      fontFamily: "Poppins, Arial, sans-serif",
                    }}
                  >
                    {feature}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                marginBottom: "1rem",
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 600,
              }}
            >
              Get Started Today
            </h4>
            <p
              style={{
                color: "#e0e0e0",
                fontSize: "0.9rem",
                marginBottom: "1rem",
                fontFamily: "Poppins, Arial, sans-serif",
              }}
            >
              Join thousands finding peace and clarity
            </p>
            <button
              style={{
                background: "linear-gradient(45deg, #6e00ff, #9d4edd)",
                color: "#fff",
                border: "none",
                padding: "0.75rem 1.5rem",
                borderRadius: "25px",
                fontSize: "0.9rem",
                fontFamily: "Poppins, Arial, sans-serif",
                fontWeight: 600,
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
              onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
            >
              Start Your Journey
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              color: "#888",
              fontSize: "0.8rem",
              margin: 0,
              fontFamily: "Poppins, Arial, sans-serif",
            }}
          >
            © 2024 Beautiful Life Experiences. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span style={{ color: "#888", fontSize: "0.8rem", fontFamily: "Poppins, Arial, sans-serif" }}>
              Made with ❤️ for mental wellness
            </span>
          </div>
        </div>
      </footer>
    </React.Fragment>
  )
}
