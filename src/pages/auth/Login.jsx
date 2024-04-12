import * as Icon from "react-feather";
import React, { useEffect } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import axiosClient from "../../axios/axiosClient";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import isAuth from "../../utils/authUtils";
function Login() {
  const navigate = useNavigate();
  const [loginPayload, setLoginPayload] = React.useState({
    identifier: "",
    password: "",
  });
  const [loadingPage, setLoadingPage] = React.useState(true);
  const [validationError, setValidationError] = React.useState([]);
  const [loginError, setLoginError] = React.useState({
    status: false,
    message: "",
  });
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (!userState.user.isLogin) {
        const user = await isAuth();
        if (!user) {
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
        navigate("/");
      } else {
        setLoadingPage(false);
      }
    })();
  }, [navigate, userState.user.isLogin, dispatch]);

  const handleButtonLogin = (e) => {
    e.preventDefault();
    setValidationError([]);
    setLoginError({ status: false, message: "" });
    setLoadingPage(true);
    axiosClient
      .post("/login", loginPayload)
      .then((res) => {
        const payload = {
          id: res.data.payload.id,
          username: res.data.payload.username,
          email: res.data.payload.email,
          token: res.data.token,
          isLogin: true,
        };
        localStorage.setItem("refresh_token", res.data.refreshToken);
        dispatch(setUser(payload));
        setLoadingPage(false);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setValidationError(err.response.data.errors);
          setLoadingPage(false);
          return;
        }
        if (err.response.status == 404) {
          setLoginError({
            status: true,
            message: err.response.data.error,
          });
          setLoadingPage(false);
          return;
        }
      });
  };
  return (
    <>
      {loadingPage ? (
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col h-screen bg-slate-700 m-auto relative">
          <LoadingPage />
        </div>
      ) : (
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col h-screen bg-white m-auto relative">
          <div className="py-10 px-16 w-full flex flex-col flex-1">
            <div className="w-full flex flex-col items-center h-60 justify-center">
              <p className="text-4xl font-bold mb-2 text-slate-800">
                Welcome Back
              </p>
              <p className="text-4xl font-bold mb-2 text-slate-800">
                Sticky Note
              </p>
              <p className="text-slate-400 font-thin text-sm">
                Enter your credential to login
              </p>
            </div>

            {loginError.status && (
              <div className="w-full flex justify-center items-center rounded-lg bg-red-500 h-[50px] relative">
                <p className="text-white">{loginError.message}</p>
                <div
                  className="absolute right-2 cursor-pointer"
                  onClick={() =>
                    setLoginError({
                      status: false,
                    })
                  }
                >
                  <Icon.X size={18} color="white" />
                </div>
              </div>
            )}

            <div className="w-full flex flex-col mt-10">
              <form autoComplete="off">
                <div className="w-full mb-5">
                  <div className="w-full bg-slate-700 h-14 rounded-lg flex items-center px-5">
                    <Icon.User size={25} color="white" />
                    <input
                      onChange={(e) =>
                        setLoginPayload({
                          ...loginPayload,
                          identifier: e.target.value,
                        })
                      }
                      className="text-xl w-full h-full p-2 bg-slate-700 rounded-lg text-white px-5 outline-none"
                      type="text-area"
                      name="identifier"
                      id="identifier"
                      placeholder="Username or Email"
                      value={loginPayload.identifier}
                    />
                  </div>
                  {validationError.length > 0 &&
                    validationError.map((err, index) => {
                      if (err.path === "identifier") {
                        return (
                          <p key={index} className="text-red-500">
                            {err.msg}
                          </p>
                        );
                      }
                    })}
                </div>

                <div className="w-full mb-5">
                  <div className="w-full bg-slate-700 h-14 rounded-lg flex items-center px-5">
                    <Icon.Key size={25} color="white" />
                    <input
                      onChange={(e) =>
                        setLoginPayload({
                          ...loginPayload,
                          password: e.target.value,
                        })
                      }
                      className="text-xl w-full h-full p-2 bg-slate-700 rounded-lg text-white px-5 outline-none"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={loginPayload.password}
                    />
                  </div>
                  {validationError.length > 0 &&
                    validationError.map((err, index) => {
                      if (err.path === "password") {
                        return (
                          <p key={index} className="text-red-500">
                            {err.msg}
                          </p>
                        );
                      }
                    })}
                </div>
                <div className="w-full flex justify-center h-14">
                  <Button
                    onClick={handleButtonLogin}
                    type={"submit"}
                    child={"Login"}
                    className={"w-full h-full rounded-2xl bg-slate-700 text-xl"}
                  />
                </div>
                <div className="w-full flex justify-center items-center h-40 mt-10 text-slate-500">
                  <p>
                    Don't have an account?{" "}
                    <Link className="text-slate-800 underline" to="/register">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
