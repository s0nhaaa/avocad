import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_lemonHalf001: THREE.Mesh
    Mesh_lemonHalf001_1: THREE.Mesh
    Mesh_lemonHalf001_2: THREE.Mesh
  }
  materials: {
    yellow: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
    brownDark: THREE.MeshStandardMaterial
  }
}

export function Lemon(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/lemon.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_lemonHalf001.geometry} material={materials.yellow} />
      <mesh geometry={nodes.Mesh_lemonHalf001_1.geometry} material={materials._defaultMat} />
      <mesh geometry={nodes.Mesh_lemonHalf001_2.geometry} material={materials.brownDark} />
    </group>
  )
}

useGLTF.preload("/models/foods/lemon.glb")
