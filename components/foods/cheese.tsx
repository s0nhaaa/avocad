import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_cheeseCut: THREE.Mesh
    Mesh_cheeseCut_1: THREE.Mesh
    Mesh_cheeseCut_2: THREE.Mesh
  }
  materials: {
    brownLight: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
    yellow: THREE.MeshStandardMaterial
  }
}

export function Cheese(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/cheese.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_cheeseCut.geometry} material={materials.brownLight} />
      <mesh geometry={nodes.Mesh_cheeseCut_1.geometry} material={materials._defaultMat} />
      <mesh geometry={nodes.Mesh_cheeseCut_2.geometry} material={materials.yellow} />
    </group>
  )
}

useGLTF.preload("/models/foods/cheese.glb")
