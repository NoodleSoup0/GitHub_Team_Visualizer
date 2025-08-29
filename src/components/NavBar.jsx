import FontSizeControls from "./FontSizeControls";

export default function Navbar() {
  return (
    <header className="p-4 shadow-md bg-gray-100">
      <h1 className="text-xl font-bold">GitHub Team Visualizer</h1>
      <FontSizeControls />
      <nav className="flex gap-4 mt-2">
        <a href="/">Dashboard</a>
        <a href="/team">Team Productivity</a>
        <a href="/reviews">Reviews</a>
        <a href="/workload">Workload</a>
        <a href="/releases">Releases</a>
      </nav>
    </header>
  );
}
