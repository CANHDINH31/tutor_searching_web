import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./scenes/global/Sidebar";
import CreateUser from "./scenes/users/create-user";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Login from "./scenes/login/login";
import { useCookies } from "react-cookie";
import Users from "./scenes/users";
import ChangeInfo from "./scenes/users/change-info";
import Subject from "./scenes/subject";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [cookies, setCookie] = useCookies(["admin"]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      {!cookies.admin?.name ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
              <Routes>
                <Route index path="/" element={<Users />} />
                <Route index path="/users/:id" element={<ChangeInfo />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/subject" element={<Subject />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      )}
    </ColorModeContext.Provider>
  );
}

export default App;
