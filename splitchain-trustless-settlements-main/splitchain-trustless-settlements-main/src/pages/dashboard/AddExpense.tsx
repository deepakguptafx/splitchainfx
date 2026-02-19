import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { mockGroups } from "@/lib/mock-data";
import { Receipt } from "lucide-react";

const allMembers = Array.from(new Set(mockGroups.flatMap((g) => g.members)));

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [splitMethod, setSplitMethod] = useState<"equal" | "custom">("equal");
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const toggleParticipant = (m: string) => {
    setParticipants((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
  };

  const handleSubmit = async () => {
    if (!amount || !description || !paidBy || participants.length === 0) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast({ title: "Expense Added!", description: `${amount} ALGO for "${description}" has been recorded.` });
    setAmount("");
    setDescription("");
    setPaidBy("");
    setParticipants([]);
    setCustomAmounts({});
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Add Expense</h1>
        <p className="text-muted-foreground text-sm mt-1">Record a new shared expense</p>
      </div>

      <Card className="glass rounded-2xl border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Receipt className="w-5 h-5 text-primary" /> New Expense
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Amount */}
          <div className="space-y-2">
            <Label>Amount</Label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-secondary border-border text-3xl font-bold h-16 pr-20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">ALGO</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Input
              placeholder="What was this expense for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          {/* Who Paid */}
          <div className="space-y-2">
            <Label>Who Paid?</Label>
            <Select value={paidBy} onValueChange={setPaidBy}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select payer" />
              </SelectTrigger>
              <SelectContent>
                {allMembers.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Participants */}
          <div className="space-y-2">
            <Label>Who Participated?</Label>
            <div className="space-y-2">
              {allMembers.map((m) => (
                <label key={m} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors">
                  <Checkbox
                    checked={participants.includes(m)}
                    onCheckedChange={() => toggleParticipant(m)}
                  />
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Split Method */}
          <div className="space-y-2">
            <Label>Split Method</Label>
            <div className="flex gap-2">
              <Button
                variant={splitMethod === "equal" ? "default" : "outline"}
                onClick={() => setSplitMethod("equal")}
                className={splitMethod === "equal" ? "gradient-red text-foreground border-0" : "border-border"}
                size="sm"
              >
                Equal
              </Button>
              <Button
                variant={splitMethod === "custom" ? "default" : "outline"}
                onClick={() => setSplitMethod("custom")}
                className={splitMethod === "custom" ? "gradient-red text-foreground border-0" : "border-border"}
                size="sm"
              >
                Custom
              </Button>
            </div>
          </div>

          {splitMethod === "custom" && participants.length > 0 && (
            <div className="space-y-2">
              {participants.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-32 truncate">{p}</span>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={customAmounts[p] || ""}
                    onChange={(e) => setCustomAmounts({ ...customAmounts, [p]: e.target.value })}
                    className="bg-secondary border-border"
                  />
                  <span className="text-sm text-muted-foreground">ALGO</span>
                </div>
              ))}
            </div>
          )}

          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="gradient-red text-foreground border-0 w-full h-12 font-semibold text-base transition-transform hover:scale-[1.02] disabled:opacity-50"
          >
            {submitting ? "Recording..." : "Add Expense"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
