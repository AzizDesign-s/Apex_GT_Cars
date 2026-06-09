// src/components/charts/CategoryDonut.jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { salesByCategory } from "../../data/mockData";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-glass text-xs">
      <p className="font-semibold text-text-primary">{payload[0].name}</p>
      <p className="text-text-muted mt-1">{payload[0].value}% of sales</p>
    </div>
  );
}

function CategoryDonut() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={salesByCategory}
          cx="50%"
          cy="50%"
          innerRadius="65%" // large inner hole = donut shape
          outerRadius="90%"
          dataKey="value"
          paddingAngle={3}
          strokeWidth={0}
        >
          {salesByCategory.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default CategoryDonut;
