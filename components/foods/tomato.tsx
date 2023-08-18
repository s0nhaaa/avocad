import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_tomatoSlice: THREE.Mesh
    Mesh_tomatoSlice_1: THREE.Mesh
  }
  materials: {
    red: THREE.MeshStandardMaterial
    redLight: THREE.MeshStandardMaterial
  }
}

export function Tomato(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/tomato.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_tomatoSlice.geometry} material={materials.red} />
      <mesh geometry={nodes.Mesh_tomatoSlice_1.geometry} material={materials.redLight} />
    </group>
  )
}

useGLTF.preload("/models/foods/tomato.glb")
