import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import RoomJoinPage from "./components/RoomJoinPage";
import CreateRoomPage from "./components/CreateRoomPage";
import Room from "./components/Room";

// frontend/src/App.tsx
{/* import React, { useEffect, useState } from "react";

interface Room {
  id: number;
  code: string;
  host: string;
  guest_can_pause: boolean;
  votes_to_skip: number;
  created_at: string;
}

const App: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/rooms/")
      .then((res) => res.json())
      .then((data: Room[]) => setRooms(data));
  }, []);

  return (
    <div>
      <h1>Rooms</h1>
      {rooms.map((room) => (
        <div key={room.id}>
          <p>Code: {room.code}</p>
          <p>Host: {room.host}</p>
          <p>Votes to Skip: {room.votes_to_skip}</p>
          <p>Guest Can Pause: {room.guest_can_pause ? "Yes" : "No"}</p>
          <p>Created At: {room.created_at}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;
*/}
export default function App(){
  return(
    <div>
     <div>
      <Router>
        <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/join" element={<RoomJoinPage />} />
        <Route path="/create" element={<CreateRoomPage />} />
        <Route path="/room/:roomCode" element = {<Room/>}/>
        {/* Redirect any unknown route back to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
     </div>
    </div>
  )
}