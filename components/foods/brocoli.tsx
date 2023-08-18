import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_broccoli: THREE.Mesh
    Mesh_broccoli_1: THREE.Mesh
  }
  materials: {
    greenDark: THREE.MeshStandardMaterial
    green: THREE.MeshStandardMaterial
  }
}

export function Brocoli(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/brocoli.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_broccoli.geometry} material={materials.greenDark} />
      <mesh geometry={nodes.Mesh_broccoli_1.geometry} material={materials.green} />
    </group>
  )
}

useGLTF.preload("/models/foods/brocoli.glb")
