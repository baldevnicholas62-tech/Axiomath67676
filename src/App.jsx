import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Lesson from "./pages/Lesson";
import SignIn from "./pages/SignIn";
import Practice from "./pages/Practice";
import Museum from "./pages/Museum";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/lessons/:slug" element={<Lesson />} />
        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <Practice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/museum"
          element={
            <ProtectedRoute>
              <Museum />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
