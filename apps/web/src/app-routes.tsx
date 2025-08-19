import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<h1>hello, world</h1>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
