import useRecipe from "@/hooks/useRecipe"
import { database } from "@/services/firebase"
import { getKeyString, getRandomElement, randomMaterialPosition } from "@/utils"
import { ref, set } from "firebase/database"
import { useEffect, useRef } from "react"

export default function RecipeManager() {
  const counter = useRef(0)
  const [recipe, isTimeout, isDone, setIsTimeout, setIsDone, randomRecipe] = useRecipe((s) => [
    s.recipe,
    s.isTimeout,
    s.isDone,
    s.setIsTimeout,
    s.setIsDone,
    s.randomRecipe,
  ])
  const setMaterialInterval = useRef<NodeJS.Timer>()

  useEffect(() => {
    if (!recipe) return
    const materialTimeouts = [3000, 5000]
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
      counter.current = 0
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimeout, isDone])

  return <div></div>
}
