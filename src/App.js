import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getUserToken, removeUserToken } from "./Auth/authLocalStorage";
import { validateUser, getUserMessages } from "./Api/api";
import "./App.css";
import NavBarMain from "./Components/NavBarMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

// Polling interval for checking new messages
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

  // Gives the current route's location
  const location = useLocation();

  // Function to check for new messages for the authenticated user
  const checkMessages = async () => {
    if (userToken) {
      const response = await getUserMessages(userToken);
      if (response.success && response.messages.length > 0) {
        setHasNewMessage(true);
      }
    }
  };

  // Effect hook to check and set the user token from local storage on component mount
  // When the component mounts, check for the user token in local storage and set it in state.
  // This ensures that the user stays authenticated on page reloads or revisits.
  useEffect(() => {
    const token = getUserToken();
    setUserToken(token);
  }, [shouldRefresh]);

  // Effect hook to verify the user's token and fetch the user's information
  // When the user token changes, verify the user's authenticity using the validateUser API call.
  // If the token is invalid or expired, the user is logged out by removing the token from local storage.
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

  // Effect hook to set up polling for checking new user messages
  useEffect(() => {
    const pollingInterval = setInterval(checkMessages, POLLING_INTERVAL);
    return () => {
      clearInterval(pollingInterval);
    };
  }, [userToken]);

  // Ref for the top of the page
  const top = useRef();
  //Function to smoothly scroll the page to the top
  const goToTop = () => {
    top.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      {/* Navigation bar component */}
      <NavBarMain
        isVerified={isVerified}
        setIsVerified={setIsVerified}
        user={user}
        setUser={setUser}
        setShouldRefresh={setShouldRefresh}
        hasNewMessage={hasNewMessage}
        postedProduct={postedProduct}
      />

      {/* Welcome banner */}
      <div className="banner" ref={top}>
        <h2>Welcome to Market Flea!</h2> where you can post items for sale or
        buy items at a bargain price
      </div>

      {/* Transition for route changes */}
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={10000} classNames="cube">
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
        </CSSTransition>
      </TransitionGroup>

      {/* 'Go to top' button */}
      <div className="top-to-btm">
        {" "}
        <FontAwesomeIcon
          className="icon-position icon-style"
          icon={faArrowUp}
          onClick={goToTop}
        />{" "}
      </div>
    </div>
  );
}

export default App;
