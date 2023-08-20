import useClaim from "@/hooks/useClaim"
import useMainPlayer from "@/hooks/useMainPlayer"
import useRecipe from "@/hooks/useRecipe"
import { database } from "@/services/firebase"
import { useWallet } from "@solana/wallet-adapter-react"
import { increment, ref, update } from "firebase/database"
import { Variants, motion } from "framer-motion"
import { Bell, Check, Clock, Plus } from "lucide-react"
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
  const [recipe, randomRecipe, setIsTimeout, setIsDone] = useRecipe((s) => [
    s.recipe,
    s.randomRecipe,
    s.setIsTimeout,
    s.setIsDone,
  ])
  const [countdown, setCountdown] = useState(0)
  const [materials, deleteClaimed] = useClaim((s) => [s.materials, s.deleteClaimed])
  const { publicKey } = useWallet()
  const username = useMainPlayer((s) => s.username)

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

  useEffect(() => {
    if (!materials) return
    if (!recipe) return
    if (!publicKey) return

    const intersection = new Set(materials.filter((element) => recipe.materials.includes(element)))
    if (intersection.size === recipe.materials.length) {
      deleteClaimed()
      setIsDone(true)
      update(ref(database, `leaderboard/${publicKey.toString()}`), {
        score: increment(recipe.score),
        address: publicKey.toString(),
        username,
      })
    }
  }, [materials, recipe])

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
            <div className="flex gap-2">
              <span className="px-2 bg-success gap-1 w-[54px] flex items-center rounded-lg">
                <Plus size={14} />
                <span className="text-sm font-medium w-4 text-center">{recipe.score}</span>
              </span>
              <span className="px-2 bg-secondary gap-1 w-[54px] flex items-center rounded-lg">
                <Clock size={14} />
                <span className="text-sm font-medium w-4 text-center">{countdown}</span>
              </span>
            </div>
          </div>
          <div className="flex mb-2">
            <span className="font-medium text-primary-content">{recipe.name}</span>
          </div>
          <div className="flex flex-row w-full">
            <div className="grid flex-grow rounded-box place-items-center">
              <Image
                src={`/food-preview/${recipe.preview}.png`}
                className="w-10 h-10 object-cover rounded-full bg-red-50 ring ring-secondary"
                width={64}
                height={64}
                alt={recipe.name}
              />
            </div>
            <div className="divider divider-horizontal mx-1"></div>
            <div className="grid flex-grow rounded-box place-items-center">
              <div className="flex gap-2">
                {recipe.materials.map((material, index) => (
                  <div key={index} className="relative flex flex-col items-center gap-2 p-2 bg-base-300 rounded-lg">
                    <Image
                      src={`/food-preview/${material}.png`}
                      className="w-10 h-10 object-cover rounded-full ring"
                      width={64}
                      height={64}
                      alt={material}
                    />
                    {materials.includes(material) && (
                      <div className=" absolute -right-0.5 p-0.5 bg-success rounded-full">
                        <Check size={14} />
                      </div>
                    )}
                    <span className="text-xs capitalize text-primary-content/80">{material}</span>
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
