"use client"

import Header from "./header"
import Spline from "@splinetool/react-spline"
import React from "react"

export default function HeroContent() {
  return (
    <React.Fragment>
      <div
        style={{
         background: "black",
          minHeight: "100vh",
          position: "relative",
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
        <main
          style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              minHeight: "65vh",
              textAlign: "center",
              marginTop: "14vh",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-sm mb-4 relative"
              style={{
                filter: "url(#glass-effect)",
              }}
            >
              <div className="absolute top-0 left-1 right-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
              <span className="text-white/90 text-xs font-light relative z-10">
                ✨ Transform your inner self
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl md:leading-16 tracking-tight font-light text-white mb-4">
              <span className="font-medium italic instrument">Beautiful</span> Life
              <br />
              <span className="font-light tracking-tight text-white">
                Experiences
              </span>
            </h1>

            {/* Description */}
            <p className="text-xs font-light text-white/70 mb-4 leading-relaxed">
              This space is designed to be a mirror for your soul, helping you to look within, understand your feelings, and find the immense strength and peace you already possess. 
            </p>

            {/* Buttons */}
            <div
              className="flex items-center gap-4 flex-wrap"
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <button className="px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-normal text-xs transition-all duration-200 hover:bg-white/10 hover:border-white/50 cursor-pointer">
                Discover More
              </button>
              <button className="px-8 py-3 rounded-full bg-white text-black font-normal text-xs transition-all duration-200 hover:bg-white/90 cursor-pointer">
                Get Started
              </button>
            </div>
          </div>
        </main>
      </div>
      {/* Blank page below landing */}
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #000 0%, #6e00ff 100%)" }}></div>
    </React.Fragment>
  )
}
