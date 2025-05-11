import { fetchGitHubRepos } from '../services/githubService.js';

export const getProjects = async (req, res) => {
  try {
    const repos = await fetchGitHubRepos(); // Call the GitHub API
    res.json(repos); // Send response to frontend
  } catch (error) {
    console.error('Error fetching repos:', error.message);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};
