import { api } from "../../app/api";
import type { Exercise } from "./types";

export const exerciseApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getExercises: builder.query<Exercise[], void>({
      query: () => "/exercises",
      providesTags: ["Exercises"],
    }),

    startExercise: builder.mutation<void, string>({
      query: (id) => ({
        url: `/exercises/${id}/start`,
        method: "POST",
      }),
      invalidatesTags: ["Exercises", "Exercise"],
    }),

    finishExercise: builder.mutation<void, string>({
      query: (id) => ({
        url: `/exercises/${id}/finish`,
        method: "POST",
      }),
      invalidatesTags: ["Exercises", "Exercise"],
    }),
  }),
});

export const {
  useGetExercisesQuery,
  useStartExerciseMutation,
  useFinishExerciseMutation,
} = exerciseApi;
