This is a **full stack Timetable Management App** built with:

- 🖥 **Frontend**: React Native + Expo
- ⚙️ **Backend**: FastAPI (Python)

## 🔥Features
- Add new timetable entries
- Swipe to delete entries
- Light and Dark Mode toggle
- Backend connection with FastAPI
- Mobile and web ready (Expo)

## 🛠Installation
1. Clone this repository:
git clone https://github.com/your-username/timetable-app.git
cd timetable-app

2. Backend Setup (FastAPI)
cd timetable-backend
python -m venv env
source env/bin/activate    # (or "env\Scripts\activate" on Windows)
pip install -r requirements.txt
uvicorn main:app --reload
The backend will run at: http://127.0.0.1:8000

3. Frontend Setup (Expo)
In a new terminal:
cd timetable-frontend
npm install
npm start
--> Open in browser, Android, iOS, or scan QR Code using Expo Go.
   
## 🧩 Tech Stack
- Frontend: React Native, Expo, Axios, React Native Gesture Handler
- Backend: FastAPI, Python
- Mobile Preview: Expo Go app (iOS & Android)

## Author

- [Duc Tran](https://github.com/trantriduc242)
