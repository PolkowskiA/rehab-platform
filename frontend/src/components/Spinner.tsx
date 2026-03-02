export const Spinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4" />
        <div className="absolute w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl animate-pulse bottom-1/4 right-1/4 animation-delay-1000" />
      </div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="w-14 h-14 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-sm text-gray-200 tracking-wide">
          Przetwarzanie danych...
        </span>
      </div>
    </div>
  );
};
