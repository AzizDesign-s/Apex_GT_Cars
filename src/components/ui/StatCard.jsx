// src/components/ui/StatCard.jsx
//
// ─── REUSABLE KPI CARD ───────────────────────────────────────────────────────
// Used on Dashboard for all 6 metrics.
// Built as a reusable component because:
//   - Same card structure repeats 6 times
//   - Easy to add to other pages (Analytics, etc.)
//   - All config passed via props — no hardcoding inside
//
// PROPS:
//   label      → e.g. "Total Revenue"
//   value      → e.g. "AED 2.4M"
//   trend      → e.g. "+12% MoM"
//   trendType  → "up" | "down" | "warn"  controls color
//   icon       → Lucide icon component
//   accentColor → e.g. "gold" | "blue" | "green" etc.
// ─────────────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import clsx from "clsx";

const ACCENT_MAP = {
  gold: {
    bar: "from-gold-dark to-gold",
    icon: "bg-gold/12 text-gold",
  },

  blue: {
    bar: "from-[#0369A1] to-sky-accent",
    icon: "bg-sky-accent/12 text-sky-accent",
  },
  green: {
    bar: "from-[#065F46] to-emerald-400",
    icon: "bg-emerald-400/12 text-emerald-400",
  },
  rose: {
    bar: "from-[#9F1239] to-rose-400",
    icon: "bg-rose-400/12 text-rose-400",
  },
  amber: {
    bar: "from-[#92400E] to-amber-400",
    icon: "bg-amber-400/12 text-amber-400",
  },
  purple: {
    bar: "from-[#4C1D95] to-violet-400",
    icon: "bg-violet-400/12 text-violet-400",
  },
};

const TREND_MAP = {
  up: "bg-emerald-400/12 text-emerald-400",
  down: "bg-rose/12 text-rose-400",
  warn: "bg-amber-400/12 text-amber-400",
};

const StatCard = ({
  label,
  value,
  trend,
  trendType = "up",
  icon: Icon,
  accentColor = "gold",
  delay = 0,
}) => {
  const accent = ACCENT_MAP[accentColor] || ACCENT_MAP.gold;
  const trendStyle = TREND_MAP[trendType] || TREND_MAP.up;
  return (
    <motion.div
      className="relative bg-card border border-border rounded-2xl p-4 overflow-hidden hover:border-gold/25 transition-colors duration-300 cursor-default"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
    >
      {/* Top accent bar — color depends on accentColor prop */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accent.bar}`}
      />

      {/* Icon + trend badge row */}
      <div className="flex items-start justify-between mb-3">
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${accent.icon}`}
        >
          <Icon size={17} />
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-1 rounded-full ${trendStyle}`}
        >
          {trendType === "up" && "↑ "}
          {trendType === "down" && "↓ "}
          {trend}
        </span>
      </div>

      {/* Label */}
      <p className="text-[10px] font-semibold tracking-[0.2em] text-text-subtle uppercase mb-1">
        {label}
      </p>

      {/* Value — large and bold */}
      <p className="text-[22px] font-extrabold text-text-primary tracking-tight leading-none">
        {value}
      </p>
    </motion.div>
  );
};

export default StatCard;
