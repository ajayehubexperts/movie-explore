import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../Firebase";
import { signInWithPopup } from "firebase/auth";
import { loginUser, signupUser } from "../../api/firebaseAuth";

// Email/password login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await loginUser(email, password);
      return { email: data.email, uid: data.localId, token: data.idToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await signupUser(email, password);
      return { email: data.email, uid: data.localId, token: data.idToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Google login
export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, thunkAPI) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      return {
        email: user.email,
        uid: user.uid,
        token: await user.getIdToken(),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Forget password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (email, thunkAPI) => {
    try {
      const data = await sendPasswordResetEmail(email);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  resetMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.resetMessage = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetMessage = "Reset email sent successfully!";
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
