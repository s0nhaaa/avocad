import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_mushroom: THREE.Mesh
    Mesh_mushroom_1: THREE.Mesh
  }
  materials: {
    brownDark: THREE.MeshStandardMaterial
    brownLight: THREE.MeshStandardMaterial
  }
}

export function Mushroom(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/mushroom.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_mushroom.geometry} material={materials.brownDark} />
      <mesh geometry={nodes.Mesh_mushroom_1.geometry} material={materials.brownLight} />
    </group>
  )
}

useGLTF.preload("/models/foods/mushroom.glb")
