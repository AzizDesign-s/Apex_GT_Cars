// src/components/inventory/CarFormPage.jsx
//
// Full-page slide-up form for Add / Edit car.
// 3 tab sections: Basic Details → Media → Price & Features
// Slides up from bottom using Framer Motion.

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Car,
  Image,
  DollarSign,
  GripVertical,
  X,
  Plus,
} from "lucide-react";
import { BRAND_MODELS } from "../../data/mockData";
import apexToast from "../../utils/toast";
import clsx from "clsx";

const TABS = [
  { label: "Basic Details", icon: Car },
  { label: "Media", icon: Image },
  { label: "Price & Features", icon: DollarSign },
];

const EMPTY_FORM = {
  brand: "",
  model: "",
  variant: "",
  bodyType: "Sedan",
  fuelType: "Petrol",
  transmission: "Automatic",
  driveType: "RWD",
  units: 1,
  mileage: "",
  plate: "",
  status: "available",
  exteriorColor: "#1a1a1a",
  exteriorColorName: "",
  interiorColor: "#8B4513",
  interiorColorName: "",
  colorType: "Glossy",
  photos: [],
  price: "",
  currency: "AED",
  discount: "",
  features: "",
  condition: "",
};

function CarFormPage({ isOpen, onClose, onSave, editCar = null }) {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // If editing, pre-fill the form
  useEffect(() => {
    if (editCar) {
      setForm({ ...EMPTY_FORM, ...editCar });
    } else {
      setForm(EMPTY_FORM);
    }
    setTab(0);
    setErrors({});
  }, [editCar, isOpen]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  // Models available based on selected brand
  const models = form.brand ? BRAND_MODELS[form.brand] || [] : [];

  // ── Validation ───────────────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.brand) e.brand = "Required";
    if (!form.model) e.model = "Required";
    if (!form.price) e.price = "Required";
    if (!form.plate) e.plate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      apexToast.error("Validation Failed", "Please fill all required fields.");
      // Jump to first tab with errors
      if (errors.brand || errors.model || errors.plate) setTab(0);
      else if (errors.price) setTab(2);
      return;
    }
    onSave({ ...form, id: editCar?.id || Date.now() });
    apexToast.success(
      editCar ? "Car Updated" : "Car Added",
      `${form.brand} ${form.model} has been ${editCar ? "updated" : "added"} to inventory.`,
    );
    onClose();
  };

  // ── Section: Basic Details ────────────────────────────────────────────────────
  const BasicDetails = () => (
    <div className="space-y-5">
      {/* Car Identity */}
      <FormSection title="Car Identity">
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Car Brand" required error={errors.brand}>
            <select
              className="input-luxury"
              value={form.brand}
              onChange={(e) => {
                set("brand", e.target.value);
                set("model", "");
              }}
            >
              <option value="">Select Brand</option>
              {Object.keys(BRAND_MODELS).map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Car Model" required error={errors.model}>
            <select
              className="input-luxury"
              value={form.model}
              onChange={(e) => set("model", e.target.value)}
              disabled={!form.brand}
            >
              <option value="">
                {form.brand ? "Select Model" : "Select Brand First"}
              </option>
              {models.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Variant">
            <input
              className="input-luxury"
              placeholder="e.g. AMG Line, M Sport"
              value={form.variant}
              onChange={(e) => set("variant", e.target.value)}
            />
          </FormField>

          <FormField label="Body Type">
            <select
              className="input-luxury"
              value={form.bodyType}
              onChange={(e) => set("bodyType", e.target.value)}
            >
              {[
                "Sedan",
                "SUV",
                "Coupe",
                "Convertible",
                "Hatchback",
                "Wagon",
              ].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Fuel Type">
            <select
              className="input-luxury"
              value={form.fuelType}
              onChange={(e) => set("fuelType", e.target.value)}
            >
              {["Petrol", "Diesel", "Electric", "Hybrid"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Transmission">
            <select
              className="input-luxury"
              value={form.transmission}
              onChange={(e) => set("transmission", e.target.value)}
            >
              {["Automatic", "Manual", "Semi-Auto"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Drive Type">
            <select
              className="input-luxury"
              value={form.driveType}
              onChange={(e) => set("driveType", e.target.value)}
            >
              {["RWD", "FWD", "AWD", "4WD"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Total Units">
            <input
              className="input-luxury"
              type="number"
              min="0"
              value={form.units}
              onChange={(e) => set("units", e.target.value)}
            />
          </FormField>

          <FormField label="Mileage (km)">
            <input
              className="input-luxury"
              type="number"
              placeholder="e.g. 1200"
              value={form.mileage}
              onChange={(e) => set("mileage", e.target.value)}
            />
          </FormField>
        </div>
      </FormSection>

      {/* Registration & Colors */}
      <FormSection title="Registration & Colors">
        <div className="grid grid-cols-3 gap-4">
          <FormField label="Plate Number" required error={errors.plate}>
            <input
              className="input-luxury"
              placeholder="e.g. AXG-2024"
              value={form.plate}
              onChange={(e) => set("plate", e.target.value)}
            />
          </FormField>

          <FormField label="Car Status">
            <select
              className="input-luxury"
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
            >
              {["available", "reserved", "sold", "maintenance"].map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Color Type">
            <select
              className="input-luxury"
              value={form.colorType}
              onChange={(e) => set("colorType", e.target.value)}
            >
              {["Glossy", "Matte", "Satin", "Metallic", "Pearl", "Wrap"].map(
                (t) => (
                  <option key={t}>{t}</option>
                ),
              )}
            </select>
          </FormField>

          {/* Exterior color picker */}
          <FormField label="Exterior Color" span="col-span-1">
            <div className="flex gap-2">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl border border-border cursor-pointer flex-shrink-0"
                  style={{ background: form.exteriorColor }}
                  onClick={() =>
                    document.getElementById("ext-color-pick").click()
                  }
                />
                <input
                  id="ext-color-pick"
                  type="color"
                  className="absolute opacity-0 w-0 h-0"
                  value={form.exteriorColor}
                  onChange={(e) => set("exteriorColor", e.target.value)}
                />
              </div>
              <input
                className="input-luxury"
                placeholder="Color name"
                value={form.exteriorColorName}
                onChange={(e) => set("exteriorColorName", e.target.value)}
              />
            </div>
          </FormField>

          {/* Interior color picker */}
          <FormField label="Interior Color">
            <div className="flex gap-2">
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl border border-border cursor-pointer flex-shrink-0"
                  style={{ background: form.interiorColor }}
                  onClick={() =>
                    document.getElementById("int-color-pick").click()
                  }
                />
                <input
                  id="int-color-pick"
                  type="color"
                  className="absolute opacity-0 w-0 h-0"
                  value={form.interiorColor}
                  onChange={(e) => set("interiorColor", e.target.value)}
                />
              </div>
              <input
                className="input-luxury"
                placeholder="Color name"
                value={form.interiorColorName}
                onChange={(e) => set("interiorColorName", e.target.value)}
              />
            </div>
          </FormField>
        </div>
      </FormSection>
    </div>
  );

  // ── Section: Media ────────────────────────────────────────────────────────────
  const Media = () => {
    const LABELS = [
      "Exterior Front",
      "Exterior Rear",
      "Exterior Side",
      "Interior",
      "Dashboard",
      "Engine Bay",
      "Boot",
    ];

    const handleFiles = (files) => {
      const newPhotos = Array.from(files).map((f) => ({
        id: Date.now() + Math.random(),
        file: f,
        url: URL.createObjectURL(f),
        label: "Exterior Front",
      }));
      set("photos", [...form.photos, ...newPhotos]);
    };

    return (
      <FormSection title="Car Photos">
        {/* Drop zone */}
        <div
          className="border border-dashed border-border rounded-xl p-8 text-center
                     hover:border-gold/40 hover:bg-gold/[0.02] transition-all cursor-pointer mb-4"
          onClick={() => document.getElementById("photo-file-input").click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            handleFiles(e.dataTransfer.files);
          }}
        >
          <Image size={28} className="text-text-subtle mx-auto mb-3" />
          <p className="text-sm font-semibold text-text-muted mb-1">
            Drop photos here or click to upload
          </p>
          <p className="text-xs text-text-subtle">
            JPG, PNG up to 10MB · Multiple files supported
          </p>
          <input
            id="photo-file-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>

        {/* Photo previews */}
        {form.photos.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mb-4">
            {form.photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border">
                  <img
                    src={photo.url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Label select overlay */}
                <select
                  className="absolute bottom-0 left-0 right-0 bg-black/70 text-white
                             text-[9px] border-0 rounded-b-xl px-2 py-1 outline-none"
                  value={photo.label}
                  onChange={(e) =>
                    set(
                      "photos",
                      form.photos.map((p) =>
                        p.id === photo.id ? { ...p, label: e.target.value } : p,
                      ),
                    )
                  }
                >
                  {LABELS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
                {/* Remove button */}
                <button
                  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60
                             flex items-center justify-center opacity-0 group-hover:opacity-100
                             transition-opacity"
                  onClick={() =>
                    set(
                      "photos",
                      form.photos.filter((p) => p.id !== photo.id),
                    )
                  }
                >
                  <X size={10} className="text-white" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quick label chips */}
        <div>
          <p className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase mb-2">
            Quick Labels
          </p>
          <div className="flex flex-wrap gap-2">
            {LABELS.map((l) => (
              <span
                key={l}
                className="text-[10px] bg-gold/10 text-gold border border-gold/20
                                       px-3 py-1 rounded-full cursor-pointer hover:bg-gold/20
                                       transition-colors"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </FormSection>
    );
  };

  // ── Section: Price & Features ─────────────────────────────────────────────────
  const PriceFeatures = () => (
    <div className="space-y-5">
      <FormSection title="Pricing">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Car Price" required error={errors.price}>
            <div className="flex gap-2">
              <select
                className="input-luxury w-24 flex-shrink-0"
                value={form.currency}
                onChange={(e) => set("currency", e.target.value)}
              >
                {["AED", "USD", "EUR", "GBP", "SAR", "QAR"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <input
                className="input-luxury"
                type="number"
                placeholder="e.g. 680000"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </div>
          </FormField>

          <FormField label="Static Discount">
            <div className="flex gap-2">
              <select className="input-luxury w-20 flex-shrink-0">
                <option>AED</option>
                <option>%</option>
              </select>
              <input
                className="input-luxury"
                type="number"
                placeholder="e.g. 15000"
                value={form.discount}
                onChange={(e) => set("discount", e.target.value)}
              />
            </div>
          </FormField>
        </div>

        {/* Live price preview */}
        {form.price && (
          <div
            className="mt-3 p-3 bg-gold/[0.04] border border-gold/10 rounded-xl
                          flex items-center justify-between"
          >
            <span className="text-xs text-text-subtle">Final Price</span>
            <span className="text-lg font-extrabold text-gold">
              {form.currency}{" "}
              {(
                Number(form.price) - Number(form.discount || 0)
              ).toLocaleString()}
            </span>
          </div>
        )}
      </FormSection>

      <FormSection title="Car Features">
        <p className="text-xs text-text-subtle mb-2">
          Add each feature on a new line. Use • for bullet points.
        </p>
        <textarea
          className="input-luxury resize-none"
          rows={6}
          placeholder="• AMG Performance exhaust&#10;• Burmester surround sound&#10;• Night Vision Assist"
          value={form.features}
          onChange={(e) => set("features", e.target.value)}
          style={{ lineHeight: "1.7" }}
        />
      </FormSection>

      <FormSection title="Car Condition">
        <textarea
          className="input-luxury resize-none"
          rows={4}
          placeholder="Describe the car's overall condition, service history, any notes..."
          value={form.condition}
          onChange={(e) => set("condition", e.target.value)}
          style={{ lineHeight: "1.7" }}
        />
      </FormSection>
    </div>
  );

  const TAB_CONTENT = [<BasicDetails />, <Media />, <PriceFeatures />];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-base flex flex-col"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Header */}
          <div
            className="flex-shrink-0 bg-card border-b border-border px-6 py-4
                          flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center
                           text-text-muted hover:text-text-primary hover:border-gold/40 transition-all"
              >
                <ArrowLeft size={16} />
              </button>
              <div>
                <h2 className="text-base font-extrabold text-text-primary">
                  {editCar ? "Edit Car" : "Add New Car"}
                </h2>
                <p className="text-[10px] text-text-subtle mt-0.5">
                  Fill all 3 sections · Required fields marked with *
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={onClose} className="btn-ghost text-sm px-4 py-2">
                Cancel
              </button>
              <motion.button
                onClick={handleSave}
                className="btn-gold text-sm px-5 py-2 flex items-center gap-2"
                whileTap={{ scale: 0.97 }}
              >
                <Check size={15} />
                {editCar ? "Update Car" : "Save Car"}
              </motion.button>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex-shrink-0 bg-card border-b border-border px-6">
            <div className="flex gap-0 max-w-3xl">
              {TABS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setTab(i)}
                  className={clsx(
                    "flex items-center gap-2 px-5 py-3.5 text-xs font-semibold",
                    "border-b-2 transition-all duration-200",
                    tab === i
                      ? "border-gold text-gold"
                      : "border-transparent text-text-subtle hover:text-text-muted",
                  )}
                >
                  {/* Step number bubble */}
                  <span
                    className={clsx(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                      tab === i
                        ? "bg-gold text-base"
                        : "bg-border text-text-subtle",
                    )}
                  >
                    {i + 1}
                  </span>
                  <t.icon size={13} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable form body */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {TAB_CONTENT[tab]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Footer navigation */}
          <div
            className="flex-shrink-0 bg-card border-t border-border px-6 py-3
                          flex items-center justify-between"
          >
            <p className="text-[10px] text-text-subtle">
              Step {tab + 1} of 3 · {TABS[tab].label}
            </p>
            <div className="flex gap-3">
              {tab > 0 && (
                <button
                  onClick={() => setTab(tab - 1)}
                  className="btn-ghost text-xs px-4 py-2"
                >
                  ← Previous
                </button>
              )}
              {tab < 2 ? (
                <button
                  onClick={() => setTab(tab + 1)}
                  className="btn-gold text-xs px-4 py-2"
                >
                  Next Section →
                </button>
              ) : (
                <motion.button
                  onClick={handleSave}
                  className="btn-gold text-xs px-5 py-2 flex items-center gap-2"
                  whileTap={{ scale: 0.97 }}
                >
                  <Check size={13} /> Save Car
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Reusable sub-components ───────────────────────────────────────────────────
function FormSection({ title, children }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <p
        className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase mb-4
                    pb-2.5 border-b border-border/60"
      >
        {title}
      </p>
      {children}
    </div>
  );
}

function FormField({ label, children, required, error, span = "" }) {
  return (
    <div className={clsx("flex flex-col gap-1.5", span)}>
      <label className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-rose-400">{error}</p>}
    </div>
  );
}

export default CarFormPage;
