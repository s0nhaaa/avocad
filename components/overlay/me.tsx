import useEditUsernameModal from "@/hooks/useEditUsernameModal"
import useMainPlayer from "@/hooks/useMainPlayer"
import { database } from "@/services/firebase"
import { formatAddress } from "@/utils"
import { useWallet } from "@solana/wallet-adapter-react"
import { onValue, ref } from "firebase/database"
import { Edit } from "lucide-react"
import Image from "next/image"
import { useEffect } from "react"

export default function Me() {
  const { publicKey } = useWallet()
  const [username, title, setUsername] = useMainPlayer((state) => [state.username, state.title, state.setUsername])
  const [opened, open, close] = useEditUsernameModal((s) => [s.opened, s.open, s.close])

  useEffect(() => {
    if (!publicKey) return

    onValue(
      ref(database, `users/${publicKey.toString()}`),
      (snapshot) => {
        if (snapshot.val()) {
          setUsername(snapshot.val().username)
        }
      },
      {
        onlyOnce: true,
      }
    )
  }, [])

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
            <span className="font-bold text-primary-content">{username}</span>
            <button
              className="btn btn-xs btn-square active:cursor-c-pointer-clicked hover:cursor-c-pointer"
              onClick={open}
            >
              <Edit size={12} />
            </button>
          </div>
          <span className="text-sm text-primary-content/60">{formatAddress(publicKey.toString())}</span>
          {title && <div className="badge badge-accent badge-sm mt-2 font-medium">{title}</div>}
        </div>
      )}
    </div>
  )
}
