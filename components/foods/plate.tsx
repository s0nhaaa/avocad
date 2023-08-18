import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    plateDeep: THREE.Mesh
  }
  materials: {
    _defaultMat: THREE.MeshStandardMaterial
  }
}

export function Plate(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/plate.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.plateDeep.geometry} material={materials._defaultMat} scale={[1, 1.61, 1]} />
    </group>
  )
}

useGLTF.preload("/models/foods/plate.glb")
