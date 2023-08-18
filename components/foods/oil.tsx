import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_bottleOil: THREE.Mesh
    Mesh_bottleOil_1: THREE.Mesh
    Mesh_bottleOil_2: THREE.Mesh
  }
  materials: {
    green: THREE.MeshStandardMaterial
    brown: THREE.MeshStandardMaterial
    brownLight: THREE.MeshStandardMaterial
  }
}

export function Oil(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/oil.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_bottleOil.geometry} material={materials.green} />
      <mesh geometry={nodes.Mesh_bottleOil_1.geometry} material={materials.brown} />
      <mesh geometry={nodes.Mesh_bottleOil_2.geometry} material={materials.brownLight} />
    </group>
  )
}

useGLTF.preload("/models/foods/oil.glb")
