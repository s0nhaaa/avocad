import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_bread: THREE.Mesh
    Mesh_bread_1: THREE.Mesh
  }
  materials: {
    brown: THREE.MeshStandardMaterial
    brownLight: THREE.MeshStandardMaterial
  }
}

export function Bread(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/bread.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_bread.geometry} material={materials.brown} />
      <mesh geometry={nodes.Mesh_bread_1.geometry} material={materials.brownLight} />
    </group>
  )
}

useGLTF.preload("/models/foods/bread.glb")
