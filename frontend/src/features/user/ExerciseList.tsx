import { Spinner } from "../../components/Spinner";
import { useGetExercisesQuery } from "../exercises/exerciseApi";
import { ExerciseCard } from "./ExerciseCard";

export const ExerciseList = () => {
  const { data: exercises, isLoading } = useGetExercisesQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (!exercises?.length)
    return (
      <h3 className="text-lg font-semibold text-slate-700 mb-6">
        Brak ćwiczeń
      </h3>
    );

  return (
    <section>
      <h3 className="text-lg font-semibold text-slate-700 mb-6">
        Wszystkie ćwiczenia
      </h3>
      <div className="space-y-4">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {exercises?.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    </section>
  );
};
