import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_coconutHalf: THREE.Mesh
    Mesh_coconutHalf_1: THREE.Mesh
  }
  materials: {
    brownDark: THREE.MeshStandardMaterial
    _defaultMat: THREE.MeshStandardMaterial
  }
}

export function Coconut(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/coconut.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group scale={[1.464, 1.747, 1.464]}>
        <mesh geometry={nodes.Mesh_coconutHalf.geometry} material={materials.brownDark} />
        <mesh geometry={nodes.Mesh_coconutHalf_1.geometry} material={materials._defaultMat} />
      </group>
    </group>
  )
}

useGLTF.preload("/models/foods/coconut.glb")
