// src/pages/Inventory.jsx
// Main page — assembles all inventory components together.

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  RefreshCw,
  FileSpreadsheet,
  FileText,
  Plus,
  Columns,
  ChevronUp,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { cars as initialCars, DEFAULT_COLUMNS } from "../data/mockData";
import CarFormPage from "../components/inventory/CarFormPage";
import CarDetailDrawer from "../components/inventory/CarDetailDrawer";
import DeleteConfirm from "../components/inventory/DeleteConfirm";
import ColumnManager from "../components/inventory/ColumnManager";
import useAppStore from "../store/useAppStore";
import apexToast from "../utils/toast";
import clsx from "clsx";

// ── Status config ──────────────────────────────────────────────────────────────
const STATUS_STYLE = {
  available: { badge: "badge-available", dot: "bg-emerald-400" },
  reserved: { badge: "badge-reserved", dot: "bg-sky-accent" },
  sold: { badge: "badge-sold", dot: "bg-gold" },
  maintenance: { badge: "badge-maintenance", dot: "bg-rose-400" },
};

// ── Stat pill ──────────────────────────────────────────────────────────────────
function StatPill({ label, count, color }) {
  return (
    <div
      className="flex items-center gap-2.5 bg-card border border-border
                    rounded-xl px-3 py-2"
    >
      <span className={`w-2 h-2 rounded-full ${color}`} />
      <div>
        <p className="text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase leading-none mb-0.5">
          {label}
        </p>
        <p className="text-sm font-extrabold text-text-primary leading-none">
          {count}
        </p>
      </div>
    </div>
  );
}

