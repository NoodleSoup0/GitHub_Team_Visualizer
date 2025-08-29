import React, { useEffect, useState } from "react";
import RepoForm from "../components/RepoForm";
import { getRepoStats } from "../util/githubService";
import Navbar from "../components/NavBar";

export default function Dashboard() {
  const [repoData, setRepoData] = useState({ owner: "", repo: "" });
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRepoSubmit = (owner, repo) => {
    setRepoData({ owner, repo });
  };

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getRepoStats(repoData.owner, repoData.repo);
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [repoData]);

  return (
    <div>
      <Navbar />

      <main>
        <RepoForm onSubmit={handleRepoSubmit} />

        {repoData.owner && repoData.repo && (
          <div className="card">
            <h2>
              Team Overview for {repoData.owner}/{repoData.repo}
            </h2>

            {loading ? (
              <p>Loading stats...</p>
            ) : stats ? (
              <div className="stats">
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
              <p>No data available</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
