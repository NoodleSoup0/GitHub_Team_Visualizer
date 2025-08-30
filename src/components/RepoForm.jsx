import React, { useState } from "react";
import { useRepo } from "../components/RepoContext";

export default function RepoForm() {
  const { repoData, setRepoData } = useRepo();
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo) {
      setRepoData({ owner, repo });
      setOwner("");
      setRepo("");
    }
  };

  return (
    <div className="card p-4 rounded-xl shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-3">Select Repository</h2>

      {/* Show current repo if one is active */}
      {repoData?.owner && repoData?.repo ? (
        <p className="mb-4 text-sm text-gray-700">
          Currently selected:{" "}
          <span className="font-semibold">
            {repoData.owner}/{repoData.repo}
          </span>
        </p>
      ) : (
        <p className="mb-4 text-sm text-gray-500 italic">
          No repository selected yet. Please enter a public repository below to get started.
        </p>
      )}

      {/* Repo selection form */}
      <form
        onSubmit={handleSubmit}
        className="repo-form flex flex-col gap-3"
      >
        <div className="flex flex-col">
          <label htmlFor="owner" className="text-sm font-medium mb-1">
            Owner
          </label>
          <input
            id="owner"
            type="text"
            placeholder="e.g. facebook"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="repo" className="text-sm font-medium mb-1">
            Repo
          </label>
          <input
            id="repo"
            type="text"
            placeholder="e.g. react"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            className="border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Load Data
        </button>
      </form>
    </div>
  );
}
