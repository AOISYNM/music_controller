# 🎵 Music Controller

A full-stack web app that lets users create and join shared music rooms. Hosts configure playback permissions and skip vote thresholds — guests can control music in real time based on the room settings.

---

## Tech Stack

**Backend**
- Python / Django
- Django REST Framework

**Frontend**
- React (TypeScript)
- React Router
- Tailwind CSS
- Vite

---

## Features

- Create a music room with custom settings
- Join an existing room via room code
- Configure guest playback permissions (play/pause)
- Set votes required to skip a song
- Host and guest roles with different permissions
- Leave room and auto-cleanup on host disconnect
- Auto-redirect if user is already in a room (via custom `useRoomCode` hook)

---

## Project Structure

```
music_controller/
├── api/                  # Django REST API
│   ├── models.py         # Room model
│   ├── views.py          # CreateRoom, JoinRoom, LeaveRoom, GetRoom
│   ├── urls.py
│   └── serializers.py
├── frontend/             # React + TypeScript
│   └── src/
│       ├── pages/
│       │   ├── HomePage.tsx
│       │   ├── CreateRoomPage.tsx
│       │   ├── RoomJoinPage.tsx
│       │   └── Room.tsx
│       └── hooks/
│           └── UseRoomCode.ts
└── music_controller/     # Django project settings
```

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+

### Backend Setup

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start the Django server
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The React app runs on `http://localhost:3000` and proxies API requests to Django at `http://localhost:8000`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/create-room/` | Create a new room |
| `POST` | `/api/join-room/` | Join a room by code |
| `POST` | `/api/leave-room/` | Leave current room |
| `GET` | `/api/get-room?code=` | Get room details |
| `GET` | `/api/user-in-room` | Check if user is in a room |

---

## Environment

No `.env` file needed for local development. Django's `SESSION_ENGINE` handles room state via server-side sessions.

---
