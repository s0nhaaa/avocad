import { getRandomElement } from "@/utils"
import { create } from "zustand"

interface Recipe {
  id: string
  name: string
  materials: string[]
  time: number
  preview: string
}

export const RECIPES: Recipe[] = [
  {
    id: "avo-1",
    name: "Avocado Toast",
    materials: ["avocado", "bread", "tomato", "ketchup", "musterd"],
    time: 30,
    preview: "toast-main",
  },
  {
    id: "avo-2",
    name: "Smoothy Avocado",
    materials: ["avocado", "chocolate", "coconut", "banana", "apple", "glass"],
    time: 30,
    preview: "smoothy-main",
  },
  {
    id: "avo-3",
    name: "Avocado Salad",
    materials: ["avocado", "oil", "brocoli", "cabbage", "bacon", "plate"],
    time: 30,
    preview: "salad-main",
  },
  {
    id: "avo-4",
    name: "Tropico Sandwiches",
    materials: ["pineapple", "avocado", "mushroom", "lemon", "egg", "bread", "plate"],
    time: 30,
    preview: "sandwich-main",
  },
  {
    id: "avo-5",
    name: "Fresh GUAC Pizza",
    materials: ["cheese", "avocado", "corn", "tomato", "bacon", "egg", "pizzabox"],
    time: 30,
    preview: "pizza-main",
  },
  {
    id: "avo-6",
    name: "BurGUAC",
    materials: ["ham", "avocado", "cheese", "tomato", "ketchup", "musterd", "bread"],
    time: 30,
    preview: "burger-main",
  },
  {
    id: "avo-7",
    name: "Avocookie",
    materials: ["coconut", "chocolate", "avocado"],
    time: 30,
    preview: "cookie-main",
  },
  {
    id: "avo-8",
    name: "Roll Sushi Avocado",
    materials: ["avocado", "fish", "mushroom", "chopstick"],
    time: 30,
    preview: "sushi-main",
  },
]

type RecipeState = {
  recipes: Recipe[]

  recipe: Recipe | undefined
  randomRecipe: () => Recipe

  isDone: boolean
  setIsDone: (isDone: boolean) => void

  isTimeout: boolean
  setIsTimeout: (isTimeout: boolean) => void
}

const useRecipe = create<RecipeState>((set, get) => ({
  recipes: RECIPES,

  recipe: getRandomElement(RECIPES),
  randomRecipe: () => {
    const recipe = getRandomElement(get().recipes) || get().recipes[0]
    set({ recipe })

    return recipe
  },

  isDone: false,
  setIsDone: (isDone: boolean) => set({ isDone }),

  isTimeout: false,
  setIsTimeout: (isTimeout: boolean) => set({ isTimeout }),
}))

export default useRecipe
