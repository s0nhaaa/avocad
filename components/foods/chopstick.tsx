import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Mesh_chopstickFancy: THREE.Mesh
    Mesh_chopstickFancy_1: THREE.Mesh
    Mesh_chopstickFancy_2: THREE.Mesh
    Mesh_chopstickFancy001: THREE.Mesh
    Mesh_chopstickFancy001_1: THREE.Mesh
    Mesh_chopstickFancy001_2: THREE.Mesh
  }
  materials: {
    brown: THREE.MeshStandardMaterial
    red: THREE.MeshStandardMaterial
    brownLight: THREE.MeshStandardMaterial
  }
}

export function Chopstick(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/chopstick.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <group position={[0.012, 0, 0]}>
        <mesh geometry={nodes.Mesh_chopstickFancy.geometry} material={materials.brown} />
        <mesh geometry={nodes.Mesh_chopstickFancy_1.geometry} material={materials.red} />
        <mesh geometry={nodes.Mesh_chopstickFancy_2.geometry} material={materials.brownLight} />
      </group>
      <group position={[-0.013, 0, 0]}>
        <mesh geometry={nodes.Mesh_chopstickFancy001.geometry} material={materials.brown} />
        <mesh geometry={nodes.Mesh_chopstickFancy001_1.geometry} material={materials.red} />
        <mesh geometry={nodes.Mesh_chopstickFancy001_2.geometry} material={materials.brownLight} />
      </group>
    </group>
  )
}

useGLTF.preload("/models/foods/chopstick.glb")
