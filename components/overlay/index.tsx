import React from "react"
import Chat from "./chat"

export default function Overlay() {
  return (
    <div className="w-screen h-screen absolute inset-0 z-10">
      <Chat />
    </div>
  )
}
