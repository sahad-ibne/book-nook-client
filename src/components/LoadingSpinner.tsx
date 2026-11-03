export default function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div
      className="flex min-h-40 flex-col items-center justify-center gap-3 text-sm text-gray-500"
      role="status"
      aria-live="polite"
    >
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#2D5A3F]" />
      <span>{label}</span>
    </div>
  );
}
