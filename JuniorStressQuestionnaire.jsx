
import { useState } from 'react';

const themes = [
  // (themes array remains unchanged; omitted here for brevity)
];

export default function JuniorStressQuestionnaire() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSliderChange = (themeId, index, value) => {
    setResponses(prev => {
      const current = prev[themeId] || [];
      const updated = [...current];
      updated[index] = parseInt(value.target.value, 10);
      return { ...prev, [themeId]: updated };
    });
  };

  const calculateTopThemes = () => {
    const scores = themes.map(theme => {
      const answers = responses[theme.id] || [];
      const score = answers.reduce((sum, val) => sum + val, 0);
      return { theme, score };
    });
    return scores.sort((a, b) => b.score - a.score).slice(0, 2);
  };

  const handleSubmit = () => setSubmitted(true);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      {!submitted ? (
        <>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Junior Stress Check-In</h1>
          {themes.map(theme => (
            <div key={theme.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{theme.title}</h2>
              {theme.statements.map((statement, idx) => (
                <div key={idx} style={{ marginBottom: '1rem' }}>
                  <p>{statement}</p>
                  <input
                    type="range"
                    min="0"
                    max="4"
                    defaultValue="0"
                    onChange={val => handleSliderChange(theme.id, idx, val)}
                  />
                  <div style={{ fontSize: '0.85rem', color: '#555' }}>0 = Strongly Disagree, 4 = Strongly Agree</div>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', fontSize: '1rem', borderRadius: '4px', backgroundColor: '#1e40af', color: 'white', border: 'none' }}>
            Submit
          </button>
        </>
      ) : (
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Your Top Stressors</h2>
          {calculateTopThemes().map(({ theme }) => (
            <div key={theme.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{theme.title}</h3>
              <ul>
                {theme.resources.map((res, idx) => (
                  <li key={idx}>
                    <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: '#1e40af', textDecoration: 'underline' }}>{res.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
