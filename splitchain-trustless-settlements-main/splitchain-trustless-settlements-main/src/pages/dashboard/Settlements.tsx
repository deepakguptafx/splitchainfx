import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockSettlements, type Settlement } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowRight, Check, Loader2 } from "lucide-react";

export default function Settlements() {
  const [settlements, setSettlements] = useState<Settlement[]>(mockSettlements);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const selected = settlements.find((s) => s.id === payingId);

  const handlePay = async () => {
    if (!payingId) return;
    setProcessing(true);
    setSuccess(false);
    await new Promise((r) => setTimeout(r, 2000));
    setProcessing(false);
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSettlements((prev) => prev.map((s) => (s.id === payingId ? { ...s, settled: true } : s)));
    setPayingId(null);
    setSuccess(false);
    toast({ title: "Payment Successful!", description: "The transaction has been settled on Algorand." });
  };

  const pending = settlements.filter((s) => !s.settled);
  const completed = settlements.filter((s) => s.settled);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settlements</h1>
        <p className="text-muted-foreground text-sm mt-1">Settle your debts with one click</p>
      </div>

      {/* Pending */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Pending</h2>
        {pending.length === 0 && <p className="text-sm text-muted-foreground">All settled! 🎉</p>}
        {pending.map((s) => (
          <Card key={s.id} className="glass rounded-2xl border-border/50 hover:border-primary/30 transition-all">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{s.from}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{s.to}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{s.amount} ALGO</span>
                <Button
                  size="sm"
                  className="gradient-red text-foreground border-0 transition-transform hover:scale-105"
                  onClick={() => setPayingId(s.id)}
                >
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completed */}
      {completed.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed</h2>
          {completed.map((s) => (
            <Card key={s.id} className="rounded-2xl border-border/30 bg-secondary/30">
              <CardContent className="flex items-center justify-between p-4 opacity-60">
                <div className="flex items-center gap-3">
                  <span className="text-sm">{s.from}</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-sm">{s.to}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{s.amount} ALGO</span>
                  <Check className="w-4 h-4 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Payment Modal */}
      <Dialog open={!!payingId} onOpenChange={(open) => !processing && !open && setPayingId(null)}>
        <DialogContent className="glass border-border/50 sm:rounded-2xl">
          <DialogHeader>
            <DialogTitle>{success ? "Transaction Complete!" : "Confirm Payment"}</DialogTitle>
            <DialogDescription>
              {success
                ? "The payment has been settled on the Algorand blockchain."
                : selected
                ? `Send ${selected.amount} ALGO from ${selected.from} to ${selected.to}?`
                : ""}
            </DialogDescription>
          </DialogHeader>

          {success && (
            <div className="flex justify-center py-6">
              <div className="w-16 h-16 rounded-full gradient-red flex items-center justify-center animate-glow-pulse">
                <Check className="w-8 h-8 text-foreground" />
              </div>
            </div>
          )}

          {!success && (
            <DialogFooter className="gap-2">
              <Button variant="outline" className="border-border" onClick={() => setPayingId(null)} disabled={processing}>
                Cancel
              </Button>
              <Button className="gradient-red text-foreground border-0" onClick={handlePay} disabled={processing}>
                {processing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Processing...</> : "Confirm & Pay"}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
