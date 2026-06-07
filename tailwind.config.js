/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Core backgrounds
        base: "#0B0F14",
        card: "#111827",
        "card-hover": "#1a2333",
        border: "#1E2D40",

        // Brand accents
        gold: {
          DEFAULT: "#D4AF37",
          light: "#E8C84A",
          dark: "#B8931F",
          muted: "#D4AF3720",
        },
        sky: {
          accent: "#38BDF8",
          muted: "#38BDF820",
        },

        // Text
        "text-primary": "#F9FAFB",
        "text-muted": "#94A3B8",
        "text-subtle": "#475569",
      },
      fontFamily: {
        display: ["Montserrat", "sans-serif"],
        body: ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        gold: "0 0 20px rgba(212, 175, 55, 0.15)",
        "gold-lg": "0 0 40px rgba(212, 175, 55, 0.25)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
        card: "0 4px 24px rgba(0, 0, 0, 0.3)",
      },
      backdropBlur: {
        glass: "12px",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,175,55,0.15)" },
          "50%": { boxShadow: "0 0 40px rgba(212,175,55,0.35)" },
        },
      },
    },
  },
  plugins: [],
};
