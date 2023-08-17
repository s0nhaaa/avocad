import { useGLTF } from "@react-three/drei"
import { CuboidCollider, RigidBody } from "@react-three/rapier"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    tileLarge_forest445: THREE.Mesh
  }
  materials: {
    Material: THREE.MeshStandardMaterial
  }
}

export function MapPhysic(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/map-2-texture-transformed.glb") as GLTFResult
  return (
    <>
      <RigidBody type="fixed" position={[0, -1, -9]}>
        <CuboidCollider args={[45, 1, 24]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-63, -1, -12]}>
        <CuboidCollider args={[6, 1, 9]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-51, -1, -12]}>
        <CuboidCollider args={[6, 1, 3]} />
      </RigidBody>

      <RigidBody type="fixed" position={[0, 2, 18]}>
        <CuboidCollider args={[45, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-51, 2, 3]}>
        <CuboidCollider args={[6, 5, 12]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-51, 2, -21]}>
        <CuboidCollider args={[6, 5, 6]} />
      </RigidBody>
      <RigidBody type="fixed" position={[48, 2, -6]}>
        <CuboidCollider args={[3, 5, 21]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-72, 2, -12]}>
        <CuboidCollider args={[3, 5, 9]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-63, 2, -21]}>
        <CuboidCollider args={[6, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-63, 2, 0]}>
        <CuboidCollider args={[6, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-63, 2, 0]}>
        <CuboidCollider args={[6, 5, 3]} />
      </RigidBody>

      <RigidBody type="fixed" position={[-6, 2, -6]}>
        <CuboidCollider args={[3, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-1, 2, -10]}>
        <CuboidCollider args={[4, 5, 1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[18, 2, -24]}>
        <CuboidCollider args={[9, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-27, 2, -24]}>
        <CuboidCollider args={[12, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-28, 2, -18]}>
        <CuboidCollider args={[11, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-30, 2, -12]}>
        <CuboidCollider args={[3, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-44, 2, -22]}>
        <CuboidCollider args={[1, 5, 5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-42, 2, 12]}>
        <CuboidCollider args={[3, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-44, 2, 5]}>
        <CuboidCollider args={[1, 5, 4]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-36, 2, 13]}>
        <CuboidCollider args={[3, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-38, 2, 8]}>
        <CuboidCollider args={[1, 5, 1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[6, 2, -21]}>
        <CuboidCollider args={[3, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 2, 1]}>
        <CuboidCollider args={[2.2, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-7, 2, 1]}>
        <CuboidCollider args={[2, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[29, 2, 0]}>
        <CuboidCollider args={[3, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[30, 2, 4]}>
        <CuboidCollider args={[3, 5, 1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[26, 2, 1]}>
        <CuboidCollider args={[2, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[36, 2, -17]}>
        <CuboidCollider args={[3, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[42, 2, -24]}>
        <CuboidCollider args={[3, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[40, 2, 7]}>
        <CuboidCollider args={[2, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-28, 2, 0.4]}>
        <CuboidCollider args={[1, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-1, 2, -7]}>
        <CuboidCollider args={[2, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[9, 2, 8.5]}>
        <CuboidCollider args={[2, 5, 0.5]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-14, 2, -3]}>
        <CuboidCollider args={[0.5, 5, 1]} />
      </RigidBody>
      <RigidBody type="fixed" position={[-2, 2, -15]}>
        <CuboidCollider args={[0.5, 5, 2]} />
      </RigidBody>
      <RigidBody type="fixed" position={[15, 2, -15.5]}>
        <CuboidCollider args={[1, 5, 0.5]} />
      </RigidBody>

      <RigidBody type="fixed" position={[0, 2, -30]}>
        <CuboidCollider args={[45, 5, 3]} />
      </RigidBody>
      <RigidBody type="fixed" position={[0, 2, -30]}>
        <CuboidCollider args={[45, 5, 3]} />
      </RigidBody>

      <group {...props} dispose={null}>
        <mesh castShadow receiveShadow geometry={nodes.tileLarge_forest445.geometry} material={materials.Material} />
      </group>
    </>
  )
}

useGLTF.preload("/models/map-2-texture-transformed.glb")
