import { Outlet, Link } from 'react-router-dom';

export default function RootLayout() {
  return (
    <div className="app-container">
      <nav style={{ padding: '1rem', display: 'flex', gap: '1rem', background: '#eee' }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <main style={{ padding: '2rem' }}>
        {/* Outlet renders the child routes dynamically */}
        <Outlet />
      </main>
    </div>
  );
}