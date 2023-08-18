import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_fryingPan: THREE.Mesh
    Mesh_fryingPan_1: THREE.Mesh
  }
  materials: {
    greyDark: THREE.MeshStandardMaterial
    brown: THREE.MeshStandardMaterial
  }
}

export function Pan(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/pan.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_fryingPan.geometry} material={materials.greyDark} />
      <mesh geometry={nodes.Mesh_fryingPan_1.geometry} material={materials.brown} />
    </group>
  )
}

useGLTF.preload("/models/foods/pan.glb")
