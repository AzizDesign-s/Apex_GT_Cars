// src/components/ui/DeleteConfirm.jsx
// Reusable delete confirmation — used in Inventory, Customers, Invoices etc.

import { useState, useEffect } from "react";
import { Trash2, AlertTriangle } from "lucide-react";
import Modal from "./Modal";
import Button from "./Button";

function DeleteConfirm({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete this item?",
  description,
  confirmText, // if set, user must type this to confirm
  itemName, // shown in description
}) {
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (isOpen) setTyped("");
  }, [isOpen]);

  const requiresTyping = !!confirmText;
  const canConfirm = !requiresTyping || typed.trim() === confirmText;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={
        description ||
        (itemName ? `Permanently remove "${itemName}"` : undefined)
      }
    >
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
          This action cannot be undone.
        </p>
      </div>

      {/* Type-to-confirm input */}
      {requiresTyping && (
        <div className="mb-4">
          <p className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase mb-2">
            Type <span className="text-gold">{confirmText}</span> to confirm
          </p>
          <input
            className="input-luxury text-xs"
            placeholder={confirmText}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoFocus
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="ghost" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => canConfirm && onConfirm()}
          disabled={!canConfirm}
          icon={Trash2}
          fullWidth
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteConfirm;
