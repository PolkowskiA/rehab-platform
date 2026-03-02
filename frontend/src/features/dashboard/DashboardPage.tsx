import { NextExercise } from "../exercises/NextExercise";
import { ExerciseList } from "../user/ExerciseList";
import { DailyProgress } from "./DailyProgress";

export const DashboardPage = () => {
  return (
    <div className="space-y-10">
      <DailyProgress />
      <NextExercise />
      <ExerciseList />
    </div>
  );
};
