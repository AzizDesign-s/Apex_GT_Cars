// src/components/customers/CustomerStats.jsx
// Follows exact same pattern as InventoryStats.jsx

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserSearch,
  Crown,
  UserX,
  UserMinus,
} from "lucide-react";
import clsx from "clsx";

const PILLS = [
  {
    key: "total",
    label: "Total",
    icon: Users,
    iconClass: "bg-gold/10 text-gold",
  },
  {
    key: "active",
    label: "Active",
    icon: UserCheck,
    iconClass: "bg-emerald-400/10 text-emerald-400",
  },
  {
    key: "prospect",
    label: "Prospect",
    icon: UserSearch,
    iconClass: "bg-amber-400/10 text-amber-400",
  },
  { key: "vip", label: "VIP", icon: Crown, iconClass: "bg-gold/10 text-gold" },
  {
    key: "inactive",
    label: "Inactive",
    icon: UserMinus,
    iconClass: "bg-text-subtle/10 text-text-subtle",
  },
  {
    key: "blacklisted",
    label: "Blacklisted",
    icon: UserX,
    iconClass: "bg-rose-400/10 text-rose-400",
  },
];

function CustomerStats({ stats = {} }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {PILLS.map(({ key, label, icon: Icon, iconClass }, i) => (
        <motion.div
          key={key}
          className="flex items-center gap-3 bg-card border border-border rounded-xl
                     px-3 py-6 flex-1 min-w-[160px] max-w-[230px]
                     hover:border-gold/20 transition-colors cursor-default"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div
            className={clsx(
              "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
              iconClass,
            )}
          >
            <Icon size={15} />
          </div>
          <div>
            <p
              className="text-[9px] font-bold tracking-[0.2em] text-text-subtle
                          uppercase leading-none mb-3"
            >
              {label}
            </p>
            <p className="text-base font-extrabold text-text-primary leading-none">
              {stats[key] ?? 0}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default CustomerStats;
