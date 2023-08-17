"use client"

import App from "@/components/app"
import { WalletAdapter } from "@/components/wallet-adapter"
import { useEffect } from "react"
// import Audius from "@audius/audius.js"

export default function Home() {
  const trackId = "XPRd0jb"
  // const audius = new Audius({
  //   analyticsId: "audius_discord_bot",
  // })

  useEffect(() => {
    const audio = new Audio("https://audius-discovery-4.theblueprint.xyz/v1/tracks/XPRd0jb/stream")
    audio.play()
    // fetch("https://audius-discovery-4.theblueprint.xyz/v1/tracks/XPRd0jb/stream", {
    //   method: "GET",
    // })
    //   .then(function (res) {
    //     return res.json()
    //   })
    //   .then(function (body) {
    //     console.log(body)
    //   })
  }, [])

  return (
    <main className="w-screen h-screen cursor-c-auto active:cursor-c-auto-clicked">
      <WalletAdapter>
        <App />
      </WalletAdapter>
    </main>
  )
}
