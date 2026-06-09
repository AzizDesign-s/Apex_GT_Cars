// src/components/charts/BrandChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { topBrands } from "../../data/mockData";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-glass text-xs">
      <p className="font-semibold text-text-primary">
        {payload[0].payload.brand}
      </p>
      <p className="text-text-muted mt-1">{payload[0].value} cars sold</p>
    </div>
  );
}

function BrandChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* indexAxis="y" makes it horizontal */}
      <BarChart data={topBrands} layout="vertical" barCategoryGap="25%">
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.04)"
          horizontal={false}
        />
        <XAxis
          type="number"
          tick={{ fill: "#475569", fontSize: 10, fontFamily: "Montserrat" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="brand"
          width={80}
          tick={{
            fill: "#94A3B8",
            fontSize: 10,
            fontFamily: "Montserrat",
            fontWeight: 600,
          }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ fill: "rgba(212,175,55,0.04)" }}
        />
        <Bar dataKey="sold" radius={[0, 5, 5, 0]}>
          {topBrands.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BrandChart;
