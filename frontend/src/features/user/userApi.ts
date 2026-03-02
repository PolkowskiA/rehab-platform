import { api } from "../../app/api";
import type { User } from "./types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => "/me",
      providesTags: ["User"],
    }),
    updateMe: builder.mutation<void, Partial<User>>({
      query: (body) => ({
        url: "/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useGetMeQuery, useUpdateMeMutation } = userApi;
