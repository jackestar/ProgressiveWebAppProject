import { route } from "preact-router";
import { useState } from 'preact/hooks';
import "../App.css";
import "mdui/components/card.js";
import "mdui/components/text-field.js";
import "@mdui/icons/person.js";
import "@mdui/icons/key.js";
import { supabase } from '../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      route('/');
    }
  };

  return (
    <main class="center-container">
      <h1 class="main-title">Servinova</h1>
      <mdui-card variant="elevated" class="box">
        <h2 class="main-title">Login</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <mdui-text-field
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onInput={(e: any) => setEmail(e.target.value)}
            required
          >
            <mdui-icon-person slot="icon"></mdui-icon-person>
          </mdui-text-field>

          <mdui-text-field
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onInput={(e: any) => setPassword(e.target.value)}
            required
            toggle-password
          >
            <mdui-icon-key slot="icon"></mdui-icon-key>
          </mdui-text-field>

          {errorMsg && <div style={{ color: 'red', fontSize: '14px' }}>{errorMsg}</div>}

          <mdui-button type="submit" variant="outlined" class="login-button" loading={loading ? true : undefined}>
            {loading ? 'Signing in...' : 'Login'}
          </mdui-button>
        </form>
      </mdui-card>
    </main>
  );
}