import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { exerciseApi } from "./exerciseApi";

export const NextExercise = () => {
  const exercises = useAppSelector(
    exerciseApi.endpoints.getExercises.select(),
  ).data;

  const navigate = useNavigate();

  const nextExercise = exercises?.find((e) => e.status !== "Completed");

  if (!nextExercise) return null;

  const handleClick = () => {
    navigate(`/exercise/${nextExercise.id}`);
  };

  return (
    <section className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        <div>
          <div className="text-xs uppercase tracking-widest text-slate-400">
            Następne ćwiczenie
          </div>

          <h3 className="text-2xl font-semibold mt-2">
            {nextExercise.deviceName}
          </h3>

          <div className="mt-3 text-sm text-slate-300">
            {`Czas: ${nextExercise.duration} min • Obciążenie: ${nextExercise.load} kg`}
          </div>
        </div>

        <div className="flex items-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
            onClick={handleClick}
          >
            Rozpocznij sesję
          </button>
        </div>
      </div>
    </section>
  );
};
