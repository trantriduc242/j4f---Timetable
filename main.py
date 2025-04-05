from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Timetable model
class TimetableEntry(BaseModel):
    day: str
    time: str
    subject: str
    location: str

# Fake in-memory DB
timetable_entries: List[TimetableEntry] = []

# Health Check
@app.get("/")
def read_root():
    return {"message": "Timetable API running"}

# Get all timetable entries
@app.get("/timetable", response_model=List[TimetableEntry])
def get_timetable():
    return timetable_entries

# Add a timetable entry
@app.post("/timetable", response_model=TimetableEntry)
def create_timetable(entry: TimetableEntry):
    timetable_entries.append(entry)
    return entry

# NEW: Delete a timetable entry by index
@app.delete("/timetable/{index}")
def delete_timetable(index: int):
    if index < 0 or index >= len(timetable_entries):
        raise HTTPException(status_code=404, detail="Entry not found")
    deleted_entry = timetable_entries.pop(index)
    return {"deleted": deleted_entry}
