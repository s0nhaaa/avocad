"use client"

import App from "@/components/app"
import { WalletAdapter } from "@/components/wallet-adapter"

export default function Home() {
  return (
    <main className="w-screen h-screen cursor-c-auto active:cursor-c-auto-clicked">
      <WalletAdapter>
        <App />
      </WalletAdapter>
    </main>
  )
}
