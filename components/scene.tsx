import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import Avo from "./avo"
import Map from "./map"

export default function Scene() {
  return (
    <div className="w-screen h-screen bg-base-100">
      <Canvas>
        <ambientLight intensity={1} />

        <OrbitControls />

        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <Avo scale={[0.5, 0.5, 0.5]} />

        <Map position={[0, -1, 0]} />
      </Canvas>
    </div>
  )
}
