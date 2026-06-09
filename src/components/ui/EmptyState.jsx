// src/components/ui/EmptyState.jsx
// Shown when a table/list has no data — used in every module.

function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div
          className="w-14 h-14 rounded-2xl bg-gold/5 border border-gold/10
                        flex items-center justify-center mb-4"
        >
          <Icon size={24} className="text-text-subtle/40" />
        </div>
      )}
      <p className="text-sm font-semibold text-text-muted mb-1">{title}</p>
      {subtitle && <p className="text-xs text-text-subtle mb-4">{subtitle}</p>}
      {action}
    </div>
  );
}

export default EmptyState;
