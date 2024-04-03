import Button from "../components/Button";
import Layout from "./Layout";
import React, { useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import NoteSkeleton from "../components/NoteSkeleton";
import LoadingPage from "../components/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { addNote, setState, updateNote } from "../redux/features/noteSlice";

function Note() {
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [showLoadingNote, setShowLoadingNote] = React.useState(false);
  const navigate = useNavigate();
  const [note, setNote] = React.useState({
    title: "",
    content: "",
  });
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const noteRedux = useSelector((state) => state.note.note);

  useEffect(() => {
    if (noteId) {
      if (noteRedux.length === 0) {
        setShowLoadingNote(true);
        axiosClient
          .get("/notes")
          .then((res) => {
            dispatch(setState(res.data));
            setNote(res.data.find((note) => note.id === noteId));
            setShowLoadingNote(false);
          })
          .catch((err) => {
            setShowLoadingNote(false);
          });
      } else if (noteRedux.length > 0) {
        setNote(noteRedux.find((note) => note.id === noteId));
      }
    }
  }, []);
  const handleOnChangeTitle = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };
  const handleOnChangeContent = (event) => {
    const { name, value } = event.target;
    setNote({ ...note, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // update
    if (noteId) {
      setLoadingPage(true);
      axiosClient
        .put(`/note/${noteId}`, {
          title: note.title,
          content: note.content,
        })
        .then((res) => {
          dispatch(updateNote(res.data));
          setLoadingPage(false);
          navigate("/");
        })
        .catch((err) => {
          setLoadingPage(false);
        });
      return;
    }

    // create
    setLoadingPage(true);
    axiosClient
      .post("/note", {
        title: note.title,
        content: note.content,
      })
      .then((res) => {
        dispatch(addNote(res.data));
        setLoadingPage(false);
        navigate("/");
      })
      .catch((err) => {
        setLoadingPage(false);
      });
  };
  return (
    <Layout>
      {loadingPage && <LoadingPage />}
      {showLoadingNote && <NoteSkeleton />}
      {!showLoadingNote && (
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col flex-1 mt-5"
        >
          <div>
            <textarea
              onChange={handleOnChangeTitle}
              type="text-area"
              name="title"
              id="title"
              placeholder="Title"
              value={note.title}
              className="w-full px-5 bg-slate-700 text-2xl text-white outline-none resize-none"
            />
          </div>
          <div className="w-full flex-1">
            <textarea
              onChange={handleOnChangeContent}
              type="text-area"
              name="content"
              value={note.content}
              id="content"
              placeholder="Content"
              className="w-full h-full px-5 bg-slate-700 text-white outline-none resize-none text-justify"
            />
          </div>
          <div className="w-full flex justify-end border-t-2 border-slate-400 relative bottom-0">
            <Button type={"submit"} child={"Save"} className={"my-5 mr-5"} />
          </div>
        </form>
      )}
    </Layout>
  );
}

export default Note;
