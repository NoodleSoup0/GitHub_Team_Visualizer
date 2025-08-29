import React, { useState } from "react";
import WorkloadTimeline from "../components/WorkloadTimeline";
import RepoForm from "../components/RepoForm";
import Navbar from "../components/NavBar";

export default function Workload() {
  const [repoData, setRepoData] = useState({ owner: "", repo: "" });

  const handleRepoSubmit = (owner, repo) => {
    setRepoData({ owner, repo });
  };

  return (
    <div>
      <Navbar />

      <main>
        <RepoForm onSubmit={handleRepoSubmit} />

        {repoData.owner && repoData.repo ? (
          <div className="card">
            <h2>Issues Assigned per Member Over Time</h2>
            <WorkloadTimeline owner={repoData.owner} repo={repoData.repo} />
          </div>
        ) : (
          <p>Please select a repository.</p>
        )}
      </main>
    </div>
  );
}
