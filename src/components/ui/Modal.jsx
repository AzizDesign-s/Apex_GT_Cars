// src/components/ui/Modal.jsx
// Reusable modal wrapper — used for delete confirm, status change, etc.
// Appears at top-center (not full screen overlay) for non-intrusive UX.

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";

function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "max-w-sm",
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal — top center */}
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
            <motion.div
              className={clsx(
                "w-full bg-card border border-border rounded-2xl shadow-glass",
                width,
              )}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              {(title || subtitle) && (
                <div className="flex items-start justify-between px-5 py-4 border-b border-border">
                  <div>
                    {title && (
                      <h3 className="text-sm font-extrabold text-text-primary">
                        {title}
                      </h3>
                    )}
                    {subtitle && (
                      <p className="text-xs text-text-subtle mt-0.5">
                        {subtitle}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="w-6 h-6 rounded-lg border border-border flex items-center justify-center
                               text-text-subtle hover:text-rose-400 hover:border-rose-400/40 transition-all ml-4"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}

              {/* Body */}
              <div className="p-5">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;
