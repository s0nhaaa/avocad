import { SettingsIcon } from "lucide-react"

export default function Settings() {
  return (
    <button className="absolute bottom-20 right-6 btn btn-square btn-md text-lg hover:cursor-c-pointer active:cursor-c-pointer-clicked">
      <SettingsIcon size={20} />
    </button>
  )
}
