import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_banana: THREE.Mesh
    Mesh_banana_1: THREE.Mesh
  }
  materials: {
    brownDark: THREE.MeshStandardMaterial
    yellow: THREE.MeshStandardMaterial
  }
}

export function Banana(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/banana.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_banana.geometry} material={materials.brownDark} />
      <mesh geometry={nodes.Mesh_banana_1.geometry} material={materials.yellow} />
    </group>
  )
}

useGLTF.preload("/models/foods/banana.glb")
