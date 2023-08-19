import useRecipe from "@/hooks/useRecipe"
import { Variants, motion } from "framer-motion"
import { Bell, Check, Clock } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

const variants: Variants = {
  show: {
    opacity: 1,
    y: 0,
  },
  hidden: {
    opacity: 0,
    y: 50,
  },
}

export default function Recipe() {
  const [recipe, randomRecipe, setIsTimeout] = useRecipe((s) => [s.recipe, s.randomRecipe, s.setIsTimeout])
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (!recipe) return

    const interval = setInterval(() => {
      if (countdown === 0) {
        clearInterval(interval)
        setIsTimeout(true)
      }

      countdown > 0 && setCountdown(countdown - 1)
    }, 1000)

    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown, recipe])

  useEffect(() => {
    if (!recipe) return

    setCountdown(recipe.time)
  }, [recipe])

  return (
    <motion.div
      variants={variants}
      animate={"show"}
      className="absolute bottom-6 left-[40%] translate-x-[-10%] w-fit h-fit bg-base-100 p-4 rounded-2xl "
    >
      {recipe && (
        <div className="relative w-full flex flex-col ">
          <div className="flex mb-3 justify-between">
            <span className="btn btn-xs normal-case btn-primary">
              <Bell className="animate-swing origin-top" size={14} /> New Recipe
            </span>
            <span className="px-2 bg-secondary gap-1 w-13 flex items-center rounded-lg">
              <Clock size={14} />
              <span className="text-sm font-medium w-4 text-center">{countdown}</span>
            </span>
          </div>
          <div className="flex mb-2">
            <span className="font-medium ">{recipe.name}</span>
          </div>
          <div className="flex flex-row w-full">
            <div className="grid flex-grow rounded-box place-items-center">
              <Image
                src={`/food-preview/${recipe.preview}.png`}
                className="w-10 h-10 object-cover rounded-full bg-red-50 ring ring-secondary"
                width={64}
                height={64}
                alt="avotar"
              />
            </div>
            <div className="divider divider-horizontal mx-1"></div>
            <div className="grid flex-grow rounded-box place-items-center">
              <div className="flex gap-2">
                {recipe.materials.map((material, index) => (
                  <div key={index} className="relative flex flex-col items-center gap-2 p-2 bg-base-300 rounded-lg">
                    <Image
                      src={`/food-preview/${material}.png`}
                      className="w-10 h-10 object-cover rounded-full bg-red-50 ring"
                      width={64}
                      height={64}
                      alt="avotar"
                    />
                    <div className=" absolute -right-0.5 p-0.5 bg-success rounded-full">
                      <Check size={14} />
                    </div>
                    <span className="text-xs capitalize">{material}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
