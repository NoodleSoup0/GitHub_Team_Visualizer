import React, { useEffect, useState } from "react";
import RepoForm from "../components/RepoForm";
import { useRepo } from "../components/RepoContext";
import Navbar from "../components/NavBar";
import "../styles/Releases.css"; // create this file

export default function Releases() {
  const { repoData } = useRepo();
  const [issues, setIssues] = useState({ open: 0, closed: 0 });
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchReleaseData = async () => {
      setLoading(true);
      setError(null);

      try {
        const openRes = await fetch(
          `https://api.github.com/search/issues?q=repo:${repoData.owner}/${repoData.repo}+type:issue+state:open`
        );
        if (!openRes.ok) throw new Error("Failed to fetch open issues");
        const openData = await openRes.json();

        const closedRes = await fetch(
          `https://api.github.com/search/issues?q=repo:${repoData.owner}/${repoData.repo}+type:issue+state:closed`
        );
        if (!closedRes.ok) throw new Error("Failed to fetch closed issues");
        const closedData = await closedRes.json();

        setIssues({
          open: openData.total_count,
          closed: closedData.total_count,
        });

        const milestoneRes = await fetch(
          `https://api.github.com/repos/${repoData.owner}/${repoData.repo}/milestones?state=all`
        );
        if (!milestoneRes.ok) throw new Error("Failed to fetch milestones");
        const milestoneData = await milestoneRes.json();

        setMilestones(milestoneData);
      } catch (err) {
        console.error("Error fetching release data:", err);
        setError(
          "⚠️ Could not fetch release data. Please check that the repository exists, is public, and try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReleaseData();
  }, [repoData]);

  return (
    <div>
      <Navbar />

      <main className="releases-main">
        <RepoForm />

        <div className="card">
          <h2>Open vs Closed Issues</h2>

          {loading ? (
            <p className="text-gray">Loading issues...</p>
          ) : error ? (
            <p className="text-red">{error}</p>
          ) : (
            <p>
              Open: <span className="font-semibold">{issues.open}</span> | Closed:{" "}
              <span className="font-semibold">{issues.closed}</span>
            </p>
          )}
        </div>

        <div className="card">
          <h2>Milestone Progress</h2>

          {loading ? (
            <p className="text-gray">Loading milestones...</p>
          ) : error ? (
            <p className="text-red">{error}</p>
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
            <p className="text-gray italic">No milestones found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
