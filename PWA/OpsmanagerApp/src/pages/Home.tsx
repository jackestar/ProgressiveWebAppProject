// import { h } from 'preact';
import { route } from 'preact-router';
import { supabase } from '../lib/supabase';

export function Home() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    route('/login');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>Dashboard</h1>
      <p>Welcome! You are logged in.</p>
      <mdui-button onClick={handleLogout} variant="outlined">
        Sign Out
      </mdui-button>
    </div>
  );
}