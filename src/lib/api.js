const TOKEN_KEY = "bd_token";

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);

/** Sync token from better-auth session if missing */
export const ensureToken = async (session) => {
  if (typeof window === "undefined" || !session?.user) return;
  const existing = getToken();
  if (existing) return; // Already have token
  
  // Fetch and save token for existing session
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: session.user.email, role: session.user.role || "user" }),
    });
    const data = await res.json();
    if (data.token) saveToken(data.token);
  } catch (err) {
    console.error("Failed to sync token:", err);
  }
};

/** fetch wrapper that automatically attaches the Bearer token */
export const apiFetch = (url, options = {}) => {
  const token = getToken();
  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
};
