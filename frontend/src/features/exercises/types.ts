export type ExerciseStatus = "Todo" | "InProgress" | "Completed";

export interface Exercise {
  id: string;
  deviceName: string;
  load: number;
  duration: number;
  status: ExerciseStatus;
  startedAt?: string;
  finishedAt?: string;
}
