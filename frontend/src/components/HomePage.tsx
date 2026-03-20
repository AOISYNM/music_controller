import { useNavigate } from "react-router-dom";
import useRoomCode from "../hooks/UseRoomCode";
import { useEffect } from "react";

export default function HomePage() {
  const navigate = useNavigate();
  const { roomCode, isLoading, error } = useRoomCode();

  useEffect(() => {
     if (roomCode){
    navigate(`/room/${roomCode}`);
    } 
  }, [roomCode, navigate])
  if (isLoading){
    return null; // or a loading spinner
  }
  if (error) {
    console.error("Error loading room code:", error);
    // Optionally display an error message to the user
  }
 

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

        /* Neon blobs */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .blob-1 {
          width: 600px; height: 600px;
          top: -100px; left: -150px;
          background: radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%);
        }
        .blob-2 {
          width: 500px; height: 500px;
          bottom: -80px; right: -100px;
          background: radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%);
        }
        .blob-3 {
          width: 350px; height: 350px;
          top: 40%; left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%);
        }

        /* Neon horizontal line accents */
        .neon-line-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.8) 30%, rgba(236,72,153,0.8) 70%, transparent 100%);
          box-shadow: 0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(236,72,153,0.4);
        }
        .neon-line-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.7) 40%, rgba(139,92,246,0.7) 70%, transparent 100%);
          box-shadow: 0 0 20px rgba(56,189,248,0.5), 0 0 40px rgba(139,92,246,0.4);
        }

        /* Grid texture */
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        /* Card */
        .card {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          padding: 4rem 3.5rem;
          border-radius: 24px;
          text-align: center;
          max-width: 480px;
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(139,92,246,0.1),
            0 0 60px rgba(139,92,246,0.08),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* Corner accents */
        .card::before, .card::after {
          content: '';
          position: absolute;
          width: 60px; height: 60px;
          border-color: rgba(139,92,246,0.6);
          border-style: solid;
        }
        .card::before {
          top: -1px; left: -1px;
          border-width: 2px 0 0 2px;
          border-radius: 24px 0 0 0;
          box-shadow: -4px -4px 16px rgba(139,92,246,0.3);
        }
        .card::after {
          bottom: -1px; right: -1px;
          border-width: 0 2px 2px 0;
          border-radius: 0 0 24px 0;
          box-shadow: 4px 4px 16px rgba(236,72,153,0.3);
        }

        /* Heading */
        .heading {
          font-family: 'Syne', sans-serif;
          font-size: 3rem;
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }
        .subheading {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.35);
          margin: 0;
          font-weight: 300;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-size: 0.75rem;
        }

        /* Divider */
        .divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
        }

        /* Buttons */
        .btn-row {
          display: flex;
          flex-direction: column;
          gap: 0.875rem;
          width: 100%;
        }
        .btn-primary {
          width: 100%;
          padding: 1.1rem 2rem;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%);
          box-shadow:
            0 0 30px rgba(139,92,246,0.5),
            0 0 60px rgba(139,92,246,0.2),
            inset 0 1px 0 rgba(255,255,255,0.15);
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
          border-radius: inherit;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            0 0 40px rgba(139,92,246,0.7),
            0 0 80px rgba(139,92,246,0.3),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
        .btn-primary:active { transform: scale(0.98); }

        .btn-secondary {
          width: 100%;
          padding: 1.1rem 2rem;
          border-radius: 14px;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.8);
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 0 20px rgba(56,189,248,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: all 0.2s ease;
        }
        .btn-secondary:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(56,189,248,0.5);
          color: #fff;
          box-shadow: 0 0 30px rgba(56,189,248,0.25), inset 0 1px 0 rgba(255,255,255,0.08);
          transform: translateY(-2px);
        }
        .btn-secondary:active { transform: scale(0.98); }

        /* Floating dots */
        .dot {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .dot-1 { width:4px; height:4px; background:#a855f7; top:18%; left:14%; box-shadow: 0 0 10px #a855f7; opacity:0.8; }
        .dot-2 { width:3px; height:3px; background:#ec4899; top:72%; left:8%;  box-shadow: 0 0 8px #ec4899;  opacity:0.7; }
        .dot-3 { width:5px; height:5px; background:#38bdf8; top:25%; right:12%; box-shadow: 0 0 12px #38bdf8; opacity:0.8; }
        .dot-4 { width:3px; height:3px; background:#a855f7; bottom:20%; right:16%; box-shadow: 0 0 8px #a855f7; opacity:0.6; }
        .dot-5 { width:4px; height:4px; background:#ec4899; top:55%; left:5%;  box-shadow: 0 0 10px #ec4899; opacity:0.5; }
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
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <p className="subheading">Your music. Your room.</p>
            <h1 className="heading">Vibe With<br />Music</h1>
          </div>

          <div className="divider" />

          <div className="btn-row">
            <button className="btn-primary" onClick={() => navigate("/join")}>
              Join Room
            </button>
            <button className="btn-secondary" onClick={() => navigate("/create")}>
              Create Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}