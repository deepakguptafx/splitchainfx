import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activityFeed, chartData } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, Scale } from "lucide-react";

const summaryCards = [
  { title: "Total Owed to You", value: "7.50 ALGO", icon: TrendingUp, change: "+2.5 this week" },
  { title: "Total You Owe", value: "4.00 ALGO", icon: TrendingDown, change: "-1.5 settled" },
  { title: "Net Balance", value: "+3.50 ALGO", icon: Scale, change: "You're ahead" },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Your expense summary at a glance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((c, i) => (
          <Card key={c.title} className="glass rounded-2xl border-border/50 hover:border-primary/30 transition-all" style={{ animationDelay: `${i * 0.1}s` }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{c.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{c.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="glass rounded-2xl border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Group Balances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 18%)" />
                <XAxis dataKey="name" tick={{ fill: "hsl(0 0% 70%)", fontSize: 12 }} />
                <YAxis tick={{ fill: "hsl(0 0% 70%)", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(0 0% 8%)",
                    border: "1px solid hsl(0 0% 18%)",
                    borderRadius: "0.75rem",
                    color: "white",
                  }}
                />
                <Legend />
                <Bar dataKey="owed" fill="hsl(350 100% 35%)" name="Owed to You" radius={[4, 4, 0, 0]} />
                <Bar dataKey="owe" fill="hsl(354 82% 38%)" name="You Owe" radius={[4, 4, 0, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Activity Feed */}
      <Card className="glass rounded-2xl border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {activityFeed.map((a) => (
            <div key={a.id} className="flex items-start justify-between py-2 border-b border-border/30 last:border-0">
              <div>
                <p className="text-sm">{a.text}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{a.group}</p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
