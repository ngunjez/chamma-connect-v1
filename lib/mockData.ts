import type {
  Chama,
  User,
  DashboardStats,
  Transaction,
  Goal,
} from "@/types";


export const MOCK_USER: User = {
  id: "usr_001",
  firstName: "Christine",
  lastName: "Mwangi",
  email: "christine.mwangi@example.com",
  phone: "+254712345678",
  memberSince: "2024-01-15",
};


export const MOCK_CHAMAS: Chama[] = [
  {
    id: "chm_001",
    name: "Umoja Savings Circle",
    description: "A close-knit group of professionals saving for shared goals.",
    groupType: "saving",
    minimumContribution: 2000,
    meetingDay: "Saturday",
    meetingTime: "10:00",
    communicationLink: "https://chat.whatsapp.com/example",
    payment: {
      method: "platform",
      destinationPaybill: "174379",
      accountNumber: "UMOJA001",
    },
    members: [
      {
        id: "mem_001",
        firstName: "Christine",
        lastName: "Mwangi",
        phone: "+254712345678",
        email: "christine@example.com",
        role: "admin",
        joinedAt: "2024-01-15",
        avatarInitials: "CM",
      },
      {
        id: "mem_002",
        firstName: "James",
        lastName: "Ochieng",
        phone: "+254723456789",
        email: "james@example.com",
        role: "treasurer",
        joinedAt: "2024-01-15",
        avatarInitials: "JO",
      },
      {
        id: "mem_003",
        firstName: "Faith",
        lastName: "Wanjiku",
        phone: "+254734567890",
        email: "faith@example.com",
        role: "secretary",
        joinedAt: "2024-01-20",
        avatarInitials: "FW",
      },
      {
        id: "mem_004",
        firstName: "Peter",
        lastName: "Kamau",
        phone: "+254745678901",
        email: "peter@example.com",
        role: "member",
        joinedAt: "2024-02-01",
        avatarInitials: "PK",
      },
    ],
    documents: [
      {
        id: "doc_001",
        title: "Group Constitution",
        type: "constitution",
        content:
          "This constitution governs the operations of the Umoja Savings Circle...",
        uploadedAt: "2024-01-15",
      },
    ],
    status: "active",
    createdAt: "2024-01-15",
    totalValue: 48000,
    totalContributions: 32000,
    activeLoans: 5000,
  },
  {
    id: "chm_002",
    name: "Maendeleo Investment Group",
    description: "Investing in real estate and government bonds collectively.",
    groupType: "investment",
    minimumContribution: 5000,
    meetingDay: "Sunday",
    meetingTime: "14:00",
    payment: {
      method: "direct",
      consumerKey: "••••••••",
      consumerSecret: "••••••••",
      shortcode: "602426",
      passkey: "••••••••",
    },
    members: [
      {
        id: "mem_001",
        firstName: "Christine",
        lastName: "Mwangi",
        phone: "+254712345678",
        email: "christine@example.com",
        role: "member",
        joinedAt: "2024-03-01",
        avatarInitials: "CM",
      },
      {
        id: "mem_005",
        firstName: "Alice",
        lastName: "Njeri",
        phone: "+254756789012",
        email: "alice@example.com",
        role: "admin",
        joinedAt: "2024-03-01",
        avatarInitials: "AN",
      },
    ],
    documents: [],
    status: "active",
    createdAt: "2024-03-01",
    totalValue: 120000,
    totalContributions: 90000,
    activeLoans: 0,
  },
];


export const MOCK_STATS: DashboardStats = {
  totalContributions: 32000,
  incomeAnalysis: 4800,
  expenseAnalysis: 1200,
};


export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "txn_001",
    chamaName: "Umoja Savings Circle",
    amount: 2000,
    type: "credit",
    date: "2026-04-20",
    description: "Monthly contribution",
  },
  {
    id: "txn_002",
    chamaName: "Maendeleo Investment Group",
    amount: 5000,
    type: "credit",
    date: "2026-04-15",
    description: "Monthly contribution",
  },
  {
    id: "txn_003",
    chamaName: "Umoja Savings Circle",
    amount: 1500,
    type: "debit",
    date: "2026-04-10",
    description: "Emergency loan disbursement",
  },
  {
    id: "txn_004",
    chamaName: "Umoja Savings Circle",
    amount: 2000,
    type: "credit",
    date: "2026-03-20",
    description: "Monthly contribution",
  },
];


export const MOCK_GOALS: Goal[] = [
  {
    id: "goal_001",
    title: "Emergency Fund",
    target: 50000,
    current: 32000,
    deadline: "2026-12-31",
  },
  {
    id: "goal_002",
    title: "Property Investment",
    target: 500000,
    current: 120000,
    deadline: "2028-06-30",
  },
];