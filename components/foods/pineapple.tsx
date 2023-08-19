import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_pineapple: THREE.Mesh
    Mesh_pineapple_1: THREE.Mesh
  }
  materials: {
    "yellow.001": THREE.MeshStandardMaterial
    green: THREE.MeshStandardMaterial
  }
}

export function Pineapple(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/pineapple.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_pineapple.geometry} material={materials["yellow.001"]} />
      <mesh geometry={nodes.Mesh_pineapple_1.geometry} material={materials.green} />
    </group>
  )
}

useGLTF.preload("/models/foods/pineapple.glb")
