import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { resetAuth } from "../auth/authSlice";
import { userApi, useUpdateMeMutation } from "./userApi";

export const EditProfileForm = () => {
  const navigate = useNavigate();
  const user = useAppSelector(userApi.endpoints.getMe.select()).data;
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);

  const [updateMe, { isLoading, error }] = useUpdateMeMutation();

  const onCancel = () => {
    navigate("/");
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!firstName?.trim() || !lastName?.trim()) return;

    await updateMe({ firstName, lastName }).unwrap();
    dispatch(resetAuth());
    onCancel();
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm border mb-8 grid gap-4"
      >
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Profil użytkownika
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Aktualizacja danych osobowych
          </p>
        </div>

        <div className="grid gap-4">
          <input
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Imię"
          />

          <input
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nazwisko"
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-4">
            Nie udało się zaktualizować profilu
          </p>
        )}

        <div className="flex gap-4 ">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Aktualizacja..." : "Zapisz"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300"
          >
            Anuluj
          </button>
        </div>
      </form>
    </div>
  );
};
