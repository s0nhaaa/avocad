export type Player = {
  id: string
  walletAddress: string
  position: {
    x: number
    y: number
    z: number
  }
  quaternion: {
    x: number
    y: number
    z: number
    w: number
  }
  animation: AvoActionName
}

export type Players = {
  id: Player
}

export type AvoActionName = "idle" | "run" | "wave"
