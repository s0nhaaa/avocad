import useMainPlayer from "@/hooks/useMainPlayer"
import { formatAddress } from "@/utils"
import { useWallet } from "@solana/wallet-adapter-react"
import { Edit } from "lucide-react"
import Image from "next/image"

export default function Me() {
  const { publicKey } = useWallet()
  const [username] = useMainPlayer((state) => [state.username])

  return (
    <div className="absolute top-6 left-6 bg-base-300 p-3 rounded-2xl flex gap-2 pr-3.5 select-none">
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
          <div className="flex gap-2  -mt-1 items-center">
            <span className="font-bold">{username}</span>
            <button className="btn btn-xs btn-square active:cursor-c-pointer-clicked hover:cursor-c-pointer">
              <Edit size={12} />
            </button>
          </div>
          <span className="text-sm text-primary-content/60">{formatAddress(publicKey.toString())}</span>
          <div className="badge badge-accent badge-sm mt-2 font-medium">$GUAC hodler</div>
        </div>
      )}
    </div>
  )
}
