import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei"
import React from "react"

export default function Camera() {
  return <PerspectiveCamera makeDefault position={[0, 15, 25]} />
}
