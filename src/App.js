import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { Navbar, Container } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
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

  const location = useLocation();

  const checkMessages = async () => {
    if (userToken) {
      const response = await getUserMessages(userToken);
      if (response.success && response.messages.length > 0) {
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
        postedProduct={postedProduct}
      />

      <div className="banner">
        <h2>Welcome to Market Flea!</h2> where you can post items for sale or
        buy items at a bargain price
      </div>

      <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="zoom">
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

      <Navbar fixed="bottom" className="footer">
        <Container className="text-center">
          <a
            href="#"
            className="back-to-top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Back to Top
          </a>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
