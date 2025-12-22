import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });

  const submit = async () => {
    await login(form);
    alert("Logged in");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
