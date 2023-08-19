import { getRandomElement } from "@/utils"
import { create } from "zustand"

interface Recipe {
  id: string
  name: string
  materials: string[]
  time: number
  preview: string
  score: number
}

export const RECIPES: Recipe[] = [
  {
    id: "avo-1",
    name: "Avocado Toast",
    materials: ["avocado", "bread", "tomato", "ketchup", "musterd"],
    time: 90,
    preview: "toast-main",
    score: 40,
  },
  {
    id: "avo-2",
    name: "Smoothy Avocado",
    materials: ["avocado", "chocolate", "coconut", "banana", "apple", "glass"],
    time: 90,
    preview: "smoothy-main",
    score: 50,
  },
  {
    id: "avo-3",
    name: "Avocado Salad",
    materials: ["avocado", "oil", "brocoli", "cabbage", "bacon", "plate"],
    time: 90,
    preview: "salad-main",
    score: 45,
  },
  {
    id: "avo-4",
    name: "Tropico Sandwiches",
    materials: ["pineapple", "avocado", "mushroom", "lemon", "egg", "bread", "plate"],
    time: 90,
    preview: "sandwich-main",
    score: 120,
  },
  {
    id: "avo-5",
    name: "Fresh GUAC Pizza",
    materials: ["cheese", "avocado", "corn", "tomato", "bacon", "egg", "pizzabox"],
    time: 90,
    preview: "pizza-main",
    score: 100,
  },
  {
    id: "avo-6",
    name: "BurGUAC",
    materials: ["ham", "avocado", "cheese", "tomato", "ketchup", "musterd", "bread"],
    time: 90,
    preview: "burger-main",
    score: 140,
  },
  {
    id: "avo-7",
    name: "Avocookie",
    materials: ["coconut", "chocolate", "avocado"],
    time: 90,
    preview: "cookie-main",
    score: 80,
  },
  {
    id: "avo-8",
    name: "Roll Sushi Avocado",
    materials: ["avocado", "fish", "mushroom", "chopstick"],
    time: 90,
    preview: "sushi-main",
    score: 65,
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

  count: number
}

const useRecipe = create<RecipeState>((set, get) => ({
  recipes: RECIPES,
  count: 0,
  recipe: getRandomElement(RECIPES),
  randomRecipe: () => {
    const recipe = RECIPES[get().count % RECIPES.length]
    set({ recipe, count: get().count + 1 })

    return recipe
  },

  isDone: false,
  setIsDone: (isDone: boolean) => set({ isDone }),

  isTimeout: false,
  setIsTimeout: (isTimeout: boolean) => set({ isTimeout }),
}))

export default useRecipe
