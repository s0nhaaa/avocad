import { database } from "@/services/firebase"
import usePlayerStore from "@/stores/player"
import { Float, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { CapsuleCollider, Physics, RigidBody } from "@react-three/rapier"
import { useWallet } from "@solana/wallet-adapter-react"
import { onValue, ref, remove } from "firebase/database"
import { Suspense, useEffect } from "react"
import { MapPhysic } from "./map-physic"
import MainPlayerPhysic from "./player/main-physic"
import OtherPlayers from "./player/others"
import { Apple } from "./foods/apple"
import { Avocado } from "./foods/avocado"
import { Bacon } from "./foods/bacon"
import { Banana } from "./foods/banana"
import { Fish } from "./foods/fish"
import { Chopstick } from "./foods/chopstick"
import { Cheese } from "./foods/cheese"
import { Glass } from "./foods/glass"
import Material from "./material"

export default function Scene() {
  const [players, setPlayers] = usePlayerStore((state) => [state.players, state.setPlayers])
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
    <div className="w-screen h-screen bg-gradient-to-b from-emerald-300 from-10% to-emerald-500 to-90%">
      <Canvas>
        <ambientLight intensity={2} />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} castShadow />

        <Suspense>
          <Physics debug gravity={[0, -9.82, 0]}>
            {/* <group>
              <Float position={[4, 0.25, 4]} scale={3} speed={2} rotationIntensity={2} floatingRange={[0.1, 0.15]}>
                <Glass />
              </Float>
              <RigidBody type="fixed" enabledRotations={[false, false, false]} position={[4, 0.25, 4]}>
                <CapsuleCollider args={[2, 0.25]} />
              </RigidBody>
              <RigidBody type="fixed" enabledRotations={[false, false, false]} position={[4, 0.25, 4]}>
                <CapsuleCollider
                  name="avocado"
                  args={[2, 0.5]}
                  sensor
                  onIntersectionEnter={(e) => console.log(e.target.colliderObject?.name)}
                />
              </RigidBody>
            </group> */}

            <Material />

            <MainPlayerPhysic id={publicKey?.toString()} />
            <MapPhysic position={[0, -1, 0]} />
          </Physics>
        </Suspense>

        <OtherPlayers players={players} mainPlayerId={publicKey?.toString()} />
      </Canvas>
    </div>
  )
}
