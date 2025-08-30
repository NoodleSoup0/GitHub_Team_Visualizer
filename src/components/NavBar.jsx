import { NavLink } from "react-router-dom";
import FontSizeControls from "./FontSizeControls";

export default function Navbar() {
  return (
    <header className="p-4 shadow-md bg-gray-100">
      <h1 className="text-xl font-bold">GitHub Team Visualizer</h1>
      <FontSizeControls />
      <nav className="flex gap-4 mt-2 relative">
        {["/", "/team", "/reviews", "/releases"].map((path, idx) => {
          const labelMap = {
            "/": "Dashboard",
            "/team": "Team Productivity",
            "/reviews": "Reviews",
            "/releases": "Releases",
          };
          return (
            <NavLink
              key={idx}
              to={path}
              className={({ isActive }) =>
                `relative px-2 py-1 transition-colors ${
                  isActive
                    ? "font-bold text-blue-600"
                    : "text-gray-800 hover:text-blue-500"
                }`
              }
            >
              {labelMap[path]}
              {/* underline */}
              <span
                className={`absolute left-0 bottom-0 h-0.5 w-full bg-blue-600 transition-all duration-300 ${
                  !path ? "scale-x-0" : ""
                }`}
              />
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
