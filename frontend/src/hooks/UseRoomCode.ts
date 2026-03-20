import { useState , useEffect } from "react";

export default function useRoomCode() {
    const [roomCode , setRoomCode] = useState<string | null>(null);
    const [isLoading , setIsLoading] = useState(true);
    const [error ,setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try{
                const response = await fetch("/api/user-in-room/");
                if(!response.ok){
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRoomCode(data.code);
                }
                catch(err){
                    console.error("Error fetching room code:", err);
                    setError(err instanceof Error ? err : new Error("Unknown error"));
                }
                finally{
                    setIsLoading(false);
                }
            
            
        };
        fetchRoom();
    } ,[]);



    return{roomCode , isLoading , error};
}