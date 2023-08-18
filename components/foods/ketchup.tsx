import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    bottleKetchup: THREE.Mesh
  }
  materials: {
    red: THREE.MeshStandardMaterial
  }
}

export function Ketchup(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/ketchup.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.bottleKetchup.geometry} material={materials.red} scale={0.208} />
    </group>
  )
}

useGLTF.preload("/models/foods/ketchup.glb")
