import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    glass: THREE.Mesh
  }
  materials: {
    _defaultMat: THREE.MeshStandardMaterial
  }
}

export function Glass(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/glass.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.glass.geometry} material={materials._defaultMat} />
    </group>
  )
}

useGLTF.preload("/models/foods/glass.glb")
