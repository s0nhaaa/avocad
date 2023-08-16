import { auth, database } from "@/services/firebase"
import usePlayerStore from "@/stores/player"
import { Environment, PerspectiveCamera, shaderMaterial } from "@react-three/drei"
import { Canvas, extend, useThree } from "@react-three/fiber"
import { useWallet } from "@solana/wallet-adapter-react"
import { onAuthStateChanged, signInAnonymously } from "firebase/auth"
import { onValue, ref, remove, set } from "firebase/database"
import { useEffect, useMemo, useState } from "react"
import Map from "./map"
import MainPlayer from "./player/main"
import OtherPlayers from "./player/others"
import useMainPlayer from "@/hooks/useMainPlayer"
import { DataTexture, LuminanceFormat, RedFormat, Layers, BackSide } from "three"
import { Selection, Select, EffectComposer, Outline } from "@react-three/postprocessing"
import Avo from "./player/avo"

function S() {
  const gl = useThree((s) => s.gl)

  const gradientMap = useMemo(() => {
    const alphaIndex = 0
    const format = gl.capabilities.isWebGL2 ? RedFormat : LuminanceFormat

    const colors = new Uint8Array(alphaIndex + 2)
    for (let c = 0; c <= colors.length; c++) {
      colors[c] = (c / colors.length) * 256
    }
    const gradientMap = new DataTexture(colors, colors.length, 1, format)
    gradientMap.needsUpdate = true
    return gradientMap
  }, [gl])

  return (
    <group>
      <mesh>
        <sphereGeometry />
        {/* <meshToonMaterial color={"#ffaa00"} gradientMap={gradientMap} /> */}
      </mesh>
      <mesh scale={1.02}>
        <sphereGeometry />
        <meshBasicMaterial color={"#000000"} side={BackSide} />
      </mesh>
    </group>
  )
}

export default function Scene() {
  const [players, setPlayers] = usePlayerStore((state) => [state.players, state.setPlayers])
  const user = useMainPlayer()

  const { publicKey } = useWallet()

  useEffect(() => {
    onValue(ref(database, "players"), (snapshot) => {
      setPlayers(snapshot.val())
    })

    window.addEventListener("beforeunload", (event) => {
      remove(ref(database, `players/${publicKey?.toString()}`))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen h-screen bg-white">
      <Canvas>
        <ambientLight intensity={1} />
        {/* <directionalLight castShadow position={[1, 1, 1]} intensity={0.8} /> */}

        <PerspectiveCamera makeDefault position={[0, 5, 10]} castShadow />
        <MainPlayer id={publicKey?.toString()} />

        <OtherPlayers players={players} mainPlayerId={publicKey?.toString()} />

        <Map position={[0, -1, 0]} />

        {/* <S /> */}
      </Canvas>
    </div>
  )
}
