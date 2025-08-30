import React, { useEffect, useState } from "react";
import { getReviewInsights } from "../util/githubService";
import RepoForm from "../components/RepoForm";
import Navbar from "../components/NavBar";
import { useRepo } from "../components/RepoContext";
import "../styles/Reviews.css";

export default function Reviews() {
  const { repoData } = useRepo();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!repoData.owner || !repoData.repo) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const insights = await getReviewInsights(repoData.owner, repoData.repo);
        setData(insights);
      } catch (err) {
        console.error("Error fetching review insights:", err);
        setError(
          "⚠️ Could not fetch review insights. Please check that the repository exists, is public, and try again."
        );
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

      <main className="reviews-main">
        <RepoForm />

        {!repoData.owner || !repoData.repo ? (
          <p className="text-gray">Please select a repository.</p>
        ) : (
          <div className="reviews-content">
            {loading ? (
              <p className="text-gray">Loading...</p>
            ) : error ? (
              <p className="text-red">{error}</p>
            ) : data ? (
              <>
                {/* Top Reviewers */}
                <div className="card">
                  <h2>Top Reviewers</h2>
                  {data.topReviewers && data.topReviewers.length > 0 ? (
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
                    <p className="text-gray italic">No reviewers found.</p>
                  )}
                </div>

                {/* Avg Time to Merge */}
                <div className="card">
                  <h2>Average Time to Merge</h2>
                  <p>
                    {data.avgTimeHours
                      ? `${data.avgTimeHours.toFixed(2)} hours`
                      : "No data available"}
                  </p>
                </div>

                {/* Pending Reviews */}
                <div className="card">
                  <h2>Pending Reviews</h2>
                  <p>
                    {data.pendingReviews
                      ? `${data.pendingReviews} PRs`
                      : "No data available"}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray italic">No data available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
