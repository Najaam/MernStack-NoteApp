import { PenSquareIcon, Trash2, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";


function Notecard({ note,setNotes }) {
  const handledelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`notes/${id}`)
      setNotes((prev)=>prev.filter(note=>note._id != id))//removing deleted note from ui
      toast.success("Notes Deleted Sucessfully!")
    } catch (error) {
      console.log("Error occurs in deleteing notes : " + error);
      toast.error("Error in deleting notes")
    }
  };
  return (
    < div
      className="card bg-primary"
    >
      <div className="card-body">
        <h3 className="card-tite text-base-100 font-mono font-semibold tracking-tighter ">
          {note.title}
        </h3>
        <p className="text-base-100/70 line-clamp-2 font-mono tracking-tighter ">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center ">
          <span className="text-sm text-base-100/50 tracking-tighter">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-1">
          <Link
      to={`/note/${note._id}`}
      className="card bg-primary hover:scale-125 transition-all duration-300"
    >
            <PenSquareIcon className="size-4 text-gray-700" />
     </Link>
            <button
              className="btn btn-ghost btn-xs text-red-700 hover:scale-125 transition-all duration-300"
              onClick={(e) => {e.preventDefault(),handledelete(note._id)}}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notecard;
