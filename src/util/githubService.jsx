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
 */
export async function getTeamProductivity(owner, repo) {
  const contributors = await githubFetch(`/${owner}/${repo}/contributors`);
  const prs = await githubFetch(`/${owner}/${repo}/pulls?state=closed&per_page=100`);
  const issues = await githubFetch(`/${owner}/${repo}/issues?state=closed&per_page=100`);

  return contributors.map((contributor) => {
    const userPRs = prs.filter(pr => pr.user?.login === contributor.login && pr.merged_at).length;
    const userIssues = issues.filter(issue => issue.user?.login === contributor.login && !issue.pull_request).length;
    return {
      login: contributor.login,
      commits: contributor.contributions,
      prs: userPRs,
      issues: userIssues,
    };
  });
}

/**
 * Get code review insights for a public repo
 */
export async function getReviewInsights(owner, repo) {
  const prs = await githubFetch(`/${owner}/${repo}/pulls?state=closed&per_page=100`);
  const reviewComments = await githubFetch(`/${owner}/${repo}/pulls/comments?per_page=100`);
  
  const reviewersCount = {};
  reviewComments.forEach(comment => {
    const login = comment.user?.login;
    if (login) reviewersCount[login] = (reviewersCount[login] || 0) + 1;
  });

  const topReviewers = Object.entries(reviewersCount)
    .map(([login, count]) => ({ login, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const mergedPRs = prs.filter(pr => pr.merged_at);
  const totalTime = mergedPRs.reduce((acc, pr) => {
    const created = new Date(pr.created_at);
    const merged = new Date(pr.merged_at);
    return acc + (merged - created);
  }, 0);
  const avgTimeHours = mergedPRs.length ? totalTime / mergedPRs.length / (1000*60*60) : 0;

  const openPRs = await githubFetch(`/${owner}/${repo}/pulls?state=open&per_page=100`);
  const pendingReviews = openPRs.filter(pr => pr.requested_reviewers?.length > 0).length;

  return { topReviewers, avgTimeHours, pendingReviews };
}

/**
 * Get workload timeline
 */
export async function getWorkloadTimeline(owner, repo) {
  const issues = await githubFetch(`/${owner}/${repo}/issues?state=all&per_page=100`);
  const timeline = {};

  issues.forEach(issue => {
    if (issue.pull_request) return;
    const date = issue.created_at.slice(0,10);
    if (!timeline[date]) timeline[date] = {};
    issue.assignees?.forEach(assignee => {
      timeline[date][assignee.login] = (timeline[date][assignee.login] || 0) + 1;
    });
  });

  return timeline;
}

/**
 * Get repo stats
 */
/**
 * Helper to get total count from GitHub paginated endpoint
 */
async function getTotalCount(endpoint) {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}&per_page=1`);
  if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
  
  const link = response.headers.get("link");
  if (!link) {
    // No pagination, either 0 or 1 item
    const data = await response.json();
    return data.length;
  }

  // Parse last page from Link header
  const match = link.match(/&page=(\d+)>; rel="last"/);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Get repository stats
 */
export async function getRepoStats(owner, repo) {
  const commits = await getTotalCount(`/${owner}/${repo}/commits?sha=main`);
  const prsMerged = await getTotalCount(`/${owner}/${repo}/pulls?state=closed`);
  const issuesClosed = await getTotalCount(`/${owner}/${repo}/issues?state=closed`);
  const milestones = await getTotalCount(`/${owner}/${repo}/milestones?state=open`);

  return {
    commits,
    prsMerged,
    issuesClosed,
    milestones
  };
}