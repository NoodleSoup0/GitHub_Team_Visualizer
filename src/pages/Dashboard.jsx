import React, { useState } from "react";
import RepoForm from "../components/RepoForm";
// import "./style/Dashboard.css";

export default function Dashboard() {
  const [repoData, setRepoData] = useState(null);

  const handleRepoSubmit = (owner, repo) => {
    console.log("Fetching data for:", owner, repo);
    // TODO: call githubService.js functions here
    setRepoData({ owner, repo }); // temporary mock
  };

  return (
    <div>
      <header>
        <h1>GitHub Team Visualizer</h1>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/team">Team Productivity</a>
          <a href="/reviews">Reviews</a>
          <a href="/workload">Workload</a>
          <a href="/releases">Releases</a>
        </nav>
      </header>

      <main>
        <RepoForm onSubmit={handleRepoSubmit} />

        {repoData && (
          <div className="card">
            <h2>Team Overview for {repoData.owner}/{repoData.repo}</h2>
            <div className="stats">
              <div className="stat">
                <h3>128</h3>
                <p>Commits</p>
              </div>
              <div className="stat">
                <h3>34</h3>
                <p>PRs Merged</p>
              </div>
              <div className="stat">
                <h3>56</h3>
                <p>Issues Closed</p>
              </div>
              <div className="stat">
                <h3>4</h3>
                <p>Active Milestones</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
