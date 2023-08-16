export type Player = {
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
  username: string
  animation: AvoActionName
  address: string
}

export type Players = {
  id: Player
}

export type AvoActionName = "idle" | "run" | "wave"
