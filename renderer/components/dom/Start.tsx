import { MoveDown } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export default function Start() {
  const [buttonTop, setButtonTop] = useState(0);
  // find the top and right of the New workspace button
  useEffect(() => {
    const button = document.querySelector('button#new-workspace')! as HTMLButtonElement;
    const { top } = button.getBoundingClientRect();
    setButtonTop(top);
  });

  return (
    <motion.div className="absolute z-10 top-0 left-0 w-full h-full bg-black/20 backdrop-blur-xs flex flex-col justify-center items-center text-white">
      <div className="font-fancy text-4xl">welcome to</div>
      <div className="font-bold font-display text-8xl">lyra</div>
      {/* image of - logo.png */}

      <div className="mt-6">Start by creating a workspace!</div>
      <div className="absolute left-5 rotate-90 flex gap-5" style={{
        top: buttonTop - 10,
      }}>
        <MoveDown aria-label="" className="size-16 -scale-100 animate-bounce" />
      </div>
    </motion.div>
  )
}