import React, { useEffect, useState } from "react";
import RepoForm from "../components/RepoForm";
import { getRepoStats } from "../util/githubService";
import Navbar from "../components/NavBar";
import { useRepo } from "../components/RepoContext";

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

      <main className="p-6 space-y-6">
        <RepoForm />

        {repoData.owner && repoData.repo && (
          <div className="card p-4 rounded-xl shadow bg-white">
            <h2 className="text-xl font-semibold mb-4">
              Team Overview for {repoData.owner}/{repoData.repo}
            </h2>

            {loading ? (
              <p className="text-gray-600">Loading stats...</p>
            ) : stats?.error ? (
              <p className="text-red-600 font-medium">{stats.error}</p>
            ) : stats ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="stat text-center">
                  <h3 className="text-lg font-bold">{stats.commits}</h3>
                  <p className="text-sm text-gray-500">Commits</p>
                </div>
                <div className="stat text-center">
                  <h3 className="text-lg font-bold">{stats.prsMerged}</h3>
                  <p className="text-sm text-gray-500">PRs Merged</p>
                </div>
                <div className="stat text-center">
                  <h3 className="text-lg font-bold">{stats.issuesClosed}</h3>
                  <p className="text-sm text-gray-500">Issues Closed</p>
                </div>
                <div className="stat text-center">
                  <h3 className="text-lg font-bold">{stats.milestones}</h3>
                  <p className="text-sm text-gray-500">Active Milestones</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No data available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
