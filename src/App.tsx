import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { signIn, signUp, signOut } from "./auth";

type Todo = {
  id: string;
  title: string;
  created_at: string;
  user_id: string;
};

function App() {
  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Todo state
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // ✅ Fetch todos (moved above useEffect + wrapped in useCallback)
  const fetchTodos = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setTodos(data || []);
    }
  }, []);

  // Listen to auth changes
  useEffect(() => {
    // Get existing session on refresh
    supabase.auth.getSession().then(({ data }) => {
      const currentSession = data.session;
      setSession(currentSession);

      // ✅ Fetch todos if session exists on refresh
      if (currentSession) {
        fetchTodos(currentSession.user.id);
      }
    });

    // Subscribe to auth changes
    const { data: authListener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);

        if (session) {
          fetchTodos(session.user.id);
        } else {
          setTodos([]);
        }
      });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchTodos]); // ✅ added dependency

  // Add todo
  const addTodo = async () => {
    if (!newTodo.trim() || !session) return;

    const { error } = await supabase.from("todos").insert({
      title: newTodo,
      user_id: session.user.id,
    });

    if (error) {
      console.error(error);
    } else {
      setNewTodo("");
      fetchTodos(session.user.id);
    }
  };

  // -------------------------
  // AUTH UI (NOT LOGGED IN)
  // -------------------------
  if (!session) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Login / Sign Up</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button onClick={() => signIn(email, password)}>
          Login
        </button>
        <button onClick={() => signUp(email, password)}>
          Sign Up
        </button>
      </div>
    );
  }

  // -------------------------
  // MAIN APP (LOGGED IN)
  // -------------------------
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Supabase Auth + Todos</h1>

      <p>
        Logged in as <strong>{session.user.email}</strong>
      </p>

      <p>
        <strong>Auth Token (access_token):</strong>
        <br />
        {session.access_token.slice(0, 40)}...
      </p>

      <button onClick={signOut}>Logout</button>

      <hr />

      <h3>Add Todo</h3>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="New todo"
      />
      <button onClick={addTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;