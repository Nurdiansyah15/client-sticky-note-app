import Layout from "../pages/Layout";
import * as React from "react";
import NoteList from "../components/NoteList";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios/axiosClient";
import SearchBar from "../components/SearchBar";
import NoteListSkeleton from "../components/NoteListSkeleton";
import { useDispatch, useSelector } from "react-redux";
import { setNote, deleteNote } from "../redux/features/noteSlice";

function Loby() {
  const [showLoadingNoteList, setShowLoadingNoteList] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [popUpDelete, setPopUpDelete] = React.useState({
    show: false,
    noteId: "",
  });
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState([]);
  const dispatch = useDispatch();
  const noteRedux = useSelector((state) => state.note.note);
  const userState = useSelector((state) => state.user.user);

  React.useEffect(() => {
    if (search) {
      setShowLoadingNoteList(true);
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
        setNotes(
          noteRedux.filter(
            (note) =>
              note.title.toLowerCase().includes(search.toLowerCase()) ||
              note.content.toLowerCase().includes(search.toLowerCase())
          )
        );
      }).then(() => {
        setShowLoadingNoteList(false);
      });
    } else {
      if (noteRedux.length === 0) {
        setShowLoadingNoteList(true);
        if (userState.token) {
          axiosClient
            .get("/notes", {
              headers: {
                Authorization: `Bearer ${userState.token}`,
              },
            })
            .then((res) => {
              dispatch(setNote(res.data));
              setNotes(res.data);
              setShowLoadingNoteList(false);
            })
            .catch((err) => {
              console.log(err);
              setShowLoadingNoteList(false);
            });
        }
      } else if (noteRedux.length > 0) {
        setNotes(noteRedux);
      }
    }
  }, [userState, search]);

  const handleOnClickList = (noteId) => {
    navigate(`/note/${noteId}/detail`);
  };

  const handleOnClickPopup = (noteId) => {
    setPopUpDelete({
      show: true,
      noteId: noteId,
    });
  };

  const handleOnClickDelete = (noteId) => {
    setShowLoadingNoteList(true);
    axiosClient
      .delete(`/note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${userState.token}`,
        },
      })
      .then((res) => {
        setShowLoadingNoteList(false);
        console.log(res);
      })
      .catch((err) => {
        setShowLoadingNoteList(false);
        console.log(err);
      });
    setNotes(notes.filter((note) => note.id !== noteId));
    dispatch(deleteNote(noteId));
    setPopUpDelete({
      show: false,
      noteId: "",
    });
  };

  return (
    <Layout>
      <div className="w-full flex flex-col flex-1 p-5 overflow-y-scroll">
        <p className="text-4xl font-bold text-white">Sticky Notes</p>
        <SearchBar
          onChange={(search) => {
            setSearch(search);
          }}
        />
        <div className="w-full flex-1">
          <div>
            {showLoadingNoteList && (
              <div>
                <NoteListSkeleton />
                <NoteListSkeleton />
                <NoteListSkeleton />
              </div>
            )}
            {!showLoadingNoteList && (
              <div>
                {notes.map((note) => (
                  <NoteList
                    onClickDetail={() => {
                      handleOnClickList(note.id);
                    }}
                    onClickDelete={(e) => {
                      e.stopPropagation();
                      handleOnClickPopup(note.id);
                    }}
                    title={note.title}
                    content={note.content}
                    key={note.id}
                    date={note.updatedAt}
                  />
                ))}
              </div>
            )}
          </div>
          <div id="empty-note" className="h-64 flex flex-col justify-center">
            <p className="w-full text-4 font-bold text-slate-400 text-center">
              Tap button to create a note
            </p>
            <Link to="/note">
              <Button child={"Create"} className={"m-auto my-6"} />
            </Link>
          </div>
        </div>
      </div>
      {popUpDelete.show && (
        <div className="bg-slate-800 bg-opacity-80 w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          <div className="bg-slate-800 border-2 border-slate-700 w-2/3 h-[200px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-2xl">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <p className="text-white text-xl text-medium my-2 translate-y-[-70%]">
                Delete this note?
              </p>
              <div className="w-full flex justify-evenly">
                <Button
                  onClick={() => handleOnClickDelete(popUpDelete.noteId)}
                  child={"Accept"}
                />
                <Button
                  onClick={() => setPopUpDelete({ show: false, noteId: "" })}
                  child={"Decline"}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default Loby;
