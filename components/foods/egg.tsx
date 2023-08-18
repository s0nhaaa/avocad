import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_eggHalf: THREE.Mesh
    Mesh_eggHalf_1: THREE.Mesh
    Mesh_eggHalf_2: THREE.Mesh
  }
  materials: {
    _defaultMat: THREE.MeshStandardMaterial
    brownLight: THREE.MeshStandardMaterial
    yellow: THREE.MeshStandardMaterial
  }
}

export function Egg(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/egg.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_eggHalf.geometry} material={materials._defaultMat} />
      <mesh geometry={nodes.Mesh_eggHalf_1.geometry} material={materials.brownLight} />
      <mesh geometry={nodes.Mesh_eggHalf_2.geometry} material={materials.yellow} />
    </group>
  )
}

useGLTF.preload("/models/foods/egg.glb")
