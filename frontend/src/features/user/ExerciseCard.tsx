import { useNavigate } from "react-router-dom";
import type { Exercise, ExerciseStatus } from "../exercises/types";

interface Props {
  exercise: Exercise;
}

export const ExerciseCard = ({ exercise }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (exercise.status === "Completed") return;
    navigate(`/exercise/${exercise.id}`);
  };

  const statusToButtonText: Record<ExerciseStatus, string> = {
    Completed: "Zrobione",
    Todo: "Rozpocznij",
    InProgress: "Kontynuuj",
  };

  const statusToPilText: Record<ExerciseStatus, string> = {
    Completed: "Wykonane",
    Todo: "Do zrobienia",
    InProgress: "Rozpoczęte",
  };

  const statusStyles =
    exercise.status === "Completed"
      ? "bg-green-100 text-green-700"
      : exercise.status === "InProgress"
        ? "bg-blue-100 text-blue-700"
        : "bg-slate-100 text-slate-600";

  const buttonStyles =
    exercise.status === "Completed"
      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700 text-white";

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition  h-full">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-slate-800">
              {exercise.deviceName}
            </h3>

            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles}`}
            >
              {statusToPilText[exercise.status]}
            </span>
          </div>

          <div className="text-sm text-slate-500 space-y-1">
            <div>{`Czas: ${exercise.duration} min`}</div>
            <div>{`Obciążenie: ${exercise.load} kg`}</div>
          </div>
        </div>

        <button
          disabled={exercise.status === "Completed"}
          className={`mt-6 w-full py-2 rounded-lg text-sm font-medium transition ${buttonStyles}`}
          onClick={handleClick}
        >
          {statusToButtonText[exercise.status]}
        </button>
      </div>
    </div>
  );
};
