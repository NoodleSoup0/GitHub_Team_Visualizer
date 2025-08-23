const GITHUB_API_BASE = "https://api.github.com/repos";

/**
 * Fetch JSON from GitHub public API
 * @param {string} endpoint - the endpoint after base URL
 */
async function githubFetch(endpoint) {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  return await response.json();
}

/**
 * Get team productivity for a public repo
 * @param {string} owner - repo owner
 * @param {string} repo - repo name
 * @returns {Array} Array of contributors with commits, PRs merged, issues closed
 */
export async function getTeamProductivity(owner, repo) {
  // 1. Get contributors
  const contributors = await githubFetch(`/${owner}/${repo}/contributors`);

  // 2. Get closed pull requests
  const prs = await githubFetch(`/${owner}/${repo}/pulls?state=closed&per_page=100`);

  // 3. Get closed issues (excluding PRs)
  const issues = await githubFetch(`/${owner}/${repo}/issues?state=closed&per_page=100`);

  // 4. Combine per contributor
  const data = contributors.map((contributor) => {
    const userPRs = prs.filter(
      (pr) => pr.user?.login === contributor.login && pr.merged_at
    ).length;

    const userIssues = issues.filter(
      (issue) => issue.user?.login === contributor.login && !issue.pull_request
    ).length;

    return {
      login: contributor.login,
      commits: contributor.contributions,
      prs: userPRs,
      issues: userIssues,
    };
  });

  return data;
}
