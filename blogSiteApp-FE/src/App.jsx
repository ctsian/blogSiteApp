import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import UserProfile from "./pages/UserProfile";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blog/:id/edit" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<ProtectedRoute>
                                            <CreateBlog />
                                          </ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
