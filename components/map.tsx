import { useGLTF } from "@react-three/drei"
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

export function Map(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/map-2-texture-transformed.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.tileLarge_forest445.geometry} material={materials.Material} />
    </group>
  )
}

useGLTF.preload("/models/map-2-texture-transformed.glb")
