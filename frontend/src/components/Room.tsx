import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { API_BASE } from "../config";

interface RoomState {
    votesToSkip: number;
    guestCanPause: boolean;
    isHost: boolean;
}

export default function Room() {
    const { roomCode } = useParams();
    const navigate = useNavigate();
    const [roomState, setRoomState] = useState<RoomState>({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });

    useEffect(() => {
        fetch(`${API_BASE}/api/get-room?code=${roomCode}`, {
            credentials: "include",
        })
            .then((resolve) => {
                if (!resolve.ok) {
                    navigate("/");
                    return null;
                }
                return resolve.json();
            })
            .then((data) => {
                if (!data) return;
                setRoomState({
                    votesToSkip: data.votes_to_skip,
                    guestCanPause: data.guest_can_pause,
                    isHost: data.is_host,
                });
            })
            .catch((error) => console.error("Failed to fetch room:", error));
    }, [roomCode, navigate]);

    const handleLeaveRoom = async () => {
        await fetch(`${API_BASE}/api/leave-room/`, {
            method: "POST",
            credentials: "include",
        });
        navigate("/");
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400&display=swap');

                .home-root {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #050508;
                    overflow: hidden;
                    position: relative;
                    font-family: 'DM Sans', sans-serif;
                }
                .blob { position:absolute; border-radius:50%; filter:blur(80px); pointer-events:none; }
                .blob-1 { width:600px; height:600px; top:-100px; left:-150px; background:radial-gradient(circle,rgba(139,92,246,0.35) 0%,transparent 70%); }
                .blob-2 { width:500px; height:500px; bottom:-80px; right:-100px; background:radial-gradient(circle,rgba(236,72,153,0.3) 0%,transparent 70%); }
                .blob-3 { width:350px; height:350px; top:40%; left:50%; transform:translate(-50%,-50%); background:radial-gradient(circle,rgba(56,189,248,0.18) 0%,transparent 70%); }
                .neon-line-top { position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent 0%,rgba(139,92,246,0.8) 30%,rgba(236,72,153,0.8) 70%,transparent 100%); box-shadow:0 0 20px rgba(139,92,246,0.6),0 0 40px rgba(236,72,153,0.4); }
                .neon-line-bottom { position:absolute; bottom:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent 0%,rgba(56,189,248,0.7) 40%,rgba(139,92,246,0.7) 70%,transparent 100%); box-shadow:0 0 20px rgba(56,189,248,0.5),0 0 40px rgba(139,92,246,0.4); }
                .grid-overlay { position:absolute; inset:0; background-image:linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px); background-size:60px 60px; pointer-events:none; }
                .dot { position:absolute; border-radius:50%; pointer-events:none; }
                .dot-1 { width:4px; height:4px; background:#a855f7; top:18%; left:14%; box-shadow:0 0 10px #a855f7; opacity:0.8; }
                .dot-2 { width:3px; height:3px; background:#ec4899; top:72%; left:8%; box-shadow:0 0 8px #ec4899; opacity:0.7; }
                .dot-3 { width:5px; height:5px; background:#38bdf8; top:25%; right:12%; box-shadow:0 0 12px #38bdf8; opacity:0.8; }
                .dot-4 { width:3px; height:3px; background:#a855f7; bottom:20%; right:16%; box-shadow:0 0 8px #a855f7; opacity:0.6; }
                .dot-5 { width:4px; height:4px; background:#ec4899; top:55%; left:5%; box-shadow:0 0 10px #ec4899; opacity:0.5; }

                .card {
                    position:relative; z-index:10;
                    display:flex; flex-direction:column; align-items:center; gap:2rem;
                    padding:4rem 3.5rem; border-radius:24px; text-align:center;
                    max-width:480px; width:100%;
                    background:rgba(255,255,255,0.03);
                    border:1px solid rgba(255,255,255,0.07);
                    backdrop-filter:blur(24px);
                    box-shadow:0 0 0 1px rgba(139,92,246,0.1),0 0 60px rgba(139,92,246,0.08),inset 0 1px 0 rgba(255,255,255,0.06);
                }
                .card::before,.card::after { content:''; position:absolute; width:60px; height:60px; border-color:rgba(139,92,246,0.6); border-style:solid; }
                .card::before { top:-1px; left:-1px; border-width:2px 0 0 2px; border-radius:24px 0 0 0; box-shadow:-4px -4px 16px rgba(139,92,246,0.3); }
                .card::after { bottom:-1px; right:-1px; border-width:0 2px 2px 0; border-radius:0 0 24px 0; box-shadow:4px 4px 16px rgba(236,72,153,0.3); }

                .heading { font-family:'Syne',sans-serif; font-size:2.75rem; font-weight:800; line-height:1.05; letter-spacing:-0.03em; background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.75) 100%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; margin:0; }
                .room-code { font-family:'Syne',sans-serif; font-size:1.1rem; font-weight:700; letter-spacing:0.25em; text-transform:uppercase; background:linear-gradient(135deg,#a855f7,#ec4899); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; padding:0.4rem 1.2rem; border-radius:999px; border:1px solid rgba(168,85,247,0.25); background-color:rgba(168,85,247,0.08); }
                .subheading { font-size:0.75rem; color:rgba(255,255,255,0.35); margin:0; font-weight:300; letter-spacing:0.04em; text-transform:uppercase; }
                .divider { width:100%; height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); }

                .stats-grid { display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; width:100%; }
                .stat-card { display:flex; flex-direction:column; gap:0.35rem; padding:1rem 1.25rem; border-radius:14px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); }
                .stat-label { font-size:0.7rem; color:rgba(255,255,255,0.3); text-transform:uppercase; letter-spacing:0.08em; font-weight:400; }
                .stat-value { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:700; color:#fff; }
                .stat-value.accent { background:linear-gradient(135deg,#a855f7,#38bdf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
                .stat-card.host-card { grid-column:span 2; flex-direction:row; align-items:center; justify-content:space-between; }

                .host-badge { font-size:0.72rem; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; padding:0.3rem 0.85rem; border-radius:999px; }
                .host-badge.yes { background:rgba(139,92,246,0.15); color:#c084fc; border:1px solid rgba(139,92,246,0.3); box-shadow:0 0 12px rgba(139,92,246,0.2); }
                .host-badge.no { background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.35); border:1px solid rgba(255,255,255,0.08); }

                .btn-row { display:flex; flex-direction:column; gap:0.875rem; width:100%; }

                .btn-settings {
                    width:100%; padding:1.1rem 2rem; border-radius:14px; cursor:pointer;
                    font-family:'Syne',sans-serif; font-size:1rem; font-weight:700;
                    letter-spacing:0.05em; text-transform:uppercase;
                    color:rgba(255,255,255,0.8); background:transparent;
                    border:1px solid rgba(255,255,255,0.12);
                    box-shadow:0 0 20px rgba(139,92,246,0.08),inset 0 1px 0 rgba(255,255,255,0.05);
                    transition:all 0.2s ease;
                }
                .btn-settings:hover { background:rgba(139,92,246,0.08); border-color:rgba(139,92,246,0.5); color:#fff; box-shadow:0 0 30px rgba(139,92,246,0.25),inset 0 1px 0 rgba(255,255,255,0.08); transform:translateY(-2px); }
                .btn-settings:active { transform:scale(0.98); }

                .btn-leave {
                    width:100%; padding:1.1rem 2rem; border-radius:14px; cursor:pointer;
                    font-family:'Syne',sans-serif; font-size:1rem; font-weight:700;
                    letter-spacing:0.05em; text-transform:uppercase;
                    color:#fff; border:none;
                    background:linear-gradient(135deg,#7f1d1d 0%,#dc2626 50%,#f43f5e 100%);
                    box-shadow:0 0 30px rgba(220,38,38,0.4),0 0 60px rgba(220,38,38,0.15),inset 0 1px 0 rgba(255,255,255,0.1);
                    transition:all 0.2s ease; position:relative; overflow:hidden;
                }
                .btn-leave::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 60%); border-radius:inherit; }
                .btn-leave:hover { transform:translateY(-2px); box-shadow:0 0 50px rgba(220,38,38,0.6),0 0 90px rgba(244,63,94,0.25),inset 0 1px 0 rgba(255,255,255,0.15); }
                .btn-leave:active { transform:scale(0.98); }
            `}</style>

            <div className="home-root">
                <div className="neon-line-top" />
                <div className="neon-line-bottom" />
                <div className="grid-overlay" />
                <div className="blob blob-1" />
                <div className="blob blob-2" />
                <div className="blob blob-3" />
                <div className="dot dot-1" />
                <div className="dot dot-2" />
                <div className="dot dot-3" />
                <div className="dot dot-4" />
                <div className="dot dot-5" />

                <div className="card">
                    <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem", alignItems:"center" }}>
                        <p className="subheading">Now in session</p>
                        <h1 className="heading">Music Room</h1>
                        <span className="room-code">{roomCode}</span>
                    </div>

                    <div className="divider" />

                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-label">Votes to Skip</span>
                            <span className="stat-value accent">{roomState.votesToSkip}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-label">Guest Pause</span>
                            <span className="stat-value accent">{roomState.guestCanPause ? "Yes" : "No"}</span>
                        </div>
                        <div className="stat-card host-card">
                            <span className="stat-label">Your Role</span>
                            <span className={`host-badge ${roomState.isHost ? "yes" : "no"}`}>
                                {roomState.isHost ? "Host" : "Guest"}
                            </span>
                        </div>
                    </div>

                    <div className="divider" />

                    <div className="btn-row">
                    
                        <button className="btn-leave" onClick={handleLeaveRoom}>
                            Leave Room
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}