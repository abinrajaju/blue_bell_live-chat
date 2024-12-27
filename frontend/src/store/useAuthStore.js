import { create } from "zustand";


export const useAuthStore= create((set)=>({
    authUser:null,
    isSigningu:false,
    isLoggingIng:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,
    checkAuth:
}))