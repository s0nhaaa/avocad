import { formatAddress } from "@/utils"
import { useWallet } from "@solana/wallet-adapter-react"
import Image from "next/image"

export default function Me() {
  const { publicKey } = useWallet()

  return (
    <div className="absolute top-6 left-6 bg-base-100 p-3 rounded-2xl flex gap-2 pr-4 select-none">
      <div className="w-16 rounded-md overflow-hidden">
        <Image
          src={
            "https://prod-image-cdn.tensor.trade/images/slug=f33c3f50-0eb4-44e6-ab6b-188d925777ec/400x400/freeze=false/https%3A%2F%2Farweave.net%2FAm6WGnIqaKYCRwC7JwurCgO69CaxSneNsXBjjD2V7_Q%3Fext%3Dpng"
          }
          className="w-full h-full object-cover"
          width={60}
          height={60}
          alt="avotar"
        />
      </div>
      {publicKey && (
        <div className="flex flex-col">
          <span className="font-bold">
            {formatAddress(publicKey.toString())} <div className="badge badge-accent">$GUAC holder</div>
          </span>
          <span className="text-sm">{formatAddress(publicKey.toString())}</span>
        </div>
      )}
    </div>
  )
}
