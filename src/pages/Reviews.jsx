import React, { useEffect, useState } from "react";
import { getReviewInsights } from "../util/githubService";
import RepoForm from "../components/RepoForm";
import Navbar from "../components/NavBar";
import '../styles/Reviews.css';

export default function Reviews() {
  const [repoData, setRepoData] = useState({ owner: "", repo: "" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRepoSubmit = (owner, repo) => {
    setRepoData({ owner, repo });
  };

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const insights = await getReviewInsights(repoData.owner, repoData.repo);
        setData(insights);
      } catch (err) {
        console.error(err);
        setData(null);
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

        {!repoData.owner || !repoData.repo ? (
          <p>Please select a repository.</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="card">
              <h2>Top Reviewers</h2>
              {data ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Reviewer</th>
                      <th>Review Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.topReviewers.map((rev) => (
                      <tr key={rev.login}>
                        <td>{rev.login}</td>
                        <td>{rev.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No data available</p>
              )}
            </div>


            <div className="card">
              <h2>Average Time to Merge</h2>
              {data ? (
                <p>{data.avgTimeHours.toFixed(2)} hours</p>
              ) : (
                <p>No data available</p>
              )}
            </div>

            <div className="card">
              <h2>Pending Reviews</h2>
              {data ? <p>{data.pendingReviews} PRs</p> : <p>No data available</p>}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
