/**
 * Shared pieces for the Open Graph and app-icon image routes. These render through
 * Satori, which supports a flexbox subset of CSS, so everything is inline-styled.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export function OgMark({ size = 72 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 12px 40px rgba(99, 102, 241, 0.35)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.62}
        height={size * 0.62}
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="2.6" fill="#fff" stroke="none" />
        <circle cx="5" cy="6" r="1.9" />
        <circle cx="19" cy="6" r="1.9" />
        <circle cx="12" cy="20" r="1.9" />
        <path d="M10.1 10.4 6.4 7.3M13.9 10.4l3.7-3.1M12 14.6v3.5" />
      </svg>
    </div>
  );
}

export function OgFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(900px 500px at 20% 0%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(700px 400px at 100% 100%, rgba(124,58,237,0.28), transparent 60%), #101116",
        color: "#f4f4f6",
        fontFamily: "sans-serif",
      }}
    >
      {children}
    </div>
  );
}

export function OgChip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px 16px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.14)",
        background: "rgba(255,255,255,0.06)",
        fontSize: 22,
        color: "rgba(244,244,246,0.85)",
      }}
    >
      {children}
    </div>
  );
}
