import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_cabbage: THREE.Mesh
    Mesh_cabbage_1: THREE.Mesh
  }
  materials: {
    green: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
  }
}

export function Cabbage(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/cabbage.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_cabbage.geometry} material={materials.green} />
      <mesh geometry={nodes.Mesh_cabbage_1.geometry} material={materials._defaultMat} />
    </group>
  )
}

useGLTF.preload("/models/foods/cabbage.glb")
