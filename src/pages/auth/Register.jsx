import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import axiosclient from "../../axios/axiosClient";
import { useSelector, useDispatch } from "react-redux";
import isAuth from "../../utils/authUtils";
import { setUser } from "../../redux/features/userSlice";

function Register() {
  const navigate = useNavigate();
  const [registerPayload, setRegisterPayload] = React.useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errorText, setErrorText] = React.useState([]);
  const [registerStatus, setRegisterStatus] = React.useState({
    status: false,
    message: "",
    type: "",
  });
  const [loadingPage, setLoadingPage] = React.useState(true);
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
      }
    })();
  }, [navigate, userState.user.isLogin, dispatch]);
  const handleSubmitButton = (e) => {
    e.preventDefault();
    setErrorText([]);
    setRegisterStatus({ status: false, message: "" });
    setLoadingPage(true);
    axiosclient
      .post("/register", registerPayload)
      .then((res) => {
        setLoadingPage(false);
        setRegisterStatus({
          status: true,
          type: "success",
          message: "Register successfully, please login",
        });
        setRegisterPayload({
          username: "",
          email: "",
          password: "",
          passwordw: "",
        });
        return;
      })
      .catch((err) => {
        if (err.response.status == 400) {
          setErrorText(err.response.data.errors);
          setLoadingPage(false);
          return;
        }
        setRegisterStatus({
          status: true,
          type: "failed",
          message: "Something went wrong, please try again",
        });
      });
  };
  return (
    <>
      {loadingPage ? (
        <LoadingPage />
      ) : (
        <div className="sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 flex flex-col h-screen bg-white m-auto relative">
          <div className="py-10 px-16 w-full flex flex-col flex-1">
            <div className="w-full flex flex-col items-center h-40 justify-center">
              <p className="text-4xl font-bold mb-2 text-slate-800">Sign In</p>
              <p className="text-slate-400 font-thin text-sm">
                Create your account
              </p>
            </div>

            {registerStatus.status && (
              <div
                className={`w-full flex justify-center items-center rounded-lg h-[50px] relative 
              ${
                registerStatus.type == "success" ? "bg-green-500" : "bg-red-500"
              }
              `}
              >
                <p className="text-white">{registerStatus.message}</p>
                <div
                  className="absolute right-2 cursor-pointer"
                  onClick={() =>
                    setRegisterStatus({
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
                        setRegisterPayload({
                          ...registerPayload,
                          username: e.target.value,
                        })
                      }
                      className="text-xl w-full h-full p-2 bg-slate-700 rounded-lg text-white px-5 outline-none"
                      type="text"
                      name="username"
                      id="username"
                      value={registerPayload.username}
                      placeholder="Username"
                    />
                  </div>
                  {errorText.map((err, index) => {
                    if (err.path === "username") {
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
                    <Icon.Mail size={25} color="white" />
                    <input
                      onChange={(e) =>
                        setRegisterPayload({
                          ...registerPayload,
                          email: e.target.value,
                        })
                      }
                      className="text-xl w-full h-full p-2 bg-slate-700 rounded-lg text-white px-5 outline-none"
                      type="text"
                      name="email"
                      id="email"
                      value={registerPayload.email}
                      placeholder="Email"
                    />
                  </div>
                  {errorText.map((err, index) => {
                    if (err.path === "email") {
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
                        setRegisterPayload({
                          ...registerPayload,
                          password: e.target.value,
                        })
                      }
                      className="text-xl w-full h-full p-2 bg-slate-700 rounded-lg text-white px-5 outline-none"
                      type="password"
                      name="password"
                      value={registerPayload.password}
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  {errorText.map((err, index) => {
                    if (err.path === "password") {
                      return (
                        <p key={index} className="text-red-500">
                          {err.msg}
                        </p>
                      );
                    }
                  })}
                </div>

                <div className="w-full mb-5">
                  <div className="w-full bg-slate-700 h-14 rounded-lg flex items-center px-5 ">
                    <Icon.Check size={25} color="white" />
                    <input
                      onChange={(e) =>
                        setRegisterPayload({
                          ...registerPayload,
                          password2: e.target.value,
                        })
                      }
                      className="text-xl w-full h-full p-2 bg-slate-700 rounded-lg text-white px-5 outline-none"
                      type="password"
                      name="password2"
                      value={registerPayload.password2}
                      id="password2"
                      placeholder="Confirm Password"
                    />
                  </div>
                  {errorText.map((err, index) => {
                    if (err.path === "password2") {
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
                    onClick={handleSubmitButton}
                    type={"submit"}
                    child={"Register"}
                    className={"w-full h-full rounded-2xl bg-slate-700 text-xl"}
                  />
                </div>
                <div className="w-full flex justify-center items-center h-32 mt-10 text-slate-500">
                  <p>
                    Already have an account?{" "}
                    <Link className="text-slate-800 underline" to="/login">
                      Login
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

export default Register;
