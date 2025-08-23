// src/components/RepoForm.jsx
import React, { useState } from "react";

export default function RepoForm({ onSubmit }) {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (owner && repo) {
      onSubmit(owner, repo);
    }
  };

  return (
    <div className="card">
      <h2>Select Repository</h2>
      <form onSubmit={handleSubmit} className="repo-form">
        <div>
          <label htmlFor="owner">Owner:</label>
          <input
            id="owner"
            type="text"
            placeholder="e.g. facebook"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="repo">Repo:</label>
          <input
            id="repo"
            type="text"
            placeholder="e.g. react"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
          />
        </div>
        <button type="submit">Load Data</button>
      </form>
    </div>
  );
}
