// src/pages/Dashboard.jsx
//
// This is the main dashboard page.
// It imports all the reusable components we've built and assembles them.
// The page itself has minimal logic — it just arranges components.

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Car,
  DollarSign,
  CheckCircle,
  CalendarCheck,
  UserPlus,
  FileText,
  CirclePlus,
  FilePlus,
  CalendarPlus,
} from "lucide-react";
import StatCard from "../components/ui/StatCard";
import RevenueChart from "../components/charts/RevenueChart";
import BrandChart from "../components/charts/BrandChart";
import CategoryDonut from "../components/charts/CategoryDonut";
import {
  kpiStats,
  recentActivity,
  quickActions,
  salesByCategory,
} from "../data/mockData";
import useAppStore from "../store/useAppStore";
import clsx from "clsx";

// Icon map for quick actions
const ACTION_ICONS = {
  "circle-plus": CirclePlus,
  "file-text": FilePlus,
  "calendar-plus": CalendarPlus,
};

// Icon map for activity feed
const ACTIVITY_ICONS = {
  check: CheckCircle,
  "file-invoice": FileText,
  "user-plus": UserPlus,
  car: Car,
  calendar: CalendarCheck,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();

  // Format date for header
  const today = new Date().toLocaleDateString("en-AE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // Time-based greeting
  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  // KPI card config — maps mockData to StatCard props
  const kpiCards = [
    {
      key: "totalInventory",
      label: "Total Inventory",
      icon: Car,
      accentColor: "gold",
      ...kpiStats.totalInventory,
    },
    {
      key: "totalRevenue",
      label: "Total Revenue",
      icon: DollarSign,
      accentColor: "blue",
      ...kpiStats.totalRevenue,
    },
    {
      key: "carsSold",
      label: "Cars Sold",
      icon: CheckCircle,
      accentColor: "green",
      ...kpiStats.carsSold,
    },
    {
      key: "testDrives",
      label: "Test Drives",
      icon: CalendarCheck,
      accentColor: "rose",
      trendType: "warn",
      ...kpiStats.testDrives,
    },
    {
      key: "newCustomers",
      label: "New Customers",
      icon: UserPlus,
      accentColor: "amber",
      ...kpiStats.newCustomers,
    },
    {
      key: "pendingInvoices",
      label: "Pending Invoices",
      icon: FileText,
      accentColor: "purple",
      trendType: "down",
      ...kpiStats.pendingInvoices,
    },
  ];
  return (
    <div className="space-y-4 pb-4">
      {/* ── Page Header ── */}
      <motion.div
        className="flex items-start justify-between"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary tracking-tight">
            {getGreeting()}, {user?.name || "Admin"} 👋
          </h1>
          <p className="text-xs text-text-subtle mt-1 tracking-widest uppercase">
            {today} · APEX GT Dubai
          </p>
        </div>
        {/* Showroom status badge */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl
                        bg-emerald-400/10 border border-emerald-400/20"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-semibold text-emerald-400 tracking-widest uppercase">
            Showroom Open
          </span>
        </div>
      </motion.div>

      {/* ── KPI Cards ── */}
      {/*  grid-cols-3 on desktop, 2 on tablet, 1 on mobile  */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {kpiCards.map((card, i) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={card.value}
            trend={card.trend}
            trendType={
              card.trendType ||
              (card.up ? "up" : card.up === false ? "down" : "warn")
            }
            icon={card.icon}
            accentColor={card.accentColor}
            delay={i * 0.07} // stagger: each card animates 70ms after previous
          />
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        {/* Revenue Chart — takes 3 of 5 columns */}
        <motion.div
          className="lg:col-span-3 bg-card border border-border rounded-2xl p-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary">
              Monthly Revenue
            </h3>
            <div className="flex items-center gap-3">
              {/* Custom legend */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-gold/85" />
                <span className="text-[10px] text-text-subtle">2026</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-border" />
                <span className="text-[10px] text-text-subtle">2025</span>
              </div>
              <span className="text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-bold tracking-widest">
                AED
              </span>
            </div>
          </div>
          {/* Chart needs explicit height on its wrapper */}
          <div className="h-52">
            <RevenueChart />
          </div>
        </motion.div>

        {/* Brand Chart — takes 2 of 5 columns */}
        <motion.div
          className="lg:col-span-2 bg-card border border-border rounded-2xl p-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary">
              Top Selling Brands
            </h3>
            <span className="text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-bold tracking-widest">
              THIS MONTH
            </span>
          </div>
          <div className="h-52">
            <BrandChart />
          </div>
        </motion.div>
      </div>

      {/* ── Bottom Row: Activity + Donut + Quick Actions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        {/* Recent Activity — 3 of 5 */}
        <motion.div
          className="lg:col-span-3 bg-card border border-border rounded-2xl p-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-text-primary">
              Recent Activity
            </h3>
            <button
              onClick={() => navigate("/notifications")}
              className="text-[10px] text-gold hover:text-gold-light transition-colors font-medium"
            >
              View all →
            </button>
          </div>

          {/* Activity timeline */}
          <div className="space-y-0">
            {recentActivity.map((item, i) => {
              const Icon = ACTIVITY_ICONS[item.icon] || Car;
              const isLast = i === recentActivity.length - 1;

              return (
                <div key={item.id} className="flex items-start gap-3">
                  {/* Icon + vertical line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: item.iconBg, color: item.iconColor }}
                    >
                      <Icon size={13} />
                    </div>
                    {/* Connecting line between items */}
                    {!isLast && (
                      <div className="w-px flex-1 bg-border/50 min-h-[12px] my-1" />
                    )}
                  </div>

                  {/* Content */}
                  <div
                    className={clsx(
                      "flex-1 flex items-start justify-between min-w-0",
                      !isLast ? "pb-3" : "",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-text-primary truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-text-subtle mt-0.5 truncate">
                        {item.sub}
                      </p>
                    </div>
                    <span className="text-[10px] text-text-subtle flex-shrink-0 ml-3 mt-0.5">
                      {item.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Right column — Donut + Quick Actions */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {/* Sales by Category Donut */}
          <motion.div
            className="bg-card border border-border rounded-2xl p-4 flex-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.45 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-text-primary">
                Sales by Category
              </h3>
              <span className="text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-bold tracking-widest">
                ALL TIME
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Donut chart */}
              <div className="w-24 h-24 flex-shrink-0">
                <CategoryDonut />
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-2 flex-1">
                {salesByCategory.map((cat) => (
                  <div
                    key={cat.label}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: cat.color }}
                      />
                      <span className="text-[11px] text-text-muted">
                        {cat.label}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-text-primary">
                      {cat.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-card border border-border rounded-2xl p-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h3 className="text-sm font-bold text-text-primary mb-3">
              Quick Actions
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {quickActions.map((action) => {
                const Icon = ACTION_ICONS[action.icon] || CirclePlus;
                return (
                  <motion.button
                    key={action.label}
                    onClick={() => navigate(action.path)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl
                               bg-card border border-border
                               hover:border-gold/30 hover:bg-gold/[0.03]
                               transition-all duration-200 group"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center
                                 group-hover:scale-110 transition-transform duration-200"
                      style={{
                        background: action.iconBg,
                        color: action.iconColor,
                      }}
                    >
                      <Icon size={15} />
                    </div>
                    <div className="text-center">
                      <p
                        className="text-[10px] font-semibold text-text-muted group-hover:text-text-primary
                                    transition-colors leading-tight"
                      >
                        {action.label}
                      </p>
                      <p className="text-[9px] text-text-subtle mt-0.5">
                        {action.sub}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
