import React, { createContext, useState, useContext } from "react";

// 1. create the context
const RepoContext = createContext();

// 2. create provider
export function RepoProvider({ children }) {
  const [repoData, setRepoData] = useState({ owner: "", repo: "" });

  return (
    <RepoContext.Provider value={{ repoData, setRepoData }}>
      {children}
    </RepoContext.Provider>
  );
}

// 3. create custom hook for easier use
export function useRepo() {
  return useContext(RepoContext);
}
