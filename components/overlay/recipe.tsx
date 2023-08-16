import { Bell, Check, Clock } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Recipe() {
  const [countdown, setCountdown] = useState(5)
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown === 0) {
        setIsDone(true)
        clearInterval(interval)
      }

      countdown > 0 && setCountdown(countdown - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [countdown])

  return (
    <div className="absolute bottom-6 left-[50%] translate-x-[-10%] w-fit h-fit bg-base-100 p-4 rounded-2xl ">
      <div className="relative w-full flex flex-col ">
        <div className="flex mb-3 justify-between">
          <span className="btn btn-xs normal-case btn-primary">
            <Bell size={14} /> New Recipe
          </span>
          <span className="px-2 bg-secondary gap-1 w-13 flex items-center rounded-lg">
            <Clock size={14} />
            <span className="text-sm font-medium w-4 text-center">{countdown}</span>
          </span>
        </div>
        <div className="flex mb-2">
          <span className="font-medium ">Avocado Salad</span>
        </div>
        <div className="flex flex-row w-full">
          <div className="grid flex-grow rounded-box place-items-center">
            <Image
              src={"/food-preview/avocado.png"}
              className="w-10 h-10 object-cover rounded-full bg-red-50 ring ring-secondary"
              width={64}
              height={64}
              alt="avotar"
            />
          </div>
          <div className="divider divider-horizontal mx-1"></div>
          <div className="grid flex-grow rounded-box place-items-center">
            <div className="flex gap-2">
              <div className="flex flex-col items-center gap-2 p-2 bg-base-300 rounded-lg">
                <Image
                  src={"/food-preview/avocado.png"}
                  className="w-10 h-10 object-cover rounded-full bg-red-50 ring"
                  width={64}
                  height={64}
                  alt="avotar"
                />
                <span className="text-xs">Avocado</span>
              </div>

              <div className="relative flex flex-col items-center gap-2 p-2 bg-base-300 rounded-lg">
                <Image
                  src={"/food-preview/bacon.png"}
                  className="w-10 h-10 object-cover rounded-full bg-red-50 ring"
                  width={64}
                  height={64}
                  alt="avotar"
                />
                <div className=" absolute -right-0.5 p-0.5 bg-success rounded-full">
                  <Check size={14} />
                </div>
                <span className="text-xs">Bacon</span>
              </div>

              <div className="relative flex flex-col items-center gap-2 p-2 bg-base-300 rounded-lg">
                <Image
                  src={"/food-preview/bacon.png"}
                  className="w-10 h-10 object-cover rounded-full bg-red-50 ring"
                  width={64}
                  height={64}
                  alt="avotar"
                />
                <div className=" absolute -right-0.5 p-0.5 bg-success rounded-full">
                  <Check size={14} />
                </div>
                <span className="text-xs">Cake</span>
              </div>

              <div className="relative flex flex-col items-center gap-2 p-2 bg-base-300 rounded-lg">
                <Image
                  src={"/food-preview/bacon.png"}
                  className="w-10 h-10 object-cover rounded-full bg-red-50 ring"
                  width={64}
                  height={64}
                  alt="avotar"
                />

                <span className="text-xs">Cake</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
