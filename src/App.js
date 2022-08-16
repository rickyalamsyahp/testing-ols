import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import HomeAdmin from "./pages/HomeAdmin";
import Likedpost from "./pages/Liked-post";
import PageDetail from "./pages/pageDetailPost";
import PageForm from "./pages/FormData";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <div>
      <Routes location={background || location}>
        <Route path="/" element={<Home logic="Login" title="Halaman Utama" />}>
          <Route path="/post/:id" element={<PageDetail />} />
        </Route>
        <Route
          path="/admin"
          element={<HomeAdmin logic="Logout" title="Halaman Admin" />}
        >
          <Route path="/admin/post/:id" element={<PageDetail />} />
          <Route path="/admin/create" element={<PageForm />} />
          <Route path="/admin/post/:id/edit" element={<PageForm />} />
        </Route>

        <Route
          path="/admin/:id"
          element={<HomeAdmin logic="Logout" title="Halaman Admin" />}
        />
        <Route
          path="/likedpost"
          element={<Likedpost logic="Login" title="Halaman Utama" />}
        />
        {/* <Route
          path="/admin/:id/likedpost"
          element={<Likedpost logic="Logout" title="Halaman Admin" />}
        /> */}
      </Routes>
      {background && (
        <Routes>
          <Route path="/post/:id" element={<PageDetail />} />
          <Route path="/admin/post/:id" element={<PageDetail />} />
        </Routes>
      )}
    </div>
  );
}
export default App;
