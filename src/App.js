import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useMemo, useState } from "react";
import UserContext from "./contexts/UserContext";
import { AuthHandler } from "./handlers/AuthHandler";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(AuthHandler.getToken());
  const auth = useMemo(
    () => ({
      userInfo,
      setUserInfo,
      token,
      setToken,
    }),
    [userInfo, setUserInfo, token, setToken]
  );
  return (
    <UserContext.Provider value={auth}>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
