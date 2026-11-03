import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#FBF9F5]">
      <LoadingSpinner label="Loading page..." />
    </main>
  );
}
