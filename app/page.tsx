"use client"

import Overlay from "@/components/overlay"
import Scene from "@/components/scene"
import { WalletAdapter } from "@/components/wallet-adapter"

export default function Home() {
  return (
    <main className="w-screen h-screen cursor-c-auto active:cursor-c-auto-clicked">
      <WalletAdapter>
        <Scene />
        <Overlay />
      </WalletAdapter>
    </main>
  )
}
