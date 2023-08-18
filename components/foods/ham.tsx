import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_wholeHam: THREE.Mesh
    Mesh_wholeHam_1: THREE.Mesh
    Mesh_wholeHam_2: THREE.Mesh
    Mesh_wholeHam_3: THREE.Mesh
  }
  materials: {
    brownDark: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
    brownLight: THREE.MeshStandardMaterial
    orange: THREE.MeshStandardMaterial
  }
}

export function Ham(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/ham.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_wholeHam.geometry} material={materials.brownDark} />
      <mesh geometry={nodes.Mesh_wholeHam_1.geometry} material={materials._defaultMat} />
      <mesh geometry={nodes.Mesh_wholeHam_2.geometry} material={materials.brownLight} />
      <mesh geometry={nodes.Mesh_wholeHam_3.geometry} material={materials.orange} />
    </group>
  )
}

useGLTF.preload("/models/foods/ham.glb")
