import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";

function ParallaxText({ children, baseVelocity = 100 }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div style={{
      overflow: "hidden",
      letterSpacing: "-2px",
      lineHeight: "0.8",
      margin: 0,
      whiteSpace: "nowrap",
      display: "flex",
      flexWrap: "nowrap",
      width: "100%",
      background: "none",
      padding: "0"
    }}>
      <motion.div style={{
        x,
        fontWeight: 600,
        textTransform: "uppercase",
        fontSize: "64px",
        display: "flex",
        whiteSpace: "nowrap",
        flexWrap: "nowrap",
        gap: "30px"
      }}>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
        <span style={{ display: "block", marginRight: "30px" }}>{children} </span>
      </motion.div>
    </div>
  );
}

export default ParallaxText;
