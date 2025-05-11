import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const uniqueLanguages = ['All', ...new Set(projects.map((p) => p.language).filter(Boolean))];

  const applyFilters = (lang, search) => {
    let result = projects;

    if (lang !== 'All') {
      result = result.filter((p) => p.language === lang);
    }

    if (search) {
      result = result.filter((p) =>
        (p.name + (p.description || '')).toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  };

  const handleFilterChange = (lang) => {
    setSelectedLang(lang);
    applyFilters(lang, searchTerm);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilters(selectedLang, value);
  };

  return (
    <div className="container">
      <h1 className="title">My GitHub Projects</h1>

      <div className="toggle-container">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="slider"></span>
        </label>
        <span className="mode-label">{darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}</span>
      </div>

      <div className="filter-bar">
        <label>Filter by language: </label>
        <select value={selectedLang} onChange={(e) => handleFilterChange(e.target.value)}>
          {uniqueLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      <div className="search-bar">
        <label>Search projects: </label>
        <input
          type="text"
          placeholder="Type to search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <p className="loading">Loading projects...</p>
      ) : (
        <>
          <h2 className="subtitle">📌 Pinned Projects</h2>
          <div className="grid">
            {projects
              .filter((p) => p.pinned)
              .map((proj) => (
                <div className="card" key={proj.url}>
                  <h2>{proj.name}</h2>
                  {proj.description && <p>{proj.description}</p>}
                  <p className="lang">{proj.language}</p>
                  <a href={proj.url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </div>
              ))}
          </div>

          <h2 className="subtitle">🗂️ All Projects</h2>
          <div className="grid">
            {filtered
              .filter((p) => !p.pinned)
              .map((proj) => (
                <div className="card" key={proj.url}>
                  <h2>{proj.name}</h2>
                  {proj.description && <p>{proj.description}</p>}
                  <p className="lang">{proj.language}</p>
                  <a href={proj.url} target="_blank" rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;