// src/pages/Reviews.jsx
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

      <main className="p-6 space-y-6">
        <RepoForm />

        {!repoData.owner || !repoData.repo ? (
          <p className="text-gray-600">Please select a repository.</p>
        ) : (
          <div className="space-y-6">
            {loading ? (
              <p className="text-gray-600">Loading...</p>
            ) : error ? (
              <p className="text-red-600 font-medium">{error}</p>
            ) : data ? (
              <>
                {/* Top Reviewers */}
                <div className="card p-4 rounded-xl shadow bg-white">
                  <h2 className="text-lg font-semibold mb-3">Top Reviewers</h2>
                  {data.topReviewers && data.topReviewers.length > 0 ? (
                    <table className="table-auto w-full border-collapse">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="py-2 px-3">Reviewer</th>
                          <th className="py-2 px-3">Review Comments</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.topReviewers.map((rev) => (
                          <tr key={rev.login} className="border-b">
                            <td className="py-2 px-3">{rev.login}</td>
                            <td className="py-2 px-3">{rev.count}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 italic">No reviewers found.</p>
                  )}
                </div>

                {/* Avg Time to Merge */}
                <div className="card p-4 rounded-xl shadow bg-white">
                  <h2 className="text-lg font-semibold mb-3">
                    Average Time to Merge
                  </h2>
                  <p>
                    {data.avgTimeHours
                      ? `${data.avgTimeHours.toFixed(2)} hours`
                      : "No data available"}
                  </p>
                </div>

                {/* Pending Reviews */}
                <div className="card p-4 rounded-xl shadow bg-white">
                  <h2 className="text-lg font-semibold mb-3">Pending Reviews</h2>
                  <p>
                    {data.pendingReviews
                      ? `${data.pendingReviews} PRs`
                      : "No data available"}
                  </p>
                </div>
              </>
            ) : (
              <p className="text-gray-500 italic">No data available.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
