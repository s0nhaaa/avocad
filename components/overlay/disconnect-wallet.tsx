import { useWallet } from "@solana/wallet-adapter-react"
import { LogOut } from "lucide-react"
import React from "react"

export default function DisconnectWallet() {
  const { disconnect } = useWallet()

  return (
    <button
      className="absolute bottom-6 right-6 btn btn-square btn-md text-lg hover:cursor-c-pointer active:cursor-c-pointer-clicked"
      onClick={() => disconnect()}
    >
      <LogOut size={20} />
    </button>
  )
}
