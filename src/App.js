import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";
import { validateUser } from "./Api/api";
import "./App.css";
import NavBarMain from "./Components/NavBarMain";

function App() {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    const token = getUserToken();
    setUserToken(token);
  }, [shouldRefresh]);

  useEffect(() => {
    const verifyUser = async () => {
      if (userToken) {
        const verifyResult = await validateUser(userToken);
        if (verifyResult.success) {
          setUser(verifyResult.email);
          setIsVerified(true);
        } else {
          setShouldRefresh(false);
          const resultLogout = await removeUserToken();
          if (resultLogout) {
            setIsVerified(false);
            setUser(null);
            setShouldRefresh(false);
          }
        }
      }
    };
    verifyUser();
  }, [userToken]);

  return (
    <div className="App">
      <NavBarMain />

      <Outlet context={{ setShouldRefresh, user, isVerified, userToken }} />
    </div>
  );
}

export default App;
