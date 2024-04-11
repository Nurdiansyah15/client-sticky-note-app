import Button from "../components/Button";
import Layout from "./Layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import axiosClient from "../axios/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import { resetUser } from "../redux/features/userSlice";
import { resetNote } from "../redux/features/noteSlice";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user.user);
  const [loadingPage, setLoadingPage] = React.useState(false);

  const handleLogout = () => {
    setLoadingPage(true);
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      setLoadingPage(false);
      navigate("/login");
      return;
    }

    axiosClient
      .get("/logout", {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("refresh_token");
          dispatch(resetUser());
          dispatch(resetNote());
          setLoadingPage(false);
          navigate("/login");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingPage(false);
      });
  };
  return (
    <Layout>
      {loadingPage && <LoadingPage />}
      <div className="w-full flex flex-col flex-1 p-5">
        <div className="w-full flex border-b-2 border-white py-2">
          <div className="w-fit mr-4">
            <div
              className="w-[80px] h-[80px] rounded-full bg-cover"
              style={{
                backgroundImage: "url(https://picsum.photos/200/300?random=1)",
              }}
            ></div>
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold text-white">
              {userState.username}
            </p>
            <p className="text-xl font-thin text-white">{userState.email}</p>
            <p className="text-xl font-medium text-white">Fisika</p>
          </div>
        </div>
        <div className="w-full py-2">
          <p className="text-white text-base text-justify">
            Fugiat nostrud occaecat quis reprehenderit eu qui nostrud sunt est
            dolor sit. Dolor pariatur ipsum incididunt tempor dolore minim quis
            adipisicing deserunt nostrud. Eu labore in labore ex dolor. In esse
            tempor qui ad velit do est do laboris cillum. Laborum eu ut aliquip
            ad amet sunt eiusmod do.
          </p>
        </div>
        <div>
          <Button
            onClick={handleLogout}
            type={"button"}
            child={"Logout"}
            className={"m-auto my-6"}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
