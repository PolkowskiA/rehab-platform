import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressBar } from "../../components/ProgressBar";
import { Spinner } from "../../components/Spinner";
import {
  useFinishExerciseMutation,
  useGetExercisesQuery,
  useStartExerciseMutation,
} from "./exerciseApi";

export const ExerciseSimulation = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { exercise, isLoading } = useGetExercisesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      exercise: data?.find((e) => e.id === id),
    }),
  });
  const [startExercise] = useStartExerciseMutation();
  const [finishExercise, { isLoading: finishing }] =
    useFinishExerciseMutation();

  const [secondsLeft, setSecondsLeft] = useState<number>(15);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!exercise && !isLoading) {
      navigate("/");
    }
  }, [exercise, isLoading, navigate]);

  useEffect(() => {
    if (exercise?.status === "Completed") {
      navigate("/");
    }
  }, [exercise, navigate]);

  useEffect(() => {
    if (!exercise) return;
    if (exercise.status === "Todo") {
      startExercise(exercise.id);
    }
  }, [exercise, startExercise]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!exercise) return;

    if (exercise.status === "InProgress" && secondsLeft === 0) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      finishExercise(exercise.id)
        .unwrap()
        .then(() => navigate("/"));
    }
  }, [secondsLeft, exercise, finishExercise, navigate]);

  if (isLoading || !exercise) {
    return <Spinner />;
  }

  const progress = ((15 - secondsLeft) / 15) * 100;

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-slate-200 p-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
            {exercise.deviceName}
          </h2>

          <div className="mt-4 flex justify-center gap-8 text-sm text-slate-500">
            <div className="flex flex-col items-center">
              <span className="uppercase text-xs tracking-wide text-slate-400">
                Czas
              </span>
              <span className="font-medium text-slate-700">
                {exercise.duration} min
              </span>
            </div>

            <div className="flex flex-col items-center">
              <span className="uppercase text-xs tracking-wide text-slate-400">
                Obciążenie
              </span>
              <span className="font-medium text-slate-700">
                {exercise.load} kg
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <ProgressBar progress={progress} />

          <div className="text-center">
            <div className="text-5xl font-bold text-slate-800 tabular-nums">
              {Math.max(secondsLeft, 0)}
              <span className="text-lg font-medium text-slate-500 ml-1">s</span>
            </div>
            <p className="text-sm text-slate-500 mt-2">
              Pozostały czas ćwiczenia
            </p>
          </div>
        </div>

        {finishing && (
          <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col items-center gap-4">
            <Spinner />
            <p className="text-sm text-slate-500 text-center">
              Zapisywanie wyników ćwiczenia...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
