import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import PageDetail from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home logic="Login" title="Halaman Utama" />}
        />
        {/* <Route path="/posts/:id" element={<PageDetail />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
