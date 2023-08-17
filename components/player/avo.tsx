import { AvoActionName } from "@/types/player"
import { useAnimations, useGLTF } from "@react-three/drei"
import { useGraph } from "@react-three/fiber"
import { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { GLTF, SkeletonUtils } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    Cylinder001: THREE.SkinnedMesh
    Cylinder001_1: THREE.SkinnedMesh
    Cylinder001_2: THREE.SkinnedMesh
    Cylinder001_3: THREE.SkinnedMesh
    Cylinder001_4: THREE.SkinnedMesh
    Cylinder001_5: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
    Ctrl_Master: THREE.Bone
    Ctrl_ArmPole_IK_Left: THREE.Bone
    Ctrl_Hand_IK_Left: THREE.Bone
    Ctrl_ArmPole_IK_Right: THREE.Bone
    Ctrl_Hand_IK_Right: THREE.Bone
    Ctrl_Foot_IK_Left: THREE.Bone
    Ctrl_LegPole_IK_Left: THREE.Bone
    Ctrl_Foot_IK_Right: THREE.Bone
    Ctrl_LegPole_IK_Right: THREE.Bone
  }
  materials: {
    ["body-skin.001"]: THREE.MeshStandardMaterial
    face: THREE.MeshStandardMaterial
    ["dark-skin.001"]: THREE.MeshStandardMaterial
    ["medium-skin.001"]: THREE.MeshStandardMaterial
    ["light-skin.001"]: THREE.MeshStandardMaterial
    outline: THREE.MeshStandardMaterial
  }
}

type GLTFActions = Record<AvoActionName, THREE.AnimationAction>

export default function Avo(props: JSX.IntrinsicElements["group"] & { anim: AvoActionName }) {
  const player = useRef<THREE.Group | null>(null)
  const { materials, animations, scene } = useGLTF("/models/avo-outline.glb") as GLTFResult
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone) as GLTFResult
  const { actions, mixer } = useAnimations(animations, player)

  useEffect(() => {
    props.anim && (actions as GLTFActions)[props.anim].reset().fadeIn(0.2).play()

    return () => {
      ;(actions as GLTFActions)[props.anim]?.fadeOut(0.2)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.anim])

  return (
    <group ref={player} {...props} dispose={null} position={[0, -0.08, 0]} scale={[0.5, 0.5, 0.5]}>
      <group name="Scene">
        <group name="Armature">
          <primitive object={nodes.mixamorigHips} />
          <primitive object={nodes.Ctrl_Master} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Left} />
          <primitive object={nodes.Ctrl_Hand_IK_Left} />
          <primitive object={nodes.Ctrl_ArmPole_IK_Right} />
          <primitive object={nodes.Ctrl_Hand_IK_Right} />
          <primitive object={nodes.Ctrl_Foot_IK_Left} />
          <primitive object={nodes.Ctrl_LegPole_IK_Left} />
          <primitive object={nodes.Ctrl_Foot_IK_Right} />
          <primitive object={nodes.Ctrl_LegPole_IK_Right} />
          <group name="body001">
            <skinnedMesh
              name="Cylinder001"
              geometry={nodes.Cylinder001.geometry}
              material={materials["body-skin.001"]}
              skeleton={nodes.Cylinder001.skeleton}
            />
            <skinnedMesh
              name="Cylinder001_1"
              geometry={nodes.Cylinder001_1.geometry}
              material={materials.face}
              skeleton={nodes.Cylinder001_1.skeleton}
            />
            <skinnedMesh
              name="Cylinder001_2"
              geometry={nodes.Cylinder001_2.geometry}
              material={materials["dark-skin.001"]}
              skeleton={nodes.Cylinder001_2.skeleton}
            />
            <skinnedMesh
              name="Cylinder001_3"
              geometry={nodes.Cylinder001_3.geometry}
              material={materials["medium-skin.001"]}
              skeleton={nodes.Cylinder001_3.skeleton}
            />
            <skinnedMesh
              name="Cylinder001_4"
              geometry={nodes.Cylinder001_4.geometry}
              material={materials["light-skin.001"]}
              skeleton={nodes.Cylinder001_4.skeleton}
            />
            <skinnedMesh
              name="Cylinder001_5"
              geometry={nodes.Cylinder001_5.geometry}
              material={materials.outline}
              skeleton={nodes.Cylinder001_5.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/avo.glb")
