import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Likedpost from "./pages/Liked-post";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home logic="Login" title="Halaman Utama" />}
        />
        <Route
          path="/admin/:id"
          element={<Home logic="Logout" title="Halaman Admin" />}
        />
        <Route
          path="/likedpost"
          element={<Likedpost logic="Login" title="Halaman Utama" />}
        />
        {/* <Route
          path="/admin/:id/likedpost"
          element={<Likedpost logic="Logout" title="Halaman Admin" />}
        /> */}
        {/* <Route path="/posts/:id" element={<PageDetail />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
