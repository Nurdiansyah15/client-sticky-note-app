import Button from "../components/Button";
import Layout from "./Layout";
import React, { useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import { useNavigate, useParams } from "react-router-dom";
import NoteSkeleton from "../components/NoteSkeleton";

function Note() {
  const [showLoadingNote, setShowLoadingNote] = React.useState(false);
  const navigate = useNavigate();
  const [note, setNote] = React.useState({
    title: "",
    content: "",
  });
  const { noteId } = useParams();
  useEffect(() => {
    if (noteId) {
      setShowLoadingNote(true);
      axiosClient
        .get(`/note/${noteId}`)
        .then((res) => {
          setNote(res.data);
          setShowLoadingNote(false);
        })
        .catch((err) => {
          console.log(err);
          setShowLoadingNote(false);
        });
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

    if (noteId) {
      axiosClient
        .put(`/note/${noteId}`, {
          title: note.title,
          content: note.content,
        })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    axiosClient
      .post("/note", {
        title: note.title,
        content: note.content,
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Layout>
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
