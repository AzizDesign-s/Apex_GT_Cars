// src/components/inventory/DeleteConfirm.jsx
// Safety modal — user must type car name to confirm delete.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle } from "lucide-react";

function DeleteConfirm({ car, isOpen, onClose, onConfirm }) {
  const [typed, setTyped] = useState("");

  // Reset input when modal opens
  useEffect(() => {
    if (isOpen) setTyped("");
  }, [isOpen]);

  if (!car) return null;

  const carName = `${car.brand} ${car.model}`;
  const confirmed = typed.trim() === carName;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-card border border-border rounded-2xl p-7 w-full max-w-sm
                         shadow-glass"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-2xl bg-rose-400/10 border border-rose-400/20
                              flex items-center justify-center mb-4"
              >
                <Trash2 size={22} className="text-rose-400" />
              </div>

              <h3 className="text-base font-extrabold text-text-primary mb-1">
                Delete this car?
              </h3>
              <p className="text-xs text-text-muted leading-relaxed mb-5">
                This will permanently remove{" "}
                <span className="text-text-primary font-semibold">
                  {carName}
                </span>{" "}
                from inventory. This cannot be undone.
              </p>

              {/* Warning */}
              <div
                className="flex items-start gap-2 bg-amber-400/8 border border-amber-400/15
                              rounded-xl p-3 mb-4"
              >
                <AlertTriangle
                  size={14}
                  className="text-amber-400 flex-shrink-0 mt-0.5"
                />
                <p className="text-[11px] text-amber-400/80 leading-relaxed">
                  All associated data including test drives and invoices will be
                  unlinked.
                </p>
              </div>

              {/* Confirm input */}
              <p className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase mb-2">
                Type car name to confirm
              </p>
              <input
                className="input-luxury mb-4 text-xs"
                placeholder={carName}
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                autoFocus
              />

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 btn-ghost text-xs py-2.5"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={() => confirmed && onConfirm(car)}
                  disabled={!confirmed}
                  className={`flex-1 flex items-center justify-center gap-2 text-xs py-2.5
                             rounded-xl border transition-all duration-200 font-semibold
                             ${
                               confirmed
                                 ? "bg-rose-500/10 border-rose-400/40 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                                 : "bg-transparent border-border text-text-subtle/40 cursor-not-allowed"
                             }`}
                  whileTap={confirmed ? { scale: 0.97 } : {}}
                >
                  <Trash2 size={13} />
                  Delete Car
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DeleteConfirm;
