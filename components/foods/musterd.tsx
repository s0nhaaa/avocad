import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    bottleMusterd: THREE.Mesh
  }
  materials: {
    yellow: THREE.MeshStandardMaterial
  }
}

export function Musterd(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/musterd.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.bottleMusterd.geometry} material={materials.yellow} scale={0.208} />
    </group>
  )
}

useGLTF.preload("/models/foods/musterd.glb")
