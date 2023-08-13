import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { BackpackWalletAdapter, PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { ReactNode, useMemo } from "react"

require("@solana/wallet-adapter-react-ui/styles.css")

interface WalletAdapterProps {
  children: ReactNode
}

export function WalletAdapter(props: WalletAdapterProps) {
  const endpoint = useMemo(() => "https://devnet.helius-rpc.com/?api-key=c961fbdd-f1f5-4d6d-beea-d515405f3e54", [])

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new BackpackWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{props.children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
