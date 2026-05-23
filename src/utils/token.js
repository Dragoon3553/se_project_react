const TOKEN_KEY = "jwt";

// Accepts token as argument and adds it to localStorage
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

// Retrieves and returns the value of TOKEN_KEY from localStorage
export const getToken = () => localStorage.getItem(TOKEN_KEY);

// Deletes TOKEN_KEY from localStorage
export const removeToken = () => localStorage.removeItem(TOKEN_KEY);
