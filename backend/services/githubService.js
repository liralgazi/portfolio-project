import axios from 'axios';

export const fetchGitHubRepos = async () => {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github+json'
    }
  });

  // Return only the fields you care about
  return response.data.map(repo => ({
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    language: repo.language
  }));
};
