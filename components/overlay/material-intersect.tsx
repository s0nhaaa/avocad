import useMaterial from "@/hooks/useMaterial"
import React from "react"

import { Variants, motion } from "framer-motion"

const variants = {
  show: {
    opacity: 1,
    y: 0,
    translateX: "-50%",
  },
  hidden: {
    opacity: 0,
    y: -100,
    translateX: "-50%",
  },
} as Variants

export default function MaterialIntersect() {
  const [intersected, material] = useMaterial((s) => [s.intersected, s.material])

  return (
    <motion.div
      animate={intersected ? "show" : "hidden"}
      variants={variants}
      className="bg-base-100 px-4 py-2 left-[50%] top-6 rounded-xl absolute"
    >
      Press <kbd className="kbd kbd-md">Space</kbd> to claim {material}
    </motion.div>
  )
}
