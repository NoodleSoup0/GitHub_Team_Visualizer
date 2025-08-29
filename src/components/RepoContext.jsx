import React, { createContext, useState } from "react";

export const RepoContext = createContext();

export function RepoProvider({ children }) {
  const [repoData, setRepoData] = useState({ owner: "", repo: "" }); // default empty object

  return (
    <RepoContext.Provider value={{ repoData, setRepoData }}>
      {children}
    </RepoContext.Provider>
  );
}
