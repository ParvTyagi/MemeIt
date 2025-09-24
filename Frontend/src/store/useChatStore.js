import {create} from "zustand";
import axios from "axios";
import { handleError, handleSuccess } from "../assets/utils";

export const useChatStore= create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:[],
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async()=>{
        set({ isUsersLoading:true});
        try{
            const res=await axios.get("http://localhost:8080/api/message/users",
                { withCredentials: true },
            );
            set({ users:res.data });
        }catch(error){
            handleError(error.response);
        }finally{
            set({ isUsersLoading: false});
        }
    },
    getMessages: async(userId)=>{
        set({isMessageLoading :true});
        try{
            const res=await axios.get(`http://localhost:8080/api/message/${userId}`,
                {withCredentials :true});
                set({ messages:res.data });
        }catch(error){
            handleError(error.response.data.message);
        }finally{
            set({isMessageLoading :false});
        }
    },
    sendMessage: async(messageData)=>{
        const {selectedUser,messages}=get()
        try{
            const res=await axios.post(`http://localhost:8080/api/message/send/${selectedUser._id}`,messageData,
                {withCredentials:true}
            );
            set({messages:[...messages,res.data]})
        }catch(error){
            handleError(error.response.data.message);
        }
    },
    setSelectedUser: (selectedUser)=>set({selectedUser}),
}))