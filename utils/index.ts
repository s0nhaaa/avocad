export function formatAddress(address: string, length = 4) {
  if (address.length <= 7) {
    return address
  }

  const first = address.slice(0, length)
  const last = address.slice(-length)

  return `${first}...${last}`
}

export function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined
  }

  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export function getRandomNumberInRange(min: number, max: number): number {
  const range = max - min + 1
  const randomStep = Math.floor(Math.random() * range)
  const randomNumber = Math.floor(min + randomStep)
  return randomNumber
}

const ZONES = [
  {
    x: [-68, -57],
    z: [-14, -3],
  },
  {
    x: [-56, -44],
    z: [-14, -9],
  },
  {
    x: [-43, -33],
    z: [-14.5, 6],
  },
  {
    x: [-26, -9],
    z: [-14.5, 14],
  },
  {
    x: [-14.5, -3],
    z: [-24, -14],
  },
  {
    x: [3, 23],
    z: [-18, 14],
  },
  {
    x: [33, 44],
    z: [-14, 14],
  },
]

export function randomMaterialPosition() {
  const zone = getRandomElement(ZONES) || ZONES[1]
  const x = getRandomNumberInRange(zone.x[0], zone.x[1])
  const z = getRandomNumberInRange(zone.z[0], zone.z[1])

  return { x, z }
}

export function getKeyString(x: number, y: number) {
  return `${x}x${y}`
}
