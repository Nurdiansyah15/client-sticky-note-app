import Button from "../components/Button";
import Layout from "./Layout";
import React, { useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import NoteSkeleton from "../components/NoteSkeleton";
import LoadingPage from "../components/LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { addNote, setNote, updateNote } from "../redux/features/noteSlice";

function Note() {
  const [loadingPage, setLoadingPage] = React.useState(false);
  const [showLoadingNote, setShowLoadingNote] = React.useState(true);
  const navigate = useNavigate();
  const [notes, setNotes] = React.useState({
    title: "",
    content: "",
  });
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const noteRedux = useSelector((state) => state.note.note);
  const userState = useSelector((state) => state.user.user);

  useEffect(() => {
    if (noteId) {
      if (noteRedux.length === 0) {
        setShowLoadingNote(true);
        if (userState.token) {
          axiosClient
            .get("/notes", {
              headers: {
                Authorization: `Bearer ${userState.token}`,
              },
            })
            .then((res) => {
              dispatch(setNote(res.data));
              setNotes(res.data.find((note) => note.id === noteId));
              setShowLoadingNote(false);
              return;
            })
            .catch((err) => {
              // console.log(err);
              setShowLoadingNote(false);
              return;
            });
        }
      } else if (noteRedux.length > 0) {
        setNotes(noteRedux.find((note) => note.id === noteId));
        setShowLoadingNote(false);
        return;
      }
    } else {
      setShowLoadingNote(false);
    }
    // setShowLoadingNote(false);
  }, [userState]);
  const handleOnChangeTitle = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
    const { name, value } = event.target;
    setNotes({ ...notes, [name]: value });
  };
  const handleOnChangeContent = (event) => {
    const { name, value } = event.target;
    setNotes({ ...notes, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // update
    if (noteId) {
      setLoadingPage(true);
      axiosClient
        .put(
          `/note/${noteId}`,
          {
            title: notes.title,
            content: notes.content,
          },
          {
            headers: {
              Authorization: `Bearer ${userState.token}`,
            },
          }
        )
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
      .post(
        "/note",
        {
          title: notes.title,
          content: notes.content,
        },
        {
          headers: {
            Authorization: `Bearer ${userState.token}`,
          },
        }
      )
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
              value={notes.title}
              className="w-full px-5 bg-slate-700 text-2xl text-white outline-none resize-none"
            />
          </div>
          <div className="w-full flex-1">
            <textarea
              onChange={handleOnChangeContent}
              type="text-area"
              name="content"
              value={notes.content}
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
