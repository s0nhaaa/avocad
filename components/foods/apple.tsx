import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_appleHalf: THREE.Mesh
    Mesh_appleHalf_1: THREE.Mesh
    Mesh_appleHalf_2: THREE.Mesh
    Mesh_appleHalf_3: THREE.Mesh
  }
  materials: {
    red: THREE.MeshStandardMaterial
    brown: THREE.MeshStandardMaterial
    brownLight: THREE.MeshStandardMaterial
    brownDark: THREE.MeshStandardMaterial
  }
}

export function Apple(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/apple.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_appleHalf.geometry} material={materials.red} />
      <mesh geometry={nodes.Mesh_appleHalf_1.geometry} material={materials.brown} />
      <mesh geometry={nodes.Mesh_appleHalf_2.geometry} material={materials.brownLight} />
      <mesh geometry={nodes.Mesh_appleHalf_3.geometry} material={materials.brownDark} />
    </group>
  )
}

useGLTF.preload("/models/foods/apple.glb")
