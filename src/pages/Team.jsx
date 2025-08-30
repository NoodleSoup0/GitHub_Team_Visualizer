// src/pages/Team.jsx
import React, { useState, useEffect } from "react";
import { getTeamProductivity } from "../util/githubService";
import RepoForm from "../components/RepoForm";
import Navbar from "../components/NavBar";
import { useRepo } from "../components/RepoContext";

export default function Team() {
  const { repoData } = useRepo();
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getTeamProductivity(repoData.owner, repoData.repo);

        if (data.error) {
          setError(data.error);
          setTeamData([]);
        } else {
          setTeamData(data);
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError(
          "⚠️ Could not fetch team data. Please check that the repository exists, is public, and try again."
        );
        setTeamData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [repoData]);

  return (
    <div>
      <Navbar />

      <main className="p-6 space-y-6">
        <RepoForm />

        {!repoData.owner || !repoData.repo ? (
          <p className="text-gray-600">Please select a repository.</p>
        ) : (
          <div className="card p-4 rounded-xl shadow bg-white">
            <h2 className="text-xl font-semibold mb-3">
              Commits, PRs, Issues per Member
            </h2>

            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-red-600 font-medium">{error}</p>
            ) : teamData.length > 0 ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 px-3">Member</th>
                    <th className="py-2 px-3">Commits</th>
                    <th className="py-2 px-3">PRs Merged</th>
                    <th className="py-2 px-3">Issues Closed</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.map((member) => (
                    <tr key={member.login} className="border-b">
                      <td className="py-2 px-3">{member.login}</td>
                      <td className="py-2 px-3">{member.commits}</td>
                      <td className="py-2 px-3">{member.prs}</td>
                      <td className="py-2 px-3">{member.issues}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500 italic">No team data available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
