import { create } from "zustand"
import axios from "axios"
import { handleError, handleSuccess } from "../assets/utils";

export const useAuthStore = create((set) => ({

    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/auth/check",
                { withCredentials: true },
            );
            set({ authUser: res.data });
        } catch (error) {
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    logout: async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/auth/logout",
                {},
                { withCredentials: true }
            );
            set({ authUser: null });
            handleSuccess("Logged out successfully");
        } catch (error) {
            handleError(error?.response?.data?.message || "Logout failed");
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axios.put("http://localhost:8080/api/auth/update-profile", data, {
                withCredentials: true,
            });

            console.log("Updated profilePic:", res.data.profilePic); // Debug
            set({ authUser: res.data });
            handleSuccess("Profile updated successfully");
        } catch (error) {
            console.error("Failed to update profile:", error);
            handleError(error?.response?.data?.error || "Profile update failed");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    
}));