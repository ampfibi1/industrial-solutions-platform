"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ProfileCard from "@/components/engineer/ProfileCard";

type Engineer = {
  name: string;
  email: string;
  phone?: string;
  role: string;
};

export default function EngineerProfile() {
  const router = useRouter();
  const [engineer, setEngineer] = useState<Engineer | null>(null);

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await axios.get(
          "http://localhost:3000/engineer/profile",
          {
            withCredentials: true,
          }
        );

        setEngineer(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    }

    getProfile();
  }, []);

  return (
    <div className="max-w-4xl">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Profile</h1>

          <p className="mt-1 text-sm text-gray-500">
            View your engineer account information.
          </p>
        </div>

        {engineer && (
          <button
            type="button"
            onClick={() => router.push("/engineer/profile/edit")}
            className="rounded-lg bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            Edit Profile
          </button>
        )}
      </div>

      {engineer ? (
        <div className="mt-8">
          <ProfileCard engineer={engineer} />
        </div>
      ) : (
        <p className="mt-8">Loading...</p>
      )}
    </div>
  );
}
