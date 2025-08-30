// src/pages/Releases.jsx
import React, { useEffect, useState } from "react";
import RepoForm from "../components/RepoForm";
import { useRepo } from "../components/RepoContext";
import Navbar from "../components/NavBar";

export default function Releases() {
  const { repoData } = useRepo(); // get shared repo state
  const [issues, setIssues] = useState({ open: 0, closed: 0 });
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchReleaseData = async () => {
      setLoading(true);
      try {
        // 1. Fetch open and closed issues count
        const openRes = await fetch(
          `https://api.github.com/search/issues?q=repo:${repoData.owner}/${repoData.repo}+type:issue+state:open`
        );
        const openData = await openRes.json();

        const closedRes = await fetch(
          `https://api.github.com/search/issues?q=repo:${repoData.owner}/${repoData.repo}+type:issue+state:closed`
        );
        const closedData = await closedRes.json();

        setIssues({
          open: openData.total_count,
          closed: closedData.total_count,
        });

        // 2. Fetch milestones
        const milestoneRes = await fetch(
          `https://api.github.com/repos/${repoData.owner}/${repoData.repo}/milestones?state=all`
        );
        const milestoneData = await milestoneRes.json();
        setMilestones(milestoneData);
      } catch (err) {
        console.error("Error fetching release data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReleaseData();
  }, [repoData]);

  return (
    <div>
      <Navbar />

      <main>
        <RepoForm /> 
        <div className="card">
          <h2>Open vs Closed Issues</h2>
          {loading ? (
            <p>Loading issues...</p>
          ) : (
            <p>
              Open: {issues.open} | Closed: {issues.closed}
            </p>
          )}
        </div>

        <div className="card">
          <h2>Milestone Progress</h2>
          {loading ? (
            <p>Loading milestones...</p>
          ) : milestones.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Milestone</th>
                  <th>Open Issues</th>
                  <th>Closed Issues</th>
                </tr>
              </thead>
              <tbody>
                {milestones.map((m) => (
                  <tr key={m.id}>
                    <td>{m.title}</td>
                    <td>{m.open_issues}</td>
                    <td>{m.closed_issues}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No milestones found</p>
          )}
        </div>
      </main>
    </div>

  );
}
