export function LogoIcon({ size = 32 }: { size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/creatortok-logo.svg"
      alt="CreatorTok"
      width={size}
      height={size}
      style={{ borderRadius: 8 }}
    />
  );
}

export function Logo({ size = 32 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <LogoIcon size={size} />
      <span className="text-sm font-semibold text-gray-900">CreatorTok</span>
    </div>
  );
}
