import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_fish: THREE.Mesh
    Mesh_fish_1: THREE.Mesh
    Mesh_fish_2: THREE.Mesh
  }
  materials: {
    pink: THREE.MeshStandardMaterial
    greyLight: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
  }
}

export function Fish(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/fish.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_fish.geometry} material={materials.pink} />
      <mesh geometry={nodes.Mesh_fish_1.geometry} material={materials.greyLight} />
      <mesh geometry={nodes.Mesh_fish_2.geometry} material={materials._defaultMat} />
    </group>
  )
}

useGLTF.preload("/models/foods/fish.glb")
