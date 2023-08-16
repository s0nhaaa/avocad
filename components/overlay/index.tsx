import Chat from "./chat"
import DisconnectWallet from "./disconnect-wallet"
import Me from "./me"
import Ranking from "./ranking"
import Recipe from "./recipe"
import Settings from "./settings"

export default function Overlay() {
  return (
    <div className="w-screen h-screen absolute inset-0 z-10">
      <Chat />
      <DisconnectWallet />
      <Me />
      <Ranking />
      <Settings />
      <Recipe />
    </div>
  )
}
