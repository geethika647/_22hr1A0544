import React, { useState } from 'react';
import { createShortURL } from '../services/urlService';
import { LogSuccess, LogError } from '../middleware/logger';

const Home = () => {
  const [urls, setUrls] = useState([
    { longUrl: '', customCode: '', expiry: '' },
    { longUrl: '', customCode: '', expiry: '' },
    { longUrl: '', customCode: '', expiry: '' },
    { longUrl: '', customCode: '', expiry: '' },
    { longUrl: '', customCode: '', expiry: '' }
  ]);
  const [shortUrls, setShortUrls] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const handleShorten = async () => {
    try {
      const results = await Promise.all(
        urls.map(url =>
          createShortURL({
            longUrl: url.longUrl,
            customCode: url.customCode,
            expiry: Number(url.expiry)
          })
        )
      );
      LogSuccess('URLs shortened successfully!', results);
      setShortUrls(results);
    } catch (error) {
      LogError('Error shortening URLs', error.message);
      alert('Something went wrong while shortening URLs');
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener (5 Links)</h2>
      {urls.map((url, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Long URL ${index + 1}`}
            value={url.longUrl}
            onChange={e => handleChange(index, 'longUrl', e.target.value)}
          />
          <input
            type="text"
            placeholder="Custom Code (optional)"
            value={url.customCode}
            onChange={e => handleChange(index, 'customCode', e.target.value)}
          />
          <input
            type="number"
            placeholder="Expiry (minutes)"
            value={url.expiry}
            onChange={e => handleChange(index, 'expiry', e.target.value)}
          />
          <hr />
        </div>
      ))}
      <button onClick={handleShorten}>Shorten All URLs</button>

      {shortUrls.length > 0 && (
        <div>
          <h3>Shortened URLs</h3>
          <ul>
            {shortUrls.map((code, idx) => (
              <li key={idx}>
                <strong>{urls[idx].longUrl}</strong> →
                <a href={`/${code}`} target="_blank" rel="noreferrer">
                  https://yourdomain.com/{code}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;
