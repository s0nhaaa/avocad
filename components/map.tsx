import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Cube027: THREE.Mesh
    Cube027_1: THREE.Mesh
    Cube027_2: THREE.Mesh
    Cube027_3: THREE.Mesh
  }
  materials: {
    ["Green.004"]: THREE.MeshStandardMaterial
    ["BrownDark.015"]: THREE.MeshStandardMaterial
    ["Beige.007"]: THREE.MeshStandardMaterial
    ["BrownDark.014"]: THREE.MeshStandardMaterial
  }
}

export default function Map(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/map.glb") as GLTFResult

  return (
    <group {...props} dispose={null}>
      <group position={[19.1, 0, -0.105]}>
        <mesh geometry={nodes.Cube027.geometry} material={materials["Green.004"]} />
        <mesh geometry={nodes.Cube027_1.geometry} material={materials["BrownDark.015"]} />
        <mesh geometry={nodes.Cube027_2.geometry} material={materials["Beige.007"]} />
        <mesh geometry={nodes.Cube027_3.geometry} material={materials["BrownDark.014"]} />
      </group>
    </group>
  )
}

useGLTF.preload("/models/map.glb")
