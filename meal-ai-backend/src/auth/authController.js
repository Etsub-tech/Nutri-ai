import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error("JWT_SECRET is not defined in .env");
}


// REGISTER (No token is needed yet, because the user isn't authenticated — they're just signing up.)
export async function register(req, res, body) {
  try {
    const { email, password } = body || {};

    if (!email || !password) {
      res.writeHead(400);
      return res.end("Email and password are required");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      res.writeHead(400);
      return res.end("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed });

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Registered successfully" }));
  } catch (err) {
  console.error("Register error:", err);

  if (!res.writableEnded) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: err.message }));
  }
}
}


// LOGIN
export async function login(req, res, body) {
  try {
    const { email, password } = body || {};

    if (!email || !password) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ error: "Email and password are required" }));
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      res.writeHead(401);
      return res.end("Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.writeHead(401);
      return res.end("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id },   //playload - the data you want inside the token
      SECRET,                //a private key only your server knows
      { expiresIn: "1d" }
    );                     //- Signature: created by combining the payload + SECRET.

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ token, userId: user._id.toString(), email: user.email }));
  } catch (error) {
    console.error("Login error:", error);
    if (!res.writableEnded) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
  }
}
