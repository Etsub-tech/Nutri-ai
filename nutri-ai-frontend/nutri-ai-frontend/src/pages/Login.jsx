import { useState } from "react";
import "../styles/auth.css";


export default function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const submit = () => {
alert("Login logic will be added here.");
};


return (
<div className="auth-container">
<h1>Login</h1>


<label>Email</label>
<input value={email} onChange={(e) => setEmail(e.target.value)} />


<label>Password</label>
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />


<button className="auth-button" onClick={submit}>Login</button>
<p>Don’t have an account? <a href="/signup">Signup</a></p>
</div>
);
}