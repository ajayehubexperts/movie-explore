import axios from "axios";

const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

// Email/Password Login
export const loginUser = async (email, password) => {
  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      { email, password, returnSecureToken: true }
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.error?.message || "Login failed");
  }
};

// Email/Password Signup
export const signupUser = async (email, password) => {
  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      { email, password, returnSecureToken: true }
    );
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.error?.message || "Signup failed");
  }
};

// Forget password
export const sendPasswordResetEmail = async (email) => {
  try {
    const { data } = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      { requestType: "PASSWORD_RESET", email }
    );
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.error?.message || "Failed to send reset email"
    );
  }
};
