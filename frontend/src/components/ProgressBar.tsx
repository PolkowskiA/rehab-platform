export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-4 bg-blue-500 transition-all duration-1000 rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
