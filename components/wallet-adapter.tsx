import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { BackpackWalletAdapter, PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import { ReactNode, useMemo } from "react"

require("@solana/wallet-adapter-react-ui/styles.css")

interface WalletAdapterProps {
  children: ReactNode
}

export function WalletAdapter(props: WalletAdapterProps) {
  const endpoint = useMemo(() => "https://rpc.helius.xyz/?api-key=1ba00d42-c9d3-4459-89b1-2c48142aacbc", [])

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
