import React, { useEffect, useState } from "react";
import RepoForm from "../components/RepoForm";
import { getRepoStats } from "../util/githubService";
import Navbar from "../components/NavBar";
import { useRepo } from "../components/RepoContext";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const { repoData } = useRepo();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchStats = async () => {
      setLoading(true);
      const data = await getRepoStats(repoData.owner, repoData.repo);
      setStats(data);
      setLoading(false);
    };

    fetchStats();
  }, [repoData]);

  return (
    <div>
      <Navbar />

      <main className="dashboard-main">
        <RepoForm />

        {repoData.owner && repoData.repo && (
          <div className="card">
            <h2>
              Team Overview for {repoData.owner}/{repoData.repo}
            </h2>

            {loading ? (
              <p className="text-gray">Loading stats...</p>
            ) : stats?.error ? (
              <p className="text-red">{stats.error}</p>
            ) : stats ? (
              <div className="stats-grid">
                <div className="stat">
                  <h3>{stats.commits}</h3>
                  <p>Commits</p>
                </div>
                <div className="stat">
                  <h3>{stats.prsMerged}</h3>
                  <p>PRs Merged</p>
                </div>
                <div className="stat">
                  <h3>{stats.issuesClosed}</h3>
                  <p>Issues Closed</p>
                </div>
                <div className="stat">
                  <h3>{stats.milestones}</h3>
                  <p>Active Milestones</p>
                </div>
              </div>
            ) : (
              <p className="text-gray italic">No data available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
