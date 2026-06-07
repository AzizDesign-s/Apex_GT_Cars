// src/assets/CarIllustration.jsx
// This is just the SVG car drawing as a React component.
// Using it as a component means you can reuse it anywhere.

function CarIllustration() {
  return (
    <svg viewBox="0 0 520 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Floor shadow */}
      <ellipse
        cx="260"
        cy="200"
        rx="200"
        ry="18"
        fill="rgba(212,175,55,0.08)"
      />
      {/* Car body */}
      <path
        d="M60 150 L80 100 L140 70 L200 55 L320 55 L380 70 L440 100 L460 150 L460 165 L60 165 Z"
        fill="#1a2333"
        stroke="#2D3A4A"
        strokeWidth="1"
      />
      {/* Roof */}
      <path
        d="M155 100 L185 68 L200 58 L320 58 L335 68 L365 100 Z"
        fill="#141e2e"
        stroke="#2D3A4A"
        strokeWidth="1"
      />
      {/* Windshield */}
      <path
        d="M168 98 L192 70 L200 62 L240 62 L240 98 Z"
        fill="#1E3A5F"
        stroke="#38BDF830"
        strokeWidth="1"
        opacity="0.8"
      />
      {/* ... rest of SVG paths from the preview ... */}
      {/* Wheels */}
      <circle
        cx="380"
        cy="166"
        r="28"
        fill="#0D1117"
        stroke="#2D3A4A"
        strokeWidth="2"
      />
      <circle
        cx="380"
        cy="166"
        r="20"
        fill="#111827"
        stroke="#3A4A5A"
        strokeWidth="1"
      />
      <circle
        cx="380"
        cy="166"
        r="8"
        fill="#1E2D40"
        stroke="#D4AF3740"
        strokeWidth="1"
      />
      <circle
        cx="140"
        cy="166"
        r="28"
        fill="#0D1117"
        stroke="#2D3A4A"
        strokeWidth="2"
      />
      <circle
        cx="140"
        cy="166"
        r="20"
        fill="#111827"
        stroke="#3A4A5A"
        strokeWidth="1"
      />
      <circle
        cx="140"
        cy="166"
        r="8"
        fill="#1E2D40"
        stroke="#D4AF3740"
        strokeWidth="1"
      />
    </svg>
  );
}

export default CarIllustration;
