import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_avocadoHalf: THREE.Mesh
    Mesh_avocadoHalf_1: THREE.Mesh
    Mesh_avocadoHalf_2: THREE.Mesh
    pit: THREE.Mesh
  }
  materials: {
    green: THREE.MeshStandardMaterial
    brownDarkest: THREE.MeshStandardMaterial
    brownDark: THREE.MeshStandardMaterial
  }
}

export function Avocado(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/avocado.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group scale={0.532}>
        <mesh geometry={nodes.Mesh_avocadoHalf.geometry} material={materials.green} />
        <mesh geometry={nodes.Mesh_avocadoHalf_1.geometry} material={materials.brownDarkest} />
        <mesh geometry={nodes.Mesh_avocadoHalf_2.geometry} material={materials.brownDark} />
        <mesh geometry={nodes.pit.geometry} material={materials.brownDark} position={[0, 0.16, 0]} scale={0.38} />
      </group>
    </group>
  )
}

useGLTF.preload("/models/foods/avocado.glb")
