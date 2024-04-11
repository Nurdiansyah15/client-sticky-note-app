import axiosClient from "../axios/axiosClient";

const isAuth = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (refreshToken === "" || !refreshToken) {
    localStorage.removeItem("refresh_token");
    return false;
  }

  try {
    const user = await axiosClient.get("/refresh", {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    localStorage.setItem("refresh_token", user.data.refreshToken);
    const payload = {
      id: user.data.payload.id,
      username: user.data.payload.username,
      email: user.data.payload.email,
      token: user.data.token,
    };
    return payload;
  } catch (error) {
    localStorage.removeItem("refresh_token");
    return false;
  }
};

export default isAuth;
