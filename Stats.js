import { getAllShortLinks } from '../services/urlService';

function Stats() {
  const links = getAllShortLinks();

  return (
    <div>
      <h2>URL Statistics</h2>
      <ul>
        {links.map(link => (
          <li key={link.code}>
            <strong>{link.code}</strong> → {link.longUrl} (Expires: {new Date(link.expirationTime).toLocaleString()})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Stats;
