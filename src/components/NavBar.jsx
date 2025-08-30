import { Link } from "react-router-dom";
import FontSizeControls from "./FontSizeControls";

export default function Navbar() {
  return (
    <header className="p-4 shadow-md bg-gray-100">
      <h1 className="text-xl font-bold">GitHub Team Visualizer</h1>
      <FontSizeControls />
      <nav className="flex gap-4 mt-2">
        <Link to="/">Dashboard</Link>
        <Link to="/team">Team Productivity</Link>
        <Link to="/reviews">Reviews</Link>
        {/* <Link to="/workload">Workload</Link> */}
        <Link to="/releases">Releases</Link>
      </nav>
    </header>
  );
}
