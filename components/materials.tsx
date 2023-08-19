import useMaterial from "@/hooks/useMaterial"
import { Material as MaterialType, Materials as MaterialsType } from "@/types/material"
import { getKeyString } from "@/utils"
import { Float, Html, useTexture } from "@react-three/drei"
import { CapsuleCollider, CollisionPayload, RigidBody } from "@react-three/rapier"
import { ReactNode, useEffect, useState } from "react"
import { DoubleSide } from "three"
import { Apple } from "./foods/apple"
import { Avocado } from "./foods/avocado"
import { Bacon } from "./foods/bacon"
import { Banana } from "./foods/banana"
import { Bread } from "./foods/bread"
import { Brocoli } from "./foods/brocoli"
import { Cabbage } from "./foods/cabbage"
import { Cheese } from "./foods/cheese"
import { Chocolate } from "./foods/chocolate"
import { Chopstick } from "./foods/chopstick"
import { Coconut } from "./foods/coconut"
import { Corn } from "./foods/corn"
import { Egg } from "./foods/egg"
import { Fish } from "./foods/fish"
import { Glass } from "./foods/glass"
import { Ham } from "./foods/ham"
import { Ketchup } from "./foods/ketchup"
import { Lemon } from "./foods/lemon"
import { Mushroom } from "./foods/mushroom"
import { Musterd } from "./foods/musterd"
import { Oil } from "./foods/oil"
import { Pan } from "./foods/pan"
import { Pineapple } from "./foods/pineapple"
import { Pizzabox } from "./foods/pizzabox"
import { Plate } from "./foods/plate"
import { Tomato } from "./foods/tomato"

export const MATERIALS: Record<string, ReactNode> = {
  apple: <Apple />,
  avocado: <Avocado />,
  bacon: <Bacon />,
  banana: <Banana />,
  bread: <Bread />,
  brocoli: <Brocoli />,
  cabbage: <Cabbage />,
  cheese: <Cheese />,
  chocolate: <Chocolate />,
  chopstick: <Chopstick />,
  coconut: <Coconut />,
  corn: <Corn />,
  egg: <Egg />,
  fish: <Fish />,
  glass: <Glass />,
  ham: <Ham />,
  ketchup: <Ketchup />,
  lemon: <Lemon />,
  mushroom: <Mushroom />,
  musterd: <Musterd />,
  oil: <Oil />,
  pan: <Pan />,
  pineapple: <Pineapple />,
  pizzabox: <Pizzabox />,
  plate: <Plate />,
  tomato: <Tomato />,
}

interface MaterialProps {
  material: MaterialType
}

export function Material(props: MaterialProps) {
  const [setIntersected, setMaterial, setPosition] = useMaterial((s) => [
    s.setIntersected,
    s.setMaterial,
    s.setPosition,
  ])
  const [entered, setEntered] = useState(false)
  const shadowTexture = useTexture("/shadow.png")

  const intersectionEnter = (e: CollisionPayload) => {
    setIntersected(true)
    setEntered(true)
    setMaterial(e.target.colliderObject?.name || "")
    setPosition(getKeyString(props.material.x, props.material.z))
  }

  const intersectionExit = (e: CollisionPayload) => {
    setIntersected(false)
    setEntered(false)
    setPosition("e")
  }

  useEffect(() => {
    return () => {
      setIntersected(false)
      setPosition("e")
      setEntered(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <group position={[props.material.x, 0.25, props.material.z]}>
      <Float scale={2} speed={2} rotationIntensity={2} rotation={[0, 1, 0]} floatingRange={[0.12, 0.25]}>
        {MATERIALS[props.material.name]}
      </Float>
      <RigidBody type="fixed" enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[2, 0.25]} />
      </RigidBody>
      <RigidBody type="fixed" enabledRotations={[false, false, false]}>
        <CapsuleCollider
          name={props.material.name}
          args={[2, 0.5]}
          sensor
          onIntersectionEnter={intersectionEnter}
          onCollisionExit={intersectionExit}
        />
      </RigidBody>
      {entered && (
        <Html position={[0, 1.75, 0]} center>
          <div className="px-3 pb-1 pt-1 rounded-lg bg-base-200/80 select-none">
            <span className="text-center capitalize">{props.material.name}</span>
          </div>
        </Html>
      )}

      <mesh position={[0, -0.25, 0]} rotation={[-1.57, 0, 0]}>
        <planeGeometry />
        <meshBasicMaterial map={shadowTexture} transparent={true} side={DoubleSide} opacity={0.15} />
      </mesh>
    </group>
  )
}

interface MaterialsProps {
  materials: MaterialsType | undefined
}

export default function Materials(props: MaterialsProps) {
  return (
    <>
      {props.materials &&
        Object.values(props.materials).map((material: MaterialType) => (
          <Material material={material} key={getKeyString(material.x, material.z)} />
        ))}
    </>
  )
}
