import useClaim from "@/hooks/useClaim"
import useRecipe from "@/hooks/useRecipe"
import { database } from "@/services/firebase"
import { Materials } from "@/types/material"
import { getKeyString, getRandomElement, randomMaterialPosition } from "@/utils"
import { useWallet } from "@solana/wallet-adapter-react"
import { increment, ref, set, update } from "firebase/database"
import { useEffect, useRef } from "react"

interface RecipeManagerProps {
  materials: Materials | undefined
}

export default function RecipeManager(props: RecipeManagerProps) {
  const counter = useRef(0)
  const [recipe, isTimeout, isDone, setIsTimeout, setIsDone, randomRecipe] = useRecipe((s) => [
    s.recipe,
    s.isTimeout,
    s.isDone,
    s.setIsTimeout,
    s.setIsDone,
    s.randomRecipe,
  ])
  const [deleteClaimed] = useClaim((s) => [s.deleteClaimed])
  const setMaterialInterval = useRef<NodeJS.Timer>()
  const { publicKey } = useWallet()

  useEffect(() => {
    if (!recipe) return

    const materialTimeouts = [5000, 7000]
    const setMaterial = async () => {
      try {
        counter.current++
        const { x, z } = randomMaterialPosition()

        set(ref(database, `materials/${getKeyString(x, z)}`), {
          x,
          z,
          name: recipe.materials[counter.current % recipe.materials.length],
        })
      } catch (err) {
        console.error(err)
      }
      clearInterval(setMaterialInterval.current)
      setMaterialInterval.current = setInterval(() => setMaterial(), getRandomElement(materialTimeouts))
    }

    setMaterial()
  }, [recipe])

  useEffect(() => {
    if (isTimeout || isDone) {
      randomRecipe()
      setIsTimeout(false)
      setIsDone(false)
      deleteClaimed()
      counter.current = 0
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeout, isDone])

  return <div></div>
}
