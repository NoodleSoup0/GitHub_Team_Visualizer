import React, { useEffect, useState } from "react";
import { getWorkloadTimeline } from "../util/githubService";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function WorkloadTimeline({ owner = "github", repo = "rest-api-description" }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timeline = await getWorkloadTimeline(owner, repo);

        // Keep only dates with activity
        const filteredDates = Object.entries(timeline)
          .filter(([date, users]) => Object.keys(users).length > 0)
          .sort(([a], [b]) => new Date(a) - new Date(b)); // chronological

        const data = filteredDates.map(([date, users]) => ({ date, ...users }));

        setChartData(data);
      } catch (err) {
        console.error("Error fetching timeline:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [owner, repo]);

  if (loading) return <p>Loading...</p>;
  if (chartData.length === 0) return <p>No workload data available for this repo.</p>;

  // Get all user keys dynamically
  const userKeys = Object.keys(chartData[0]).filter((key) => key !== "date");

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {userKeys.map((user, idx) => (
          <Line key={user} type="monotone" dataKey={user} stroke={userColor(idx)} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

// Simple color generator for multiple users
function userColor(idx) {
  const colors = ["#2563eb", "#16a34a", "#d97706", "#dc2626", "#9333ea", "#0ea5e9"];
  return colors[idx % colors.length];
}
