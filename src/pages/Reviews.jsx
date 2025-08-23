import React from "react";
// import "./style/Reviews.css";

export default function Reviews() {
  return (
    <div>
      <header>
        <h1>Code Review Insights</h1>
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
          <h2>Top Reviewers</h2>
          <div className="placeholder-chart">[Chart Placeholder]</div>
        </div>
        <div className="card">
          <h2>Average Time to Merge</h2>
          <div className="placeholder-chart">[Chart Placeholder]</div>
        </div>
        <div className="card">
          <h2>Pending Reviews</h2>
          <div className="placeholder-chart">[Chart Placeholder]</div>
        </div>
      </main>
    </div>
  );
}
