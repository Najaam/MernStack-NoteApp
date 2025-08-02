import { React, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUi";
import toast from "react-hot-toast";
import Notecard from "../components/Notecard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

function Home() {
  const [isRateLimted, setIsRateLimted] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimted(false);
      } catch (error) {
        console.log(error);
        if (error.response?.status == 429) {
          setIsRateLimted(true);
        } else {
          toast.error("failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimted && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6 ">
      {loading ? (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="loading loading-infinity loading-lg bg-yellow-600"></div>
  </div>
) : isRateLimted ? null : notes.length === 0 ? (
  <NotesNotFound/>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {notes.map((note) => (
      <Notecard key={note._id} note={note} setNotes={setNotes} />
    ))}
  </div>
)}

      </div>
    </div>
  );
}

export default Home;
