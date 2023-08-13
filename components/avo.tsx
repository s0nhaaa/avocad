import * as THREE from "three"
import React, { useEffect, useMemo, useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { GLTF, SkeletonUtils } from "three-stdlib"
import { useFrame, useGraph } from "@react-three/fiber"
import { useControls } from "@/hooks/useControls"

type GLTFResult = GLTF & {
  nodes: {
    body001: THREE.SkinnedMesh
    face001: THREE.SkinnedMesh
    hand001: THREE.SkinnedMesh
    Cylinder004: THREE.SkinnedMesh
    Cylinder004_1: THREE.SkinnedMesh
    Cylinder004_2: THREE.SkinnedMesh
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
  }
}

type ActionName = "idle" | "run" | "wave"
type GLTFActions = Record<ActionName, THREE.AnimationAction>

const SPEED = 0.05

export default function Avo(props: JSX.IntrinsicElements["group"]) {
  const player = useRef<THREE.Group | null>(null)
  const { materials, animations, scene } = useGLTF("/models/avo.glb") as GLTFResult
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone) as GLTFResult
  const { actions, mixer } = useAnimations(animations, player)
  // const anim = useRef<ActionName>("idle")
  const { up, down, left, right } = useControls()
  const anim = useMemo<ActionName>(() => {
    return up || down || left || right ? "run" : "idle"
  }, [up, down, left, right])

  useFrame(({ camera }) => {
    if (!player.current) return

    if (up) {
      player.current.position.z -= SPEED
      player.current.rotation.set(0, Math.PI, 0)
      camera.position.z -= SPEED
    }

    if (down) {
      player.current.position.z += SPEED
      player.current.rotation.set(0, 0, 0)
      camera.position.z += SPEED
    }

    if (left) {
      player.current.position.x -= SPEED
      player.current.rotation.set(0, -Math.PI / 2 + (up ? -Math.PI / 4 : down ? Math.PI / 4 : 0), 0)
      camera.position.x -= SPEED
    }

    if (right) {
      player.current.position.x += SPEED
      player.current.rotation.set(0, Math.PI / 2 + (up ? Math.PI / 4 : down ? -Math.PI / 4 : 0), 0)
      camera.position.x += SPEED
    }

    camera.lookAt(player.current.position.clone().setY(1))
  })

  useEffect(() => {
    ;(actions as GLTFActions)[anim].reset().fadeIn(0.2).play()

    return () => {
      ;(actions as GLTFActions)[anim].fadeOut(0.2)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anim])

  return (
    <group ref={player} {...props} dispose={null}>
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
          <skinnedMesh
            name="body001"
            geometry={nodes.body001.geometry}
            material={materials["body-skin.001"]}
            skeleton={nodes.body001.skeleton}
          />
          <skinnedMesh
            name="face001"
            geometry={nodes.face001.geometry}
            material={materials.face}
            skeleton={nodes.face001.skeleton}
          />
          <skinnedMesh
            name="hand001"
            geometry={nodes.hand001.geometry}
            material={materials["body-skin.001"]}
            skeleton={nodes.hand001.skeleton}
          />
          <group name="head001">
            <skinnedMesh
              name="Cylinder004"
              geometry={nodes.Cylinder004.geometry}
              material={materials["dark-skin.001"]}
              skeleton={nodes.Cylinder004.skeleton}
            />
            <skinnedMesh
              name="Cylinder004_1"
              geometry={nodes.Cylinder004_1.geometry}
              material={materials["medium-skin.001"]}
              skeleton={nodes.Cylinder004_1.skeleton}
            />
            <skinnedMesh
              name="Cylinder004_2"
              geometry={nodes.Cylinder004_2.geometry}
              material={materials["light-skin.001"]}
              skeleton={nodes.Cylinder004_2.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/avo.glb")
