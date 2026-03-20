import { useState, useEffect } from "react";
import { API_BASE } from "../config";  // ← add this

export default function useRoomCode() {
    const [roomCode, setRoomCode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await fetch(`${API_BASE}/api/user-in-room`);  // ← fix this
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setRoomCode(data.code);
            } catch (err) {
                setError(err instanceof Error ? err : new Error(String(err)));
            } finally {
                setIsLoading(false);
            }
        };
        fetchRoom();
    }, []);

    return { roomCode, isLoading, error };
}