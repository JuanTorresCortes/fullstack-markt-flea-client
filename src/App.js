import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";
import { validateUser, getUserMessages } from "./Api/api";
import "./App.css";
import NavBarMain from "./Components/NavBarMain";

const POLLING_INTERVAL = 30000;

function App() {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [currentItem, setCurrentItem] = useState({});
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [postedProduct, setPostedProduct] = useState([]);

  // const showNotification = () => {
  //   if (window.Notification && Notification.permission === "granted") {
  //     const notification = new Notification("New Message Received", {
  //       body: "You have a new message in your dashboard.",
  //     });
  //   } else if (window.Notification && Notification.permission !== "denied") {
  //     Notification.requestPermission().then((permission) => {
  //       if (permission === "granted") {
  //         const notification = new Notification("New Message Received", {
  //           body: "You have a new message in your dashboard.",
  //         });
  //       }
  //     });
  //   }
  // };

  const checkMessages = async () => {
    if (userToken) {
      const response = await getUserMessages(userToken);
      if (response.success && response.messages.length > 0) {
        // showNotification();
        setHasNewMessage(true);
      }
    }
  };

  useEffect(() => {
    const token = getUserToken();
    setUserToken(token);
  }, [shouldRefresh]);

  useEffect(() => {
    const verifyUser = async () => {
      if (userToken) {
        const verifyResult = await validateUser(userToken);

        if (verifyResult.success) {
          const userFullName = `${verifyResult.name}`;
          setUser(userFullName);

          const info = verifyResult;
          setUserInfo(info);
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

  useEffect(() => {
    const pollingInterval = setInterval(checkMessages, POLLING_INTERVAL);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [userToken]);

  return (
    <div className="App">
      <NavBarMain
        isVerified={isVerified}
        setIsVerified={setIsVerified}
        user={user}
        setUser={setUser}
        setShouldRefresh={setShouldRefresh}
        hasNewMessage={hasNewMessage}
      />

      <Outlet
        context={{
          setShouldRefresh,
          user,
          isVerified,
          setIsVerified,
          userToken,
          userInfo,
          setUser,
          setCurrentItem,
          currentItem,
          hasNewMessage,
          setHasNewMessage,
          setUserToken,
          postedProduct,
          setPostedProduct,
        }}
      />
    </div>
  );
}

export default App;
