export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-neutral-900/80 z-50">
      <div className="w-12 h-12 border-4 border-t-4 border-t-red-500 border-gray-300 rounded-full animate-spin"></div>
    </div>
  );
}
