// src/components/inventory/CarDetailDrawer.jsx
// Slide-in drawer from the right showing full car details.

import { motion, AnimatePresence } from "framer-motion";
import { X, Edit, Trash2, Car } from "lucide-react";
import clsx from "clsx";

const STATUS_STYLES = {
  available: "bg-emerald-400/10 text-emerald-400 border-emerald-400/20",
  reserved: "bg-sky-400/10 text-sky-400 border-sky-400/20",
  sold: "bg-gold/10 text-gold border-gold/20",
  maintenance: "bg-rose-400/10 text-rose-400 border-rose-400/20",
};

function DetailRow({ label, value }) {
  return (
    <div className="bg-base border border-border rounded-xl p-3">
      <p className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase mb-1">
        {label}
      </p>
      <p className="text-xs font-semibold text-text-primary">{value || "—"}</p>
    </div>
  );
}

function CarDetailDrawer({ car, isOpen, onClose, onEdit, onDelete }) {
  return (
    <AnimatePresence>
      {isOpen && car && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-[420px] z-40
                       bg-card border-l border-border flex flex-col shadow-glass"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-5 py-4 border-b border-border">
              <div>
                <h3 className="text-base font-extrabold text-text-primary">
                  {car.brand} {car.model}
                </h3>
                <p className="text-[10px] text-text-subtle mt-0.5">
                  {car.year} · {car.category} · {car.plate}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-lg border border-border flex items-center justify-center
                           text-text-muted hover:text-rose-400 hover:border-rose-400/40 transition-all"
              >
                <X size={13} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* Car hero — photo or placeholder */}
              <div
                className="w-full h-36 rounded-2xl bg-base border border-border
                              flex items-center justify-center"
              >
                {car.photos?.[0] ? (
                  <img
                    src={car.photos[0].url}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <Car size={40} className="text-text-subtle/30" />
                )}
              </div>

              {/* Price + status */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-text-subtle">Listed Price</p>
                  <p className="text-xl font-extrabold text-text-primary">
                    {car.currency || "AED"} {Number(car.price).toLocaleString()}
                  </p>
                  {car.discount > 0 && (
                    <p className="text-xs text-emerald-400">
                      - {car.currency || "AED"}{" "}
                      {Number(car.discount).toLocaleString()} discount
                    </p>
                  )}
                </div>
                <span
                  className={clsx(
                    "text-[10px] font-bold px-3 py-1.5 rounded-full border tracking-widest uppercase",
                    STATUS_STYLES[car.status],
                  )}
                >
                  ● {car.status}
                </span>
              </div>

              {/* Basic details grid */}
              <div>
                <p
                  className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase
                               mb-2 pb-2 border-b border-border"
                >
                  Basic Details
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <DetailRow label="Brand" value={car.brand} />
                  <DetailRow label="Model" value={car.model} />
                  <DetailRow label="Year" value={car.year} />
                  <DetailRow label="Body Type" value={car.bodyType} />
                  <DetailRow label="Fuel" value={car.fuel || car.fuelType} />
                  <DetailRow label="Transmission" value={car.transmission} />
                  <DetailRow label="Drive Type" value={car.driveType} />
                  <DetailRow
                    label="Mileage"
                    value={
                      car.mileage
                        ? `${Number(car.mileage).toLocaleString()} km`
                        : "—"
                    }
                  />
                  <DetailRow label="Units" value={car.units} />
                  <DetailRow label="Plate" value={car.plate} />
                </div>
              </div>

              {/* Colors */}
              <div>
                <p
                  className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase
                               mb-2 pb-2 border-b border-border"
                >
                  Colors
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-base border border-border rounded-xl p-3">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase mb-2">
                      Exterior
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg border border-border flex-shrink-0"
                        style={{ background: car.exteriorColor }}
                      />
                      <p className="text-xs font-semibold text-text-primary">
                        {car.exteriorColorName || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-base border border-border rounded-xl p-3">
                    <p className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase mb-2">
                      Interior
                    </p>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-lg border border-border flex-shrink-0"
                        style={{ background: car.interiorColor }}
                      />
                      <p className="text-xs font-semibold text-text-primary">
                        {car.interiorColorName || "—"}
                      </p>
                    </div>
                  </div>
                  <DetailRow label="Color Type" value={car.colorType} />
                </div>
              </div>

              {/* Features */}
              {car.features && (
                <div>
                  <p
                    className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase
                                 mb-2 pb-2 border-b border-border"
                  >
                    Features
                  </p>
                  <div
                    className="bg-base border border-border rounded-xl p-3
                                  text-xs text-text-muted leading-[1.8] whitespace-pre-line"
                  >
                    {car.features}
                  </div>
                </div>
              )}

              {/* Condition */}
              {car.condition && (
                <div>
                  <p
                    className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase
                                 mb-2 pb-2 border-b border-border"
                  >
                    Condition
                  </p>
                  <div
                    className="bg-base border border-border rounded-xl p-3
                                  text-xs text-text-muted leading-[1.8]"
                  >
                    {car.condition}
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="flex gap-2 px-5 py-4 border-t border-border">
              <button
                onClick={onClose}
                className="btn-ghost flex-1 flex items-center justify-center gap-2 text-xs py-2"
              >
                <X size={13} /> Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onEdit(car);
                }}
                className="flex-1 flex items-center justify-center gap-2 text-xs py-2
                           border border-gold/30 text-gold hover:bg-gold/5 rounded-xl
                           transition-all duration-200"
              >
                <Edit size={13} /> Edit
              </button>
              <button
                onClick={() => onDelete(car)}
                className="flex-1 flex items-center justify-center gap-2 text-xs py-2
                           border border-rose-400/30 text-rose-400 hover:bg-rose-400/5 rounded-xl
                           transition-all duration-200"
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CarDetailDrawer;
