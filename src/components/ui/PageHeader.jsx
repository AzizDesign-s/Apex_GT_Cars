// src/components/ui/PageHeader.jsx
// Used at the top of every module page — consistent header across all pages.

import { motion } from "framer-motion";

function PageHeader({ title, subtitle, actions }) {
  return (
    <motion.div
      className="flex items-start justify-between mb-4"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-xl font-extrabold text-text-primary tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-text-subtle mt-1 tracking-wide">
            {subtitle}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      )}
    </motion.div>
  );
}

export default PageHeader;
