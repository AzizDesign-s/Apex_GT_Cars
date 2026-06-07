// src/utils/toast.jsx
import toast from "react-hot-toast";

const toastStyle = {
  background: "transparent",
  padding: 0,
  boxShadow: "none",
  maxWidth: "380px",
};

const buildToast = (type, title, message, toastId) => {
  const config = {
    success: {
      icon: "✓",
      iconBg: "rgba(16, 185, 129, 0.12)",
      iconColor: "#10B981",
      borderTop: "rgba(16, 185, 129, 0.5)",
      border: "rgba(16, 185, 129, 0.2)",
      bar: "linear-gradient(90deg, #065F46, #10B981)",
    },
    error: {
      icon: "✕",
      iconBg: "rgba(239, 68, 68, 0.12)",
      iconColor: "#EF4444",
      borderTop: "rgba(239, 68, 68, 0.5)",
      border: "rgba(239, 68, 68, 0.2)",
      bar: "linear-gradient(90deg, #991B1B, #EF4444)",
    },
    warning: {
      icon: "!",
      iconBg: "rgba(212, 175, 55, 0.12)",
      iconColor: "#D4AF37",
      borderTop: "rgba(212, 175, 55, 0.5)",
      border: "rgba(212, 175, 55, 0.2)",
      bar: "linear-gradient(90deg, #B8931F, #D4AF37)",
    },
    info: {
      icon: "i",
      iconBg: "rgba(56, 189, 248, 0.12)",
      iconColor: "#38BDF8",
      borderTop: "rgba(56, 189, 248, 0.5)",
      border: "rgba(56, 189, 248, 0.2)",
      bar: "linear-gradient(90deg, #0369A1, #38BDF8)",
    },
  };

  const c = config[type];

  return (
    // Outer card
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: "rgba(17, 24, 39, 0.97)",
        border: `1px solid ${c.border}`,
        borderTop: `1px solid ${c.borderTop}`,
        borderRadius: "14px",
        padding: "14px 16px",
        maxWidth: "380px",
        width: "360px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        fontFamily: "'Montserrat', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: c.iconBg,
          color: c.iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "15px",
          fontWeight: "700",
          flexShrink: 0,
        }}
      >
        {c.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#F9FAFB",
            marginBottom: "3px",
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          {title}
        </p>
        {message && (
          <p
            style={{
              fontSize: "11px",
              color: "#94A3B8",
              lineHeight: "1.5",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            {message}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => toast.dismiss(toastId)}
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "6px",
          border: "none",
          background: "rgba(148,163,184,0.1)",
          color: "#94A3B8",
          fontSize: "11px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginTop: "2px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(148,163,184,0.2)";
          e.currentTarget.style.color = "#F9FAFB";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(148,163,184,0.1)";
          e.currentTarget.style.color = "#94A3B8";
        }}
      >
        ✕
      </button>

      {/* Progress bar at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          background: c.bar,
          borderRadius: "0 0 14px 14px",
          animation: "toastProgress 3.5s linear forwards",
        }}
      />
    </div>
  );
};

// Inject progress bar keyframe once
if (typeof document !== "undefined") {
  const id = "apex-toast-style";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent =
      "@keyframes toastProgress { from { width: 100% } to { width: 0% } }";
    document.head.appendChild(s);
  }
}

// ── Public API ──────────────────────────────────────────────────────────────

const apexToast = {
  success: (title, message = "") =>
    toast.custom((t) => buildToast("success", title, message, t.id), {
      duration: 3500,
      style: toastStyle,
      position: "top-right",
    }),

  error: (title, message = "") =>
    toast.custom((t) => buildToast("error", title, message, t.id), {
      duration: 4000,
      style: toastStyle,
      position: "top-right",
    }),

  warning: (title, message = "") =>
    toast.custom((t) => buildToast("warning", title, message, t.id), {
      duration: 4000,
      style: toastStyle,
      position: "top-right",
    }),

  info: (title, message = "") =>
    toast.custom((t) => buildToast("info", title, message, t.id), {
      duration: 3500,
      style: toastStyle,
      position: "top-right",
    }),
};

export default apexToast;
