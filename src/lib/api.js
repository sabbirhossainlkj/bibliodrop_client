const TOKEN_KEY = "bd_token";

export const saveToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const getToken = () => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null);

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
