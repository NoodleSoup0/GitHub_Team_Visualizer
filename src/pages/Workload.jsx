import React from "react";
// import "./style/Workload.css";

export default function Workload() {
  return (
    <div>
      <header>
        <h1>Workload Balance</h1>
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
          <h2>Issues Assigned per Member</h2>
          <div className="placeholder-chart">[Balance Chart Placeholder]</div>
        </div>
      </main>
    </div>
  );
}
