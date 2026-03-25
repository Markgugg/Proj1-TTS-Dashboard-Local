/**
 * TTS Dashboard logo — Cal AI style icon with TikTok color-offset "T".
 * The SVG is inlined so it renders without a network request and scales cleanly.
 */
export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="10" fill="#000000" />
      {/* Cyan offset */}
      <text
        x="19"
        y="30"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        fill="#25F4EE"
        textAnchor="middle"
      >
        T
      </text>
      {/* Red offset */}
      <text
        x="22"
        y="30"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        fill="#FE2C55"
        textAnchor="middle"
      >
        T
      </text>
      {/* White main */}
      <text
        x="20.5"
        y="30"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="28"
        fontWeight="800"
        fill="#FFFFFF"
        textAnchor="middle"
      >
        T
      </text>
    </svg>
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoIcon size={size} />
      <span className="text-sm font-semibold text-gray-900">TTS Dashboard</span>
    </div>
  );
}
