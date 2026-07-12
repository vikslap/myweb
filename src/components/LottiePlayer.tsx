"use client";

import dynamic from "next/dynamic";
import heroAnimation from "../../public/hero-animation.json";

// Dynamically import the core Lottie player inside this Client Component
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottiePlayer() {
  return (
    <Lottie
      animationData={heroAnimation}
      loop={true}
      autoplay={true}
      className="w-full h-full object-contain"
    />
  );
}
