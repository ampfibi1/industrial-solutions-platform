"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteUserButton({userId}:{userId:number}){
    const router = useRouter();
    const handleDelete = async()=>{
        try{
            await axios.delete(`http://localhost:3000/admin/users/${userId}`,{ withCredentials: true });
            alert("User deleted successfully");
            router.refresh();
        }catch(err:unknown){
            console.error("Failed to delete user:", err);
            alert("Failed to delete user");
        }
    }
    return(
        <button className="btn btn-sm btn-error" onClick={handleDelete}>
            Delete
        </button>
    );
}