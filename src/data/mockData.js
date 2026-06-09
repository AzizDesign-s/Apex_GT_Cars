// src/data/mockData.js
//
// ─── WHY THIS FILE EXISTS ────────────────────────────────────────────────────
// All fake data lives in ONE place. This means:
//   1. Easy to swap with real API data later — just change imports
//   2. Consistent data across all pages (same cars, same customers)
//   3. No hardcoded values scattered across components
// ─────────────────────────────────────────────────────────────────────────────

// ── KPI STATS ────────────────────────────────────────────────────────────────
export const kpiStats = {
  totalInventory: { value: 48, trend: "+4 this week", up: true },
  totalRevenue: { value: "AED 2.4M", trend: "+12% MoM", up: true },
  carsSold: { value: 17, trend: "+3 this week", up: true },
  testDrives: { value: 6, trend: "3 pending", up: null },
  newCustomers: { value: 24, trend: "+8 this month", up: true },
  pendingInvoices: { value: 11, trend: "4 overdue", up: false },
};

// ── MONTHLY REVENUE ───────────────────────────────────────────────────────────
export const monthlyRevenue = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  data2026: [1.2, 1.5, 1.8, 2.1, 2.4, 2.2, null, null, null, null, null, null],
  data2025: [0.9, 1.1, 1.3, 1.6, 1.9, 1.7, 1.8, 2.0, 1.9, 2.1, 1.8, 2.2],
};

// ── TOP BRANDS ────────────────────────────────────────────────────────────────
export const topBrands = [
  { brand: "Mercedes", sold: 14, color: "rgba(212,175,55,0.85)" },
  { brand: "BMW", sold: 11, color: "rgba(56,189,248,0.75)" },
  { brand: "Porsche", sold: 7, color: "rgba(16,185,129,0.75)" },
  { brand: "Ferrari", sold: 7, color: "rgba(251,113,133,0.75)" },
  { brand: "Rolls Royce", sold: 5, color: "rgba(167,139,250,0.75)" },
  { brand: "Lamborghini", sold: 4, color: "rgba(251,191,36,0.75)" },
];

// ── SALES BY CATEGORY (donut) ─────────────────────────────────────────────────
export const salesByCategory = [
  { label: "Sedan", value: 35, color: "#D4AF37" },
  { label: "SUV", value: 28, color: "#38BDF8" },
  { label: "Sports", value: 22, color: "#10B981" },
  { label: "Luxury", value: 15, color: "#A78BFA" },
];

// ── RECENT ACTIVITY ───────────────────────────────────────────────────────────
export const recentActivity = [
  {
    id: 1,
    type: "test_drive",
    title: "Test Drive Confirmed",
    sub: "Mohammed Al-Rashid · Mercedes AMG GT",
    time: "2m ago",
    iconBg: "rgba(16,185,129,0.12)",
    iconColor: "#10B981",
    icon: "check",
  },
  {
    id: 2,
    type: "invoice",
    title: "Invoice #INV-0042 Created",
    sub: "AED 380,000 · BMW M8 Competition",
    time: "18m ago",
    iconBg: "rgba(212,175,55,0.12)",
    iconColor: "#D4AF37",
    icon: "file-invoice",
  },
  {
    id: 3,
    type: "customer",
    title: "New Customer Registered",
    sub: "Sarah Johnson · Inquiry: Rolls Royce",
    time: "1h ago",
    iconBg: "rgba(56,189,248,0.12)",
    iconColor: "#38BDF8",
    icon: "user-plus",
  },
  {
    id: 4,
    type: "sale",
    title: "Car Sold · Ferrari 488",
    sub: "AED 920,000 · Cash Payment",
    time: "3h ago",
    iconBg: "rgba(251,113,133,0.12)",
    iconColor: "#FB7185",
    icon: "car",
  },
  {
    id: 5,
    type: "booking",
    title: "New Booking Request",
    sub: "Khalid Al-Mansoori · Lamborghini Urus",
    time: "5h ago",
    iconBg: "rgba(251,191,36,0.12)",
    iconColor: "#FBBF24",
    icon: "calendar",
  },
];

// ── QUICK ACTIONS ─────────────────────────────────────────────────────────────
export const quickActions = [
  {
    label: "Add Car",
    sub: "Inventory",
    path: "/inventory",
    iconBg: "rgba(212,175,55,0.1)",
    iconColor: "#D4AF37",
    icon: "circle-plus",
  },
  {
    label: "New Invoice",
    sub: "Finance",
    path: "/invoices",
    iconBg: "rgba(56,189,248,0.1)",
    iconColor: "#38BDF8",
    icon: "file-text",
  },
  {
    label: "Book Drive",
    sub: "Test Drive",
    path: "/test-drives",
    iconBg: "rgba(16,185,129,0.1)",
    iconColor: "#10B981",
    icon: "calendar-plus",
  },
];

// ── INVENTORY (used in Phase 5) ───────────────────────────────────────────────
export const cars = [
  {
    id: 1,
    brand: "Mercedes",
    model: "AMG GT 63S",
    year: 2024,
    price: 680000,
    mileage: 1200,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "available",
    color: "Obsidian Black",
    category: "Sports",
  },
  {
    id: 2,
    brand: "BMW",
    model: "M8 Competition",
    year: 2024,
    price: 380000,
    mileage: 800,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "reserved",
    color: "Alpine White",
    category: "Sedan",
  },
  {
    id: 3,
    brand: "Ferrari",
    model: "488 Pista",
    year: 2023,
    price: 920000,
    mileage: 3400,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "sold",
    color: "Rosso Corsa",
    category: "Sports",
  },
  {
    id: 4,
    brand: "Rolls",
    model: "Ghost EWB",
    year: 2024,
    price: 1800000,
    mileage: 500,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "available",
    color: "Arctic White",
    category: "Luxury",
  },
  {
    id: 5,
    brand: "Lamborghini",
    model: "Urus Performante",
    year: 2024,
    price: 750000,
    mileage: 200,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "available",
    color: "Giallo Orion",
    category: "SUV",
  },
  {
    id: 6,
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2024,
    price: 620000,
    mileage: 1800,
    fuel: "Petrol",
    transmission: "Automatic",
    status: "maintenance",
    color: "GT Silver",
    category: "Sports",
  },
];

// ── CUSTOMERS (used in Phase 6) ───────────────────────────────────────────────
export const customers = [
  {
    id: 1,
    name: "Mohammed Al-Rashid",
    email: "mo.rashid@email.com",
    phone: "+971 50 123 4567",
    city: "Dubai",
    status: "active",
    purchases: 2,
    totalSpent: 1060000,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+971 55 987 6543",
    city: "Abu Dhabi",
    status: "prospect",
    purchases: 0,
    totalSpent: 0,
  },
  {
    id: 3,
    name: "Khalid Al-Mansoori",
    email: "k.mansoori@email.com",
    phone: "+971 52 456 7890",
    city: "Dubai",
    status: "active",
    purchases: 1,
    totalSpent: 750000,
  },
  {
    id: 4,
    name: "Emma Williams",
    email: "emma.w@email.com",
    phone: "+971 58 321 0987",
    city: "Sharjah",
    status: "active",
    purchases: 3,
    totalSpent: 2200000,
  },
];
