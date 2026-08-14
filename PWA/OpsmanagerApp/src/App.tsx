import { Router, Route, route } from "preact-router";
import { useEffect, useState } from 'preact/hooks';
import "./App.css";

import { supabase } from './lib/supabase';
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
// import Home from './pages/Home';

function App() {
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    // Check the current session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        route('/login',true); // Replace history state so they can't hit "Back"
      }
      setSessionChecked(true);
    });

    // Listen for authentication state changes (e.g., token expires, or user logs out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        route('/login',true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Don't render the Router until we know the auth state to prevent UI flashing
  if (!sessionChecked) {
    return ;
  }
  return (
    <Router>
      <Route path="/" component={Welcome} />
      <Route path="/login" component={Login} />
    </Router>
  );
}

export default App;
