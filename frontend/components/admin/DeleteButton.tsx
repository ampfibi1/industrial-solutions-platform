"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function DeleteButton({id,url,name,}: {id: number;url: string;name: string;}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await axios.delete(url);
      alert(`${name} deleted successfully`);
      router.refresh();
    } catch (err: unknown) {
      console.error(`Failed to delete ${name}:`, err);
      alert(`Failed to delete ${name}`);
    }
  };

  return (
    <button className="btn btn-sm btn-error" onClick={handleDelete} >
      Delete
    </button>
  );
}