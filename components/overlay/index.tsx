import { useEffect, useMemo } from "react"
import EditUsernameModal from "../edit-username-modal"
import Chat from "./chat"
import DisconnectWallet from "./disconnect-wallet"
import MaterialIntersect from "./material-intersect"
import Me from "./me"
import Ranking from "./ranking"
import Recipe from "./recipe"
import Settings from "./settings"

export default function Overlay() {
  const trackId = "XPRd0jb"
  const audio = useMemo(() => new Audio(`https://audius-discovery-4.theblueprint.xyz/v1/tracks/${trackId}/stream`), [])

  const play = () => {
    console.log("play")
    if (audio.played) {
      audio.loop = true
      audio.play()
    }
  }

  useEffect(() => {
    play()
  }, [])

  return (
    <div className="w-screen h-screen absolute inset-0 z-10" onClick={play}>
      <DisconnectWallet />
      <Me />
      <Chat />
      <Settings />
      <Recipe />

      <MaterialIntersect />
      <Ranking />

      <EditUsernameModal />
    </div>
  )
}
