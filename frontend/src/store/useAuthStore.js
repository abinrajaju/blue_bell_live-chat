import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast";
import { data } from "react-router-dom";


export const useAuthStore= create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIng:false,
    isUpdatingProfile:false,
    onlineUsers: [],
    isCheckingAuth:true,
    checkAuth:async()=>{
        try {
            
            
            const res= await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log('err from check auth ',error);
            
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            
          const res=  await axiosInstance.post("/auth/signup",data)
          
          set({authUser:res.data})
          toast.success("Account created successfully")
        } catch (error) {
            toast.error("error")
            console.log(error);
            
        }finally{
            set({isSigningUp:false})
        }
    },
    logout: async () => {
        try {
          await axiosInstance.post("/auth/logout");
          set({ authUser: null });
          toast.success("Logged out successfully");
         // get().disconnectSocket();
        } catch (error) {
          toast.error(error.response.data.message);
        }
      },
      login:async(data)=>{
        set({isLoggingIng:true})
        try {
            const res=await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success('logged is succesfully')
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIng:false})
        }
      },

      updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success('Profile Updated Successfully')
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUpdatingProfile:false})
        }
      }
     
}))