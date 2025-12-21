// server.js
import express from "express";
import fetch from "node-fetch";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


// =============================
// BACKEND URL CONFIG
// =============================
const BACKEND_AUTH = "http://localhost:8085/api/v1/auth";
const BACKEND_BOT = "http://localhost:8085/api/v1/bot";


// =============================
// Helper — JSON forward
// =============================
async function forwardJson(url, body, token = null, method = "POST") {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body: method === "GET" ? undefined : JSON.stringify(body)
  });

  const json = await res.json().catch(() => ({}));
  return { status: res.status, json };
}


// =============================
// AUTH — REGISTER
// =============================
app.post("/auth/register", async (req, res) => {
  try {
    const { status, json } = await forwardJson(
      `${BACKEND_AUTH}/register`,
      req.body
    );
    res.status(status).json(json);
  } catch {
    res.status(500).json({ error: "proxy_register_error" });
  }
});


// =============================
// AUTH — LOGIN (JWT cookie)
// =============================
app.post("/auth/login", async (req, res) => {
  try {
    const { status, json } = await forwardJson(
      `${BACKEND_AUTH}/authenticate`,
      req.body
    );

    if (json?.result?.token) {
      res.cookie("jwt", json.result.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      return res.json({ success: true });
    }

    res.status(status).json(json);
  } catch {
    res.status(500).json({ error: "proxy_auth_error" });
  }
});


// =============================
// AUTH — LOGOUT
// =============================
app.post("/auth/logout", (req, res) => {
  res.clearCookie("jwt", { httpOnly: true, sameSite: "lax" });
  res.json({ success: true });
});


// =============================
// JWT MIDDLEWARE
// =============================
function protect(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "unauthorized" });
  req.token = token;
  next();
}


// =============================
// BOT API PROXY
// =============================
app.use("/bot", protect);


// ===== GET Proxy =====
app.get("/bot/*", async (req, res) => {
  const backendUrl = BACKEND_BOT + req.path.replace("/bot", "") + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "");

  const response = await fetch(backendUrl, {
    method: "GET",
    headers: { Authorization: `Bearer ${req.token}` }
  });

  const json = await response.json().catch(() => ({}));
  res.status(response.status).json(json);
});


// ===== POST Proxy =====
app.post("/bot/*", async (req, res) => {
  const backendUrl = BACKEND_BOT + req.path.replace("/bot", "");
  const { status, json } = await forwardJson(backendUrl, req.body, req.token, "POST");
  res.status(status).json(json);
});


// ===== PUT Proxy =====
app.put("/bot/*", async (req, res) => {
  const backendUrl = BACKEND_BOT + req.path.replace("/bot", "");
  const { status, json } = await forwardJson(backendUrl, req.body, req.token, "PUT");
  res.status(status).json(json);
});


// ===== DELETE Proxy =====
app.delete("/bot/*", async (req, res) => {
  const backendUrl = BACKEND_BOT + req.path.replace("/bot", "");

  const response = await fetch(backendUrl, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${req.token}` }
  });

  const json = await response.json().catch(() => ({}));
  res.status(response.status).json(json);
});


// =============================
// SPA fallback
// =============================
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// =============================
// START SERVER
// =============================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});