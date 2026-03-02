import { useAppSelector } from "../../app/hooks";
import { ProgressBar } from "../../components/ProgressBar";
import { exerciseApi } from "../exercises/exerciseApi";
export const DailyProgress = () => {
  const exercises = useAppSelector(
    exerciseApi.endpoints.getExercises.select(),
  ).data;

  if (!exercises || !exercises.length) return null;

  const finished = exercises.filter((e) => e.status === "Completed").length;
  const exercisesCount = exercises.length;
  const progress = (finished / exercisesCount) * 100;
  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm grid gap-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Panel rehabilitacji
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Status dzisiejszej sesji
          </p>
        </div>

        <div className="text-right">
          <div className="text-4xl font-bold text-blue-600">
            {progress.toFixed()}%
          </div>
          <div className="text-sm text-slate-500">
            {`Ukończono ${finished} z ${exercisesCount} ćwiczeń`}
          </div>
        </div>
      </div>

      <ProgressBar progress={progress} />
    </section>
  );
};
