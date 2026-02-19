export interface Group {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
}

export interface Expense {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  participants: string[];
  splitMethod: "equal" | "custom";
  customAmounts?: Record<string, number>;
  createdAt: string;
}

export interface Settlement {
  id: string;
  from: string;
  to: string;
  amount: number;
  settled: boolean;
  groupId: string;
}

export interface WalletState {
  connected: boolean;
  provider: "pera" | "myalgo" | null;
  address: string;
  balance: number;
}

export const mockGroups: Group[] = [
  {
    id: "g1",
    name: "Weekend Trip",
    members: [
      "ALGO...X3K9",
      "ALGO...R7M2",
      "ALGO...P5N8",
    ],
    createdAt: "2026-02-15",
  },
  {
    id: "g2",
    name: "Office Lunch",
    members: ["ALGO...X3K9", "ALGO...T4L6", "ALGO...R7M2"],
    createdAt: "2026-02-10",
  },
];

export const mockExpenses: Expense[] = [
  {
    id: "e1",
    groupId: "g1",
    description: "Hotel Booking",
    amount: 15.0,
    paidBy: "ALGO...X3K9",
    participants: ["ALGO...X3K9", "ALGO...R7M2", "ALGO...P5N8"],
    splitMethod: "equal",
    createdAt: "2026-02-15T10:30:00",
  },
  {
    id: "e2",
    groupId: "g1",
    description: "Dinner",
    amount: 7.5,
    paidBy: "ALGO...R7M2",
    participants: ["ALGO...X3K9", "ALGO...R7M2", "ALGO...P5N8"],
    splitMethod: "equal",
    createdAt: "2026-02-15T20:00:00",
  },
  {
    id: "e3",
    groupId: "g2",
    description: "Pizza Order",
    amount: 4.5,
    paidBy: "ALGO...T4L6",
    participants: ["ALGO...X3K9", "ALGO...T4L6", "ALGO...R7M2"],
    splitMethod: "equal",
    createdAt: "2026-02-12T12:30:00",
  },
];

export const mockSettlements: Settlement[] = [
  { id: "s1", from: "ALGO...R7M2", to: "ALGO...X3K9", amount: 2.5, settled: false, groupId: "g1" },
  { id: "s2", from: "ALGO...P5N8", to: "ALGO...X3K9", amount: 5.0, settled: false, groupId: "g1" },
  { id: "s3", from: "ALGO...X3K9", to: "ALGO...R7M2", amount: 2.5, settled: false, groupId: "g1" },
  { id: "s4", from: "ALGO...X3K9", to: "ALGO...T4L6", amount: 1.5, settled: false, groupId: "g2" },
  { id: "s5", from: "ALGO...R7M2", to: "ALGO...T4L6", amount: 1.5, settled: true, groupId: "g2" },
];

export const mockWallet: WalletState = {
  connected: false,
  provider: null,
  address: "",
  balance: 0,
};

export const mockWalletConnected: WalletState = {
  connected: true,
  provider: "pera",
  address: "ALGO7X3K9M2P5N8T4L6R7Q1W2E3D4F5G6H7J8K9",
  balance: 142.35,
};

export const activityFeed = [
  { id: "a1", text: "ALGO...X3K9 paid 15.0 ALGO for Hotel Booking", time: "2 hours ago", group: "Weekend Trip" },
  { id: "a2", text: "ALGO...R7M2 paid 7.5 ALGO for Dinner", time: "5 hours ago", group: "Weekend Trip" },
  { id: "a3", text: "ALGO...T4L6 paid 4.5 ALGO for Pizza Order", time: "2 days ago", group: "Office Lunch" },
  { id: "a4", text: "ALGO...R7M2 settled 1.5 ALGO to ALGO...T4L6", time: "2 days ago", group: "Office Lunch" },
];

export const chartData = [
  { name: "Weekend Trip", owed: 7.5, owe: 2.5 },
  { name: "Office Lunch", owed: 0, owe: 1.5 },
];