// ── Sort icon ──────────────────────────────────────────────────────────────────
function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field)
    return <ChevronUp size={11} className="text-text-subtle/30" />;
  return sortDir === "asc" ? (
    <ChevronUp size={11} className="text-gold" />
  ) : (
    <ChevronDown size={11} className="text-gold" />
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
function Inventory() {
  // ── Data state ──────────────────────────────────────────────────────────────
  const [cars, setCars] = useState(initialCars);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterFuel, setFilterFuel] = useState("");
  const [sortField, setSortField] = useState("brand");
  const [sortDir, setSortDir] = useState("asc");
  const [selected, setSelected] = useState(new Set());
  const [page, setPage] = useState(1);
  const PER_PAGE = 10;

  // ── UI state ────────────────────────────────────────────────────────────────
  const [formOpen, setFormOpen] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [drawerCar, setDrawerCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);
  const [colManagerOpen, setColManagerOpen] = useState(false);

  // ── Columns (persisted to localStorage) ────────────────────────────────────
  const [columns, setColumns] = useState(() => {
    try {
      const saved = localStorage.getItem("apex-gt-inventory-columns");
      return saved ? JSON.parse(saved) : DEFAULT_COLUMNS;
    } catch {
      return DEFAULT_COLUMNS;
    }
  });

  const { setInventoryCount } = useAppStore();

  // Save columns to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("apex-gt-inventory-columns", JSON.stringify(columns));
  }, [columns]);

  // Update sidebar badge whenever cars data changes
  useEffect(() => {
    setInventoryCount(cars.length);
  }, [cars]);

  const visibleColumns = columns.filter((c) => c.visible);

  // ── Filtered + sorted data ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let data = [...cars];

    if (search) {
      const q = search.toLowerCase();
      data = data.filter((c) =>
        `${c.brand} ${c.model} ${c.plate} ${c.variant}`
          .toLowerCase()
          .includes(q),
      );
    }
    if (filterStatus) data = data.filter((c) => c.status === filterStatus);
    if (filterBrand) data = data.filter((c) => c.brand === filterBrand);
    if (filterFuel)
      data = data.filter((c) => (c.fuel || c.fuelType) === filterFuel);

    data.sort((a, b) => {
      const av = a[sortField] ?? "";
      const bv = b[sortField] ?? "";
      return sortDir === "asc"
        ? String(av).localeCompare(String(bv), undefined, { numeric: true })
        : String(bv).localeCompare(String(av), undefined, { numeric: true });
    });
    return data;
  }, [cars, search, filterStatus, filterBrand, filterFuel, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const pageData = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // ── Stats ───────────────────────────────────────────────────────────────────
  const stats = {
    total: cars.length,
    available: cars.filter((c) => c.status === "available").length,
    reserved: cars.filter((c) => c.status === "reserved").length,
    sold: cars.filter((c) => c.status === "sold").length,
    maintenance: cars.filter((c) => c.status === "maintenance").length,
  };

  // ── Unique brands for filter ─────────────────────────────────────────────────
  const brands = [...new Set(cars.map((c) => c.brand))];

  // ── Sort handler ─────────────────────────────────────────────────────────────
  const handleSort = (field) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  // ── Selection ────────────────────────────────────────────────────────────────
  const toggleSelect = (id) => {
    setSelected((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const selectAll = (checked) => {
    setSelected(checked ? new Set(pageData.map((c) => c.id)) : new Set());
  };

  // ── CRUD ─────────────────────────────────────────────────────────────────────
  const handleSave = (carData) => {
    if (carData.id && cars.find((c) => c.id === carData.id)) {
      setCars((cs) => cs.map((c) => (c.id === carData.id ? carData : c)));
    } else {
      setCars((cs) => [carData, ...cs]);
    }
  };

  const handleDelete = (car) => {
    setCars((cs) => cs.filter((c) => c.id !== car.id));
    setDeleteCar(null);
    setDrawerCar(null);
    apexToast.info(
      "Car Removed",
      `${car.brand} ${car.model} removed from inventory.`,
    );
  };

  const handleBulkDelete = () => {
    setCars((cs) => cs.filter((c) => !selected.has(c.id)));
    apexToast.info(
      "Bulk Delete",
      `${selected.size} cars removed from inventory.`,
    );
    setSelected(new Set());
  };

  // ── Export (placeholder) ──────────────────────────────────────────────────────
  const handleExport = (type) => {
    apexToast.info(
      `Export ${type}`,
      `Exporting ${filtered.length} cars as ${type}... (Phase 8 feature)`,
    );
  };

  return (
    <div className="space-y-3 pb-4">
      {/* ── Stats strip ── */}
      <motion.div
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <StatPill label="Total" count={stats.total} color="bg-gold" />
        <StatPill
          label="Available"
          count={stats.available}
          color="bg-emerald-400"
        />
        <StatPill
          label="Reserved"
          count={stats.reserved}
          color="bg-sky-accent"
        />
        <StatPill label="Sold" count={stats.sold} color="bg-gold" />
        <StatPill
          label="Maintenance"
          count={stats.maintenance}
          color="bg-rose-400"
        />
      </motion.div>

      {/* ── Bulk action bar ── */}
      {selected.size > 0 && (
        <motion.div
          className="flex items-center gap-3 bg-card border border-gold/20
                     rounded-xl px-4 py-2.5"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-semibold text-gold">
            {selected.size} car{selected.size > 1 ? "s" : ""} selected
          </span>
          <div className="flex-1" />
          <button
            onClick={() => setSelected(new Set())}
            className="btn-ghost text-xs px-3 py-1.5"
          >
            Clear
          </button>
          <button
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg
                       border border-sky-accent/30 text-sky-accent hover:bg-sky-accent/5
                       transition-all"
          >
            Change Status
          </button>
          <button
            onClick={handleBulkDelete}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg
                       border border-rose-400/30 text-rose-400 hover:bg-rose-400/5
                       transition-all"
          >
            <Trash2 size={12} /> Delete Selected
          </button>
        </motion.div>
      )}

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subtle"
          />
          <input
            className="input-luxury pl-9 py-2 text-xs"
            placeholder="Search brand, model, plate..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Filters */}
        <select
          className="input-luxury py-2 text-xs w-auto"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Status</option>
          {["available", "reserved", "sold", "maintenance"].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="input-luxury py-2 text-xs w-auto"
          value={filterBrand}
          onChange={(e) => {
            setFilterBrand(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Brands</option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <select
          className="input-luxury py-2 text-xs w-auto"
          value={filterFuel}
          onChange={(e) => {
            setFilterFuel(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Fuel</option>
          {["Petrol", "Diesel", "Electric", "Hybrid"].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>

        <div className="flex-1" />

        {/* Action buttons */}
        <button
          onClick={() => {
            setSearch("");
            setFilterStatus("");
            setFilterBrand("");
            setFilterFuel("");
          }}
          className="w-8 h-8 rounded-xl border border-border flex items-center justify-center
                     text-text-muted hover:text-gold hover:border-gold/30 transition-all"
          title="Reset filters"
        >
          <RefreshCw size={13} />
        </button>

        {/* Column manager */}
        <div className="relative">
          <button
            onClick={() => setColManagerOpen(!colManagerOpen)}
            className={clsx(
              "flex items-center gap-1.5 px-3 h-8 rounded-xl border text-xs font-medium transition-all",
              colManagerOpen
                ? "border-gold/40 text-gold bg-gold/5"
                : "border-border text-text-muted hover:border-gold/30 hover:text-gold",
            )}
          >
            <Columns size={13} /> Columns
          </button>
          <ColumnManager
            columns={columns}
            onColumnsChange={setColumns}
            isOpen={colManagerOpen}
            onClose={() => setColManagerOpen(false)}
          />
        </div>

        <button
          onClick={() => handleExport("Excel")}
          className="flex items-center gap-1.5 px-3 h-8 rounded-xl border border-border
                     text-xs text-text-muted hover:text-gold hover:border-gold/30 transition-all"
        >
          <FileSpreadsheet size={13} /> Excel
        </button>
        <button
          onClick={() => handleExport("PDF")}
          className="flex items-center gap-1.5 px-3 h-8 rounded-xl border border-border
                     text-xs text-text-muted hover:text-gold hover:border-gold/30 transition-all"
        >
          <FileText size={13} /> PDF
        </button>

        <button
          onClick={() => {
            setEditCar(null);
            setFormOpen(true);
          }}
          className="btn-gold flex items-center gap-1.5 px-4 h-8 text-xs"
        >
          <Plus size={13} /> Add Car
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {/* Table header */}
        <div
          className="flex items-center px-4 border-b border-border
                        bg-[rgba(from_var(--color-card)_r_g_b/0.5)]"
        >
          {/* Checkbox */}
          <div className="w-9 flex-shrink-0 py-3">
            <input
              type="checkbox"
              className="w-3.5 h-3.5 rounded accent-gold cursor-pointer"
              checked={selected.size === pageData.length && pageData.length > 0}
              onChange={(e) => selectAll(e.target.checked)}
            />
          </div>

          {visibleColumns.map((col) => (
            <div
              key={col.id}
              className={clsx(
                "py-3 px-2 text-[9px] font-bold tracking-[0.2em] text-text-subtle uppercase",
                "flex items-center gap-1 cursor-pointer hover:text-text-muted select-none",
                col.id === "car" ? "flex-1 min-w-[140px]" : "",
                col.id === "image" ? "w-14 flex-shrink-0 cursor-default" : "",
                col.id === "status" || col.id === "fuel"
                  ? "w-24 flex-shrink-0"
                  : "",
                col.id === "price" || col.id === "mileage"
                  ? "w-28 flex-shrink-0"
                  : "",
              )}
              onClick={() => col.id !== "image" && handleSort(col.id)}
            >
              {col.label}
              {col.id !== "image" && (
                <SortIcon
                  field={col.id}
                  sortField={sortField}
                  sortDir={sortDir}
                />
              )}
            </div>
          ))}

          {/* Actions col */}
          <div
            className="w-24 flex-shrink-0 py-3 px-2 text-[9px] font-bold
                          tracking-[0.2em] text-text-subtle uppercase text-right"
          >
            Actions
          </div>
        </div>

        {/* Table rows */}
        {pageData.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-text-subtle text-sm">No cars found</p>
            <p className="text-text-subtle/50 text-xs mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          pageData.map((car, i) => (
            <motion.div
              key={car.id}
              className={clsx(
                "flex items-center px-4 border-b border-border/50 last:border-0",
                "hover:bg-gold/[0.02] transition-colors cursor-pointer",
                selected.has(car.id) && "bg-gold/[0.04]",
              )}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => setDrawerCar(car)}
            >
              {/* Checkbox */}
              <div className="w-9 flex-shrink-0 py-3">
                <input
                  type="checkbox"
                  className="w-3.5 h-3.5 rounded accent-gold cursor-pointer"
                  checked={selected.has(car.id)}
                  onChange={() => toggleSelect(car.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {visibleColumns.map((col) => (
                <div
                  key={col.id}
                  className={clsx(
                    "py-3 px-2 text-xs flex items-center",
                    col.id === "car" ? "flex-1 min-w-[140px]" : "",
                    col.id === "image" ? "w-14 flex-shrink-0" : "",
                    col.id === "status" || col.id === "fuel"
                      ? "w-24 flex-shrink-0"
                      : "",
                    col.id === "price" || col.id === "mileage"
                      ? "w-28 flex-shrink-0"
                      : "",
                  )}
                >
                  {col.id === "image" && (
                    <div
                      className="w-10 h-7 rounded-lg bg-base border border-border
                                    flex items-center justify-center text-sm"
                    >
                      🚗
                    </div>
                  )}
                  {col.id === "car" && (
                    <div>
                      <p className="font-bold text-text-primary text-xs">
                        {car.brand} {car.model}
                      </p>
                      <p className="text-[10px] text-text-subtle mt-0.5">
                        {car.year} · {car.plate}
                      </p>
                    </div>
                  )}
                  {col.id === "status" && (
                    <span className={`badge ${car.status}`}>
                      ●{" "}
                      {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                    </span>
                  )}
                  {col.id === "price" && (
                    <span className="font-bold text-text-primary">
                      {Number(car.price).toLocaleString()}
                      <span className="text-[10px] text-text-subtle ml-1">
                        {car.currency || "AED"}
                      </span>
                    </span>
                  )}
                  {col.id === "fuel" && (
                    <span className="text-text-muted">
                      {car.fuel || car.fuelType}
                    </span>
                  )}
                  {col.id === "mileage" && (
                    <span className="text-text-muted">
                      {Number(car.mileage).toLocaleString()} km
                    </span>
                  )}
                  {col.id === "transmission" && (
                    <span className="text-text-muted">{car.transmission}</span>
                  )}
                  {col.id === "plate" && (
                    <span className="text-text-muted">{car.plate}</span>
                  )}
                  {col.id === "year" && (
                    <span className="text-text-muted">{car.year}</span>
                  )}
                  {col.id === "category" && (
                    <span className="text-text-muted">{car.category}</span>
                  )}
                </div>
              ))}

              {/* Row actions */}
              <div
                className="w-24 flex-shrink-0 py-3 px-2 flex items-center justify-end gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setDrawerCar(car)}
                  className="w-6 h-6 rounded-lg border border-border flex items-center justify-center
                             text-text-subtle hover:text-sky-accent hover:border-sky-accent/40
                             hover:bg-sky-accent/8 transition-all"
                  title="View"
                >
                  <Eye size={11} />
                </button>
                <button
                  onClick={() => {
                    setEditCar(car);
                    setFormOpen(true);
                  }}
                  className="w-6 h-6 rounded-lg border border-border flex items-center justify-center
                             text-text-subtle hover:text-gold hover:border-gold/40
                             hover:bg-gold/8 transition-all"
                  title="Edit"
                >
                  <Edit size={11} />
                </button>
                <button
                  onClick={() => setDeleteCar(car)}
                  className="w-6 h-6 rounded-lg border border-border flex items-center justify-center
                             text-text-subtle hover:text-rose-400 hover:border-rose-400/40
                             hover:bg-rose-400/8 transition-all"
                  title="Delete"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </motion.div>
          ))
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <p className="text-[10px] text-text-subtle tracking-wide">
            Showing {Math.min((page - 1) * PER_PAGE + 1, filtered.length)}–
            {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}{" "}
            cars
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-7 h-7 rounded-lg border border-border flex items-center justify-center
                         text-text-muted hover:text-gold hover:border-gold/30 transition-all
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ‹
            </button>
            {Array.from(
              { length: Math.min(totalPages, 5) },
              (_, i) => i + 1,
            ).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={clsx(
                  "w-7 h-7 rounded-lg border text-xs font-semibold transition-all",
                  page === p
                    ? "border-gold/40 text-gold bg-gold/8"
                    : "border-border text-text-muted hover:border-gold/30 hover:text-gold",
                )}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-7 h-7 rounded-lg border border-border flex items-center justify-center
                         text-text-muted hover:text-gold hover:border-gold/30 transition-all
                         disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* ── Modals & drawers ── */}
      <CarFormPage
        isOpen={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditCar(null);
        }}
        onSave={handleSave}
        editCar={editCar}
      />
      <CarDetailDrawer
        car={drawerCar}
        isOpen={!!drawerCar}
        onClose={() => setDrawerCar(null)}
        onEdit={(car) => {
          setEditCar(car);
          setFormOpen(true);
        }}
        onDelete={(car) => {
          setDrawerCar(null);
          setDeleteCar(car);
        }}
      />
      <DeleteConfirm
        car={deleteCar}
        isOpen={!!deleteCar}
        onClose={() => setDeleteCar(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default Inventory;
