import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockWalletConnected, type WalletState } from "@/lib/mock-data";
import { Wallet, Unplug, Loader2, Info } from "lucide-react";

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletState>({ connected: false, provider: null, address: "", balance: 0 });
  const [connecting, setConnecting] = useState(false);

  const connect = async (provider: "pera" | "myalgo") => {
    setConnecting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setWallet({ ...mockWalletConnected, provider });
    setConnecting(false);
  };

  const disconnect = () => {
    setWallet({ connected: false, provider: null, address: "", balance: 0 });
  };

  const truncated = wallet.address ? `${wallet.address.slice(0, 8)}...${wallet.address.slice(-6)}` : "";

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Wallet</h1>
        <p className="text-muted-foreground text-sm mt-1">Connect your Algorand wallet</p>
      </div>

      {!wallet.connected ? (
        <Card className="glass rounded-2xl border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Connect Wallet</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Choose a wallet provider to get started.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button
                className="h-20 glass border-border/50 hover:border-primary/40 hover:glow-red-sm transition-all text-foreground flex flex-col gap-2"
                variant="outline"
                onClick={() => connect("pera")}
                disabled={connecting}
              >
                {connecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wallet className="w-6 h-6" />}
                <span className="font-semibold">Pera Wallet</span>
              </Button>
              <Button
                className="h-20 glass border-border/50 hover:border-primary/40 hover:glow-red-sm transition-all text-foreground flex flex-col gap-2"
                variant="outline"
                onClick={() => connect("myalgo")}
                disabled={connecting}
              >
                {connecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wallet className="w-6 h-6" />}
                <span className="font-semibold">MyAlgo Wallet</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card className="glass rounded-2xl border-border/50">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Connected Wallet</CardTitle>
              <span className="text-xs px-2 py-1 rounded-full gradient-red text-foreground font-medium capitalize">
                {wallet.provider}
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Address</p>
                <p className="text-sm font-mono bg-secondary rounded-lg px-3 py-2">{truncated}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Balance</p>
                  <p className="text-2xl font-bold">{wallet.balance} <span className="text-sm text-muted-foreground">ALGO</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Tx Fee</p>
                  <p className="text-2xl font-bold">0.001 <span className="text-sm text-muted-foreground">ALGO</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass rounded-2xl border-border/50">
            <CardContent className="flex items-center gap-3 py-4">
              <Info className="w-4 h-4 text-muted-foreground shrink-0" />
              <p className="text-xs text-muted-foreground">This is a simulated wallet connection. No real transactions will be made.</p>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 w-full"
            onClick={disconnect}
          >
            <Unplug className="w-4 h-4 mr-2" /> Disconnect Wallet
          </Button>
        </div>
      )}
    </div>
  );
}
