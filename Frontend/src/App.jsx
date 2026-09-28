import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Dashboard from "./page/Dashboard";
import Generate from "./page/Generate";
import { useNavigate } from "react-router-dom";
import Editor from "./page/Editor";

const App = () => {
  useGetCurrentUser();
  const { userData } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={userData ? <Dashboard /> : <Home />}
        />
        <Route path="/generate" element={userData ? <Generate /> : <Home />} />
        <Route path="/editor/:id" element={userData ? <Editor /> : <Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
