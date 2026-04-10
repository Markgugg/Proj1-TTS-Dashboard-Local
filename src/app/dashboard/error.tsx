"use client";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
      <p className="max-w-md text-sm text-gray-500 font-mono bg-gray-50 rounded-lg p-4 text-left break-all">
        {error.message || "Unknown error"}
        {error.digest && <><br /><span className="text-gray-400">Digest: {error.digest}</span></>}
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
