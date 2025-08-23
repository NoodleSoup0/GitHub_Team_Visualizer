import React from "react";
// import "./style/Releases.css";

export default function Releases() {
  return (
    <div>
      <header>
        <h1>Release Progress</h1>
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
          <h2>Open vs Closed Issues</h2>
          <div className="placeholder-chart">[Open/Closed Chart]</div>
        </div>
        <div className="card">
          <h2>Milestone Progress</h2>
          <div className="placeholder-chart">[Milestone Bar Placeholder]</div>
        </div>
      </main>
    </div>
  );
}
