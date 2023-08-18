import useMaterial from "@/hooks/useMaterial"
import { Float, Html } from "@react-three/drei"
import { CapsuleCollider, CollisionPayload, RigidBody } from "@react-three/rapier"
import { Avocado } from "./foods/avocado"

export default function Material() {
  const [intersected, setIntersected, setMaterial] = useMaterial((s) => [
    s.intersected,
    s.setIntersected,
    s.setMaterial,
  ])

  const intersectionEnter = (e: CollisionPayload) => {
    setIntersected(true)
    setMaterial(e.target.colliderObject?.name || "")
  }

  const intersectionExit = (e: CollisionPayload) => {
    setIntersected(false)
  }

  return (
    <group position={[4, 0.25, 4]}>
      <Float scale={3} speed={2} rotationIntensity={2} floatingRange={[0.12, 0.25]}>
        <Avocado />
      </Float>
      <RigidBody type="fixed" enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[2, 0.25]} />
      </RigidBody>
      <RigidBody type="fixed" enabledRotations={[false, false, false]}>
        <CapsuleCollider
          name="avocado"
          args={[2, 0.5]}
          sensor
          onIntersectionEnter={intersectionEnter}
          onCollisionExit={intersectionExit}
        />
      </RigidBody>
      {intersected && (
        <Html position={[0, 1.75, 0]} center>
          <div className="px-3 pb-1 pt-1 rounded-lg bg-base-200/80 select-none">
            <span className="text-center">Banana</span>
          </div>
        </Html>
      )}
    </group>
  )
}
