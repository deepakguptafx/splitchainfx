import { Link } from "react-router-dom";
import { ArrowDown, Users, Receipt, Calculator, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: Users, title: "Create Groups", desc: "Organize expenses by trips, dinners, or any shared activity with wallet-based groups." },
  { icon: Receipt, title: "Add Expenses", desc: "Log expenses instantly with flexible splitting options for every participant." },
  { icon: Calculator, title: "Auto Debt Calculation", desc: "Smart algorithms calculate who owes whom — no manual math required." },
  { icon: Zap, title: "One-Click Settlement", desc: "Settle debts on Algorand with a single tap. Fast, cheap, and final." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Orb effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-orb-move" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-crimson/8 blur-[100px] animate-orb-move" style={{ animationDelay: "-3s" }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-red flex items-center justify-center font-bold text-lg text-foreground glow-red-sm">
            S
          </div>
          <span className="text-xl font-bold tracking-tight">SplitChain</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Dashboard</Button>
          </Link>
          <Link to="/dashboard/wallet">
            <Button className="gradient-red hover:gradient-red-hover text-foreground border-0">
              Connect Wallet
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="w-20 h-20 rounded-2xl gradient-red flex items-center justify-center text-3xl font-black text-foreground mx-auto mb-8 animate-glow-pulse">
            S
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight max-w-4xl animate-fade-in-up-delay-1">
          Split Expenses. Settle Instantly.{" "}
          <span className="text-transparent bg-clip-text gradient-red">Powered by Algorand.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-in-up-delay-2">
          Trustless. Transparent. Instant.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-in-up-delay-3">
          <Link to="/dashboard/groups">
            <Button size="lg" className="gradient-red hover:gradient-red-hover text-foreground border-0 px-8 h-12 text-base font-semibold transition-transform hover:scale-105">
              Create Group
            </Button>
          </Link>
          <Link to="/dashboard/wallet">
            <Button size="lg" variant="outline" className="border-primary/50 text-foreground hover:bg-primary/10 px-8 h-12 text-base font-semibold transition-transform hover:scale-105">
              Connect Wallet
            </Button>
          </Link>
        </div>
        <a href="#features" className="mt-16 animate-fade-in-up-delay-4">
          <ArrowDown className="w-6 h-6 text-muted-foreground animate-float" />
        </a>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in-up">How It Works</h2>
        <p className="text-muted-foreground text-center mb-16 animate-fade-in-up-delay-1">Four simple steps to decentralized bill splitting</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`glass rounded-2xl p-6 group hover:border-primary/40 transition-all duration-300 hover:glow-red-sm animate-fade-in-up`}
              style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-red flex items-center justify-center mb-5 group-hover:animate-glow-pulse transition-shadow">
                <f.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6 text-center text-muted-foreground text-sm">
        © 2026 SplitChain. Built on Algorand. Trustless. Transparent. Instant.
      </footer>
    </div>
  );
};

export default Index;
