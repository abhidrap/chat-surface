import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: JSON.parse(localStorage.getItem("authUser")) || null,
  isSignedUp: false,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
    } catch (error) {
      console.log("error in checkAuth", error);
      set({ authUser: null });
      localStorage.removeItem("authUser");
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      // localStorage.setItem("authUser", JSON.stringify(res.data)); 
      toast.success("account created successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data));
      toast.success("User logged in successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during login"
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      localStorage.removeItem("authUser");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred during logout"
      );
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      localStorage.setItem("authUser", JSON.stringify(res.data)); // Corrected here
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in updateProfile", error);
      toast.error(
        error?.response?.data?.message ||
          "An error occurred during profile update"
      );
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
