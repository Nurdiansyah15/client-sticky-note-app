import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import isAuth from "../../utils/authUtils";
import LoadingPage from "../../components/LoadingPage";
import { setUser } from "../../redux/features/userSlice";

function Private() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    (async () => {
      if (!userState.user.isLogin) {
        const user = await isAuth();
        if (!user) {
          navigate("/login");
          setLoadingPage(false);
          return;
        }
        const payload = {
          id: user.id,
          username: user.username,
          email: user.email,
          token: user.token,
          isLogin: true,
        };
        dispatch(setUser(payload));
        setLoadingPage(false);
        return;
      }
      setLoadingPage(false);
    })();
  }, [userState.user.isLogin]);
  return (
    <>
      {loadingPage ? (
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col h-screen bg-slate-700 m-auto relative">
          <LoadingPage />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}

export default Private;
