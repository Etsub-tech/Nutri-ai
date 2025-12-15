import { useState } from "react";
import "../styles/auth.css";


export default function Signup() {
return (
<div className="auth-container">
<h1>Create Account</h1>


<label>Username</label>
<input placeholder="Choose a username" />


<label>Email</label>
<input type="email" placeholder="Enter your email" />


<label>Password</label>
<input type="password" placeholder="Create password" />


<label>Confirm Password</label>
<input type="password" placeholder="Confirm password" />


<a href="/" className="auth-button">Sign Up</a>


<p>Already have an account? <a href="/login">Login</a></p>
</div>
);
}