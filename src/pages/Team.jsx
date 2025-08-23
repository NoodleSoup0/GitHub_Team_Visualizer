import React, { useState, useEffect } from "react";
import { getTeamProductivity } from "../util/githubService";

export default function Team() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTeamProductivity("github", "rest-api-description");
        setTeamData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <h1>Team Productivity</h1>
        <nav>
          <a href="/">Dashboard</a>
          <a href="/team">Team Productivity</a>
          <a href="/reviews">Reviews</a>
          <a href="/workload">Workload</a>
          <a href="/releases">Releases</a>
        </nav>
      </header>

      <main>
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
      </main>
    </div>
  );
}
