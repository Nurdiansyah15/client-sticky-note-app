import Loby from "./pages/Loby";
import Note from "./pages/Note";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./redux/store";
import Profile from "./pages/Profile";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Loby />} />
          <Route path="/note" element={<Note />} />
          <Route path="/note/:noteId/detail" element={<Note />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
