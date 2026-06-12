// src/components/ui/Badge.jsx
// Reusable status/label badge used in tables, drawers, cards.

import clsx from "clsx";

const STYLES = {
  available: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
  reserved: "bg-sky-accent/10  text-sky-accent  border-sky-accent/25",
  sold: "bg-gold/10        text-gold         border-gold/25",
  maintenance: "bg-rose-400/10   text-rose-400   border-rose-400/25",
  active: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
  prospect: "bg-amber-400/10   text-amber-400   border-amber-400/25",
  inactive: "bg-border/50      text-text-subtle  border-border",
  paid: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
  pending: "bg-amber-400/10   text-amber-400   border-amber-400/25",
  overdue: "bg-rose-400/10   text-rose-400   border-rose-400/25",
  approved: "bg-emerald-400/10 text-emerald-400 border-emerald-400/25",
  rejected: "bg-rose-400/10   text-rose-400   border-rose-400/25",
  vip: "bg-gold/12       text-gold         border-gold/30",
  blacklisted: "bg-rose-400/10  text-rose-400    border-rose-400/25",
};

const DOT_COLORS = {
  available: "bg-emerald-400",
  reserved: "bg-sky-accent",
  sold: "bg-gold",
  maintenance: "bg-rose-400",
  active: "bg-emerald-400",
  prospect: "bg-amber-400",
  inactive: "bg-text-subtle",
  paid: "bg-emerald-400",
  pending: "bg-amber-400",
  overdue: "bg-rose-400",
  approved: "bg-emerald-400",
  rejected: "bg-rose-400",
  vip: "bg-gold",
  blacklisted: "bg-rose-400",
};

function Badge({ status, label, showDot = true }) {
  const style = STYLES[status] || STYLES.inactive;
  const dotColor = DOT_COLORS[status] || "bg-text-subtle";
  const text = label || status?.charAt(0).toUpperCase() + status?.slice(1);

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full",
        "text-[9px] font-bold tracking-[1.2px] uppercase border",
        style,
      )}
    >
      {showDot && (
        <span
          className={clsx("w-1.5 h-1.5 rounded-full flex-shrink-0", dotColor)}
        />
      )}
      {text}
    </span>
  );
}

export default Badge;
