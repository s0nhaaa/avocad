import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    chocolate: THREE.Mesh
  }
  materials: {
    brownDark: THREE.MeshStandardMaterial
  }
}

export function Chocolate(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/chocolate.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.chocolate.geometry} material={materials.brownDark} />
    </group>
  )
}

useGLTF.preload("/models/foods/chocolate.glb")
