import * as THREE from "three"
import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    pizzaBox: THREE.Mesh
    lid: THREE.Mesh
  }
  materials: {
    _defaultMat: THREE.MeshStandardMaterial
  }
}

export function Pizzabox(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/foods/pizzabox.glb") as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.pizzaBox.geometry} material={materials._defaultMat}>
        <mesh
          geometry={nodes.lid.geometry}
          material={materials._defaultMat}
          position={[0.242, 0.486, 0]}
          rotation={[0, 0, 2.094]}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload("/models/foods/pizzabox.glb")
