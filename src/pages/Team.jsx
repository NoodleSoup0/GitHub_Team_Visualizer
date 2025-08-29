import React, { useState, useEffect } from "react";
import { getTeamProductivity } from "../util/githubService";
import RepoForm from "../components/RepoForm";
import Navbar from "../components/NavBar";

export default function Team() {
  const [repoData, setRepoData] = useState({ owner: "", repo: "" });
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRepoSubmit = (owner, repo) => {
    setRepoData({ owner, repo });
  };

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getTeamProductivity(repoData.owner, repoData.repo);
        setTeamData(data);
      } catch (err) {
        console.error(err);
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

      <main>
        <RepoForm onSubmit={handleRepoSubmit} />

        {repoData.owner && repoData.repo ? (
          <div className="card">
            <h2>Commits, PRs, Issues per Member</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
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
            )}
          </div>
        ) : (
          <p>Please select a repository.</p>
        )}
      </main>
    </div>
  );
}
