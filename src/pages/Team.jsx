import React, { useState, useEffect } from "react";
import { getTeamProductivity } from "../util/githubService";
import RepoForm from "../components/RepoForm";
import Navbar from "../components/NavBar";
import { useRepo } from "../components/RepoContext";
import "../styles/Team.css";

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

      <main className="team-main">
        <RepoForm />

        {!repoData.owner || !repoData.repo ? (
          <p className="text-gray">Please select a repository.</p>
        ) : (
          <div className="card">
            <h2>Commits, PRs, Issues per Member</h2>

            {loading ? (
              <p className="text-gray">Loading...</p>
            ) : error ? (
              <p className="text-red">{error}</p>
            ) : teamData.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Commits</th>
                    <th>PRs Merged</th>
                    <th>Issues Closed</th>
                  </tr>
                </thead>
                <tbody>
                  {teamData.map((member) => (
                    <tr key={member.login}>
                      <td>{member.login}</td>
                      <td>{member.commits}</td>
                      <td>{member.prs}</td>
                      <td>{member.issues}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray italic">No team data available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
